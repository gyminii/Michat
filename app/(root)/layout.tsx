"use client";
import LayoutProvider from "@/providers/layout-provider";
import { RedirectToSignIn } from "@clerk/nextjs";
import { Authenticated, Unauthenticated } from "convex/react";
import type React from "react";

type Props = {
	children: React.ReactNode;
};

const layout = async ({ children }: Props) => {
	return (
		<LayoutProvider>
			<Authenticated>
				<div className="h-full w-full bg-gray-100 dark:bg-gray-950 p-0 md:p-4">
					{children}
				</div>
			</Authenticated>
			<Unauthenticated>
				<RedirectToSignIn />
			</Unauthenticated>
		</LayoutProvider>
	);
};

export default layout;
