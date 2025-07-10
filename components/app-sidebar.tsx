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
import { MessageCircle, Settings } from "lucide-react";
import type React from "react";
import { ThemeToggleButton } from "./theme-toggle-button";

type Props = {
	children: React.ReactNode;
	sidebarContent: React.ReactNode;
	sidebarTitle: string;
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

	if (isMobile) {
		if (showOnMobile) {
			return (
				<div className="h-full w-full flex flex-col bg-white dark:bg-gray-900">
					{/* Header */}
					<div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
						<div className="flex items-center gap-2">
							<div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
								<MessageCircle className="w-4 h-4 text-white" />
							</div>
							<span className="font-semibold text-gray-900 dark:text-gray-100">
								Michat
							</span>
						</div>
						<Button variant="ghost" size="icon" className="h-8 w-8">
							<Settings className="h-4 w-4" />
						</Button>
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
							<div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
								<MessageCircle className="w-4 h-4 text-white" />
							</div>
							<span className="font-semibold text-gray-900 dark:text-gray-100">
								Michat
							</span>
						</div>
						<ThemeToggleButton />
						{/* <Button variant="ghost" size="icon" className="h-8 w-8">
							<Settings className="h-4 w-4" />
						</Button> */}
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
				</ResizablePanel>

				<ResizableHandle withHandle />

				<ResizablePanel defaultSize={70} className="flex flex-col">
					{children}
				</ResizablePanel>
			</ResizablePanelGroup>
		</div>
	);
};
