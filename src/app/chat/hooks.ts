"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-hot-toast";
import { RoomType } from "@/types/socket";
import { DirectChatResponse } from "@/types/chat.type";
import { useAuth } from "@/contexts/AuthContext";
import { useWebSocket } from "@/lib/websocket/websocket.context";
import { getDirectChats } from "@/services/chatService";
import { handleImageUrl } from "@/utils/placeholder";

export interface ChatMessage {
  id: string;
  content: string;
  sender: "self" | "other";
  timestamp: string;
  imageUrl?: boolean;
  fileUrl?: boolean;
  fileName?: string;
}

export interface Chat {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  lastSeen: string;
  messages: ChatMessage[];
  isTyping?: boolean;
}

// User type definition
export interface User {
  _id: string;
  name: string;
  email: string;
  profilePicture?: string;
}

// Tab types for better type safety
type ChatTab = "general" | "collaborations";

export const useResponsiveLayout = () => {
  const [isMobileView, setIsMobileView] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return { isMobileView };
};

export const useChatManagement = () => {
  const [activeTab, setActiveTab] = useState<ChatTab>("general");
  const [selectedChat, setSelectedChat] = useState<string | null>(null);
  const [chats, setChats] = useState<Chat[]>([]);
  const [collaborationChats, setCollaborationChats] = useState<Chat[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [authError, setAuthError] = useState(false);

  const { user } = useAuth();
  const { socket, isConnected, joinChatRoom, leaveChatRoom, sendChatMessage } =
    useWebSocket();
  const searchParams = useSearchParams();
  const router = useRouter();
  const recipientIdParam = searchParams.get("recipientId");

  // Helper to update chat with the last message info
  const updateLastMessage = (updatedChat: Chat): Chat => {
    if (!updatedChat.messages || updatedChat.messages.length === 0)
      return updatedChat;

    const lastMessage = updatedChat.messages[updatedChat.messages.length - 1];
    let lastMessageText = lastMessage.content;

    if (lastMessage.imageUrl && !lastMessage.content) {
      lastMessageText = "Sent an image";
    } else if (lastMessage.fileUrl && !lastMessage.content) {
      lastMessageText = `Sent a file: ${lastMessage.fileName}`;
    }

    if (lastMessageText.length > 30) {
      lastMessageText = lastMessageText.substring(0, 30) + "...";
    }

    return {
      ...updatedChat,
      lastMessage: lastMessageText,
      lastSeen:
        lastMessage.sender === "other" ? "Just now" : updatedChat.lastSeen,
    };
  };

  // Transform API chat data to UI format
  const formatAPIChatsToUIFormat = useCallback(
    (apiChats: DirectChatResponse[]): Chat[] => {
      if (!user) return [];
      
      console.log("Current user ID:", user._id);
      
      return apiChats.map((chat) => ({
        id: chat.userId,
        name: chat.userName,
        avatar: handleImageUrl(chat.profilePicture, chat.userName),
        lastMessage: chat.lastMessage?.content || "Start a conversation...",
        lastSeen: chat.online
          ? "Online"
          : chat.lastSeen
          ? new Date(chat.lastSeen).toLocaleString()
          : "Offline",
        messages: (chat.messages || []).map((msg: any) => {
          // Properly handle the message sender by checking its sender._id field
          // Check if the message sender ID matches the current user ID
          const senderIsCurrentUser = msg.sender?._id === user._id;
          
          console.log("Message:", {
            id: msg._id,
            content: msg.content,
            senderID: msg.sender?._id,
            userID: user._id,
            isSelf: senderIsCurrentUser
          });
          
          return {
            id: msg._id,
            content: msg.content,
            sender: senderIsCurrentUser ? "self" : "other",
            timestamp: new Date(msg.createdAt).toLocaleTimeString(),
            imageUrl: msg.type === "image",
            fileUrl: msg.type === "file",
            fileName: msg.metadata?.fileName,
          };
        }),
      }));
    },
    [user]
  );

  // Load chats from API
  const loadChats = useCallback(async () => {
    if (!user) {
      setAuthError(true);
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      setAuthError(false);
      const directChatsResponse = await getDirectChats();
      const formattedChats = formatAPIChatsToUIFormat(directChatsResponse);

      setChats(formattedChats);

      // Handle recipient from URL parameter
      if (recipientIdParam) {
        const existingChatIndex = formattedChats.findIndex(
          (chat) => chat.id === recipientIdParam
        );

        if (existingChatIndex >= 0) {
          setSelectedChat(recipientIdParam);
        } else {
          // Create empty chat for new conversation
          const newChat: Chat = {
            id: recipientIdParam,
            name: "New Conversation",
            avatar: "/profile.svg",
            lastMessage: "Start a conversation...",
            lastSeen: "Offline",
            messages: [],
          };

          setChats([newChat, ...formattedChats]);
          setSelectedChat(recipientIdParam);
        }
      }
    } catch (error: any) {
      console.error("Error loading chats:", error);

      if (error.response && error.response.status === 401) {
        setAuthError(true);
        toast.error("Please login to access your chats");
      } else {
        toast.error("Failed to load your conversations");
      }
    } finally {
      setIsLoading(false);
    }
  }, [user, recipientIdParam, formatAPIChatsToUIFormat]);

  // Handle message updates from ChatWindow
  const handleChatUpdate = (updatedChat: Chat) => {
    const formattedChat = updateLastMessage(updatedChat);

    if (activeTab === "general") {
      setChats((prevChats) => {
        const chatIndex = prevChats.findIndex(
          (chat) => chat.id === formattedChat.id
        );

        if (chatIndex === -1) return [...prevChats, formattedChat];

        const newChats = [...prevChats];
        const previousChat = prevChats[chatIndex];
        newChats[chatIndex] = formattedChat;

        // Check if a new message was added
        const prevMessages = previousChat.messages;
        const currentMessages = formattedChat.messages;

        if (currentMessages.length > prevMessages.length) {
          const newMessage = currentMessages[currentMessages.length - 1];
          console.log("New message detected:", newMessage);

          // Double-check sender - ensure it's marked as "self" since this update came from our UI
          if (newMessage.sender !== "self") {
            console.log("Correcting message sender to 'self'");
            newMessage.sender = "self";
          }

          // Only send via WebSocket if it's from the current user
          if (newMessage.sender === "self" && user) {
            const roomId = [user._id, formattedChat.id.toString()]
              .sort()
              .join("-");

            // Create a unique message ID if none exists
            const messageId = newMessage.id || `msg_${Date.now()}`;
            
            // Prevent duplicate sends - mark this message as being sent
            const messageSendKey = `sent_${messageId}`;
            if (!localStorage.getItem(messageSendKey)) {
              localStorage.setItem(messageSendKey, "true");
              
              console.log("Sending message via WebSocket:", {
                content: newMessage.content,
                senderId: user._id,
                messageId,
                recipientId: formattedChat.id
              });
              
              sendChatMessage({
                content: newMessage.content,
                senderId: user._id,
                messageId, // Ensure we have a message ID to track
                recipientId: formattedChat.id, // Add recipient ID explicitly
                roomId,
                roomType: RoomType.DIRECT,
              });
            } else {
              console.log("Skipping duplicate send for message:", messageId);
            }
          }
        }

        return newChats;
      });
    } else {
      setCollaborationChats((prevChats) =>
        prevChats.map((chat) =>
          chat.id === formattedChat.id ? formattedChat : chat
        )
      );
    }
  };

  // Select a chat
  const handleSelectChat = (id: string) => {
    setSelectedChat(id);
  };

  // Go back from chat view on mobile
  const handleBack = () => {
    setSelectedChat(null);
  };

  // Get currently displayed chats based on active tab
  const getDisplayChats = () => {
    return activeTab === "collaborations" ? collaborationChats : chats;
  };

  // Get currently selected chat
  const getCurrentChat = () => {
    const displayChats = getDisplayChats();
    return displayChats.find((chat) => chat.id === selectedChat);
  };

  return {
    activeTab,
    setActiveTab,
    selectedChat,
    chats,
    collaborationChats,
    isLoading,
    authError,
    user,
    loadChats,
    handleChatUpdate,
    handleSelectChat,
    handleBack,
    getDisplayChats,
    getCurrentChat,
    setChats,
  };
};
