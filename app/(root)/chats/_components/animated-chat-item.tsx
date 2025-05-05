"use client";

import { motion } from "framer-motion";
import { DMChatItem } from "./dm-chat-item";
import { GroupChatItem } from "./group-chat-item";
import type { Id } from "@/convex/_generated/dataModel";

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

export const AnimatedChatItem = ({
	id,
	isGroup,
	name,
	imageUrl,
	username,
	lastMessageSender,
	lastMessageContent,
	unseenCount,
	index,
}: Props) => {
	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{
				duration: 0.3,
				delay: index * 0.05,
				type: "spring",
				stiffness: 260,
				damping: 20,
			}}
			whileHover={{
				scale: 1.02,
				transition: { duration: 0.2 },
			}}
			whileTap={{ scale: 0.98 }}
		>
			{isGroup ? (
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
			)}
		</motion.div>
	);
};
