"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import type { Id } from "@/convex/_generated/dataModel";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

type Props = {
	id: Id<"chats">;
	imageUrl: string;
	username: string;
	lastMessageSender?: string;
	lastMessageContent?: string;
	unseenCount: number;
};

export const DMChatItem = ({
	id,
	imageUrl,
	username,
	lastMessageContent,
	lastMessageSender,
	unseenCount,
}: Props) => {
	const pathname = usePathname();
	const isSelected = pathname === `/chats/${id}`;
	return (
		<Link href={`/chats/${id}`} className="w-full block">
			<Card
				className={cn(
					"p-4 flex flex-row items-center justify-between transition-all duration-300 border rounded-2xl group relative overflow-hidden backdrop-blur-sm",
					isSelected
						? "bg-gradient-to-r from-primary/15 to-primary/10 border-primary/30 shadow-lg shadow-primary/10"
						: "bg-gradient-to-r from-gray-50/80 to-white/50 dark:from-gray-800/50 dark:to-gray-700/30 border-gray-200/50 dark:border-gray-600/30 hover:from-gray-100/90 hover:to-white/80 dark:hover:from-gray-700/70 dark:hover:to-gray-600/50 hover:border-gray-300/60 dark:hover:border-gray-500/50 hover:shadow-md hover:shadow-gray-200/50 dark:hover:shadow-gray-800/50"
				)}
			>
				{/* Selected indicator with glow effect */}
				{isSelected && (
					<div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-primary via-primary to-primary/70 rounded-r-full shadow-sm shadow-primary/50" />
				)}

				{/* Subtle pattern overlay for unselected items */}
				{!isSelected && (
					<div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-gray-100/10 dark:from-transparent dark:via-gray-700/5 dark:to-gray-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
				)}

				<div className="flex flex-row items-center gap-4 flex-1 min-w-0 relative z-10">
					<div className="relative">
						<Avatar
							className={cn(
								"flex rounded-full shrink-0 h-12 w-12 border-2 transition-all duration-300 ring-0",
								isSelected
									? "border-primary/40 shadow-lg shadow-primary/20 ring-2 ring-primary/20"
									: "border-gray-200/80 dark:border-gray-600/50 shadow-md shadow-gray-200/30 dark:shadow-gray-800/30 group-hover:border-primary/30 group-hover:shadow-lg group-hover:shadow-primary/10 group-hover:ring-1 group-hover:ring-primary/10"
							)}
						>
							<AvatarImage
								src={imageUrl || "/placeholder.svg"}
								className="object-cover"
							/>
							<AvatarFallback
								className={cn(
									"font-semibold text-sm transition-all duration-300",
									isSelected
										? "bg-primary/20 text-primary"
										: "bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 text-gray-700 dark:text-gray-200 group-hover:from-primary/10 group-hover:to-primary/5 group-hover:text-primary"
								)}
							>
								{username.charAt(0).toUpperCase()}
							</AvatarFallback>
						</Avatar>

						{/* Enhanced online indicator */}
						<div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-green-500 border-2 border-white dark:border-gray-800 rounded-full shadow-sm">
							<div className="w-full h-full bg-green-400 rounded-full animate-pulse" />
						</div>
					</div>

					<div className="flex flex-col truncate flex-1">
						<div className="flex items-center gap-2 mb-1">
							<h5
								className={cn(
									"truncate font-semibold text-sm transition-colors duration-300",
									isSelected
										? "text-foreground"
										: "text-gray-900 dark:text-gray-100 group-hover:text-foreground"
								)}
							>
								{username}
							</h5>
							<span
								className={cn(
									"text-xs shrink-0 transition-colors duration-300",
									isSelected
										? "text-primary/70"
										: "text-gray-500 dark:text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300"
								)}
							>
								2:30 PM
							</span>
						</div>

						{lastMessageSender && lastMessageContent ? (
							<div
								className={cn(
									"flex items-center gap-1 text-xs truncate transition-colors duration-300",
									isSelected
										? "text-primary/60"
										: "text-gray-600 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300"
								)}
							>
								<span className="font-medium shrink-0">
									{lastMessageSender === username ? "" : "You: "}
								</span>
								<span className="truncate">{lastMessageContent}</span>
							</div>
						) : (
							<p
								className={cn(
									"text-xs truncate transition-colors duration-300",
									isSelected
										? "text-primary/60"
										: "text-gray-500 dark:text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300"
								)}
							>
								Start the conversation!
							</p>
						)}
					</div>
				</div>

				<div className="flex flex-col items-end gap-2 ml-3 relative z-10">
					{unseenCount > 0 && (
						<Badge
							className={cn(
								"shrink-0 h-5 min-w-5 flex items-center justify-center text-xs font-bold transition-all duration-300 shadow-sm",
								isSelected
									? "bg-primary text-primary-foreground shadow-primary/30"
									: "bg-gradient-to-r from-primary to-primary/90 text-primary-foreground group-hover:scale-105 group-hover:shadow-md group-hover:shadow-primary/30"
							)}
						>
							{unseenCount > 99 ? "99+" : unseenCount}
						</Badge>
					)}

					{/* Enhanced status indicators */}
					<div className="flex items-center gap-1">
						<div
							className={cn(
								"w-2 h-2 rounded-full transition-all duration-300",
								isSelected
									? "bg-primary shadow-sm shadow-primary/50"
									: "bg-blue-500 group-hover:bg-primary"
							)}
						/>
					</div>
				</div>
			</Card>
		</Link>
	);
};

export default DMChatItem;
