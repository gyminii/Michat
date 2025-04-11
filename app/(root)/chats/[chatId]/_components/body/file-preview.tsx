import { Button } from "@/components/ui/button";
import { Paperclip } from "lucide-react";
import Link from "next/link";

type Props = {
	url: string;
};

const FilePreview = ({ url }: Props) => {
	return (
		<Link target="_blank" href={url}>
			<Button variant="ghost" className="mt-1 bg-transparent w-full">
				<Paperclip /> Attachment
			</Button>
		</Link>
	);
};

export default FilePreview;
