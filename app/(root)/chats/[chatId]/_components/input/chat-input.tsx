"use client";

import type React from "react";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { api } from "@/convex/_generated/api";
import { useChat } from "@/hooks/use-chat";
import { useMutationState } from "@/hooks/use-mutation-state";
import { zodResolver } from "@hookform/resolvers/zod";
import { ConvexError } from "convex/values";
import { motion } from "framer-motion";
import { Smile } from "lucide-react";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import TextareaAutosize from "react-textarea-autosize";
import { toast } from "sonner";
import { z } from "zod";
import ActionsPopover from "./actions-popover";
import AnimatedButton from "./animated-button";
import AnimatedEmojiPicker from "./emoji-picker-animated";

const MessageSchema = z.object({
	content: z.string().min(1, { message: "This field can't be empty" }),
});

const ChatInput = () => {
	const textareaRef = useRef<HTMLTextAreaElement | null>(null);
	const [cursorPosition, setCursorPosition] = useState(0);
	const [emojiPickerOpen, setEmojiPickerOpen] = useState(false);
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

	// Watch content to determine if input is empty
	const content = watch("content", "");
	const isEmpty = content.trim().length === 0;

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

	// Emoji Picker insertion
	const insertEmoji = (emoji: string) => {
		const newText = [
			content.substring(0, cursorPosition),
			emoji,
			content.substring(cursorPosition),
		].join("");
		setValue("content", newText);
		setCursorPosition(cursorPosition + emoji.length);
	};

	const onSubmit = async (values: z.infer<typeof MessageSchema>) => {
		if (isEmpty) return;

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
		<div className="border-t w-full p-3 bg-background relative">
			<AnimatedEmojiPicker
				isOpen={emojiPickerOpen}
				onClose={() => setEmojiPickerOpen(false)}
				onEmojiSelect={insertEmoji}
			/>

			<div className="flex gap-2 items-center w-full">
				<motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
					<ActionsPopover setEmojiPickerOpen={setEmojiPickerOpen} />
				</motion.div>

				<Form {...form}>
					<form
						onSubmit={handleSubmit(onSubmit)}
						className="flex gap-2 items-center w-full"
					>
						<FormField
							control={control}
							name="content"
							render={({ field }) => (
								<FormItem className="h-full w-full">
									<FormControl>
										<motion.div whileFocus={{ scale: 1.01 }} className="w-full">
											<TextareaAutosize
												{...field}
												ref={textareaRef}
												placeholder="Type a message..."
												rows={1}
												maxRows={3}
												onKeyDown={async (e) => {
													if (e.key === "Enter" && !e.shiftKey) {
														e.preventDefault();
														if (!isEmpty) {
															await handleSubmit(onSubmit)();
														}
													}
												}}
												onChange={handleInputChange}
												onClick={handleInputChange}
												className="text-sm min-h-full w-full resize-none border rounded-lg outline-0 bg-card text-card-foreground placeholder:text-muted-foreground p-3 focus:ring-2 focus:ring-primary/20 transition-all"
											/>
										</motion.div>
									</FormControl>
									{/* Error message removed */}
								</FormItem>
							)}
						/>

						<motion.div className="flex gap-2 items-center">
							<motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
								<Button
									type="button"
									size="icon"
									variant="ghost"
									onClick={() => setEmojiPickerOpen(true)}
									className="h-10 w-10 rounded-full"
								>
									<Smile className="h-5 w-5" />
								</Button>
							</motion.div>

							<AnimatedButton disabled={createPending || isEmpty} />
						</motion.div>
					</form>
				</Form>
			</div>
		</div>
	);
};

export default ChatInput;
