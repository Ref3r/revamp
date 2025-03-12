"use client";
import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Button, Input } from "@lemonsqueezy/wedges";

const Homefeed = () => {
  const [recording, setRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [postText, setPostText] = useState("");
  const [recordingTime, setRecordingTime] = useState(0);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Handle file upload
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = event.target.files ? event.target.files[0] : null;
    if (uploadedFile) {
      setFileName(uploadedFile.name);
      // Update the post text to include file name
      setPostText((prev) =>
        prev
          ? `${prev}\nAttached: ${uploadedFile.name}`
          : `Attached: ${uploadedFile.name}`
      );
      console.log("File uploaded:", uploadedFile);
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

          setPostText((prev) =>
            prev
              ? `${prev}\nAudio recording attached`
              : `Audio recording attached`
          );

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
            <label className="bg-[#282828] hover:bg-[#383838] p-1 cursor-pointer rounded">
              <Input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(event) =>
                  handleFileUpload(event as React.ChangeEvent<HTMLInputElement>)
                }
              />
              <Image
                src="/add-photos.svg"
                width={20}
                height={20}
                alt="Add photos"
              />
            </label>

            {/* Voice recording button */}
            <Button
              onClick={handleRecordAudio}
              className={`${
                recording ? "bg-red-600" : "bg-[#282828] hover:bg-[#383838]"
              } p-1 rounded flex items-center`}
            >
              {recording ? (
                <>
                  <div className="w-5 h-5 flex items-center justify-center">
                    <div className="w-3 h-3 bg-white rounded-sm"></div>
                  </div>
                  <span className="ml-1 text-xs text-white">
                    {formatTime(recordingTime)}
                  </span>
                </>
              ) : (
                <Image
                  src="/mic.svg"
                  width={20}
                  height={20}
                  alt="Voice recording"
                />
              )}
            </Button>
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
      </div>
    </div>
  );
};

export default Homefeed;
