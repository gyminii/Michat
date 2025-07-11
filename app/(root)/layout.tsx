import LayoutProvider from "@/providers/layout-provider";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import type React from "react";

type Props = {
	children: React.ReactNode;
};

const layout = async ({ children }: Props) => {
	const { userId } = await auth();

	if (!userId) redirect("/sign-in");

	return (
		<LayoutProvider>
			<div className="h-full w-full bg-gray-100 dark:bg-gray-950 p-0 md:p-4">
				{children}
			</div>
		</LayoutProvider>
	);
};

export default layout;
