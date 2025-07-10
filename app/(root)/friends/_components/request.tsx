"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import type { Id } from "@/convex/_generated/dataModel";
import { useMutationState } from "@/hooks/use-mutation-state";
import { ConvexError } from "convex/values";
import { Check, User, X } from "lucide-react";
import { toast } from "sonner";

type Props = {
	id: Id<"requests">;
	imageUrl: string;
	username: string;
	email: string;
};

const Request = ({ id, imageUrl, username, email }: Props) => {
	const { mutate: denyRequest, pending: denyPending } = useMutationState(
		api.request.deny
	);
	const { mutate: acceptRequest, pending: acceptPending } = useMutationState(
		api.request.accept
	);

	return (
		<div className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 dark:hover:bg-muted/20 transition-colors">
			<Avatar className="h-10 w-10">
				<AvatarImage src={imageUrl || "/placeholder.svg"} />
				<AvatarFallback className="bg-primary/10 text-primary">
					<User className="h-5 w-5" />
				</AvatarFallback>
			</Avatar>

			<div className="flex-1 min-w-0">
				<div className="flex items-center gap-2">
					<h4 className="font-medium text-sm truncate">{username}</h4>
				</div>
				<p className="text-xs text-muted-foreground truncate">{email}</p>
			</div>

			<div className="flex items-center gap-1">
				<Button
					variant="ghost"
					size="sm"
					className="h-8 w-8 p-0 text-green-600 hover:text-green-700 hover:bg-green-50 dark:text-green-400 dark:hover:text-green-300 dark:hover:bg-green-950/20"
					disabled={acceptPending || denyPending}
					onClick={() => {
						acceptRequest({ id })
							.then(() => {
								toast.success("Friend request accepted");
							})
							.catch((error) => {
								toast.error(
									error instanceof ConvexError
										? error.data
										: "Unexpected error occurred"
								);
							});
					}}
				>
					<Check className="h-4 w-4" />
				</Button>
				<Button
					variant="ghost"
					size="sm"
					className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50 dark:text-red-400 dark:hover:text-red-300 dark:hover:bg-red-950/20"
					disabled={acceptPending || denyPending}
					onClick={() => {
						denyRequest({ id })
							.then(() => {
								toast.success("Friend request denied");
							})
							.catch((error) => {
								toast.error(
									error instanceof ConvexError
										? error.data
										: "Unexpected error occurred"
								);
							});
					}}
				>
					<X className="h-4 w-4" />
				</Button>
			</div>
		</div>
	);
};

export default Request;
