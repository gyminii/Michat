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
import React from "react";

type Props = {
	children: React.ReactNode;
};

const layout = ({ children }: Props) => {
	return (
		<SidebarProvider defaultOpen={false}>
			<AppSidebar />
			<SidebarInset>
				<header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
					<div className="flex items-center gap-2 px-4">
						<SidebarTrigger className="-ml-1" />
						<Separator orientation="vertical" className="mr-2 h-4" />
						<Breadcrumb>
							<BreadcrumbList>
								<BreadcrumbItem className="hidden md:block">
									<BreadcrumbLink href="#">Michat</BreadcrumbLink>
								</BreadcrumbItem>
								{/* <BreadcrumbSeparator className="hidden md:block" />
								<BreadcrumbItem>
									<BreadcrumbPage>Data Fetching</BreadcrumbPage>
								</BreadcrumbItem> */}
							</BreadcrumbList>
						</Breadcrumb>
					</div>
				</header>

				<SidebarWrapper>{children}</SidebarWrapper>
			</SidebarInset>
		</SidebarProvider>
	);
};

export default layout;
