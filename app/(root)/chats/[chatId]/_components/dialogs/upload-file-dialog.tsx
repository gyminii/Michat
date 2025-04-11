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
import { FileIcon, ImageIcon, Loader2 } from "lucide-react";
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
	const { watch, handleSubmit, control } = form;
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
	return (
		<Dialog open={open} onOpenChange={(open) => toggle(open)}>
			<DialogTrigger asChild>
				<Button size="icon" variant="outline">
					{type === "image" ? <ImageIcon /> : <FileIcon />}
				</Button>
			</DialogTrigger>
			<DialogContent
				className="w-full"
				onInteractOutside={(e) => {
					e.preventDefault();
				}}
			>
				<DialogHeader>
					<DialogTitle>Upload files</DialogTitle>
					<DialogDescription>
						{type === "image"
							? "Upload images and videos!"
							: "Upload image, video, audio, and PDFs!"}
					</DialogDescription>
				</DialogHeader>
				<Form {...form}>
					<form onSubmit={handleSubmit(onSubmit)}>
						<FormField
							control={control}
							name="files"
							render={({ field: { onChange, ...field } }) => (
								<FormItem>
									<FormControl>
										<div
											className={cn("rounded-md p-4 mb-4", {
												"border-1": files?.length,
											})}
										>
											<FileUpload onChange={onChange} {...field} />
										</div>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<DialogFooter>
							<Button
								disabled={pending || isUploading}
								type="submit"
								className="w-full"
							>
								{pending || isUploading ? (
									<Loader2 className="animate-spin" />
								) : (
									"Send"
								)}
							</Button>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
};

export default UploadFileDialog;
