"use client";

import { NavigationTabs } from "@/components/navigation-tabs";
import { Button } from "@/components/ui/button";
import {
	ResizableHandle,
	ResizablePanel,
	ResizablePanelGroup,
} from "@/components/ui/resizable";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useIsMobile } from "@/hooks/use-mobile";
import { MessageCircle, Settings, LogOut, User } from "lucide-react";
import type React from "react";
import { ThemeToggleButton } from "./theme-toggle-button";
import { useUser, useClerk } from "@clerk/nextjs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type Props = {
	children: React.ReactNode;
	sidebarContent: React.ReactNode;
	sidebarTitle?: string;
	sidebarSubtitle?: string;
	sidebarAction?: React.ReactNode;
	showOnMobile?: boolean;
};

export const SidebarLayout = ({
	children,
	sidebarContent,
	sidebarTitle,
	sidebarAction,
	showOnMobile = false,
}: Props) => {
	const isMobile = useIsMobile();
	const { user } = useUser();
	const { signOut } = useClerk();

	const UserSection = () => (
		<div className="p-4 border-t border-gray-200 dark:border-gray-700">
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button
						variant="ghost"
						className="w-full justify-start p-2 h-auto hover:bg-gray-100 dark:hover:bg-gray-800"
					>
						<div className="flex items-center gap-3 w-full">
							<Avatar className="h-8 w-8">
								<AvatarImage
									src={user?.imageUrl || "/placeholder.svg"}
									alt={user?.fullName || "User"}
								/>
								<AvatarFallback className="bg-blue-600 text-white text-sm">
									{user?.fullName?.charAt(0) ||
										user?.emailAddresses[0]?.emailAddress.charAt(0) ||
										"U"}
								</AvatarFallback>
							</Avatar>
							<div className="flex flex-col items-start flex-1 min-w-0">
								<span className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
									{user?.fullName ||
										user?.emailAddresses[0]?.emailAddress.split("@")[0] ||
										"User"}
								</span>
								<span className="text-xs text-gray-500 dark:text-gray-400 truncate">
									{user?.emailAddresses[0]?.emailAddress}
								</span>
							</div>
						</div>
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent align="end" className="w-56">
					<DropdownMenuItem>
						<User className="mr-2 h-4 w-4" />
						Profile
					</DropdownMenuItem>
					<DropdownMenuItem>
						<Settings className="mr-2 h-4 w-4" />
						Settings
					</DropdownMenuItem>
					<DropdownMenuSeparator />
					<DropdownMenuItem
						onClick={() => signOut({ redirectUrl: "/sign-in" })}
						className="text-red-600 dark:text-red-400 focus:text-red-600 dark:focus:text-red-400"
					>
						<LogOut className="mr-2 h-4 w-4" />
						Sign out
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	);

	if (isMobile) {
		if (showOnMobile) {
			return (
				<div className="h-full w-full flex flex-col bg-white dark:bg-gray-900">
					<div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
						<div className="flex items-center gap-2">
							<div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
								<MessageCircle className="w-4 h-4 text-white" />
							</div>
							<span className="font-semibold text-gray-900 dark:text-gray-100">
								Michat
							</span>
						</div>
						<ThemeToggleButton />
					</div>
					<NavigationTabs />
					<div className="flex-1 overflow-hidden flex flex-col">
						<div className="flex items-center justify-between p-4 border-b border-gray-100 dark:border-gray-800">
							<h2 className="font-medium text-gray-900 dark:text-gray-100">
								{sidebarTitle}
							</h2>
							{sidebarAction}
						</div>
						<ScrollArea className="flex-1 p-2">{sidebarContent}</ScrollArea>
					</div>
					<UserSection />
				</div>
			);
		} else {
			return <div className="h-full w-full">{children}</div>;
		}
	}

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
							<div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
								<MessageCircle className="w-4 h-4 text-white" />
							</div>
							<span className="font-semibold text-gray-900 dark:text-gray-100">
								Michat
							</span>
						</div>
						<ThemeToggleButton />
					</div>
					{/* Navigation Tabs */}
					<NavigationTabs />
					{/* Sidebar Content */}
					<div className="flex-1 overflow-hidden flex flex-col">
						<div className="flex items-center justify-between p-4 border-b border-gray-100 dark:border-gray-800">
							<h2 className="font-medium text-gray-900 dark:text-gray-100">
								{sidebarTitle}
							</h2>
							{sidebarAction}
						</div>
						<ScrollArea className="flex-1 p-2">{sidebarContent}</ScrollArea>
					</div>
					{/* User Info */}
					<UserSection />
				</ResizablePanel>
				<ResizableHandle withHandle />
				<ResizablePanel defaultSize={70} className="flex flex-col">
					{children}
				</ResizablePanel>
			</ResizablePanelGroup>
		</div>
	);
};
