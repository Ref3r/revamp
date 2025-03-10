"use client";

import { useState } from "react";
import Image from "next/image";

interface Chat {
  id: number;
  name: string;
  avatar: string;
  lastMessage: string;
  lastSeen: string;
}

interface ChatListProps {
  chats: Chat[];
  activeTab: string;
  selectedChat: number | null;
  onSelectChat: (id: number) => void;
  setActiveTab: (tab: string) => void;
}

export default function ChatList({
  chats,
  activeTab,
  selectedChat,
  onSelectChat,
  setActiveTab,
}: ChatListProps) {
  return (
    <div className="h-full bg-[#1A191933] border-r border-[#28282800] w-full max-w-[28rem]">
      <div className="flex flex-col h-full">
        {/* Header Section */}
        <div className="p-3 sm:p-4 lg:p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h1 className="text-lg sm:text-xl lg:text-2xl font-semibold">
              Chats
            </h1>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 overflow-x-auto scrollbar-hide">
            <button
              onClick={() => setActiveTab("general")}
              className={`
                px-4 py-2 rounded-full text-sm transition-all duration-200
                flex items-center justify-center min-w-[5rem]
                ${
                  activeTab === "general"
                    ? "bg-[#292928] text-white"
                    : "text-gray-400  border-2 border-[#414140] "
                }
              `}
            >
              General
            </button>
            <button
              onClick={() => setActiveTab("collaborations")}
              className={`
                px-4 py-2 rounded-full text-sm transition-all duration-200
                flex items-center justify-center min-w-[5rem]
                ${
                  activeTab === "collaborations"
                    ? "bg-[#292928] text-white"
                    : "text-gray-400  border-2 border-[#414140]"
                }
              `}
            >
              Collaborations
            </button>
          </div>
        </div>

        {/* Chat List Section */}
        <div className="flex-1 overflow-y-auto px-3 sm:px-4 lg:px-6 pb-4">
          <div className="space-y-2">
            {chats.map((chat) => (
              <button
                key={chat.id}
                className={`
                  w-full flex items-center gap-3 p-3 rounded-xl
                  transition-all duration-200 outline-none
                  ${
                    selectedChat === chat.id
                      ? "bg-[#DBDBDB0A]"
                      : "hover:bg-[#DBDBDB0A]/50"
                  }
                `}
                onClick={() => onSelectChat(chat.id)}
              >
                {/* Avatar */}
                <div className="relative flex-shrink-0">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden">
                    <Image
                      src={chat.avatar}
                      alt={chat.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 40px, 48px"
                    />
                  </div>
                </div>

                {/* Chat Info */}
                <div className="flex-1 min-w-0 text-left">
                  <h3 className="font-medium text-sm sm:text-base truncate">
                    {chat.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-400 truncate mt-0.5">
                    {chat.lastMessage}
                  </p>
                </div>

                {/* Last Seen */}
                <span className="text-xs text-gray-500 flex-shrink-0 hidden sm:block">
                  {chat.lastSeen}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
