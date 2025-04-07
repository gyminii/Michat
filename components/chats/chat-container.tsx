import React from "react";
import { Card } from "../ui/card";
type Props = { children: React.ReactNode };
const ChatContainer = ({ children }: Props) => {
	return (
		<Card className="w-full h-[calc(100svh-32px)] lg:h-full p-2 flex flex-col gap-2">
			{children}
		</Card>
	);
};

export default ChatContainer;
