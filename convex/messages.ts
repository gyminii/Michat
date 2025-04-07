import { ConvexError, v } from "convex/values";
import { query } from "./_generated/server";
import { getUserByClerkId } from "./_utils";

export const get = query({
	args: {
		id: v.id("chats"),
	},
	handler: async (ctx, args) => {
		const identity = await ctx.auth.getUserIdentity();
		if (!identity) {
			throw new Error("Unauthorized");
		}

		const currentUser = await getUserByClerkId({
			ctx,
			clerkId: identity.subject,
		});

		if (!currentUser) throw new ConvexError("User not found");

		const membership = await ctx.db
			.query("chatMembers")
			.withIndex("by_memberId_chatId", (q) =>
				q.eq("memberId", currentUser._id).eq("chatId", args.id)
			)
			.unique();
		if (!membership) throw new ConvexError("You aren't a member of this chat");

		// messages
		const messages = await ctx.db
			.query("messages")
			.withIndex("by_chatId", (q) => q.eq("chatId", args.id))
			.order("desc")
			.collect();

		// users with the messages
		const messagesWithUsers = Promise.all(
			messages.map(async (message) => {
				const messageSender = await ctx.db.get(message.senderId);
				if (!messageSender)
					throw new ConvexError("Could not find sender of message");
				return {
					message,
					senderImage: messageSender.imageUrl,
					senderName: messageSender.username,
					isCurrentUser: messageSender?._id === currentUser._id,
				};
			})
		);

		return messagesWithUsers;
	},
});
