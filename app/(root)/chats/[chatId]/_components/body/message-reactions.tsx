"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { cn } from "@/lib/utils";

type Reaction = "👍" | "❤️" | "😂" | "😮" | "😢" | "🔥";

type Props = {
	messageId: string;
	fromCurrentUser: boolean;
};

const reactions: Reaction[] = ["👍", "❤️", "😂", "😮", "😢", "🔥"];

const MessageReactions = ({ messageId, fromCurrentUser }: Props) => {
	const [selectedReaction, setSelectedReaction] = useState<Reaction | null>(
		null
	);

	const handleReaction = (reaction: Reaction) => {
		setSelectedReaction(reaction);
		// Here you would typically call a mutation to save the reaction
		// For now we'll just update the UI
	};

	return (
		<motion.div
			className={cn(
				"absolute -bottom-10 bg-background rounded-full p-1 shadow-md flex gap-1 z-10",
				fromCurrentUser ? "right-0" : "left-0"
			)}
			initial={{ opacity: 0, y: 10, scale: 0.8 }}
			animate={{ opacity: 1, y: 0, scale: 1 }}
			exit={{ opacity: 0, y: 10, scale: 0.8 }}
		>
			{reactions.map((reaction) => (
				<motion.button
					key={reaction}
					className={cn(
						"hover:bg-muted rounded-full w-8 h-8 flex items-center justify-center text-lg transition-all",
						selectedReaction === reaction && "bg-primary/20"
					)}
					whileHover={{ scale: 1.2 }}
					whileTap={{ scale: 0.9 }}
					onClick={() => handleReaction(reaction)}
				>
					{reaction}
				</motion.button>
			))}
		</motion.div>
	);
};

export default MessageReactions;
