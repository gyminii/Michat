"use client";
import { useConvexAuth } from "convex/react";
import Image from "next/image";
import { redirect } from "next/navigation";

export default function RootPage() {
	const { isAuthenticated } = useConvexAuth();
	if (isAuthenticated) redirect("/chats");

	return (
		<div className="flex-1 flex items-center justify-center">
			<div className="text-center space-y-4">
				<Image
					src="/logo.svg"
					alt="Michat Logo"
					width={120}
					height={120}
					className="mx-auto animate-pulse duration-800"
				/>
				<div>
					<h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
						Welcome to Michat
					</h2>
					<p className="text-gray-600 dark:text-gray-400 max-w-md">
						Connect with friends and start conversations. Choose Chats to see
						your messages or Friends to manage your connections.
					</p>
				</div>
			</div>
		</div>
	);
}
