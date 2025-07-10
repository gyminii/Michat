"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
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
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { UserPlus } from "lucide-react";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useMutationState } from "@/hooks/use-mutation-state";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";
import { ConvexError } from "convex/values";

const FriendFormSchema = z.object({
	email: z
		.string()
		.min(1, { message: "Email cannot be empty" })
		.email("Please enter a valid email"),
});

const AddFriendDialog = () => {
	const [open, setOpen] = useState(false);
	const { mutate: createRequest, pending } = useMutationState(
		api.request.create
	);

	const form = useForm<z.infer<typeof FriendFormSchema>>({
		resolver: zodResolver(FriendFormSchema),
		defaultValues: {
			email: "",
		},
	});

	const { control, handleSubmit, reset } = form;

	const onSubmit = async (values: z.infer<typeof FriendFormSchema>) => {
		await createRequest({
			email: values.email,
		})
			.then(() => {
				reset();
				setOpen(false);
				toast.success("Friend Request Sent!");
			})
			.catch((error) => {
				toast.error(
					error instanceof ConvexError
						? error.data
						: "Unexpected error occurred."
				);
			});
	};

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<Tooltip>
				<TooltipTrigger asChild>
					<DialogTrigger asChild>
						<Button
							size="icon"
							variant="outline"
							className="h-8 w-8 bg-transparent"
						>
							<UserPlus className="h-4 w-4" />
						</Button>
					</DialogTrigger>
				</TooltipTrigger>
				<TooltipContent side="bottom">
					<p className="text-white">Add Friend</p>
				</TooltipContent>
			</Tooltip>
			<DialogContent className="sm:max-w-md bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 shadow-2xl">
				<DialogHeader>
					<div className="flex items-center gap-3">
						<div className="p-2 rounded-full bg-primary/10">
							<UserPlus className="h-5 w-5 text-primary" />
						</div>
						<div>
							<DialogTitle>Add Friend</DialogTitle>
							<DialogDescription>
								Send a request to connect with your friends!
							</DialogDescription>
						</div>
					</div>
				</DialogHeader>
				<Form {...form}>
					<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
						<FormField
							control={control}
							name="email"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Email Address</FormLabel>
									<FormControl>
										<Input
											placeholder="Enter friend's email..."
											type="email"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<DialogFooter className="gap-2">
							<Button
								type="button"
								variant="outline"
								onClick={() => setOpen(false)}
								disabled={pending}
							>
								Cancel
							</Button>
							<Button type="submit" disabled={pending} className="min-w-[80px]">
								{pending ? "Sending..." : "Send Request"}
							</Button>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
};

export default AddFriendDialog;
