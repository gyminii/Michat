import { ConvexError, v } from "convex/values";
import { mutation } from "./_generated/server";
import { getUserByClerkId } from "./_utils";

export const create = mutation({
	args: {
		email: v.string(),
	},
	handler: async (ctx, args) => {
		const identity = await ctx.auth.getUserIdentity();
		if (!identity) throw new ConvexError("Unauthorized");
		if (args.email === identity.email)
			throw new ConvexError("Cannot send request to yourself");
		const currentUser = await getUserByClerkId({
			ctx: ctx,
			clerkId: identity.subject,
		});
		if (!currentUser) throw new ConvexError("Current User not found");
		const receiver = await ctx.db
			.query("users")
			.withIndex("by_email", (q) => q.eq("email", args.email))
			.unique();
		if (!receiver) throw new ConvexError("Receiver could not be found");

		const requestAlreadySent = await ctx.db
			.query("requests")
			.withIndex("by_receiver_sender", (q) =>
				q.eq("receiver", receiver._id).eq("sender", currentUser._id)
			)
			.unique();
		if (requestAlreadySent) throw new ConvexError("Request already sent");
		const requestlreadyReceived = await ctx.db
			.query("requests")
			.withIndex("by_receiver_sender", (q) =>
				q.eq("receiver", currentUser._id).eq("sender", receiver._id)
			)
			.unique();
		if (requestlreadyReceived)
			throw new ConvexError("This User already sent a request");

		const friends1 = await ctx.db
			.query("friends")
			.withIndex("by_user1", (q) => q.eq("user1", currentUser._id))
			.collect();

		const friends2 = await ctx.db
			.query("friends")
			.withIndex("by_user2", (q) => q.eq("user2", currentUser._id))
			.collect();
		if (
			friends1.some((friend) => friend.user2 === receiver._id) ||
			friends2.some((friend) => friend.user1 === receiver._id)
		) {
			throw new ConvexError("You are already friends with this user");
		}

		return await ctx.db.insert("requests", {
			sender: currentUser._id,
			receiver: receiver._id,
		});
	},
});

export const accept = mutation({
	args: {
		id: v.id("requests"),
	},
	handler: async (ctx, args) => {
		const identity = await ctx.auth.getUserIdentity();

		if (!identity) throw new Error("Unauthorized");

		const currentUser = await getUserByClerkId({
			ctx,
			clerkId: identity.subject,
		});

		if (!currentUser) throw new ConvexError("User not found");

		const request = await ctx.db.get(args.id);

		if (!request || request.receiver !== currentUser._id)
			throw new ConvexError("There was an error accepting this request");
		const chatId = await ctx.db.insert("chats", {
			isGroup: false,
		});
		await ctx.db.insert("friends", {
			user1: currentUser._id,
			user2: request.sender,
			chatId,
		});
		await ctx.db.insert("chatMembers", {
			memberId: currentUser._id,
			chatId: chatId,
		});
		await ctx.db.insert("chatMembers", {
			memberId: request.sender,
			chatId: chatId,
		});

		await ctx.db.delete(request._id);
	},
});

export const deny = mutation({
	args: {
		id: v.id("requests"),
	},
	handler: async (ctx, args) => {
		const identity = await ctx.auth.getUserIdentity();
		if (!identity) throw new ConvexError("Unauthorized");

		const currentUser = await getUserByClerkId({
			ctx: ctx,
			clerkId: identity.subject,
		});
		if (!currentUser) throw new ConvexError("Current User not found");

		const request = await ctx.db.get(args.id);

		if (!request || request.receiver !== currentUser._id) {
			throw new ConvexError("There was an error denying this request");
		}

		await ctx.db.delete(request._id);
	},
});
