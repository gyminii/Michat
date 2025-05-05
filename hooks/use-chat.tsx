"use client";

import { useParams, useRouter } from "next/navigation";
import { useMemo } from "react";

export const useChat = () => {
	const params = useParams();
	const router = useRouter();
	const chatId = useMemo(
		() => params?.chatId || ("" as string),
		[params?.chatId]
	);
	const isActive = useMemo(() => !!chatId, [chatId]);

	const navigateToChat = (id: string) => {
		router.push(`/chats/${id}`);
	};

	const navigateToChats = () => {
		router.push("/chats");
	};

	return {
		isActive,
		chatId,
		navigateToChat,
		navigateToChats,
	};
};
