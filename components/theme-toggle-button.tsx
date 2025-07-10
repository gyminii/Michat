"use client";

import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export function ThemeToggleButton() {
	const { theme, setTheme } = useTheme();

	return (
		<Button
			variant="ghost"
			size="sm"
			onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
			className="hover:bg-gray-100 dark:hover:bg-gray-800"
		>
			{theme === "dark" ? (
				<Sun className="w-4 h-4 text-yellow-500" />
			) : (
				<Moon className="w-4 h-4 text-gray-600 dark:text-gray-400" />
			)}
		</Button>
	);
}
