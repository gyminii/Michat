"use client";
import FriendFallback from "@/components/friends/friend-fallback";
import {
	ResizableHandle,
	ResizablePanel,
	ResizablePanelGroup,
} from "@/components/ui/resizable";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { Loader2 } from "lucide-react";
import AddFriendDialog from "./_components/add-friend-dialog";
import Request from "./_components/request";

const Friends = () => {
	const requests = useQuery(api.requests.get);
	const friends = useQuery(api.friends.get);
	const renderRequest = () =>
		requests ? (
			requests.length === 0 ? (
				<p className="w-full h-full flex items-center justify-center">
					No Friend Request found :(
				</p>
			) : (
				requests.map((request) => (
					<Request
						key={request.request._id}
						id={request.request._id}
						imageUrl={request.sender.imageUrl}
						username={request.sender.username}
						email={request.sender.email}
					/>
				))
			)
		) : (
			<Loader2 className="h-8 w-8" />
		);
	return (
		<ResizablePanelGroup
			id="friend-main-panel"
			direction="horizontal"
			className="rounded-lg border md:min-w-[450px]"
		>
			<ResizablePanel className="flex flex-col gap-2 p-2">
				<div className="flex flex-row justify-between items-center">
					<h1>
						Friends <span className="text-bold">{friends?.length}</span>
					</h1>
					<AddFriendDialog />
				</div>

				{renderRequest()}
			</ResizablePanel>
			<ResizableHandle withHandle />
			<ResizablePanel defaultSize={50} className="flex flex-col">
				<FriendFallback />
			</ResizablePanel>
		</ResizablePanelGroup>
	);
};

export default Friends;
