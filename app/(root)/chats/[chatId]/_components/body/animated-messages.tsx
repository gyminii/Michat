"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { motion } from "framer-motion";
import type React from "react";
import FilePreview from "./file-preview";
import ImagePreview from "./image-preview";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import MessageReactions from "./message-reactions";

type Props = {
	fromCurrentUser: boolean;
	senderImage: string;
	senderName: string;
	lastByUser: boolean;
	content: string[];
	createdAt: number;
	type: string;
	seen?: React.ReactNode;
	isNew?: boolean;
	messageId: string;
};

const AnimatedMessage = ({
	fromCurrentUser,
	senderImage,
	senderName,
	lastByUser,
	content,
	createdAt,
	type,
	seen,
	isNew = false,
	messageId,
}: Props) => {
	const formatTime = (timestamp: number) => format(timestamp, "HH:mm");
	const [showReactions, setShowReactions] = useState(false);

	// Animation variants
	const messageVariants = {
		initial: {
			opacity: 0,
			y: 20,
			scale: 0.95,
		},
		animate: {
			opacity: 1,
			y: 0,
			scale: 1,
			transition: {
				type: "spring",
				stiffness: 260,
				damping: 20,
				duration: 0.3,
			},
		},
		hover: {
			scale: 1.01,
			transition: { duration: 0.2 },
		},
	};

	return (
		<motion.div
			className={cn("flex items-end gap-2 group transition-all", {
				"justify-end": fromCurrentUser,
			})}
			initial={isNew ? "initial" : false}
			animate="animate"
			whileHover="hover"
			variants={messageVariants}
			onHoverStart={() => setShowReactions(true)}
			onHoverEnd={() => setShowReactions(false)}
			layout
		>
			<Avatar
				className={cn("relative w-8 h-8 shrink-0 transition-opacity", {
					"order-2": fromCurrentUser,
					"order-1": !fromCurrentUser,
					"opacity-0 group-hover:opacity-100": lastByUser,
				})}
			>
				<AvatarImage src={senderImage || "/placeholder.svg"} />
				<AvatarFallback>{senderName.substring(0, 1)}</AvatarFallback>
			</Avatar>

			<div
				className={cn("flex flex-col max-w-[75%]", {
					"order-1 items-end": fromCurrentUser,
					"order-2 items-start": !fromCurrentUser,
				})}
			>
				{!lastByUser && !fromCurrentUser && (
					<motion.span
						className="text-xs text-muted-foreground ml-1 mb-1"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ delay: 0.2 }}
					>
						{senderName}
					</motion.span>
				)}

				<motion.div
					className={cn(
						"px-4 py-2 rounded-2xl shadow-sm transition-all relative",
						{
							"bg-primary text-primary-foreground": fromCurrentUser,
							"bg-secondary text-secondary-foreground": !fromCurrentUser,
							"rounded-br-md": !lastByUser && fromCurrentUser,
							"rounded-bl-md": !lastByUser && !fromCurrentUser,
						}
					)}
					whileHover={{ boxShadow: "0 5px 15px rgba(0,0,0,0.1)" }}
				>
					{type === "text" ? (
						<p className="text-wrap break-words whitespace-pre-wrap">
							{content}
						</p>
					) : null}
					{type === "image" ? <ImagePreview urls={content} /> : null}
					{type === "file" ? <FilePreview url={content[0]} /> : null}
					{type === "call" ? (
						<Badge
							variant="default"
							className={cn(
								"bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100",
								"font-medium"
							)}
						>
							Joined Call
						</Badge>
					) : null}
					<p
						className={cn("text-xs flex w-full mt-1 italic opacity-70", {
							"justify-end": fromCurrentUser,
							"justify-start": !fromCurrentUser,
						})}
					>
						{formatTime(createdAt)}
					</p>

					{showReactions && (
						<MessageReactions
							messageId={messageId}
							fromCurrentUser={fromCurrentUser}
						/>
					)}
				</motion.div>
				{seen && <div className="mt-1">{seen}</div>}
			</div>
		</motion.div>
	);
};

export default AnimatedMessage;
