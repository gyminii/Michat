import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
	users: defineTable({
		username: v.string(),
		imageUrl: v.string(),
		clerkId: v.string(),
		email: v.string(),
	})
		.index("by_email", ["email"])
		.index("by_clerkId", ["clerkId"]),
	requests: defineTable({
		sender: v.id("users"),
		receiver: v.id("users"),
	})
		.index("by_receiver", ["receiver"])
		.index("by_receiver_sender", ["receiver", "sender"]),
	friends: defineTable({
		user1: v.id("users"),
		user2: v.id("users"),
		chatId: v.id("chats"),
	})
		.index("by_user1", ["user1"])
		.index("by_user2", ["user2"])
		.index("by_chatId", ["chatId"]),
	chats: defineTable({
		name: v.optional(v.string()),
		isGroup: v.boolean(),
		lastMessageId: v.optional(v.id("messages")),
	}),
	chatMembers: defineTable({
		memberId: v.id("users"),
		chatId: v.id("chats"),
		lastSeenMessage: v.optional(v.id("messages")),
	})
		.index("by_memberId", ["memberId"])
		.index("by_chatId", ["chatId"])
		.index("by_memberId_chatId", ["memberId", "chatId"]),
	messages: defineTable({
		senderId: v.id("users"),
		chatId: v.id("chats"),
		type: v.string(),
		content: v.array(v.string()),
	}).index("by_chatId", ["chatId"]),
});
