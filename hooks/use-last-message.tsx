import { useMemo } from "react";
type Message = {
	_creationTime: number;
	_id: string;
	chatId: string;
	content: string[];
	senderId: string;
	type: "text" | "image" | "file";
};
type MessageWrapper = {
	isCurrentUser: boolean;
	message: Message;
	senderImage: string;
	senderName: string;
};

export const useLatestMessage = (
	messages: MessageWrapper[] | undefined
): MessageWrapper | null => {
	return useMemo(() => {
		if (!messages || messages.length === 0) return null;
		return messages.reduce((latest, current) => {
			return current.message._creationTime > latest.message._creationTime
				? current
				: latest;
		}, messages[0]);
	}, [messages]);
};
