import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";
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

		const chat = await ctx.db.get(args.id);
		if (!chat) throw new ConvexError("No chat found");

		const membership = await ctx.db
			.query("chatMembers")
			.withIndex("by_memberId_chatId", (q) =>
				q.eq("memberId", currentUser._id).eq("chatId", chat._id)
			)
			.unique();

		if (!membership) throw new ConvexError("You aren't a member of this chat");
		const allChatMemberships = await ctx.db
			.query("chatMembers")
			.withIndex("by_chatId", (q) => q.eq("chatId", args.id))
			.collect();
		if (!chat.isGroup) {
			const otherMembership = allChatMemberships.filter(
				(membership) => membership.memberId !== currentUser._id
			)[0];
			const otherMemberDetails = await ctx.db.get(otherMembership.memberId);
			return {
				...chat,
				otherMember: {
					...otherMemberDetails,
					lastSeenMessageId: otherMembership.lastSeenMessage,
				},
				otherMembers: null,
			};
		} else {
			const otherMembers = await Promise.all(
				allChatMemberships
					.filter((membership) => membership.memberId !== currentUser._id)
					.map(async (membership) => {
						const member = await ctx.db.get(membership.memberId);

						if (!member) {
							throw new ConvexError("Member could not be found");
						}

						return {
							_id: member._id,
							username: member.username,
							lastSeenMessageId: membership.lastSeenMessage,
						};
					})
			);

			return { ...chat, otherMembers, otherMember: null };
		}
	},
});
// Groups
// Create
export const createGroup = mutation({
	args: {
		members: v.array(v.id("users")),
		name: v.string(),
	},
	handler: async (ctx, args) => {
		const identity = await ctx.auth.getUserIdentity();

		if (!identity) throw new Error("Unauthorized");

		const currentUser = await getUserByClerkId({
			ctx,
			clerkId: identity.subject,
		});

		if (!currentUser) {
			throw new ConvexError("User not found");
		}

		const chatId = await ctx.db.insert("chats", {
			isGroup: true,
			name: args.name,
		});

		await Promise.all(
			[...args.members, currentUser._id].map(
				async (memberId) =>
					await ctx.db.insert("chatMembers", {
						memberId,
						chatId,
					})
			)
		);
	},
});

// Delete Group
export const deleteGroup = mutation({
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

		if (!memberships || memberships.length <= 1)
			throw new ConvexError("This conversation does not have any members");
		const messages = await ctx.db
			.query("messages")
			.withIndex("by_chatId", (q) => q.eq("chatId", args.chatId))
			.collect();

		// Delete conversation
		await ctx.db.delete(args.chatId);

		// Delete conversation memberships
		await Promise.all(
			memberships.map(async (membership) => await ctx.db.delete(membership._id))
		);

		// Delete conversation messages
		await Promise.all(
			messages.map(async (message) => await ctx.db.delete(message._id))
		);
	},
});

// Leave Group
export const leaveGroup = mutation({
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

		const membership = await ctx.db
			.query("chatMembers")
			.withIndex("by_memberId_chatId", (q) =>
				q.eq("memberId", currentUser._id).eq("chatId", args.chatId)
			)
			.unique();

		if (!membership) {
			throw new ConvexError("You are not a member of this group");
		}

		// Delete conversation memberships
		await ctx.db.delete(membership._id);
	},
});

// Mark read
export const markRead = mutation({
	args: {
		chatId: v.id("chats"),
		messageId: v.id("messages"),
	},
	handler: async (ctx, args) => {
		const identity = await ctx.auth.getUserIdentity();

		if (!identity) throw new ConvexError("Unauthorized");

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

		if (!membership) throw new ConvexError("You aren't a member of this Chat");

		const lastMessage = await ctx.db.get(args.messageId);

		await ctx.db.patch(membership._id, {
			lastSeenMessage: lastMessage ? lastMessage._id : undefined,
		});
	},
});
