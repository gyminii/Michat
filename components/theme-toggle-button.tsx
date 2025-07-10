"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

export function ThemeToggleButton() {
	const { theme, setTheme } = useTheme();
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) {
		return (
			<Button variant="ghost" size="sm">
				<div className="w-4 h-4" />
			</Button>
		);
	}

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
