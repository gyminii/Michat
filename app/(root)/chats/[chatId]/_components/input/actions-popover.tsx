import { Button } from "@/components/ui/button";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { PopoverClose } from "@radix-ui/react-popover";
import { PlusCircle, Smile } from "lucide-react";
import React, { SetStateAction, useState } from "react";
import UploadFileDialog from "../dialogs/upload-file-dialog";

type Props = {
	setEmojiPickerOpen: (open: SetStateAction<boolean>) => void;
};

const ActionsPopover = ({ setEmojiPickerOpen }: Props) => {
	const [uploadFileDialogOpen, setUploadFileDialogOpen] = useState(false);
	const [uploadImageDialogOpen, setUploadImageDialogOpen] = useState(false);
	return (
		<Popover>
			<PopoverContent className="w-full mb-1 flex flex-col gap-2">
				<UploadFileDialog
					open={uploadFileDialogOpen}
					toggle={(newState) => setUploadFileDialogOpen(newState)}
					type="file"
				/>
				<UploadFileDialog
					open={uploadImageDialogOpen}
					toggle={(newState) => setUploadImageDialogOpen(newState)}
					type="image"
				/>
				<PopoverClose>
					<Button
						variant="outline"
						onClick={() => setEmojiPickerOpen(true)}
						size="icon"
					>
						<Smile />
					</Button>
				</PopoverClose>
			</PopoverContent>
			<PopoverTrigger asChild>
				<Button variant="secondary" size="icon">
					<PlusCircle />
				</Button>
			</PopoverTrigger>
		</Popover>
	);
};

export default ActionsPopover;
