import { Button } from "@/components/ui/button";
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
import { SendHorizonal } from "lucide-react";
import { useForm } from "react-hook-form";
import TextareaAutosize from "react-textarea-autosize";
import { toast } from "sonner";
import { z } from "zod";
import ActionsPopover from "./actions-popover";
import { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";
import EmojiPicker, { Theme } from "emoji-picker-react";
const MessageSchema = z.object({
	content: z.string().min(1, { message: "This field can't be empty" }),
});
const ChatInput = () => {
	const textareaRef = useRef<HTMLTextAreaElement | null>(null);
	const emojiPickerRef = useRef<HTMLDivElement | null>(null);
	const [cursorPosition, setCursorPosition] = useState(0);
	const [emojiPickerOpen, setEmojiPickerOpen] = useState(false);
	const { theme } = useTheme();
	const { chatId } = useChat();
	const { mutate: createMessage, pending: createPending } = useMutationState(
		api.message.create
	);
	const form = useForm<z.infer<typeof MessageSchema>>({
		resolver: zodResolver(MessageSchema),
		defaultValues: {
			content: "",
		},
	});
	const { reset, handleSubmit, control, watch, setValue } = form;

	const handleInputChange = (
		event:
			| React.ChangeEvent<HTMLTextAreaElement>
			| React.MouseEvent<HTMLTextAreaElement>
	) => {
		const { value, selectionStart } = event.target as HTMLTextAreaElement;
		if (selectionStart !== null) {
			form.setValue("content", value);
			setCursorPosition(selectionStart);
		}
	};
	// Emoji Picker-----------------------------------------------------
	const content = watch("content", "");

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				emojiPickerRef.current &&
				!emojiPickerRef.current.contains(event.target as Node)
			) {
				setEmojiPickerOpen(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, []);

	const insertEmoji = (emoji: string) => {
		const newText = [
			content.substring(0, cursorPosition),
			emoji,
			content.substring(cursorPosition),
		].join("");

		setValue("content", newText);

		setCursorPosition(cursorPosition + emoji.length);
	};
	// -----------------------------------------------------------------
	const onSubmit = async (values: z.infer<typeof MessageSchema>) => {
		createMessage({
			chatId,
			type: "text",
			content: [values.content],
		})
			.then(() => {
				reset();
				textareaRef.current?.focus();
			})
			.catch((error) =>
				toast.error(
					error instanceof ConvexError
						? error.data
						: "Unexpected error occurred"
				)
			);
	};
	return (
		<div className="border-t w-full p-2 relative">
			<div className="absolute bottom-16" ref={emojiPickerRef}>
				<EmojiPicker
					open={emojiPickerOpen}
					theme={theme as Theme}
					onEmojiClick={(emojiDetails) => {
						insertEmoji(emojiDetails.emoji);
						setEmojiPickerOpen(false);
					}}
					lazyLoadEmojis
				/>
			</div>
			<div className="flex gap-2 itemd-end w-full">
				<ActionsPopover setEmojiPickerOpen={setEmojiPickerOpen} />
				<Form {...form}>
					<form
						onSubmit={handleSubmit(onSubmit)}
						className="flex gap-2 items-end w-full"
					>
						<FormField
							control={control}
							name="content"
							render={({ field }) => (
								<FormItem className="h-full w-full">
									<FormControl>
										<TextareaAutosize
											{...field}
											placeholder="Type a message..."
											rows={1}
											maxRows={3}
											onKeyDown={async (e) => {
												if (e.key === "Enter" && !e.shiftKey) {
													e.preventDefault();
													await handleSubmit(onSubmit)();
												}
											}}
											onChange={handleInputChange}
											onClick={handleInputChange}
											className="pt-3 text-xs min-h-full w-full resize-none border-0 outline-0 bg-card text-card-foreground placeholder:text-muted-foreground p-1.5"
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<Button
							disabled={createPending}
							size="icon"
							type="submit"
							className="dark:text-white"
						>
							<SendHorizonal />
						</Button>
					</form>
				</Form>
			</div>
		</div>
	);
};

export default ChatInput;
