import { Paperclip } from "lucide-react";
import Link from "next/link";

type Props = {
	url: string;
};

const FilePreview = ({ url }: Props) => (
	<Link
		href={url}
		target="_blank"
		rel="noopener noreferrer"
		className="inline-block"
	>
		<div className="flex items-center gap-3 bg-black/50 rounded-xl px-4 py-3">
			<div className="p-2 bg-white/10 rounded-md">
				<Paperclip className="h-5 w-5 text-white/80" />
			</div>
			<div className="flex flex-col text-white">
				<p className="text-sm font-semibold leading-tight">Attachment</p>
				<p className="text-xs text-white/60">Click to preview</p>
			</div>
		</div>
	</Link>
);

export default FilePreview;
