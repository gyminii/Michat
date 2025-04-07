import { ConvexError, v } from "convex/values";
import { mutation } from "./_generated/server";
import { getUserByClerkId } from "./_utils";

export const create = mutation({
	args: {
		chatId: v.id("chats"),
		type: v.string(),
		content: v.array(v.string()),
	},
	handler: async (ctx, args) => {
		const identity = await ctx.auth.getUserIdentity();
		if (!identity) throw new Error("Unauthorized");

		const currentUser = await getUserByClerkId({
			ctx,
			clerkId: identity.subject,
		});

		if (!currentUser) throw new ConvexError("User not found");

		const membership = await ctx.db
			.query("chatMembers")
			.withIndex("by_memberId_chatId", (q) =>
				q.eq("memberId", currentUser._id).eq("chatId", args.chatId)
			)
			.unique();

		if (!membership) throw new ConvexError("You aren't a member of this chat");

		const message = await ctx.db.insert("messages", {
			senderId: currentUser._id,
			...args,
		});

		await ctx.db.patch(args.chatId, { lastMessageId: message });

		return message;
	},
});
