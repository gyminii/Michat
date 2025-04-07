"use client";

import {
	SidebarGroup,
	SidebarMenu,
	SidebarMenuBadge,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useNavigation } from "@/hooks/use-navigation";
import { cn } from "@/lib/utils";
import Link from "next/link";

const Friends = () => {
	const paths = useNavigation();
	return (
		<SidebarGroup>
			<SidebarMenu className="gap-5">
				{paths.map(({ name, href, icon: Icon, count, active }) => (
					<Link href={href} key={name}>
						<SidebarMenuItem
							key="friends"
							className={cn("", {
								"bg-primary text-white rounded-lg": active,
							})}
						>
							<SidebarMenuButton asChild>
								<div>
									<Icon />
									<span>{name}</span>
								</div>
							</SidebarMenuButton>
							{/* <AddFriendDialog /> */}
							<SidebarMenuBadge>{count}</SidebarMenuBadge>
						</SidebarMenuItem>
						{/* <DropdownMenuItem
							key={name}
							className={cn("gap-2 p-2", {
								"bg-primary text-white": active,
							})}π
						>
							<div className="flex size-6 items-center justify-center rounded-md border">
								<Icon className="size-3.5 shrink-0" />
							</div>
							{name}
							{!!count && <DropdownMenuShortcut>{count}</DropdownMenuShortcut>}
						</DropdownMenuItem> */}
					</Link>
				))}
			</SidebarMenu>
		</SidebarGroup>
	);
};

export default Friends;
