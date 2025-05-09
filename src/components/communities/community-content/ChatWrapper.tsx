/** @format */

"use client";
import ChatWindow from "@/components/chat-section/chat-window/ChatWindow";

// Define types based on your existing code
export interface Message {
  id: number;
  content: string;
  sender: "self" | "other";
  timestamp: string;
  imageUrl?: string;
  fileUrl?: string;
  fileName?: string;
}

export interface Chat {
  id: string;
  name: string;
  avatar: string;
  lastSeen: string;
  messages: Message[];
  communityId: string;
}

const ChatWindowWrapper = ({
  chat,
  activeTab,
  onBack,
  onChatUpdate,
  onSendMessage,
}: {
  chat: Chat;
  activeTab: string;
  onBack: () => void;
  onChatUpdate: (updatedChat: Chat) => void;
  onSendMessage: (chatId: string, content: string) => Promise<void>;
}) => {
  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden pb-16 md:pb-0">
      <ChatWindow
        chat={chat}
        activeTab={activeTab}
        onBack={onBack}
        onChatUpdate={() => onChatUpdate(chat)}
        onSendMessage={onSendMessage}
      />
    </div>
  );
};

export default ChatWindowWrapper;
