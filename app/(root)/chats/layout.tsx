"use client";

import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import type React from "react";
import CreateGroupDialog from "./[chatId]/_components/dialogs/create-group-dialog";
import { useChat } from "@/hooks/use-chat";
import { ChatItem } from "./_components/chat-item";
import { SidebarLayout } from "@/components/app-sidebar";

type Props = {
	children: React.ReactNode;
};

const ChatLayout = ({ children }: Props) => {
	const chats = useQuery(api.chats.get);
	const { isActive } = useChat();

	const sidebarContent =
		chats?.length === 0 ? (
			<div className="flex items-center justify-center h-32 text-gray-500 dark:text-gray-400">
				<p>No chats found</p>
			</div>
		) : (
			<div className="space-y-2">
				{chats?.map((chat, index) => (
					<ChatItem
						key={chat.chat._id}
						id={chat.chat._id}
						isGroup={chat.chat.isGroup}
						name={chat.chat.name}
						imageUrl={chat.otherMember?.imageUrl}
						username={chat.otherMember?.username}
						lastMessageSender={chat.lastMessage?.sender}
						lastMessageContent={chat.lastMessage?.content}
						unseenCount={chat.unseenCount}
						index={index}
					/>
				))}
			</div>
		);

	return (
		<SidebarLayout
			sidebarContent={sidebarContent}
			sidebarTitle="Recent Chats"
			sidebarAction={<CreateGroupDialog />}
			showOnMobile={!isActive}
		>
			{children}
		</SidebarLayout>
	);
};

export default ChatLayout;
