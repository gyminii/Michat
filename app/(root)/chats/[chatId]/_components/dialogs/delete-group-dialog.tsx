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
import { cn } from "@/lib/utils";

import { ConvexError } from "convex/values";
import { AlertTriangle, Trash2 } from "lucide-react";
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
			<AlertDialogContent className="sm:max-w-md bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 shadow-2xl rounded-2xl">
				<AlertDialogHeader className="space-y-4">
					<div className="flex items-center gap-3">
						<div className="p-2 rounded-full bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
							<AlertTriangle className="h-5 w-5 text-red-600 dark:text-red-400" />
						</div>
						<div>
							<AlertDialogTitle className="text-xl font-semibold text-gray-900 dark:text-gray-100">
								Delete Group?
							</AlertDialogTitle>
						</div>
					</div>
					<AlertDialogDescription className="text-gray-600 dark:text-gray-400 leading-relaxed">
						This action cannot be undone. All messages will be permanently
						deleted and you will not be able to access this group anymore.
					</AlertDialogDescription>
				</AlertDialogHeader>

				<AlertDialogFooter className="flex gap-3 pt-4">
					<AlertDialogCancel
						disabled={pending}
						className="flex-1 bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 font-medium rounded-xl transition-all duration-300 disabled:opacity-50"
					>
						Cancel
					</AlertDialogCancel>
					<AlertDialogAction
						disabled={pending}
						onClick={handleRemoveGroup}
						className={cn(
							"flex-1 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed",
							pending && "animate-pulse"
						)}
					>
						{pending ? (
							<div className="flex items-center gap-2">
								<div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
								Deleting...
							</div>
						) : (
							<div className="flex items-center gap-2">
								<Trash2 className="w-4 h-4" />
								Delete Group
							</div>
						)}
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
};

export default DeleteGroupDialog;
