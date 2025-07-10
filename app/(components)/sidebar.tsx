"use client";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

import { MessageCircle, Plus, Settings, Users } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
const Sidebar = () => {
	const pathname = usePathname();
	const isChatsTab = pathname === "/chats";
	const isFriendsTab = pathname === "/friends";
	// const displayData = isChatsTab ? friends : allUsers;
	return (
		<div className="w-80 bg-white border-r border-gray-200 flex flex-col">
			{/* Header */}
			<div className="p-4 border-b border-gray-200">
				<div className="flex items-center justify-between mb-4">
					<div className="flex items-center space-x-2">
						<div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
							<MessageCircle className="w-5 h-5 text-white" />
						</div>
						<h1 className="text-xl font-semibold text-gray-900">Michot</h1>
					</div>
					<Button variant="ghost" size="sm">
						<Settings className="w-4 h-4" />
					</Button>
				</div>

				{/* Search
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder={isChatsTab ? "Search conversations..." : "Search friends..."}
            className="pl-10 bg-gray-50 border-0"
          />
        </div> */}
			</div>

			{/* Navigation Tabs */}
			<div className="flex border-b border-gray-200">
				<Link href="/chats" className="flex-1">
					<Button
						variant="ghost"
						className={`w-full rounded-none border-b-2 ${
							isChatsTab
								? "border-purple-500 text-purple-600"
								: "border-transparent text-gray-500 hover:text-gray-700"
						}`}
					>
						<MessageCircle className="w-4 h-4 mr-2" />
						Chats
					</Button>
				</Link>
				<Link href="/friends" className="flex-1">
					<Button
						variant="ghost"
						className={`w-full rounded-none border-b-2 ${
							isFriendsTab
								? "border-purple-500 text-purple-600"
								: "border-transparent text-gray-500 hover:text-gray-700"
						}`}
					>
						<Users className="w-4 h-4 mr-2" />
						Friends
					</Button>
				</Link>
			</div>

			{/* List Content */}
			<ScrollArea className="flex-1">
				<div className="p-2">bro</div>
			</ScrollArea>

			{/* Action Button */}
			<div className="p-4 border-t border-gray-200">
				<Button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
					<Plus className="w-4 h-4 mr-2" />
					{isChatsTab ? "New Chat" : "Add Friend"}
				</Button>
			</div>
		</div>
	);
};

export default Sidebar;
