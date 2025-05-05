import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import type { Id } from "@/convex/_generated/dataModel";
import Link from "next/link";

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
	return (
		<Link href={`/chats/${id}`} className="w-full block">
			<Card className="p-3 flex flex-row items-center justify-between hover:bg-accent/50 transition-all border-0 shadow-none rounded-lg">
				<div className="flex flex-row items-center gap-3 flex-1 min-w-0">
					<Avatar className="flex rounded-full shrink-0 h-12 w-12 border-2 border-background shadow-sm">
						<AvatarImage src={imageUrl || "/placeholder.svg"} />
						<AvatarFallback className="bg-primary/10 text-primary">
							{username.charAt(0).toUpperCase()}
						</AvatarFallback>
					</Avatar>
					<div className="flex flex-col truncate">
						<h5 className="truncate font-medium">{username}</h5>
						{lastMessageSender && lastMessageContent ? (
							<span className="text-xs text-muted-foreground flex truncate overflow-ellipsis">
								<p className="font-semibold truncate">
									{lastMessageSender}
									{":"}&nbsp;
								</p>
								<p className="truncate overflow-ellipsis">
									{lastMessageContent}
								</p>
							</span>
						) : (
							<p className="text-sm text-muted-foreground truncate">
								Start the conversation!
							</p>
						)}
					</div>
				</div>
				{unseenCount ? (
					<Badge className="ml-2 shrink-0 bg-primary text-primary-foreground">
						{unseenCount}
					</Badge>
				) : null}
			</Card>
		</Link>
	);
};

export default DMChatItem;
