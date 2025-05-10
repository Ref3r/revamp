"use client";

import { useState, useEffect, useCallback } from "react";
import ChatList from "@/components/chat-section/chat-list/ChatList";
import ChatWindow from "@/components/chat-section/chat-window/ChatWindow";
import Sidebar from "@/components/dashboard/Sidebar";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-hot-toast";
import { ChatEventType, RoomType, SocketMessage } from "@/types/socket";
import { DirectChatResponse } from "@/types/chat.type";
import { useAuth } from "@/contexts/AuthContext";
import { useWebSocket } from "@/lib/websocket/websocket.context";
import { getDirectChats } from "@/services/chatService";
import { handleImageUrl } from "@/utils/placeholder";
import Link from "next/link";
import { Chat, ChatMessage, User, useResponsiveLayout , useChatManagement} from "./hooks";


// Custom hook for WebSocket event handling
const useWebSocketEvents = (
  user: User | null,
  setChats: React.Dispatch<React.SetStateAction<Chat[]>>
) => {
  const { socket, isConnected, joinChatRoom, leaveChatRoom } = useWebSocket();
  
  // Reference to joined chat rooms for cleanup
  const joinedRooms = new Set<string>();

  // Handle receiving messages via WebSocket
  useEffect(() => {
    if (!socket || !isConnected || !user) return;

    const handleReceiveMessage = (message: SocketMessage & { recipientId?: string }) => {
      console.log("WebSocket message received:", {
        messageId: message.messageId,
        content: message.content,
        senderId: message.senderId,
        myId: user._id,
        isMine: message.senderId === user._id,
        recipientId: message.recipientId
      });

      if (message.roomType === RoomType.DIRECT) {
        // Get the ID of the other user in the conversation
        const chatId = message.senderId === user._id ? message.recipientId : message.senderId;
        
        // Skip if we can't determine the chat ID
        if (!chatId) {
          console.log("Skipping message - couldn't determine chat ID");
          return;
        }
        
        // Check if this is our own message - if so, don't duplicate it
        const isSelfMessage = message.senderId === user._id;
        console.log("Message is from self:", isSelfMessage);
        
        // If this is a self message and we already have it in localStorage, skip
        if (isSelfMessage) {
          const messageSendKey = `sent_${message.messageId}`;
          const alreadyProcessed = localStorage.getItem(messageSendKey);
          console.log("Message already processed:", alreadyProcessed);
          
          if (alreadyProcessed) {
            console.log("Skipping duplicate self message");
            return; // Skip this message since we already added it locally
          }
        }
        
        setChats(prevChats => {
          // Find existing chat or create new one
          const chatIndex = prevChats.findIndex(chat => chat.id.toString() === chatId);
          
          if (chatIndex >= 0) {
            // Update existing chat
            const updatedChats = [...prevChats];
            const chat = { ...updatedChats[chatIndex] };
            
            // Add new message with correct sender
            const newMessage: ChatMessage = {
              id: message.messageId || Date.now().toString(),
              content: message.content,
              sender: isSelfMessage ? "self" : "other",
              timestamp: new Date(message.timestamp || Date.now()).toLocaleTimeString(),
              imageUrl: message.metadata?.type === 'image',
              fileUrl: message.metadata?.type === 'file',
              fileName: message.metadata?.fileName
            };
            
            // Check if we already have this message (prevent duplicates)
            const isDuplicate = chat.messages.some(msg => msg.id === newMessage.id);
            if (!isDuplicate) {
              chat.messages = [...chat.messages, newMessage];
              chat.lastMessage = message.content;
              chat.lastSeen = "Just now";
              
              // Move to top of list
              updatedChats.splice(chatIndex, 1);
              updatedChats.unshift(chat);
            }
            
            return isDuplicate ? prevChats : updatedChats;
          } else {
            // Create new chat
            const newChat: Chat = {
              id: chatId,
              name: message.senderName || "New User",
              avatar: message.senderPicture || "/profile.svg",
              lastMessage: message.content,
              lastSeen: "Just now",
              messages: [{
                id: message.messageId || Date.now().toString(),
                content: message.content,
                sender: isSelfMessage ? "self" : "other",
                timestamp: new Date(message.timestamp || Date.now()).toLocaleTimeString(),
                imageUrl: message.metadata?.type === 'image',
                fileUrl: message.metadata?.type === 'file',
                fileName: message.metadata?.fileName
              }]
            };
            
            return [newChat, ...prevChats];
          }
        });
      }
    };
    
    // Handle typing indicators
    const handleTypingIndicator = (data: any) => {
      if (data.roomType === RoomType.DIRECT) {
        // Extract the other user ID from the room ID
        const userIds = data.roomId.split('-');
        const otherUserId = userIds[0] === user._id ? userIds[1] : userIds[0];
        
        setChats(prevChats => 
          prevChats.map(chat => 
            chat.id.toString() === otherUserId 
              ? { ...chat, isTyping: data.isTyping }
              : chat
          )
        );
      }
    };
    
    // Register event listeners
    socket.on(ChatEventType.RECEIVE_MESSAGE, handleReceiveMessage);
    socket.on(ChatEventType.TYPING, handleTypingIndicator);
    socket.on(ChatEventType.STOP_TYPING, handleTypingIndicator);
    
    // Cleanup on unmount
    return () => {
      socket.off(ChatEventType.RECEIVE_MESSAGE, handleReceiveMessage);
      socket.off(ChatEventType.TYPING, handleTypingIndicator);
      socket.off(ChatEventType.STOP_TYPING, handleTypingIndicator);
    };
  }, [socket, isConnected, user, setChats]);

  // Join/leave chat rooms when selected chat changes
  const handleChatRoomConnection = useCallback((selectedChat: string | null) => {
    if (!socket || !isConnected || !user) return;

    // Clean up previously joined rooms
    const cleanup = () => {
      joinedRooms.forEach(roomId => {
        leaveChatRoom(roomId, RoomType.DIRECT);
      });
      joinedRooms.clear();
    };

    // If new chat is selected, join the room
    if (selectedChat) {
      const roomId = [user._id, selectedChat].sort().join('-');
      joinChatRoom(roomId, RoomType.DIRECT);
      joinedRooms.add(roomId);
    }

    // Return cleanup function
    return cleanup;
  }, [socket, isConnected, user, joinChatRoom, leaveChatRoom, joinedRooms]);

  return { handleChatRoomConnection };
};

