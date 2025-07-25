"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { motion } from "framer-motion";
import type React from "react";
import FilePreview from "./file-preview";
import ImagePreview from "./image-preview";

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

const Message = ({
	fromCurrentUser,
	senderImage,
	senderName,
	lastByUser,
	content,
	createdAt,
	type,
	seen,
}: Props) => {
	const formatTime = (timestamp: number) => format(timestamp, "HH:mm");
	return (
		<div
			className={cn("flex items-end gap-2 group transition-all", {
				"justify-end": fromCurrentUser,
			})}
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
				className={cn("flex flex-col max-w-[80%]", {
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
						<p
							className={cn("text-wrap break-words whitespace-pre-wrap", {
								"text-white": fromCurrentUser,
								"text-gray-800 dark:text-gray-200": !fromCurrentUser,
							})}
						>
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
							"justify-end text-white": fromCurrentUser,
							"justify-start text-gray-800 dark:text-gray-200":
								!fromCurrentUser,
						})}
					>
						{formatTime(createdAt)}
					</p>
				</motion.div>
				{seen && <div className="mt-1">{seen}</div>}
			</div>
		</div>
	);
};

export default Message;
