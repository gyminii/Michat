"use client";

import {
	ResizableHandle,
	ResizablePanel,
	ResizablePanelGroup,
} from "@/components/ui/resizable";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import type React from "react";
// import { AnimatedChatItem } from "./_components/animated-chat-item";
import { AnimatedChatItem } from "./_components/animated-chat-item";

import CreateGroupDialog from "./[chatId]/_components/dialogs/create-group-dialog";
import { useChat } from "@/hooks/use-chat";
import { useIsMobile } from "@/hooks/use-mobile";
import { motion } from "framer-motion";

type Props = {
	children: React.ReactNode;
};

const ChatLayout = ({ children }: Props) => {
	const chats = useQuery(api.chats.get);
	const { isActive } = useChat();
	const isMobile = useIsMobile();

	const renderChat = () =>
		chats?.length === 0 ? (
			<motion.p
				className="w-full h-full flex items-center justify-center"
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ delay: 0.3 }}
			>
				No chats found
			</motion.p>
		) : (
			chats?.map((chat, index) => (
				<AnimatedChatItem
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

	// For mobile: show either the chat list or the active chat, not both
	if (isMobile) {
		return (
			<div className="h-full w-full overflow-hidden flex flex-col">
				{isActive ? (
					children
				) : (
					<div className="flex flex-col h-full w-full">
						<motion.div
							className="flex flex-row justify-between items-center p-4 border-b"
							initial={{ opacity: 0, y: -20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.3 }}
						>
							<h1 className="text-xl font-semibold">Chats</h1>
							<CreateGroupDialog />
						</motion.div>
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
				<motion.div
					className="flex flex-row justify-between items-center p-4 border-b"
					initial={{ opacity: 0, y: -20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.3 }}
				>
					<h1 className="text-xl font-semibold">Chats</h1>
					<CreateGroupDialog />
				</motion.div>
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
