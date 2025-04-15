import { UploadDropzone } from "@/lib/uploadthing";
import React from "react";
import { Json } from "@uploadthing/shared";
import { toast } from "sonner";
import { UploadThingError } from "uploadthing/server";

type Props = {
	onChange: (urls: string[]) => void;
	type: "image" | "file";
};

const Uploader = ({ onChange, type }: Props) => {
	return (
		<UploadDropzone
			endpoint={type}
			onClientUploadComplete={(res) => {
				console.log(res);
				onChange(res.map((item) => item?.url));
			}}
			onUploadError={(error: UploadThingError<Json>) => {
				console.log(error);
				toast.error(error.message);
			}}
		/>
	);
};

export default Uploader;
