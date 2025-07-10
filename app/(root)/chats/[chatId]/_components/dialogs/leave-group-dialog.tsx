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
import { AlertCircle, LogOut } from "lucide-react";
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
			<AlertDialogContent className="sm:max-w-md bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 shadow-2xl rounded-2xl">
				<AlertDialogHeader className="space-y-4">
					<div className="flex items-center gap-3">
						<div className="p-2 rounded-full bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800">
							<AlertCircle className="h-5 w-5 text-orange-600 dark:text-orange-400" />
						</div>
						<div>
							<AlertDialogTitle className="text-xl font-semibold text-gray-900 dark:text-gray-100">
								Leave Group?
							</AlertDialogTitle>
						</div>
					</div>
					<AlertDialogDescription className="text-gray-600 dark:text-gray-400 leading-relaxed">
						This action cannot be undone. You will not be able to see any of the
						previous messages or send new messages to this group.
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
						onClick={handleLeaveGroup}
						className={cn(
							"flex-1 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed",
							pending && "animate-pulse"
						)}
					>
						{pending ? (
							<div className="flex items-center gap-2">
								<div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
								Leaving...
							</div>
						) : (
							<div className="flex items-center gap-2">
								<LogOut className="w-4 h-4" />
								Leave Group
							</div>
						)}
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
};

export default LeaveGroupDialog;
