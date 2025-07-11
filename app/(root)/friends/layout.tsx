"use client";

import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import type React from "react";
import AddFriendDialog from "./_components/add-friend-dialog";
import Request from "./_components/request";

import { SidebarLayout } from "@/components/app-sidebar";
import { useIsMobile } from "@/hooks/use-mobile";
import FriendItem from "./_components/friend-item";
import { UserPlus, Users } from "lucide-react";

type Props = {
	children: React.ReactNode;
};

const FriendsLayout = ({ children }: Props) => {
	const requests = useQuery(api.requests.get);
	const friends = useQuery(api.friends.get);
	const isMobile = useIsMobile();
	const sidebarContent = (
		<div className="space-y-4">
			{requests && requests.length > 0 && (
				<div>
					<div className="flex items-center gap-2 mb-2 px-3">
						<UserPlus className="h-4 w-4 text-orange-500" />
						<h3 className="text-sm font-medium text-gray-900 dark:text-gray-100">
							Friend Requests ({requests.length})
						</h3>
					</div>
					<div className="space-y-1">
						{requests.map((request) => (
							<Request
								key={request.request._id}
								id={request.request._id}
								imageUrl={request.sender.imageUrl}
								username={request.sender.username}
								email={request.sender.email}
							/>
						))}
					</div>
				</div>
			)}

			{friends && friends.length > 0 && (
				<div>
					<div className="flex items-center gap-2 mb-2 px-3">
						<Users className="h-4 w-4 text-blue-500" />
						<h3 className="text-sm font-medium text-gray-900 dark:text-gray-100">
							Friends ({friends.length})
						</h3>
					</div>
					<div className="space-y-1">
						{friends.map((friend) => (
							<FriendItem
								key={friend._id}
								id={friend._id}
								imageUrl={friend.imageUrl}
								username={friend.username}
								email={friend.email}
							/>
						))}
					</div>
				</div>
			)}
		</div>
	);

	if (isMobile) {
		return (
			<div className="flex flex-col h-full">
				<div className="flex-1 overflow-hidden">{children}</div>
			</div>
		);
	}

	return (
		<SidebarLayout
			sidebarContent={sidebarContent}
			// sidebarTitle={`Friends ${friends ? `(${friends.length})` : ""}`}
			sidebarAction={<AddFriendDialog />}
			showOnMobile={true}
		>
			{children}
		</SidebarLayout>
	);
};

export default FriendsLayout;
