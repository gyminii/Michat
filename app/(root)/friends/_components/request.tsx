"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { useMutationState } from "@/hooks/use-mutation-state";
import { ConvexError } from "convex/values";
import { Check, X } from "lucide-react";
import { toast } from "sonner";

type Props = {
	id: string;
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
		<div className="w-full flex items-center justify-between p-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm hover:shadow-md hover:bg-gray-50 dark:hover:bg-gray-750 transition-all duration-200">
			<div className="flex items-center gap-3">
				<Avatar className="h-10 w-10">
					<AvatarImage src={imageUrl || "/placeholder.svg"} />
					<AvatarFallback className="bg-blue-600 text-white">
						{username?.charAt(0).toUpperCase()}
					</AvatarFallback>
				</Avatar>
				<div className="flex flex-col">
					<p className="text-sm font-medium text-gray-900 dark:text-gray-100">
						{username}
					</p>
					<p className="text-xs text-gray-500 dark:text-gray-400">{email}</p>
				</div>
			</div>
			<div className="flex items-center gap-2">
				<Button
					size="sm"
					variant="ghost"
					className="h-8 w-8 p-0 hover:bg-green-100 dark:hover:bg-green-900/20"
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
					disabled={acceptPending}
				>
					<Check className="h-4 w-4 text-green-600" />
				</Button>
				<Button
					size="sm"
					variant="ghost"
					className="h-8 w-8 p-0 hover:bg-red-100 dark:hover:bg-red-900/20"
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
					disabled={denyPending}
				>
					<X className="h-4 w-4 text-red-600" />
				</Button>
			</div>
		</div>
	);
};

export default Request;
