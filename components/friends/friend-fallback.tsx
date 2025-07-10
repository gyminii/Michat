import Image from "next/image";
import { Card } from "../ui/card";

const FriendFallback = () => {
	return (
		<div className="h-full w-full flex flex-col">
			<Card className="w-full h-full flex flex-col items-center justify-center bg-secondary dark:bg-gray-800 text-secondary-foreground dark:text-gray-200 border-0 shadow-none">
				<Image
					src="/logo.svg"
					alt="logo"
					width={100}
					height={100}
					priority
					className="animate-pulse duration-800"
				/>
				<div className="mt-4 text-center">
					<p className="text-lg font-medium">Connect with Friends</p>
					<p className="text-sm text-muted-foreground dark:text-gray-400 mt-1">
						Send friend requests to start chatting
					</p>
				</div>
			</Card>
		</div>
	);
};

export default FriendFallback;
