import Image from "next/image";
import React from "react";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import FallbackImage from "./fallback-image";
import { useContentTypes } from "@/hooks/use-content-types";

type Props = {
	urls: string[];
};

const ImagePreview = ({ urls }: Props) => {
	const contentTypes = useContentTypes(urls);
	// const isVideoo = contentTypes[url]?.startsWith("video");
	const isVideoFile = (url: string) => {
		return contentTypes[url]?.startsWith("video");
	};
	return (
		<div
			className={cn("grid gap-2 justify-items-start", {
				"grid-cols-1": urls.length == 1,
				"grid-cols-2": urls.length > 1,
			})}
		>
			{urls.map((url, index) => {
				// const isVideo = isVideoFile(url);
				const isVideo = contentTypes[url]?.startsWith("video");
				return (
					<Dialog key={index}>
						<div
							className={cn("relative cursor-pointer", {
								"w-28 h-28 max-w-full": !isVideo,
							})}
						>
							<DialogTrigger asChild>
								{isVideo ? (
									<div className="aspect-w-16 aspect-h-9 h-full p-2 max-w-sm">
										<video
											poster={url}
											className="object-cover w-full h-full rounded-md"
										>
											<source src={`${url}#t=0.1`} type="video/mp4" />
										</video>
									</div>
								) : (
									<FallbackImage
										src={url}
										alt="Uploaded_image"
										referrerPolicy="no-referrer"
										className="rounded-md"
										fill
										objectFit="cover"
										// width={300}
										fallbackSrc="https://www.lighting.philips.com.tr/content/dam/b2b-philips-lighting/ecat-fallback.png?wid=375&hei=375&qlt=82"
									/>
								)}
							</DialogTrigger>
							<DialogContent>
								<DialogHeader>
									<DialogTitle>
										{isVideo ? "Video Preview" : "Image Preview"}
									</DialogTitle>
								</DialogHeader>
								<div className="w-full h-96 relative flex items-center justify-center">
									{isVideoFile(url) ? (
										<video controls poster={url} className="w-full h-full">
											<source src={`${url}#t=0.1`} type="video/mp4" />
										</video>
									) : (
										<Image
											src={url}
											alt={`Uploaded image`}
											referrerPolicy="no-referrer"
											layout="fill"
											objectFit="contain"
										/>
									)}
								</div>
							</DialogContent>
						</div>
					</Dialog>
				);
			})}
		</div>
	);
};

export default ImagePreview;
