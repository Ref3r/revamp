/** @format */

"use client";
import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Button, Input } from "@lemonsqueezy/wedges";
import { createPost } from "@/services/postService";
import { toast } from "react-hot-toast";
import { PlusCircle, ImagePlus, Mic, Settings } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface HomefeedProps {
	onPostCreated?: () => void;
}

const Homefeed = ({ onPostCreated }: HomefeedProps) => {
	const [recording, setRecording] = useState(false);
	const [audioBlob, setAudioBlob] = useState<string | null>(null);
	const [postText, setPostText] = useState("");
	const [recordingTime, setRecordingTime] = useState(0);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);
	const [tags, setTags] = useState<string[]>([]);
	const [tagInput, setTagInput] = useState("");
	const [showAdvancedOptions, setShowAdvancedOptions] = useState(false);
	const [visibility, setVisibility] = useState<
		"public" | "private" | "friends"
	>("public");
	const [locationName, setLocationName] = useState("");
	const [coordinates, setCoordinates] = useState<{
		latitude: number;
		longitude: number;
	} | null>(null);

	const queryClient = useQueryClient();

	const mediaRecorderRef = useRef<MediaRecorder | null>(null);
	const chunksRef = useRef<Blob[]>([]);
	const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

	// Handle file upload
	const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
		const uploadedFile = event.target.files ? event.target.files[0] : null;
		if (uploadedFile) {
			// In a real implementation, you would upload the file to a storage service
			// and get back a URL. For now, we'll simulate this with a placeholder URL
			const fileUrl = `https://example.com/${uploadedFile.name}`;
			setUploadedFiles([...uploadedFiles, fileUrl]);
		}
	};

	// Timer for recording
	useEffect(() => {
		if (recording) {
			timerRef.current = setInterval(() => {
				setRecordingTime((prevTime) => prevTime + 1);
			}, 1000);
		} else {
			if (timerRef.current !== null) {
				clearInterval(timerRef.current);
			}
			setRecordingTime(0);
		}

		return () => {
			if (timerRef.current !== null) {
				clearInterval(timerRef.current);
			}
		};
	}, [recording]);

	// Format time to MM:SS
	const formatTime = (timeInSeconds: number) => {
		const minutes = Math.floor(timeInSeconds / 60);
		const seconds = timeInSeconds % 60;
		return `${minutes.toString().padStart(2, "0")}:${seconds
			.toString()
			.padStart(2, "0")}`;
	};

	// Handle recording start/stop
	const handleRecordAudio = async () => {
		if (!recording) {
			try {
				const stream = await navigator.mediaDevices.getUserMedia({
					audio: true,
				});
				mediaRecorderRef.current = new MediaRecorder(stream);
				mediaRecorderRef.current.start();

				mediaRecorderRef.current.ondataavailable = (event) => {
					chunksRef.current.push(event.data);
				};

				mediaRecorderRef.current.onstop = () => {
					const blob = new Blob(chunksRef.current, { type: "audio/webm" });
					const audioUrl = URL.createObjectURL(blob);
					setAudioBlob(audioUrl);
					chunksRef.current = [];

					// In a real implementation, you would upload the audio to a storage service
					// and get back a URL. For now, we'll simulate this with the local audioUrl
					const audioFileUrl = `https://example.com/audio-recording-${Date.now()}.webm`;
					setUploadedFiles([...uploadedFiles, audioFileUrl]);

					console.log("Audio recorded:", blob);
				};

				setRecording(true);
			} catch (err) {
				console.error("Error accessing microphone:", err);
			}
		} else {
			mediaRecorderRef.current?.stop();
			setRecording(false);
		}
	};

	// Add tag to the post
	const handleAddTag = () => {
		if (tagInput && !tags.includes(tagInput)) {
			setTags([...tags, tagInput]);
			setTagInput("");
		}
	};

	// Remove tag from the post
	const handleRemoveTag = (tagToRemove: string) => {
		setTags(tags.filter((tag) => tag !== tagToRemove));
	};

	// Get current location
	const handleGetLocation = () => {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(
				(position) => {
					setCoordinates({
						latitude: position.coords.latitude,
						longitude: position.coords.longitude,
					});
					setLocationName("Current Location"); // This would be replaced with a reverse geocoding service
				},
				(error) => {
					console.error("Error getting location:", error);
					toast.error("Could not get your location");
				}
			);
		} else {
			toast.error("Geolocation is not supported by your browser");
		}
	};

	const { mutate: handleSubmitPost } = useMutation({
		mutationKey: ["createPost"],
		mutationFn: async () =>
			await createPost({
				content: postText,
				media: uploadedFiles.length > 0 ? uploadedFiles : undefined,
				tags: tags.length > 0 ? tags : undefined,
				location:
					locationName && coordinates
						? {
								name: locationName,
								coordinates: coordinates,
						  }
						: undefined,
				visibility: visibility,
			}),

		onSuccess: (data) => {
			if (data.success) {
				toast.success("Post created successfully!");
				setPostText("");
				setUploadedFiles([]);
				setTags([]);
				setAudioBlob(null);
				setLocationName("");
				setCoordinates(null);
				setVisibility("public");
				setShowAdvancedOptions(false);

				// Invalidate queries to refresh the post list
				queryClient.invalidateQueries({
					queryKey: ["posts"],
				});

				// Notify parent component that a post was created
				if (onPostCreated) {
					onPostCreated();
				}
			} else {
				toast.error(data.message);
			}
		},

		onError: (error) => {
			console.error("Error submitting post:", error);
			toast.error("Failed to create post. Please try again.");
		},
	});

	return (
		<div className="w-full">
			<div className="bg-[#1A1919] rounded-[20px] p-4">
				<div className="mb-4">
					<h1 className="font-medium text-lg text-[#FFFFFF7A]">Home Feed</h1>
				</div>
				<div className="relative">
					<textarea
						placeholder="Create a new cool post.."
						className="focus:outline-none w-full h-20 bg-[#282828] text-white placeholder-white placeholder:font-normal placeholder:text-sm rounded-[20px] p-4 resize-none"
						value={postText}
						onChange={(e) => setPostText(e.target.value)}
					></textarea>
					<div className="absolute bottom-3 left-4 flex space-x-2 items-center">
						{/* File upload button */}
						<label className="bg-[#282828] hover:bg-[#383838] p-2 cursor-pointer rounded flex items-center justify-center">
							<Input
								type="file"
								accept="image/*,video/*"
								className="hidden"
								onChange={(event) =>
									handleFileUpload(event as React.ChangeEvent<HTMLInputElement>)
								}
							/>
							<ImagePlus size={18} className="text-white" />
						</label>

						{/* Voice recording button */}
						<Button
							onClick={handleRecordAudio}
							className={`${
								recording ? "bg-red-600" : "bg-[#282828] hover:bg-[#383838]"
							} p-2 rounded flex items-center justify-center`}
						>
							{recording ? (
								<>
									<div className="w-4 h-4 flex items-center justify-center">
										<div className="w-2 h-2 bg-white rounded-sm"></div>
									</div>
									<span className="ml-1 text-xs text-white">
										{formatTime(recordingTime)}
									</span>
								</>
							) : (
								<Mic size={18} className="text-white" />
							)}
						</Button>

						{/* Toggle advanced options button */}
						{/* <Button
							onClick={() => setShowAdvancedOptions(!showAdvancedOptions)}
							className="bg-[#282828] hover:bg-[#383838] p-2 rounded flex items-center justify-center"
						>
							<Settings size={18} className="text-white" />
						</Button> */}
					</div>

					{/* Show the recorded audio (audio preview) */}
					{audioBlob && (
						<div className="mt-4">
							<audio controls className="w-full">
								<source src={audioBlob} type="audio/webm" />
								Your browser does not support the audio element.
							</audio>
						</div>
					)}
				</div>

				{/* Display uploaded file names */}
				{uploadedFiles.length > 0 && (
					<div className="mt-3 flex flex-wrap gap-2">
						{uploadedFiles.map((file, index) => (
							<div
								key={index}
								className="bg-[#282828] text-white text-xs py-1 px-2 rounded-full flex items-center"
							>
								<span>{file.split("/").pop()}</span>
								<Button
									onClick={() =>
										setUploadedFiles(
											uploadedFiles.filter((_, i) => i !== index)
										)
									}
									className="ml-1 text-red-400 hover:text-red-500"
								>
									×
								</Button>
							</div>
						))}
					</div>
				)}

				{/* Advanced options */}
				{showAdvancedOptions && (
					<div className="mt-4 space-y-3 bg-[#282828] p-3 rounded-lg">
						{/* Tags */}
						<div>
							<label className="text-white text-sm mb-1 block">Tags</label>
							<div className="flex items-center">
								<Input
									type="text"
									value={tagInput}
									onChange={(e) =>
										setTagInput((e.target as HTMLInputElement).value)
									}
									onKeyDown={(e) => e.key === "Enter" && handleAddTag()}
									placeholder="Add a tag"
									className="bg-[#1A1919] text-white text-sm border-none focus:outline-none rounded"
								/>
								<Button
									onClick={handleAddTag}
									className="ml-2 bg-[#00B24E] hover:bg-[#00A047] text-white text-sm px-2 py-1 rounded"
								>
									Add
								</Button>
							</div>
							{tags.length > 0 && (
								<div className="flex flex-wrap gap-2 mt-2">
									{tags.map((tag) => (
										<div
											key={tag}
											className="bg-[#1A1919] text-white text-xs py-1 px-2 rounded-full flex items-center"
										>
											<span>#{tag}</span>
											<Button
												onClick={() => handleRemoveTag(tag)}
												className="ml-1 text-red-400 hover:text-red-500"
											>
												×
											</Button>
										</div>
									))}
								</div>
							)}
						</div>

						{/* Location */}
						<div>
							<label className="text-white text-sm mb-1 block">Location</label>
							<div className="flex items-center">
								<Input
									type="text"
									value={locationName}
									onChange={(e) =>
										setLocationName((e.target as HTMLInputElement).value)
									}
									placeholder="Add a location"
									className="bg-[#1A1919] text-white text-sm border-none focus:outline-none rounded"
								/>
								<Button
									onClick={handleGetLocation}
									className="ml-2 bg-[#1A1919] hover:bg-[#282828] text-white text-sm px-2 py-1 rounded flex items-center justify-center"
								>
									<PlusCircle size={16} className="text-white" />
								</Button>
							</div>
						</div>

						{/* Visibility */}
						<div>
							<label className="text-white text-sm mb-1 block">
								Visibility
							</label>
							<div className="flex gap-3">
								<Button
									onClick={() => setVisibility("public")}
									className={`text-white text-sm py-1 px-3 rounded ${
										visibility === "public" ? "bg-[#00B24E]" : "bg-[#1A1919]"
									}`}
								>
									Public
								</Button>
								<Button
									onClick={() => setVisibility("friends")}
									className={`text-white text-sm py-1 px-3 rounded ${
										visibility === "friends" ? "bg-[#00B24E]" : "bg-[#1A1919]"
									}`}
								>
									Friends
								</Button>
								<Button
									onClick={() => setVisibility("private")}
									className={`text-white text-sm py-1 px-3 rounded ${
										visibility === "private" ? "bg-[#00B24E]" : "bg-[#1A1919]"
									}`}
								>
									Private
								</Button>
							</div>
						</div>
					</div>
				)}

				{/* Post button */}
				<div className="mt-4 flex justify-end">
					<Button
						onClick={() => handleSubmitPost()}
						disabled={isSubmitting || !postText.trim()}
						className="bg-[#00B24E] hover:bg-[#00A047] text-white px-4 py-2 rounded-lg"
					>
						{isSubmitting ? "Posting..." : "Post"}
					</Button>
				</div>
			</div>
		</div>
	);
};

export default Homefeed;
