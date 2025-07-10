"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
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
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { api } from "@/convex/_generated/api";
import { useMutationState } from "@/hooks/use-mutation-state";
import { cn } from "@/lib/utils";

import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "convex/react";
import { ConvexError } from "convex/values";
import { ChevronDown, CirclePlus, Users, X } from "lucide-react";
import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const createGroupFormSchema = z.object({
	name: z.string().min(1, { message: "This field can't be empty" }),
	members: z
		.string()
		.array()
		.min(1, { message: "You must select at least 1 friend" }),
});

const CreateGroupDialog = () => {
	const friends = useQuery(api.friends.get);

	const { mutate: createGroup, pending } = useMutationState(
		api.chat.createGroup
	);

	const form = useForm<z.infer<typeof createGroupFormSchema>>({
		resolver: zodResolver(createGroupFormSchema),
		defaultValues: {
			name: "",
			members: [],
		},
	});

	const { watch, reset, setValue, control } = form;
	const members = watch("members", []);

	const unselectedFriends = useMemo(() => {
		return friends
			? friends.filter((friend) => !members.includes(friend._id))
			: [];
	}, [members, friends]);
	const handleSubmit = async (
		values: z.infer<typeof createGroupFormSchema>
	) => {
		await createGroup({ name: values.name, members: values.members })
			.then(() => {
				reset();
				toast.success("Group created!");
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
		<Dialog>
			<Tooltip>
				<TooltipTrigger asChild>
					<DialogTrigger asChild>
						<Button
							size="icon"
							variant="outline"
							className="h-8 w-8 bg-transparent"
						>
							<CirclePlus className="h-4 w-4" />
						</Button>
					</DialogTrigger>
				</TooltipTrigger>
				<TooltipContent side="bottom">
					<p className="text-white">Create Group</p>
				</TooltipContent>
			</Tooltip>

			<DialogContent className="sm:max-w-md bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 shadow-2xl">
				<DialogHeader>
					<div className="flex items-center gap-3">
						<div className="p-2 rounded-full bg-primary/10 border border-primary/20">
							<Users className="h-5 w-5 text-primary" />
						</div>
						<div>
							<DialogTitle className="text-xl font-semibold text-gray-900 dark:text-gray-100">
								Create Group
							</DialogTitle>
							<DialogDescription className="text-gray-600 dark:text-gray-400">
								Add your friends to get started!
							</DialogDescription>
						</div>
					</div>
				</DialogHeader>

				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(handleSubmit)}
						className="space-y-6"
					>
						<FormField
							control={control}
							name="name"
							render={({ field }) => (
								<FormItem className="space-y-2">
									<FormLabel className="text-sm font-medium text-gray-700 dark:text-gray-300">
										Group Name
									</FormLabel>
									<FormControl>
										<Input
											placeholder="Enter group name..."
											{...field}
											className="bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-600 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300 rounded-xl"
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={control}
							name="members"
							render={() => (
								<FormItem className="space-y-2">
									<FormLabel className="text-sm font-medium text-gray-700 dark:text-gray-300">
										Add Friends
									</FormLabel>
									<FormControl>
										<DropdownMenu>
											<DropdownMenuTrigger
												asChild
												disabled={unselectedFriends.length === 0}
											>
												<Button
													variant="outline"
													className={cn(
														"w-full justify-between rounded-xl bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 hover:border-primary/50 transition-all duration-300",
														unselectedFriends.length === 0 &&
															"opacity-50 cursor-not-allowed"
													)}
												>
													<span className="text-gray-600 dark:text-gray-400">
														{unselectedFriends.length === 0
															? "No friends available"
															: "Select friends"}
													</span>
													<ChevronDown className="h-4 w-4 text-gray-500" />
												</Button>
											</DropdownMenuTrigger>
											<DropdownMenuContent className="w-full min-w-[300px] bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 shadow-xl rounded-xl">
												{unselectedFriends?.map((friend) => (
													<DropdownMenuCheckboxItem
														key={friend._id}
														className="flex items-center gap-3 p-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200 rounded-lg mx-1"
														onCheckedChange={(checked) => {
															if (checked) {
																setValue("members", [...members, friend._id]);
															}
														}}
													>
														<Avatar className="w-8 h-8 border-2 border-gray-200 dark:border-gray-600 shadow-sm">
															<AvatarImage
																src={friend.imageUrl || "/placeholder.svg"}
																className="object-cover"
															/>
															<AvatarFallback className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 text-xs font-semibold">
																{friend.username.substring(0, 1).toUpperCase()}
															</AvatarFallback>
														</Avatar>
														<span className="font-medium text-gray-900 dark:text-gray-100 truncate">
															{friend.username}
														</span>
													</DropdownMenuCheckboxItem>
												))}
											</DropdownMenuContent>
										</DropdownMenu>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						{members && members.length > 0 && (
							<div className="space-y-2">
								<label className="text-sm font-medium text-gray-700 dark:text-gray-300">
									Selected Members ({members.length})
								</label>
								<Card className="bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-600 rounded-xl shadow-sm">
									<div className="flex items-center gap-3 overflow-x-auto p-4 no-scrollbar">
										{friends
											?.filter((friend) => members.includes(friend._id))
											.map((friend) => (
												<div
													key={friend._id}
													className="flex flex-col items-center gap-2 min-w-fit group"
												>
													<div className="relative">
														<Avatar className="w-12 h-12 border-2 border-gray-200 dark:border-gray-600 shadow-md transition-all duration-300 group-hover:border-primary/50 group-hover:shadow-lg">
															<AvatarImage
																src={friend.imageUrl || "/placeholder.svg"}
																className="object-cover"
															/>
															<AvatarFallback className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 text-sm font-semibold">
																{friend.username.substring(0, 1).toUpperCase()}
															</AvatarFallback>
														</Avatar>
														<button
															type="button"
															onClick={() =>
																setValue(
																	"members",
																	members.filter((id) => id !== friend._id)
																)
															}
															className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center transition-all duration-200 shadow-sm hover:shadow-md hover:scale-110"
														>
															<X className="w-3 h-3" />
														</button>
													</div>
													<p className="text-xs font-medium text-gray-600 dark:text-gray-400 truncate max-w-16 text-center">
														{friend?.username?.split(" ")[0]}
													</p>
												</div>
											))}
									</div>
								</Card>
							</div>
						)}

						<DialogFooter className="pt-4">
							<Button
								type="submit"
								disabled={pending}
								className={cn(
									"w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed",
									pending && "animate-pulse"
								)}
							>
								{pending ? (
									<div className="flex items-center gap-2">
										<div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
										Creating...
									</div>
								) : (
									"Create Group"
								)}
							</Button>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
};

export default CreateGroupDialog;
