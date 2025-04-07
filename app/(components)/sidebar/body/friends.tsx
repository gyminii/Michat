"use client";

import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";

import {
	SidebarGroup,
	SidebarMenu,
	SidebarMenuAction,
	SidebarMenuBadge,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@/components/ui/sidebar";
import { BellPlus, MoreHorizontal, PersonStanding } from "lucide-react";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuShortcut,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import AddFriendDialog from "@/app/(root)/friends/_components/add-friend-dialog";
import { cn } from "@/lib/utils";
import { useNavigation } from "@/hooks/use-navigation";
import Link from "next/link";

const Friends = () => {
	const requests = useQuery(api.requests.get);
	const friends = useQuery(api.friends.get);
	const paths = useNavigation();
	return (
		<SidebarGroup>
			<SidebarMenu className="gap-5">
				{paths.map(({ name, href, icon: Icon, count, friends, active }) => (
					<Link href={href} key={name}>
						<SidebarMenuItem
							key="friends"
							className={cn("", {
								"bg-primary text-white rounded-lg": active,
							})}
						>
							<SidebarMenuButton asChild>
								<div>
									<PersonStanding />
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
							})}
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
