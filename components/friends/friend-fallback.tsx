import Image from "next/image";
import { Card } from "../ui/card";
import { ResizablePanel } from "../ui/resizable";

const FriendFallback = () => {
	return (
		<ResizablePanel className="hidden md:flex flex-col gap-2 p-2">
			<Card className="hidden w-full h-full md:flex p-2 items-center justify-center bg-secondary text-secondary-foreground">
				{/* Select/start a conversation to get started */}
				<Image
					src="/logo.svg"
					alt="logo"
					width={100}
					height={100}
					priority
					className="animate-pulse duration-800"
				/>
				<p>Got no friends</p>
				<p>Gotta lock in and socialize :(</p>
			</Card>
		</ResizablePanel>
	);
};

export default FriendFallback;
