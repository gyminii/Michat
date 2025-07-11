"use client";

import { NavigationTabs } from "@/components/navigation-tabs";
import { ThemeToggleButton } from "@/components/theme-toggle-button";
import {
	ResizableHandle,
	ResizablePanel,
	ResizablePanelGroup,
} from "@/components/ui/resizable";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageCircle } from "lucide-react";
import { usePathname } from "next/navigation";
import type React from "react";
// import { ChatsSidebar } from "./chats-sidebar"
// import { FriendsSidebar } from "./friends-sidebar"

type Props = {
	children: React.ReactNode;
};

export function ResizableLayout({ children }: Props) {
	const pathname = usePathname();

	// Determine sidebar content based on route
	const getSidebarContent = () => {
		if (pathname.startsWith("/chats")) {
			return null; // <ChatsSidebar />
		}
		if (pathname.startsWith("/friends")) {
			return null; // <FriendsSidebar />
		}
		return null;
	};

	const getSidebarTitle = () => {
		if (pathname.startsWith("/chats")) return "Recent Chats";
		if (pathname.startsWith("/friends")) return "Friends";
		return "Dashboard";
	};

	return (
		<div className="h-full w-full bg-white dark:bg-gray-900 rounded-xl shadow-lg overflow-hidden">
			<ResizablePanelGroup direction="horizontal" className="h-full w-full">
				<ResizablePanel
					defaultSize={30}
					minSize={20}
					maxSize={40}
					className="flex flex-col border-r border-gray-200 dark:border-gray-700"
				>
					{/* Header */}
					<div className="h-15 flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
						<div className="flex items-center gap-2">
							<div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
								<MessageCircle className="w-4 h-4 text-white" />
							</div>
							<span className="font-semibold text-gray-900 dark:text-gray-100">
								Michat
							</span>
						</div>
						<ThemeToggleButton />
					</div>
					<NavigationTabs />
					{/* Sidebar Content */}
					<div className="flex-1 overflow-hidden flex flex-col">
						<div className="flex items-center justify-between p-4 border-b border-gray-100 dark:border-gray-800">
							<h2 className="font-medium text-gray-900 dark:text-gray-100">
								{getSidebarTitle()}
							</h2>
						</div>
						<ScrollArea className="flex-1 p-2">
							{getSidebarContent()}
						</ScrollArea>
					</div>
				</ResizablePanel>
				<ResizableHandle withHandle />
				<ResizablePanel defaultSize={70} className="flex flex-col">
					{children}
				</ResizablePanel>
			</ResizablePanelGroup>
		</div>
	);
}
