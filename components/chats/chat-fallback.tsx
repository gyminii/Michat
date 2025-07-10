import Image from "next/image";
import { Card } from "../ui/card";

const ChatFallback = () => {
	return (
		<div className="h-full w-full flex flex-col">
			<Card className="w-full h-full flex flex-col items-center justify-center bg-secondary text-secondary-foreground">
				<Image
					src="/logo.svg"
					alt="logo"
					width={100}
					height={100}
					priority
					className="animate-pulse duration-800"
				/>
				<p className="mt-4">Gotta lock in and socialize</p>
			</Card>
		</div>
	);
};

export default ChatFallback;
