"use client";

import { cn } from "@/lib/utils";
import { Upload, X, File, ImageIcon, Video, FileText } from "lucide-react";
import type React from "react";
import { useRef, useState } from "react";
import { Button } from "./button";

interface FileUploadProps {
	onChange?: (files: File[]) => void;
	accept?: string;
	multiple?: boolean;
	maxSize?: number; // in MB
}

export const FileUpload = ({
	onChange,
	accept,
	multiple = true,
	maxSize = 10,
}: FileUploadProps) => {
	const [files, setFiles] = useState<File[]>([]);
	const [isDragOver, setIsDragOver] = useState(false);
	const fileInputRef = useRef<HTMLInputElement>(null);

	const getFileIcon = (file: File) => {
		if (file.type.startsWith("image/"))
			return <ImageIcon className="h-4 w-4" />;
		if (file.type.startsWith("video/")) return <Video className="h-4 w-4" />;
		if (file.type.includes("pdf") || file.type.includes("document"))
			return <FileText className="h-4 w-4" />;
		return <File className="h-4 w-4" />;
	};

	const formatFileSize = (bytes: number) => {
		if (bytes === 0) return "0 Bytes";
		const k = 1024;
		const sizes = ["Bytes", "KB", "MB", "GB"];
		const i = Math.floor(Math.log(bytes) / Math.log(k));
		return (
			Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
		);
	};

	const validateFile = (file: File) => {
		if (maxSize && file.size > maxSize * 1024 * 1024) {
			return `File size must be less than ${maxSize}MB`;
		}
		return null;
	};

	const handleFileChange = (newFiles: File[]) => {
		const validFiles: File[] = [];
		const errors: string[] = [];

		newFiles.forEach((file) => {
			const error = validateFile(file);
			if (error) {
				errors.push(`${file.name}: ${error}`);
			} else {
				validFiles.push(file);
			}
		});

		if (errors.length > 0) {
			// You can show these errors in a toast or alert
			console.error("File validation errors:", errors);
		}

		const updatedFiles = multiple ? [...files, ...validFiles] : validFiles;
		setFiles(updatedFiles);
		if (onChange) {
			onChange(updatedFiles);
		}
	};

	const removeFile = (indexToRemove: number) => {
		const updatedFiles = files.filter((_, index) => index !== indexToRemove);
		setFiles(updatedFiles);
		if (onChange) {
			onChange(updatedFiles);
		}
	};

	const clearAllFiles = () => {
		setFiles([]);
		if (onChange) {
			onChange([]);
		}
	};

	const handleClick = () => {
		fileInputRef.current?.click();
	};

	const handleDragOver = (e: React.DragEvent) => {
		e.preventDefault();
		setIsDragOver(true);
	};

	const handleDragLeave = (e: React.DragEvent) => {
		e.preventDefault();
		setIsDragOver(false);
	};

	const handleDrop = (e: React.DragEvent) => {
		e.preventDefault();
		setIsDragOver(false);
		const droppedFiles = Array.from(e.dataTransfer.files);
		handleFileChange(droppedFiles);
	};

	return (
		<div className="w-full space-y-4">
			<input
				ref={fileInputRef}
				type="file"
				multiple={multiple}
				accept={accept}
				onChange={(e) => handleFileChange(Array.from(e.target.files || []))}
				className="hidden"
			/>

			{/* Upload Zone */}
			<div
				onClick={handleClick}
				onDragOver={handleDragOver}
				onDragLeave={handleDragLeave}
				onDrop={handleDrop}
				className={cn(
					"relative border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all duration-300",
					isDragOver
						? "border-primary bg-primary/5 dark:bg-primary/10"
						: "border-gray-300 dark:border-gray-600 hover:border-primary/50 hover:bg-gray-50 dark:hover:bg-gray-800/50"
				)}
			>
				<div className="flex flex-col items-center gap-4">
					<div
						className={cn(
							"p-3 rounded-full transition-all duration-300",
							isDragOver
								? "bg-primary/20 text-primary"
								: "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-primary/10 hover:text-primary"
						)}
					>
						<Upload className="h-6 w-6" />
					</div>
					<div className="space-y-2">
						<p className="text-sm font-medium text-gray-900 dark:text-gray-100">
							{isDragOver
								? "Drop files here"
								: "Click to upload or drag and drop"}
						</p>
						<p className="text-xs text-gray-500 dark:text-gray-400">
							{accept
								? `Supported formats: ${accept}`
								: "All file types supported"}{" "}
							• Max {maxSize}MB per file
						</p>
					</div>
				</div>
			</div>

			{/* Selected Files */}
			{files.length > 0 && (
				<div className="space-y-3">
					<div className="flex items-center justify-between">
						<span className="text-sm font-medium text-gray-700 dark:text-gray-300">
							Selected Files ({files.length})
						</span>
						<Button
							variant="outline"
							size="sm"
							onClick={clearAllFiles}
							className="h-8 px-3 rounded-lg bg-transparent hover:bg-red-50 hover:border-red-200 hover:text-red-600 transition-all duration-200"
						>
							<X className="h-3 w-3 mr-1" />
							Clear All
						</Button>
					</div>

					<div className="space-y-2 max-h-60 overflow-y-auto">
						{files.map((file, index) => (
							<div
								key={`${file.name}-${index}`}
								className="flex items-center gap-3 p-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-xl hover:shadow-md transition-all duration-300"
							>
								<div className="flex-shrink-0 p-2 bg-gray-100 dark:bg-gray-700 rounded-lg text-gray-600 dark:text-gray-400">
									{getFileIcon(file)}
								</div>

								<div className="flex-1 min-w-0">
									<p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
										{file.name}
									</p>
									<div className="flex items-center gap-3 mt-1">
										<span className="text-xs text-gray-500 dark:text-gray-400">
											{formatFileSize(file.size)}
										</span>
										<span className="text-xs text-gray-500 dark:text-gray-400">
											{new Date(file.lastModified).toLocaleDateString()}
										</span>
									</div>
								</div>

								<Button
									variant="outline"
									size="sm"
									onClick={() => removeFile(index)}
									className="h-8 w-8 p-0 rounded-lg hover:bg-red-50 hover:border-red-200 hover:text-red-600 transition-all duration-200"
								>
									<X className="h-3 w-3" />
								</Button>
							</div>
						))}
					</div>
				</div>
			)}
		</div>
	);
};
