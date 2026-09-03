"use client";
import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import type { Id } from "@/convex/_generated/dataModel";
import { useChat } from "@/hooks/use-chat";
import { useMutationState } from "@/hooks/use-mutation-state";
import { Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { LiveKitRoom, VideoConference } from "@livekit/components-react";
import "@livekit/components-styles";

type Props = {
	video: boolean;
	audio: boolean;
	handleDisconnect: () => void;
};

const CallRoom = ({ audio, video, handleDisconnect }: Props) => {
	const [token, setToken] = useState("");

	const { chatId } = useChat();

	const { mutate: createMessage } = useMutationState(api.message.create);
	useEffect(() => {
		(async () => {
			try {
				const res = await fetch(`/api/livekit?room=${chatId}`);
				if (!res.ok) throw new Error("Could not get a call token");
				const data = await res.json();

				setToken(data.token);
			} catch (error) {
				console.log(error);
				toast.error("Could not join the call");
			}
		})();
	}, [chatId]);

	if (token === "") {
		return (
			<div className="w-full h-full flex flex-col justify-center items-center">
				<Loader2 className="animate-spin h-16 w-16 text-foreground" />
				<p className="text-sm text-foreground">Joining call...</p>
				<Button
					className="mt-4"
					variant="destructive"
					onClick={handleDisconnect}
				>
					Cancel
				</Button>
			</div>
		);
	}
	return (
		<div className="w-full h-full">
			<LiveKitRoom
				data-lk-theme="default"
				serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_URL}
				token={token}
				connect={true}
				video={video}
				audio={audio}
				onDisconnected={() => handleDisconnect()}
				onConnected={() => {
					createMessage({
						chatId: chatId as Id<"chats">,
						type: "call",
						content: [],
					});
				}}
			>
				<VideoConference />
			</LiveKitRoom>
		</div>
	);
};

export default CallRoom;
