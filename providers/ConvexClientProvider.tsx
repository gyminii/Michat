"use client";
import LoadingLogo from "@/components/shared/loading-logo";
import { ClerkProvider, useAuth } from "@clerk/nextjs";
import { AuthLoading, ConvexReactClient } from "convex/react";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import React from "react";

type Props = {
	children: React.ReactNode;
};
const CONVEX_URL = process.env.NEXT_PUBLIC_CONVEX_URL || "";
const convex = new ConvexReactClient(CONVEX_URL);
const ConvexClientProvider = ({ children }: Props) => {
	return (
		<ClerkProvider>
			<ConvexProviderWithClerk useAuth={useAuth} client={convex}>
				{children}
				<AuthLoading>
					<LoadingLogo />
				</AuthLoading>
			</ConvexProviderWithClerk>
		</ClerkProvider>
	);
};

export default ConvexClientProvider;
