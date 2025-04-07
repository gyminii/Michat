"use client";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuShortcut,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	useSidebar,
} from "@/components/ui/sidebar";
import { useNavigation } from "@/hooks/use-navigation";
import { cn } from "@/lib/utils";
import { ChevronsUpDown } from "lucide-react";
import Link from "next/link";

const SidebarHeaderContents = () => {
	const paths = useNavigation();
	const activePath = paths.find((path) => path.active);
	const { icon: Icon, name } = activePath || {};
	const { isMobile } = useSidebar();
	return (
		<SidebarMenu>
			<SidebarMenuItem>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<SidebarMenuButton
							size="lg"
							className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
						>
							<div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
								{Icon && <Icon className="size-4" />}
							</div>
							<div className="grid flex-1 text-left text-sm leading-tight">
								<span className="truncate font-medium">Michat</span>
								<span className="truncate text-xs">{name}</span>
							</div>
							<ChevronsUpDown className="ml-auto" />
						</SidebarMenuButton>
					</DropdownMenuTrigger>
					<DropdownMenuContent
						className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
						align="start"
						side={isMobile ? "bottom" : "right"}
						sideOffset={4}
					>
						<DropdownMenuLabel className="text-muted-foreground text-xs">
							Michat
						</DropdownMenuLabel>
						<DropdownMenuSeparator />
						{paths.map(({ name, href, icon: Icon, count, active }) => (
							<Link href={href} key={name}>
								<DropdownMenuItem
									key={name}
									className={cn("gap-2 p-2", {
										"bg-primary text-white": active,
									})}
								>
									<div className="flex size-6 items-center justify-center rounded-md border">
										<Icon className="size-3.5 shrink-0" />
									</div>
									{name}
									{!!count && (
										<DropdownMenuShortcut>{count}</DropdownMenuShortcut>
									)}
								</DropdownMenuItem>
							</Link>
						))}
						{/* <DropdownMenuSeparator /> */}
						{/* <DropdownMenuItem className="gap-2 p-2">
      <div className="flex size-6 items-center justify-center rounded-md border bg-transparent">
        <Plus className="size-4" />
      </div>
      <div className="text-muted-foreground font-medium">Add team</div>
    </DropdownMenuItem> */}
					</DropdownMenuContent>
				</DropdownMenu>
			</SidebarMenuItem>
		</SidebarMenu>
	);
};

export default SidebarHeaderContents;
