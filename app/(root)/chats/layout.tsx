"use client";

import {
	ResizableHandle,
	ResizablePanel,
	ResizablePanelGroup,
} from "@/components/ui/resizable";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import type React from "react";
import DMChatItem from "./_components/dm-chat-item";
import GroupChatItem from "./_components/group-chat-item";
import CreateGroupDialog from "./[chatId]/_components/dialogs/create-group-dialog";
import { useChat } from "@/hooks/use-chat";
import { useIsMobile } from "@/hooks/use-mobile";

type Props = {
	children: React.ReactNode;
};

const ChatLayout = ({ children }: Props) => {
	const chats = useQuery(api.chats.get);
	const { isActive } = useChat();
	const isMobile = useIsMobile();

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

	// For mobile: show either the chat list or the active chat, not both
	if (isMobile) {
		return (
			<div className="h-full w-full overflow-hidden flex flex-col">
				{isActive ? (
					children
				) : (
					<div className="flex flex-col h-full w-full">
						<div className="flex flex-row justify-between items-center p-4 border-b">
							<h1 className="text-xl font-semibold">Chats</h1>
							<CreateGroupDialog />
						</div>
						<div className="flex-1 overflow-y-auto p-2 space-y-2">
							{renderChat()}
						</div>
					</div>
				)}
			</div>
		);
	}

	// For desktop: show the resizable panels
	return (
		<ResizablePanelGroup
			id="chat-main-panel"
			direction="horizontal"
			className="h-full w-full"
		>
			<ResizablePanel defaultSize={25} minSize={15} className="flex flex-col">
				<div className="flex flex-row justify-between items-center p-4 border-b">
					<h1 className="text-xl font-semibold">Chats</h1>
					<CreateGroupDialog />
				</div>
				<div className="flex-1 overflow-y-auto p-2 space-y-2">
					{renderChat()}
				</div>
			</ResizablePanel>
			<ResizableHandle withHandle className="hidden md:flex" />
			{/* Actual Chat Panel */}
			<ResizablePanel defaultSize={75} className="flex flex-col">
				{children}
			</ResizablePanel>
		</ResizablePanelGroup>
	);
};

export default ChatLayout;
