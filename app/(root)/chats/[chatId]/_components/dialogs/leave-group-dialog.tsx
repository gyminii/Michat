"use client";

import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useMutationState } from "@/hooks/use-mutation-state";

import { ConvexError } from "convex/values";
import { Dispatch, SetStateAction } from "react";
import { toast } from "sonner";
type Props = {
	chatId: Id<"chats">;
	open: boolean;
	setOpen: Dispatch<SetStateAction<boolean>>;
};

const LeaveGroupDialog = ({ chatId, open, setOpen }: Props) => {
	const { mutate: leaveGroup, pending } = useMutationState(api.chat.leaveGroup);
	const handleLeaveGroup = async () => {
		leaveGroup({ chatId })
			.then(() => {
				toast.success("Left group");
			})
			.catch((error) => {
				toast.error(
					error instanceof ConvexError
						? error.data
						: "Unexpected error occurred"
				);
			});
	};
	return (
		<AlertDialog open={open} onOpenChange={setOpen}>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Are you sure?</AlertDialogTitle>
					<AlertDialogDescription>
						This action cannot be undone. You will not be able to see any of the
						previous messages or send new messages
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel disabled={pending}>Cancel</AlertDialogCancel>
					<AlertDialogAction disabled={pending} onClick={handleLeaveGroup}>
						Leave
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
};

export default LeaveGroupDialog;
