"use client";

import type { Id } from "@/convex/_generated/dataModel";
import { DMChatItem } from "./dm-chat-item";
import { GroupChatItem } from "./group-chat-item";

type Props = {
	id: Id<"chats">;
	isGroup: boolean;
	name?: string;
	imageUrl?: string;
	username?: string;
	lastMessageSender?: string;
	lastMessageContent?: string;
	unseenCount: number;
	index: number;
};

export const ChatItem = ({
	id,
	isGroup,
	name,
	imageUrl,
	username,
	lastMessageSender,
	lastMessageContent,
	unseenCount,
}: Props) => {
	return isGroup ? (
		<GroupChatItem
			id={id}
			name={name || "Group Chat"}
			lastMessageSender={lastMessageSender}
			lastMessageContent={lastMessageContent}
			unseenCount={unseenCount}
		/>
	) : (
		<DMChatItem
			id={id}
			imageUrl={imageUrl || ""}
			username={username || ""}
			lastMessageSender={lastMessageSender}
			lastMessageContent={lastMessageContent}
			unseenCount={unseenCount}
		/>
	);
};
