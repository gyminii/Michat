"use client";

import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import type React from "react";
import { Loader2 } from "lucide-react";
import AddFriendDialog from "./_components/add-friend-dialog";
import Request from "./_components/request";
import { SidebarLayout } from "@/components/app-sidebar";

type Props = {
	children: React.ReactNode;
};

const FriendsLayout = ({ children }: Props) => {
	const requests = useQuery(api.requests.get);
	const friends = useQuery(api.friends.get);

	const sidebarContent =
		requests === undefined ? (
			<div className="flex items-center justify-center h-32">
				<Loader2 className="h-6 w-6 animate-spin text-gray-500 dark:text-gray-400" />
			</div>
		) : requests.length === 0 ? (
			<div className="flex items-center justify-center h-32 text-gray-500 dark:text-gray-400">
				<p>No friend requests found</p>
			</div>
		) : (
			<div className="space-y-2">
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
		);

	return (
		<SidebarLayout
			sidebarContent={sidebarContent}
			sidebarTitle={`Friends ${friends ? `(${friends.length})` : ""}`}
			sidebarAction={<AddFriendDialog />}
		>
			{children}
		</SidebarLayout>
	);
};

export default FriendsLayout;
