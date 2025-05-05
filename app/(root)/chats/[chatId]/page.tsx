"use client";
import { api } from "@/convex/_generated/api";
import type { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { use, useState } from "react";
import RemoveFriendDialog from "../../friends/_components/remove-friend-dialog";
import Body from "./_components/body/body";
import DeleteGroupDialog from "./_components/dialogs/delete-group-dialog";
import LeaveGroupDialog from "./_components/dialogs/leave-group-dialog";
import Header from "./_components/header";
import ChatInput from "./_components/input/chat-input";

const ChatPage = ({ params }: { params: Promise<{ chatId: Id<"chats"> }> }) => {
	const { chatId } = use(params);
	const chat = useQuery(api.chat.get, {
		id: chatId,
	});
	const [removeFriendDialogOpen, setRemoveFriendDialogOpen] = useState(false);
	const [deleteGroupDialogOpen, setDeleteGroupDialogOpen] = useState(false);
	const [leaveGroupDialogOpen, setLeaveGroupDialogOpen] = useState(false);
	const [callType, setCallType] = useState<"audio" | "video" | null>(null);

	const header = () => (
		<Header
			imageUrl={chat?.isGroup ? undefined : chat?.otherMember?.imageUrl}
			name={(chat?.isGroup ? chat?.name : chat?.otherMember?.username) || ""}
			options={
				chat?.isGroup
					? [
							{
								label: "Leave group",
								destructive: false,
								onClick: () => setLeaveGroupDialogOpen(true),
							},
							{
								label: "Delete group",
								destructive: true,
								onClick: () => setDeleteGroupDialogOpen(true),
							},
						]
					: [
							{
								label: "Remove friend",
								destructive: true,
								onClick: () => setRemoveFriendDialogOpen(true),
							},
						]
			}
			setCallType={setCallType}
		/>
	);

	return (
		<>
			<RemoveFriendDialog
				chatId={chatId}
				open={removeFriendDialogOpen}
				setOpen={setRemoveFriendDialogOpen}
			/>
			<DeleteGroupDialog
				chatId={chatId}
				open={deleteGroupDialogOpen}
				setOpen={setDeleteGroupDialogOpen}
			/>
			<LeaveGroupDialog
				chatId={chatId}
				open={leaveGroupDialogOpen}
				setOpen={setLeaveGroupDialogOpen}
			/>

			<div className="flex flex-col h-full w-full">
				<div className="flex-shrink-0 z-10 bg-background sticky top-0">
					{header()}
				</div>
				<div className="flex-1 overflow-hidden min-h-0 relative">
					<Body
						members={
							chat?.isGroup
								? chat?.otherMembers
									? chat?.otherMembers
									: []
								: chat?.otherMember
									? [chat?.otherMember]
									: []
						}
						callType={callType}
						setCallType={setCallType}
					/>
				</div>
				<div className="flex-shrink-0 z-10 bg-background sticky bottom-0">
					<ChatInput />
				</div>
			</div>
		</>
	);
};

export default ChatPage;
