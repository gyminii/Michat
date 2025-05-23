import { ConvexError, v } from "convex/values";
import { mutation } from "./_generated/server";
import { getUserByClerkId } from "./_utils";

export const remove = mutation({
	args: {
		chatId: v.id("chats"),
	},
	handler: async (ctx, args) => {
		const identity = await ctx.auth.getUserIdentity();

		if (!identity) {
			throw new ConvexError("Unauthorized");
		}

		const currentUser = await getUserByClerkId({
			ctx,
			clerkId: identity.subject,
		});

		if (!currentUser) throw new ConvexError("User not found");

		const conversation = await ctx.db.get(args.chatId);

		if (!conversation) throw new ConvexError("Conversation not found");

		const memberships = await ctx.db
			.query("chatMembers")
			.withIndex("by_chatId", (q) => q.eq("chatId", args.chatId))
			.collect();

		if (!memberships || memberships.length !== 2)
			throw new ConvexError("This conversation does not have any members");

		const friendship = await ctx.db
			.query("friends")
			.withIndex("by_chatId", (q) => q.eq("chatId", args.chatId))
			.unique();

		if (!friendship) throw new ConvexError("Friend could not be found");

		const messages = await ctx.db
			.query("messages")
			.withIndex("by_chatId", (q) => q.eq("chatId", args.chatId))
			.collect();

		// Delete conversation
		await ctx.db.delete(args.chatId);

		// Delete frienship
		await ctx.db.delete(friendship._id);

		// Delete conversation memberships
		await Promise.all(
			memberships.map(async (membership) => {
				await ctx.db.delete(membership._id);
			})
		);

		// Delete conversation messages
		await Promise.all(
			messages.map(async (message) => {
				await ctx.db.delete(message._id);
			})
		);
	},
});
