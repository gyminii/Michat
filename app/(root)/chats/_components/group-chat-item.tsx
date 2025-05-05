import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import type { Id } from "@/convex/_generated/dataModel";
import Link from "next/link";

type Props = {
	id: Id<"chats">;
	name: string;
	lastMessageSender?: string;
	lastMessageContent?: string;
	unseenCount: number;
};

const GroupChatItem = ({
	id,
	name,
	lastMessageContent,
	lastMessageSender,
	unseenCount,
}: Props) => {
	return (
		<Link href={`/chats/${id}`} className="w-full block">
			<Card className="p-3 flex flex-row items-center justify-between hover:bg-accent/50 transition-all border-0 shadow-none rounded-lg">
				<div className="flex flex-row items-center gap-3 flex-1 min-w-0">
					<Avatar className="flex rounded-full shrink-0 h-12 w-12 border-2 border-background shadow-sm">
						<AvatarFallback className="bg-secondary/20 text-secondary-foreground">
							{name.charAt(0).toUpperCase()}
						</AvatarFallback>
					</Avatar>
					<div className="flex flex-col truncate">
						<h4 className="truncate font-medium">{name}</h4>
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

export default GroupChatItem;
