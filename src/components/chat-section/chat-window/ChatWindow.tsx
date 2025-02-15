"use client";

import { useState } from "react";
import Image from "next/image";
import { DollarSign, Image as ImageIcon, Send, ArrowLeft } from "lucide-react";

interface Message {
  id: number;
  content: string;
  sender: "self" | "other";
  timestamp: string;
}

interface Chat {
  id: number;
  name: string;
  avatar: string;
  lastSeen: string;
  messages?: Message[];
}

interface ChatWindowProps {
  chat: Chat | undefined;
  activeTab: string;
  onBack: () => void;
}

export default function ChatWindow({ chat, activeTab, onBack }: ChatWindowProps) {
  const [newMessage, setNewMessage] = useState("");

  if (!chat) {
    return (
      <div className="flex-1 bg-[#0f0e0f] flex items-center justify-center h-[100dvh] md:h-full">
        <p className="text-gray-400 text-sm sm:text-base md:text-lg px-4 text-center">
          Select a chat to start messaging
        </p>
      </div>
    );
  }

  return (
    <div className="flex-1 bg-[#0f0e0f] flex flex-col h-[100dvh] md:h-full relative">
      {/* Header */}
      <div className="px-2 sm:px-4 lg:px-6 py-2 sm:py-4 border-b border-gray-800/50 backdrop-blur-sm bg-[#0f0e0f]/80 sticky top-0 z-10">
        <div className="flex items-center gap-2 sm:gap-4">
          <button 
            onClick={onBack}
            className="md:hidden p-1.5 sm:p-2 hover:bg-white/10 rounded-lg transition-colors"
            aria-label="Go back"
          >
            <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
          
          <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
            <div className="relative w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 flex-shrink-0">
              <Image
                src={chat.avatar}
                alt={chat.name}
                fill
                className="rounded-full object-cover"
                sizes="(max-width: 640px) 32px, (max-width: 1024px) 40px, 48px"
              />
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="font-medium text-xs sm:text-base lg:text-lg truncate">
                {chat.name}
              </h2>
              <p className="text-[10px] sm:text-sm text-gray-400 truncate">
                Last seen {chat.lastSeen}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-2 sm:px-4 lg:px-6 py-3 sm:py-6 space-y-4 sm:space-y-6">
        {chat.messages?.map((message) => (
          <div
            key={message.id}
            className={`flex items-end gap-2 ${
              message.sender === "self" ? "justify-end" : "justify-start"
            }`}
          >
            {message.sender === "other" && (
              <div className="relative w-6 h-6 sm:w-8 sm:h-8 flex-shrink-0">
                <Image
                  src={chat.avatar}
                  alt={chat.name}
                  fill
                  className="rounded-full object-cover"
                  sizes="(max-width: 640px) 24px, 32px"
                />
              </div>
            )}
            
            <div
              className={`max-w-[80%] sm:max-w-[70%] lg:max-w-[60%] rounded-2xl px-3 sm:px-4 py-2 sm:py-3 ${
                message.sender === "self"
                  ? "bg-[#10B981] text-white rounded-tr-none"
                  : "bg-[#282828] text-white rounded-tl-none"
              }`}
            >
              <p className="break-words text-xs sm:text-base lg:text-lg">
                {message.content}
              </p>
              <span className="text-[8px] sm:text-xs text-gray-300/80 mt-1 block">
                {message.timestamp}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Input Area */}
      <div className="p-2 sm:p-4 lg:p-6 border-t border-gray-800/50 backdrop-blur-sm bg-[#0f0e0f]/80 sticky bottom-0">
        <div className="flex items-center gap-1.5 sm:gap-3">
          <button 
            className="p-1.5 sm:p-2 hover:bg-gray-800/50 rounded-lg transition-colors"
            aria-label="Add image"
          >
            <ImageIcon className="w-4 h-4 sm:w-6 sm:h-6 text-gray-400" />
          </button>
          
          {activeTab === "collaborations" && (
            <button 
              className="p-1.5 sm:p-2 hover:bg-gray-800/50 rounded-lg transition-colors"
              aria-label="Payment options"
            >
              <DollarSign className="w-4 h-4 sm:w-6 sm:h-6 text-gray-400" />
            </button>
          )}
          
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="Type message..."
              className="w-full bg-[#282828] text-white text-xs sm:text-base lg:text-lg rounded-xl px-3 sm:px-4 py-2 sm:py-3
                focus:outline-none focus:ring-2 focus:ring-green-500/50 transition-all"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
            />
          </div>

          <button 
            className="p-1.5 sm:p-2 hover:bg-gray-800/50 rounded-lg transition-colors"
            aria-label="Send message"
          >
            <Send className="w-4 h-4 sm:w-6 sm:h-6 text-gray-400" />
          </button>
        </div>
      </div>
    </div>
  );
}