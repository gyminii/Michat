"use client";
import LoadingLogo from "@/components/shared/loading-logo";
import { ClerkProvider, SignInButton, useAuth } from "@clerk/nextjs";
import {
	Authenticated,
	AuthLoading,
	ConvexReactClient,
	Unauthenticated,
} from "convex/react";
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
				<Unauthenticated>
					<SignInButton />
				</Unauthenticated>
				<Authenticated>{children}</Authenticated>
				<AuthLoading>
					<LoadingLogo />
				</AuthLoading>
			</ConvexProviderWithClerk>
		</ClerkProvider>
	);
};

export default ConvexClientProvider;
