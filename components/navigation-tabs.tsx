"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useNavigation } from "@/hooks/use-navigation";
import { cn } from "@/lib/utils";
import Link from "next/link";

export const NavigationTabs = () => {
	const navigationItems = useNavigation();

	return (
		<div className="flex border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
			{navigationItems.map((item) => (
				<Link href={item.href} key={item.name} className="flex-1">
					<Button
						variant="ghost"
						className={cn(
							"w-full rounded-none border-b-2 h-12 relative",
							item.active
								? "border-blue-500 text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20"
								: "border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
						)}
					>
						<item.icon className="w-4 h-4 mr-2" />
						{item.name}
						{(item.count ?? 0) > 0 && (
							<Badge
								className={cn(
									"ml-2 h-5 min-w-5 text-xs",
									item.active
										? "bg-blue-500 dark:bg-blue-600 text-white"
										: "bg-red-500 dark:bg-red-600 text-white"
								)}
							>
								{(item.count ?? 0) > 99 ? "99+" : item.count}
							</Badge>
						)}
					</Button>
				</Link>
			))}
		</div>
	);
};
