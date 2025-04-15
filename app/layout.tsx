import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/ui/theme/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import ConvexClientProvider from "@/providers/ConvexClientProvider";
import type { Metadata, Viewport } from "next";
import { Poppins } from "next/font/google";
import { extractRouterConfig } from "uploadthing/server";
import "./globals.css";
import { ourFileRouter } from "./api/uploadthing/core";
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
export const viewport: Viewport = {
	themeColor: "DodgerBlue",
};
const PoppinsFont = Poppins({
	variable: "--font-poppins",
	subsets: ["latin"],
	weight: ["100", "200", "300", "400"],
	display: "swap",
});

export const metadata: Metadata = {
	title: "Michat :)",
	description: "Generated by Tyler",
	generator: "Next.js",
	manifest: "/manifest.json",
	authors: [{ name: "Tyler Lee" }],
	icons: [
		{ rel: "apple-touch-icon", url: "icon-192x192.png" },
		{ rel: "icon", url: "icon-192x192.png" },
	],
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={`${PoppinsFont.className} sans-serif`}>
				<NextSSRPlugin routerConfig={extractRouterConfig(ourFileRouter)} />
				<ThemeProvider
					attribute="class"
					defaultTheme="system"
					enableSystem
					disableTransitionOnChange
				>
					<ConvexClientProvider>
						<TooltipProvider>{children}</TooltipProvider>
					</ConvexClientProvider>
				</ThemeProvider>
				<Toaster richColors />
			</body>
		</html>
	);
}
