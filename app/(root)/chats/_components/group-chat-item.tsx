import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Id } from "@/convex/_generated/dataModel";
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
		<Link href={`/chats/${id}`} className="w-full">
			<Card className="p-2 flex flex-row items-center justify-between">
				<div className="flex flex-row items-center justify-between">
					<Avatar className="flex mr-3 rounded-md">
						<AvatarFallback className="p-4 flex mr-3 rounded-md">
							{name.charAt(0).toLocaleUpperCase()}
						</AvatarFallback>
					</Avatar>
					<div className="flex flex-col truncate">
						<h4 className="truncate flex-nowrap">{name}</h4>
						{lastMessageSender && lastMessageContent ? (
							<span className="text-sm text-muted-foreground flex overflow-hidden whitespace-nowrap w-full">
								<span className="font-semibold mr-1">
									{lastMessageSender}
									{":"}&nbsp;
								</span>
								<span className="truncate max-w-[150px] italic">
									{lastMessageContent}
								</span>
							</span>
						) : (
							<p className="text-sm text-muted-foreground truncate">
								Start the conversation!
							</p>
						)}
					</div>
				</div>
				{unseenCount ? <Badge>{unseenCount}</Badge> : null}
			</Card>
		</Link>
	);
};

export default GroupChatItem;