export default function ChatPage() {
  const { isMobileView } = useResponsiveLayout();
  const {
    activeTab,
    setActiveTab,
    selectedChat,
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
  } = useChatManagement();
  
  const { handleChatRoomConnection } = useWebSocketEvents(user, setChats);

  // Load chats on mount
  useEffect(() => {
    if (user) {
      loadChats();
    }
  }, [user, loadChats]);

  // Handle chat room connections
  useEffect(() => {
    if (selectedChat && user) {
      const cleanup = handleChatRoomConnection(selectedChat);
      return cleanup;
    }
  }, [selectedChat, user, handleChatRoomConnection]);

  // Get current display data
  const displayChats = getDisplayChats();
  const currentChat = getCurrentChat();
  const shouldShowMobileNav = !selectedChat || !isMobileView;

  // Show auth error or loading state
  if (authError) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#0E0E0E] text-white">
        <div className="text-center p-6 bg-neutral-900 rounded-lg">
          <h2 className="text-xl mb-4">Authentication Required</h2>
          <p className="mb-4">Please login to access your chats</p>
          <Link href="/auth/signin" className="px-4 py-2 bg-blue-600 rounded">Login</Link>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#0E0E0E] text-white">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-[#0E0E0E] text-white overflow-hidden">
      {/* Fixed Sidebar - Desktop only */}
      <div className="fixed left-3 top-0 bottom-0 z-30 hidden lg:block">
        <Sidebar />
      </div>

      {/* Mobile Bottom Navigation - Only show when in chat list or on desktop */}
      {shouldShowMobileNav && (
        <div className="fixed bottom-0 left-0 right-0 z-30 lg:hidden bg-[#1A1919] py-2">
          <div className="flex justify-around items-center px-2">
            <Sidebar isMobile={true} />
          </div>
        </div>
      )}

      {/* Main content area */}
      <div className="flex flex-1 overflow-hidden lg:pl-[6rem] transition-all duration-300">
        {/* Chat list - Scrollable */}
        <div
          className={`
          ${selectedChat && isMobileView ? "hidden" : "block"}
          md:block w-full md:w-80 lg:w-96 flex-shrink-0
          transition-all duration-300 ease-in-out
          border-r border-[#28282800] overflow-y-auto
          ${shouldShowMobileNav ? "pb-16" : ""}
        `}
        >
          <div className="h-full flex flex-col">
            {/* Chat List Content */}
            <div className="flex-1">
              <ChatList
                chats={displayChats}
                activeTab={activeTab}
                selectedChat={selectedChat}
                onSelectChat={handleSelectChat}
                setActiveTab={setActiveTab as (tab: string) => void}
              />
            </div>
          </div>
        </div>

        {/* Chat window - Messages flow bottom to top */}
        <div
          className={`
          ${selectedChat || !isMobileView ? "block" : "hidden"}
          md:block flex-1
          transition-all duration-300 ease-in-out
          bg-neutral-900/50 backdrop-blur-sm
        `}
        >
          <div className="h-full flex flex-col">
            <ChatWindow
              chat={currentChat}
              activeTab={activeTab}
              onBack={handleBack}
              onChatUpdate={handleChatUpdate}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
