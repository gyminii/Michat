import React from "react";
import { Card } from "../ui/card";
import { ResizablePanel } from "../ui/resizable";
import { HeartCrack } from "lucide-react";

const ChatFallback = () => {
	return (
		<ResizablePanel className="hidden md:flex flex-col gap-2 p-2">
			<Card className="hidden w-full h-full md:flex p-2 items-center justify-center bg-secondary text-secondary-foreground">
				{/* Select/start a conversation to get started */}
				<HeartCrack />
				<p>Gotta lock in and socialize</p>
			</Card>
		</ResizablePanel>
	);
};

export default ChatFallback;
