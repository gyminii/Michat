"use client";

import React, {
	createContext,
	useContext,
	useEffect,
	useState,
	type ReactNode,
} from "react";

type Layout = "full" | "fixed";

const ThemeLayoutContext = createContext<ThemeLayoutContextType | undefined>(
	undefined
);

type ThemeLayoutContextType = {
	layout: Layout;
	setLayout: (layout: Layout) => void;
};

function setCookie(name: string, value: string, days: number = 365) {
	const expires = new Date();
	expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
	document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
}

function getCookie(name: string): string | null {
	const nameEQ = name + "=";
	const ca = document.cookie.split(";");
	for (let i = 0; i < ca.length; i++) {
		let c = ca[i];
		while (c.charAt(0) === " ") c = c.substring(1, c.length);
		if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
	}
	return null;
}

export function useLayout() {
	const context = useContext(ThemeLayoutContext);
	if (context === undefined) {
		throw new Error("useLayout must be used within a ThemeProvider");
	}
	return context;
}

export function useLayoutClasses() {
	const { layout } = useLayout();
	return {
		container: layout === "full" ? "w-full" : "container",
		nav: layout === "full" ? "md:px-20" : "mx-auto",
	};
}

const LayoutProvider = ({ children }: { children: ReactNode }) => {
	const [layout, setLayoutState] = useState<Layout>("full");
	const [isClient, setIsClient] = useState(false);
	useEffect(() => {
		setIsClient(true);
		const savedLayout = getCookie("layout") as Layout;
		if (savedLayout === "full" || savedLayout === "fixed") {
			setLayoutState(savedLayout);
		}
	}, []);
	const setLayout = (newLayout: Layout) => {
		setLayoutState(newLayout);
		setCookie("layout", newLayout);
	};

	return (
		<ThemeLayoutContext.Provider value={{ layout, setLayout }}>
			{isClient ? (
				children
			) : (
				<div style={{ visibility: "hidden" }}>{children}</div>
			)}
		</ThemeLayoutContext.Provider>
	);
};

export default LayoutProvider;
