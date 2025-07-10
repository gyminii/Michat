"use client";

import {
	ResizableHandle,
	ResizablePanel,
	ResizablePanelGroup,
} from "@/components/ui/resizable";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import type React from "react";
import CreateGroupDialog from "./[chatId]/_components/dialogs/create-group-dialog";
import { useChat } from "@/hooks/use-chat";
import { useIsMobile } from "@/hooks/use-mobile";
import { ChatItem } from "./_components/chat-item";

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
			chats?.map((chat, index) => (
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
			))
		);

	if (isMobile) {
		return (
			<div className="h-full w-full overflow-hidden flex flex-col">
				{isActive ? (
					<div className="h-full w-full flex flex-col">{children}</div>
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
		<div className="h-full w-full bg-white rounded-xl shadow-lg overflow-hidden">
			<ResizablePanelGroup
				id="chat-main-panel"
				direction="horizontal"
				className="h-full w-full"
			>
				<ResizablePanel defaultSize={25} minSize={15} className="flex flex-col">
					<div className="h-15 flex flex-row justify-between items-center p-4 border-b">
						<h1 className="text-xl font-semibold">Chats</h1>
						<CreateGroupDialog />
					</div>
					<div className="flex-1 overflow-y-auto p-2 space-y-2">
						{renderChat()}
					</div>
				</ResizablePanel>
				<ResizableHandle withHandle className="hidden md:flex" />
				{/* Actual Chat Panel */}
				<ResizablePanel defaultSize={75} className="flex flex-col h-full">
					<div className="h-full w-full">{children}</div>
				</ResizablePanel>
			</ResizablePanelGroup>
		</div>
	);
};

export default ChatLayout;
