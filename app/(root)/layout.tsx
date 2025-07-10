import LayoutProvider from "@/providers/layout-provider";
import type React from "react";

type Props = {
	children: React.ReactNode;
};

const layout = ({ children }: Props) => {
	return (
		<LayoutProvider>
			<div className="h-full w-full bg-gray-100 dark:bg-gray-950 p-0 md:p-4">
				{children}
			</div>
		</LayoutProvider>
	);
};

export default layout;
