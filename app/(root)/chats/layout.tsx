"use client";

import {
	ResizableHandle,
	ResizablePanel,
	ResizablePanelGroup,
} from "@/components/ui/resizable";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import React from "react";
import DMChatItem from "./_components/dm-chat-item";
import GroupChatItem from "./_components/group-chat-item";
import CreateGroupDialog from "./[chatId]/_components/dialogs/create-group-dialog";

type Props = {
	children: React.ReactNode;
};

const ChatLayout = ({ children }: Props) => {
	const chats = useQuery(api.chats.get);
	const renderChat = () =>
		chats?.length === 0 ? (
			<p className="w-full h-full flex items-center justify-center">
				No chats found
			</p>
		) : (
			chats?.map((chat) =>
				chat.chat.isGroup ? (
					<GroupChatItem
						key={chat.chat._id}
						id={chat.chat._id}
						name={chat.chat.name || ""}
						lastMessageSender={chat.lastMessage?.sender}
						lastMessageContent={chat.lastMessage?.content}
						unseenCount={chat.unseenCount}
					/>
				) : (
					<DMChatItem
						key={chat.chat._id}
						id={chat.chat._id}
						username={chat.otherMember?.username || ""}
						imageUrl={chat.otherMember?.imageUrl || ""}
						lastMessageSender={chat.lastMessage?.sender}
						lastMessageContent={chat.lastMessage?.content}
						unseenCount={chat.unseenCount}
					/>
				)
			)
		);
	return (
		<ResizablePanelGroup
			id="chat-main-panel"
			direction="horizontal"
			className="rounded-lg border md:min-w-[450px]"
		>
			<ResizablePanel defaultSize={20} className="flex flex-col gap-2 p-2">
				<div className="flex flex-row justify-between items-center">
					<h1>Chats</h1>
					<CreateGroupDialog />
				</div>
				{renderChat()}
			</ResizablePanel>
			<ResizableHandle withHandle className="hidden md:flex " />
			{/* Actual Chat Panel */}
			{children}
		</ResizablePanelGroup>
	);
};

export default ChatLayout;
