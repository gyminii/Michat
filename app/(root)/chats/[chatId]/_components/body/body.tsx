"use client";

import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useChat } from "@/hooks/use-chat";
import { useQuery } from "convex/react";
import React, { useEffect } from "react";
import Message from "./message";
import { useMutationState } from "@/hooks/use-mutation-state";
import {
	Tooltip,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { TooltipContent } from "@radix-ui/react-tooltip";
type Props = {
	members: {
		_id?: Id<"users">;
		lastSeenMessageId?: Id<"messages">;
		username?: string;
		[key: string]: unknown;
	}[];
	// callType: "audio" | "video" | null;
	// setCallType: Dispatch<SetStateAction<"audio" | "video" | null>>;
};
const Body = ({ members }: Props) => {
	const { chatId } = useChat();
	const messages = useQuery(api.messages.get, {
		id: chatId as Id<"chats">,
	});
	const { mutate: markRead } = useMutationState(api.chat.markRead);

	useEffect(() => {
		if (messages && messages.length > 0) {
			// because we are using flex-col-reverse, the last message is at the top
			// so we need to mark the first message as read
			// if the last message is not from the current user
			markRead({
				chatId,
				messageId: messages[0].message._id,
			});
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [messages?.length, chatId, markRead]);

	const formatSeenBy = (names: string[]) => {
		switch (names.length) {
			case 1:
				return (
					<p className="text-muted-foreground text-sm text-right italic">{`Seen by ${names[0]}`}</p>
				);
			case 2:
				return (
					<p className="text-muted-foreground text-sm text-right italic">{`Seen by ${names[0]} and ${names[1]}`}</p>
				);
			default:
				return (
					<TooltipProvider>
						<Tooltip>
							<TooltipTrigger>
								<p className="text-muted-foreground text-sm text-right">{`Seen by ${
									names[0]
								}, ${names[1]}, and ${names.length - 2} more`}</p>
							</TooltipTrigger>
							<TooltipContent>
								<ul>
									{names.map((name, index) => {
										return <li key={index}>{name}</li>;
									})}
								</ul>
							</TooltipContent>
						</Tooltip>
					</TooltipProvider>
				);
		}
	};

	const getSeenMessage = (messageId: Id<"messages">, senderId: Id<"users">) => {
		const seenUsers = members
			.filter(
				(member) =>
					member.lastSeenMessageId === messageId && member._id !== senderId
			)
			.map((user) => user.username!.split(" ")[0]);

		if (seenUsers.length === 0) return undefined;

		return formatSeenBy(seenUsers);
	};
	return (
		<div className="flex-1 w-full flex overflow-y-scroll flex-col-reverse gap-2 p-3 no-scrollbar h-full">
			{messages?.map(
				({ message, senderImage, senderName, isCurrentUser }, index) => {
					const lastByUser =
						messages[index - 1]?.message.senderId ===
						messages[index].message.senderId;
					const seenMessage = getSeenMessage(message._id, message.senderId);
					return (
						<Message
							key={message._id}
							fromCurrentUser={isCurrentUser}
							senderImage={senderImage}
							senderName={senderName}
							lastByUser={lastByUser}
							content={message.content}
							createdAt={message._creationTime}
							type={message.type}
							seen={seenMessage}
						/>
					);
				}
			)}
		</div>
	);
};

export default Body;
