"use client";

import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { Loader2, UserPlus, Users } from "lucide-react";
import type React from "react";
import AddFriendDialog from "./_components/add-friend-dialog";
import Request from "./_components/request";

import { SidebarLayout } from "@/components/app-sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";

type Props = {
	children: React.ReactNode;
};

const FriendsLayout = ({ children }: Props) => {
	const requests = useQuery(api.requests.get);
	const friends = useQuery(api.friends.get);

	const sidebarContent =
		requests === undefined || friends === undefined ? (
			<div className="flex items-center justify-center h-32">
				<Loader2 className="h-6 w-6 animate-spin text-gray-500 dark:text-gray-400" />
			</div>
		) : (
			<div className="space-y-4">
				{/* Friend Requests Section */}
				{requests.length > 0 && (
					<div>
						<div className="flex items-center gap-2 px-2 py-1 mb-2">
							<UserPlus className="h-4 w-4 text-gray-500 dark:text-gray-400" />
							<span className="text-sm font-medium text-gray-700 dark:text-gray-300">
								Friend Requests ({requests.length})
							</span>
						</div>
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
						<Separator className="my-4" />
					</div>
				)}

				{/* Friends Section */}
				<div>
					<div className="flex items-center gap-2 px-2 py-1 mb-2">
						<Users className="h-4 w-4 text-gray-500 dark:text-gray-400" />
						<span className="text-sm font-medium text-gray-700 dark:text-gray-300">
							Friends ({friends.length})
						</span>
					</div>
					{friends.length === 0 ? (
						<div className="flex items-center justify-center h-20 text-gray-500 dark:text-gray-400">
							<p className="text-sm">No friends yet</p>
						</div>
					) : (
						<div className="space-y-2">
							{friends.map((friend) => (
								<div
									key={friend._id}
									className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer transition-colors"
								>
									<Avatar className="h-10 w-10">
										<AvatarImage
											src={friend.imageUrl || "/placeholder.svg"}
											alt={friend.username}
										/>
										<AvatarFallback className="bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-300">
											{friend.username?.charAt(0).toUpperCase()}
										</AvatarFallback>
									</Avatar>
									<div className="flex-1 min-w-0">
										<p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
											{friend.username}
										</p>
										<p className="text-xs text-gray-500 dark:text-gray-400 truncate">
											{friend.email}
										</p>
									</div>
									<div className="w-2 h-2 bg-green-500 rounded-full"></div>
								</div>
							))}
						</div>
					)}
				</div>

				{requests.length === 0 && friends.length === 0 && (
					<div className="flex flex-col items-center justify-center h-32 text-gray-500 dark:text-gray-400">
						<Users className="h-8 w-8 mb-2" />
						<p className="text-sm text-center">No friends or requests</p>
						<p className="text-xs text-center mt-1">
							Add friends to start chatting
						</p>
					</div>
				)}
			</div>
		);

	return (
		<SidebarLayout
			sidebarContent={sidebarContent}
			sidebarTitle={`Friends ${friends ? `(${friends.length})` : ""}`}
			sidebarAction={<AddFriendDialog />}
			showOnMobile={true}
		>
			{children}
		</SidebarLayout>
	);
};

export default FriendsLayout;
