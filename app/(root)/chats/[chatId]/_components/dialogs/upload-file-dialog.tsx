import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from "@/components/ui/form";
import { api } from "@/convex/_generated/api";
import { useChat } from "@/hooks/use-chat";
import { useMutationState } from "@/hooks/use-mutation-state";
import { zodResolver } from "@hookform/resolvers/zod";
import { ConvexError } from "convex/values";
import { FileIcon, ImageIcon, Upload } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { FileUpload } from "@/components/ui/file-upload";
import { useUploadThing } from "@/lib/uploadthing";
import { cn } from "@/lib/utils";

type Props = {
	open: boolean;
	toggle: (newState: boolean) => void;
	type: "image" | "file";
};

type FormValues = {
	files: File[];
};
const uploadFileSchema = z.object({
	files: z
		.array(z.instanceof(File))
		.min(1, { message: "You must select at least 1 file" }),
});
const UploadFileDialog = ({ open, toggle, type }: Props) => {
	const { chatId } = useChat();
	const { startUpload, isUploading } = useUploadThing(type);
	const form = useForm<z.infer<typeof uploadFileSchema>>({
		resolver: zodResolver(uploadFileSchema),
		defaultValues: {
			files: [],
		},
	});
	const { watch, handleSubmit, control, setValue } = form;
	const files = watch("files");
	const { mutate: createMessage, pending } = useMutationState(
		api.message.create
	);
	// values: z.infer<typeof uploadFileSchema>
	const onSubmit = async ({ files }: FormValues) => {
		try {
			const data = await startUpload(files);
			await createMessage({
				content: data?.map((file) => file.ufsUrl),
				type,
				chatId,
			})
				.then(() => {
					form.reset();
					toggle(false);
				})
				.catch((error) => {
					console.log();
					toast.error(
						error instanceof ConvexError
							? error.data
							: "Unexpected error occurred"
					);
				});
		} catch (error) {
			console.log("Error: ", error);
		}
	};
	const getAcceptedTypes = () => {
		if (type === "image") {
			return "image/*,video/*";
		}
		return "image/*,video/*,audio/*,.pdf,.doc,.docx,.txt";
	};
	return (
		<Dialog open={open} onOpenChange={(open) => toggle(open)}>
			<DialogTrigger asChild>
				<Button
					size="icon"
					variant="outline"
					className="rounded-full bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-primary/50 transition-all duration-300 shadow-sm hover:shadow-md"
				>
					{type === "image" ? (
						<ImageIcon className="h-4 w-4 transition-colors duration-300 hover:text-primary" />
					) : (
						<FileIcon className="h-4 w-4 transition-colors duration-300 hover:text-primary" />
					)}
				</Button>
			</DialogTrigger>

			<DialogContent
				className="sm:max-w-2xl bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 shadow-2xl rounded-2xl max-h-[80vh] overflow-hidden"
				onInteractOutside={(e) => {
					e.preventDefault();
				}}
			>
				<DialogHeader className="space-y-3">
					<div className="flex items-center gap-3">
						<div className="p-2 rounded-full bg-primary/10 border border-primary/20">
							<Upload className="h-5 w-5 text-primary" />
						</div>
						<div>
							<DialogTitle className="text-xl font-semibold text-gray-900 dark:text-gray-100">
								Upload {type === "image" ? "Images & Videos" : "Files"}
							</DialogTitle>
							<DialogDescription className="text-gray-600 dark:text-gray-400">
								{type === "image"
									? "Share images and videos with your chat"
									: "Share documents, images, videos, and more"}
							</DialogDescription>
						</div>
					</div>
				</DialogHeader>

				<div className="flex-1 overflow-y-auto">
					<Form {...form}>
						<form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
							<FormField
								control={control}
								name="files"
								render={({ field: { onChange, ...field } }) => (
									<FormItem>
										<FormControl>
											<FileUpload
												onChange={(files) => {
													onChange(files);
													setValue("files", files);
												}}
												accept={getAcceptedTypes()}
												multiple={true}
												maxSize={type === "image" ? 50 : 25}
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<DialogFooter>
								<div className="flex gap-3 w-full">
									<Button
										type="button"
										variant="outline"
										onClick={() => toggle(false)}
										className="flex-1 bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 font-medium rounded-xl transition-all duration-300"
									>
										Cancel
									</Button>
									<Button
										disabled={pending || isUploading || files.length === 0}
										type="submit"
										className={cn(
											"flex-1 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed",
											(pending || isUploading) && "animate-pulse"
										)}
									>
										{pending || isUploading ? (
											<div className="flex items-center gap-2">
												<div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
												{isUploading ? "Uploading..." : "Sending..."}
											</div>
										) : (
											<div className="flex items-center gap-2">
												<Upload className="w-4 h-4" />
												Send{" "}
												{files.length > 0
													? `${files.length} File${files.length > 1 ? "s" : ""}`
													: "Files"}
											</div>
										)}
									</Button>
								</div>
							</DialogFooter>
						</form>
					</Form>
				</div>
			</DialogContent>
		</Dialog>
	);
};

export default UploadFileDialog;
