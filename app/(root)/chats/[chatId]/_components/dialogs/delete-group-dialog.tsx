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

const DeleteGroupDialog = ({ chatId, open, setOpen }: Props) => {
	const { mutate: deleteGroup, pending } = useMutationState(
		api.chat.deleteGroup
	);
	const handleRemoveGroup = async () => {
		deleteGroup({ chatId })
			.then(() => {
				toast.success("Removed group");
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
						This action cannot be undone. All messages will be deleted and you
						will not be able to message this user.
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel disabled={pending}>Cancel</AlertDialogCancel>
					<AlertDialogAction disabled={pending} onClick={handleRemoveGroup}>
						Delete
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
};

export default DeleteGroupDialog;
