"use client";

import * as React from "react";

import SidebarBodyContents from "@/app/(components)/sidebar/sidebar-body-contents";
import SidebarHeaderContents from "@/app/(components)/sidebar/sidebar-header-contents";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
	SidebarRail,
} from "@/components/ui/sidebar";
import { UserButton } from "@clerk/nextjs";
import { ThemeToggle } from "./ui/theme/theme-toggle";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
	return (
		<Sidebar collapsible="icon" {...props}>
			<SidebarHeader>
				<SidebarHeaderContents />
			</SidebarHeader>
			<SidebarContent>
				<SidebarBodyContents />
			</SidebarContent>
			<SidebarFooter>
				<ThemeToggle />
				<UserButton />
			</SidebarFooter>
			<SidebarRail />
		</Sidebar>
	);
}
