import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { useContentTypes } from "@/hooks/use-content-types";
import { cn } from "@/lib/utils";
import { Eye, Play } from "lucide-react";
import Image from "next/image";
import FallbackImage from "./fallback-image";

type Props = {
	urls: string[];
};

const ImagePreview = ({ urls }: Props) => {
	const contentTypes = useContentTypes(urls);

	const isVideoFile = (url: string) => contentTypes[url]?.startsWith("video");

	return (
		<div
			className={cn("grid gap-3", {
				"grid-cols-1": urls.length === 1,
				"grid-cols-2": urls.length === 2,
				"grid-cols-2 sm:grid-cols-3": urls.length > 2,
			})}
		>
			{urls.map((url, index) => {
				const isVideo = isVideoFile(url);

				return (
					<Dialog key={index}>
						<DialogTrigger asChild>
							<div
								className={cn(
									"group relative overflow-hidden rounded-xl bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 cursor-pointer transition-all duration-300 hover:shadow-lg hover:shadow-black/10 dark:hover:shadow-white/5 hover:scale-[1.02] border border-slate-200 dark:border-slate-700/50",
									{
										"aspect-square w-48 h-48": !isVideo,
										"aspect-video w-64 h-36": isVideo,
									}
								)}
							>
								{/* Content */}
								{isVideo ? (
									<video
										poster={url}
										className="object-cover w-full h-full rounded-xl transition-transform duration-300 group-hover:scale-105"
										playsInline
										muted
									>
										<source src={`${url}#t=0.1`} type="video/mp4" />
									</video>
								) : (
									<FallbackImage
										src={url}
										alt="Uploaded image"
										referrerPolicy="no-referrer"
										className="object-cover rounded-xl transition-transform duration-300 group-hover:scale-105"
										fill
										objectFit="cover"
										fallbackSrc="https://www.lighting.philips.com.tr/content/dam/b2b-philips-lighting/ecat-fallback.png?wid=375&hei=375&qlt=82"
									/>
								)}
							</div>
						</DialogTrigger>

						<DialogContent className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 max-w-[90vw] max-h-[90vh] p-0 rounded-2xl overflow-hidden shadow-2xl">
							<DialogHeader className="p-4 pb-2 shrink-0">
								<DialogTitle className="text-xl font-semibold text-slate-900 dark:text-slate-100 flex items-center gap-2">
									{isVideo ? (
										<>
											<Play className="w-5 h-5 text-blue-600 dark:text-blue-400" />
											Video Preview
										</>
									) : (
										<>
											<Eye className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
											Image Preview
										</>
									)}
								</DialogTitle>
							</DialogHeader>

							<div className="flex-1 p-4 pt-0 overflow-hidden">
								<div className="relative w-full h-[75vh] bg-slate-50 dark:bg-slate-800 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700">
									{isVideo ? (
										<video
											controls
											poster={url}
											className="w-full h-full object-contain rounded-xl bg-black"
											controlsList="nodownload"
										>
											<source src={`${url}#t=0.1`} type="video/mp4" />
										</video>
									) : (
										<Image
											src={url}
											alt="Uploaded image"
											referrerPolicy="no-referrer"
											fill
											sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 75vw"
											style={{ objectFit: "contain" }}
											className="rounded-xl"
											quality={100}
										/>
									)}
								</div>
							</div>
						</DialogContent>
					</Dialog>
				);
			})}
		</div>
	);
};

export default ImagePreview;
