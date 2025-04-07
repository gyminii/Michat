import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Id } from "@/convex/_generated/dataModel";
import { User } from "lucide-react";
import Link from "next/link";
import React from "react";

type Props = {
	id: Id<"chats">;
	imageUrl: string;
	username: string;
	lastMessageSender?: string;
	lastMessageContent?: string;
	unseenCount: number;
};

const DMChatItem = ({
	id,
	imageUrl,
	username,
	lastMessageContent,
	lastMessageSender,
	unseenCount,
}: Props) => {
	return (
		<Link href={`/chats/${id}`} className="w-full">
			<Card className="p-2 flex flex-row items-center justify-between">
				<div className="flex flex-row items-center justify-between">
					<Avatar className="flex mr-3 rounded-md">
						<AvatarImage src={imageUrl} />
						<AvatarFallback className="p-4 flex mr-3 rounded-md">
							<User />
						</AvatarFallback>
					</Avatar>
					<div className="flex flex-col truncate">
						<h5 className="truncate">{username}</h5>
						{lastMessageSender && lastMessageContent ? (
							<span className="text-xs text-muted-foreground flex truncate overflow-ellipsis">
								<p className="font-semibold">
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
				{unseenCount ? <Badge>{unseenCount}</Badge> : null}
			</Card>
		</Link>
	);
};

export default DMChatItem;
