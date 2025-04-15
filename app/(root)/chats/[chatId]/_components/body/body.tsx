"use client";

import {
	Tooltip,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useChat } from "@/hooks/use-chat";
import { useMutationState } from "@/hooks/use-mutation-state";
import { TooltipContent } from "@radix-ui/react-tooltip";
import { useQuery } from "convex/react";
import { Dispatch, SetStateAction, useEffect, useRef } from "react";
import CallRoom from "./call-room";
import Message from "./message";
type Props = {
	members: {
		_id?: Id<"users">;
		lastSeenMessageId?: Id<"messages">;
		username?: string;
		[key: string]: unknown;
	}[];
	callType: "audio" | "video" | null;
	setCallType: Dispatch<SetStateAction<"audio" | "video" | null>>;
};
const Body = ({ members, callType, setCallType }: Props) => {
	const { chatId } = useChat();
	const messages = useQuery(api.messages.get, {
		id: chatId as Id<"chats">,
	});

	const { mutate: markRead } = useMutationState(api.chat.markRead);
	const lastMarkedIdRef = useRef<string | null>(null);

	useEffect(() => {
		if (!messages || messages.length === 0) return;

		const first = messages[0];

		if (!first.isCurrentUser && first.message._id !== lastMarkedIdRef.current) {
			markRead({
				chatId,
				messageId: first.message._id,
			});
			lastMarkedIdRef.current = first.message._id;
		}
	}, [messages, chatId, markRead]);

	const formatSeenBy = (names: string[]) => {
		switch (names.length) {
			case 1:
				return (
					<p className="mt-1 text-muted-foreground text-[10px] text-right italic">{`Seen by ${names[0]}`}</p>
				);
			case 2:
				return (
					<p className="mt-1 text-muted-foreground text-xs text-right italic">{`Seen by ${names[0]} and ${names[1]}`}</p>
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
		<div className="flex-1 w-full flex overflow-y-scroll flex-col-reverse gap-2 p-3 no-scrollbar h-dvh">
			{!callType ? (
				messages?.map(
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
				)
			) : (
				<CallRoom
					audio={callType === "audio" || callType === "video"}
					video={callType === "video"}
					handleDisconnect={() => setCallType(null)}
				/>
			)}
		</div>
	);
};

export default Body;
