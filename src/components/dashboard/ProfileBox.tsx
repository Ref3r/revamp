"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import CollaborationForm from "../chat-section/collab-request-form/CollaborationForm ";
import { X } from "lucide-react";

interface ProfileBoxProps {
  isPublicView?: boolean;
  userData?: any;
  isLoading?: boolean;
  error?: string;
}

const ProfileBox = ({
  isPublicView = false,
  userData,
  isLoading,
  error,
}: ProfileBoxProps) => {
  const [showForm, setShowForm] = useState(false);

  const toggleForm = () => {
    setShowForm(!showForm);
    if (!showForm) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  };

  // Use default placeholder or user data
  const username = userData?.email?.split("@")[0] || "Parry";
  const profilePic = userData?.profilePicture || "/profile-photo.svg";
  const bio =
    userData?.bio ||
    "Sometimes like to design, sometimes just like to create chaos";

  // If loading, show loading state
  if (isLoading) {
    return (
      <div className="w-full">
        <div className="bg-[#1A1919] rounded-[20px] p-4">
          <div className="flex justify-center items-center h-40">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-green-500"></div>
          </div>
        </div>
      </div>
    );
  }

  // If error, show error state
  if (error) {
    return (
      <div className="w-full">
        <div className="bg-[#1A1919] rounded-[20px] p-4">
          <div className="flex justify-center items-center h-40 flex-col">
            <p className="text-red-400 mb-2">Error loading profile</p>
            <p className="text-white text-sm">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="bg-[#1A1919] rounded-[20px] p-4">
        <div className="flex flex-col 2xl:hidden">
          <div className="flex flex-col items-center">
            <div className="mb-2">
              <Image
                src={profilePic}
                width={80}
                height={80}
                alt="Profile photo"
                className="rounded-full w-20 h-20"
              />
            </div>
            <div className="flex flex-col items-center mb-1">
              <h1 className="text-white font-bold text-xl">{username}</h1>
              <div className="border border-white rounded-full px-2 py-0.5 text-[8px] text-white bg-[#0E0E0E]">
                {userData?.followers?.length
                  ? `${userData.followers.length} followers`
                  : "Rank 49"}
              </div>
            </div>
            <p className="text-sm text-[#FFFFFF7A] font-normal text-center mb-2 max-w-[220px]">
              {bio}
            </p>
            {isPublicView && (
              <Button
                className="bg-gradient-to-r from-[#0BA360] to-[#27A980] hover:bg-gradient-to-r hover:from-[#27A980] hover:to-[#0BA360] text-white rounded-md font-medium text-sm px-4 py-2 mb-3"
                onClick={toggleForm}
              >
                Contact Creator
              </Button>
            )}
            <div className="flex items-center justify-center">
              <Image
                src="/gold-medal.svg"
                width={16}
                height={16}
                alt="Gold medal"
                className="mr-2"
              />
              <p className="text-white font-medium text-sm">
                Voted #1 in Design Community
              </p>
            </div>
          </div>
        </div>

        <div className="hidden 2xl:flex items-center gap-4">
          <Image
            src={profilePic}
            width={130}
            height={130}
            alt="Profile photo"
            className="rounded-full w-32 h-32"
          />
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <h1 className="text-white font-bold text-xl">{username}</h1>
              <div className="border border-white rounded-full px-2 py-0.5 text-[8px] text-white bg-[#0E0E0E]">
                {userData?.followers?.length
                  ? `${userData.followers.length} followers`
                  : "Rank 49"}
              </div>
            </div>
            <p className="text-sm text-[#FFFFFF7A] font-normal mt-2">{bio}</p>
            {isPublicView && (
              <Button
                className="bg-gradient-to-r from-[#0BA360] to-[#27A980] hover:bg-gradient-to-r hover:from-[#27A980] hover:to-[#0BA360] text-white rounded-md font-medium text-sm px-4 py-2 mt-2 mb-2 w-fit"
                onClick={toggleForm}
              >
                Contact Creator
              </Button>
            )}
            <div className="flex items-center mt-1">
              <Image
                src="/gold-medal.svg"
                width={16}
                height={16}
                alt="Gold medal"
                className="mr-2"
              />
              <p className="text-white font-medium text-xs">
                Voted #1 in Design Community
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Collaboration Form Slide-in Panel */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 flex justify-end">
          <div className="fixed top-0 right-0 h-full bg-[#0E0E0E] shadow-lg z-50 w-full max-w-md sm:max-w-lg md:max-w-xl overflow-y-auto flex flex-col animate-slide-in">
            <div className="p-8">
              <CollaborationForm isFromChat={false} onClose={toggleForm} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileBox;
