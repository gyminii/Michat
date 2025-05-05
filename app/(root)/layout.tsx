import { AppSidebar } from "@/components/app-sidebar";
import SidebarWrapper from "@/components/shared/sidebar/sidebar-wrapper";
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
	SidebarInset,
	SidebarProvider,
	SidebarTrigger,
} from "@/components/ui/sidebar";
import type React from "react";

type Props = {
	children: React.ReactNode;
};

const layout = ({ children }: Props) => {
	return (
		<SidebarProvider defaultOpen={false}>
			<div className="flex h-screen w-full overflow-hidden">
				<AppSidebar />
				<SidebarInset className="flex flex-col h-screen w-full">
					<header className="flex h-14 shrink-0 items-center gap-2 border-b bg-background z-10">
						<div className="flex items-center gap-2 px-4">
							<SidebarTrigger className="-ml-1" />
							<Separator orientation="vertical" className="mr-2 h-4" />
							<Breadcrumb>
								<BreadcrumbList>
									<BreadcrumbItem className="hidden md:block">
										<BreadcrumbLink href="#">Michat</BreadcrumbLink>
									</BreadcrumbItem>
								</BreadcrumbList>
							</Breadcrumb>
						</div>
					</header>

					<div className="flex-1 overflow-hidden">
						<SidebarWrapper>{children}</SidebarWrapper>
					</div>
				</SidebarInset>
			</div>
		</SidebarProvider>
	);
};

export default layout;
