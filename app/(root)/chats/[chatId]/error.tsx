"use client";

import ChatFallback from "@/components/chats/chat-fallback";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Error({ error }: { error: Error }) {
	const router = useRouter();

	useEffect(() => {
		router.push("/chats");
	}, [error, router]);

	return <ChatFallback />;
}
