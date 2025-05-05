import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import type React from "react";
import FilePreview from "./file-preview";
import ImagePreview from "./image-preview";
import { Badge } from "@/components/ui/badge";

type Props = {
	fromCurrentUser: boolean;
	senderImage: string;
	senderName: string;
	lastByUser: boolean;
	content: string[];
	createdAt: number;
	type: string;
	seen?: React.ReactNode;
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
				className={cn("flex flex-col max-w-[75%]", {
					"order-1 items-end": fromCurrentUser,
					"order-2 items-start": !fromCurrentUser,
				})}
			>
				{!lastByUser && !fromCurrentUser && (
					<span className="text-xs text-muted-foreground ml-1 mb-1">
						{senderName}
					</span>
				)}

				<div
					className={cn("px-4 py-2 rounded-2xl shadow-sm transition-all", {
						"bg-primary text-primary-foreground": fromCurrentUser,
						"bg-secondary text-secondary-foreground": !fromCurrentUser,
						"rounded-br-md": !lastByUser && fromCurrentUser,
						"rounded-bl-md": !lastByUser && !fromCurrentUser,
					})}
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
				</div>
				{seen && <div className="mt-1">{seen}</div>}
			</div>
		</div>
	);
};

export default Message;
