"use client";

import { useParams, useRouter } from "next/navigation";
import { useMemo } from "react";

export const useChat = () => {
	const params = useParams();
	const router = useRouter();
	const chatId = useMemo(() => {
		const value = params?.chatId;
		return (Array.isArray(value) ? value[0] : value) ?? "";
	}, [params?.chatId]);
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
