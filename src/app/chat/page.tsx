"use client";

import { useState, useEffect, SetStateAction } from "react";
import ChatList from "@/components/chat-section/chat-list/ChatList";
import ChatWindow from "@/components/chat-section/chat-window/ChatWindow";
import Sidebar from "@/components/dashboard/Sidebar";

const initialChats = [
  {
    id: 1,
    name: "Christopher Campbell",
    avatar: "/profile.svg",
    lastMessage: "In front of the Bar, about whic...",
    lastSeen: "3h ago",
    messages: [
      {
        id: 1,
        content: "Hey, How are you?",
        sender: "other",
        timestamp: "12:00",
      },
      {
        id: 2,
        content: "I am fine, How about you?",
        sender: "self",
        timestamp: "12:01",
      },
      {
        id: 3,
        content: "Yayy, Great I would love to join the party!",
        sender: "self",
        timestamp: "12:02",
      },
      {
        id: 4,
        content: "Great! Let's meet in the party!",
        sender: "other",
        timestamp: "12:03",
      },
    ],
  },

  {
    id: 2,
    name: "Houcine Ncib",
    avatar: "/profile2.svg",
    lastMessage: "What do you have planned thi...",
    lastSeen: "5h ago",
    messages: [
      {
        id: 1,
        content: "Hello! How's your day going?",
        sender: "other",
        timestamp: "11:30",
      },
      {
        id: 2,
        content: "Pretty good, thanks! Working on some new designs.",
        sender: "self",
        timestamp: "11:32",
      },
    ],
  },
  {
    id: 3,
    name: "Kelly Sikkema",
    avatar: "/profile3.svg",
    lastMessage: "How would you describe yours...",
    lastSeen: "1d ago",
    messages: [
      {
        id: 1,
        content: "Did you see the latest updates?",
        sender: "other",
        timestamp: "09:15",
      },
    ],
  },
  {
    id: 6,
    name: "Ethan Hoover",
    avatar: "/profile.svg",
    lastMessage: "How do you relieve stress?",
    lastSeen: "2d ago",
    messages: [
      {
        id: 1,
        content: "How do you handle stress during busy periods?",
        sender: "other",
        timestamp: "15:45",
      },
    ],
  },
  {
    id: 7,
    name: "Joseph Pearson",
    avatar: "/profile2.svg",
    lastMessage: "What's your sign?",
    lastSeen: "3d ago",
    messages: [
      {
        id: 1,
        content: "Just curious, what's your zodiac sign?",
        sender: "other",
        timestamp: "18:22",
      },
    ],
  },
];

const initialCollaborationChats = [
  {
    id: 4,
    name: "Design Team",
    avatar: "/profile.svg",
    lastMessage: "New project requirements...",
    lastSeen: "2h ago",
    messages: [
      {
        id: 1,
        content: "Hey team, I've updated the design specs",
        sender: "other",
        timestamp: "14:30",
      },
      {
        id: 2,
        content: "Great! I'll review them now",
        sender: "self",
        timestamp: "14:35",
      },
    ],
  },
  {
    id: 5,
    name: "Marketing Project",
    avatar: "/profile2.svg",
    lastMessage: "Campaign updates for Q2...",
    lastSeen: "1h ago",
    messages: [
      {
        id: 1,
        content: "The Q2 campaign looks promising!",
        sender: "other",
        timestamp: "15:00",
      },
    ],
  },
];

export default function Home() {
  const [activeTab, setActiveTab] = useState("general");
  const [selectedChat, setSelectedChat] = useState(null);
  const [isMobileView, setIsMobileView] = useState(false);
  const [chats, setChats] = useState(initialChats);
  const [collaborationChats, setCollaborationChats] = useState(
    initialCollaborationChats
  );

  // Update lastMessage when messages change
  const updateLastMessage = (updatedChat: {
    id: number;
    name: string;
    avatar: string;
    lastMessage: string;
    lastSeen: string;
    messages: {
      fileUrl: boolean;
      imageUrl: boolean;
      fileName: any;
      id: number;
      content: string;
      sender: string;
      timestamp: string;
    }[];
  }) => {
    if (!updatedChat.messages || updatedChat.messages.length === 0)
      return updatedChat;

    const lastMessage = updatedChat.messages[updatedChat.messages.length - 1];
    let lastMessageText = lastMessage.content;

    // If it's an image or file message without text, use a descriptive message
    if (lastMessage.imageUrl && !lastMessage.content) {
      lastMessageText = "Sent an image";
    } else if (lastMessage.fileUrl && !lastMessage.content) {
      lastMessageText = `Sent a file: ${lastMessage.fileName}`;
    }

    // Truncate the message if it's too long
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

  // Handle message updates from ChatWindow
  const handleChatUpdate = (updatedChat: {
    id: number;
    name: string;
    avatar: string;
    lastMessage: string;
    lastSeen: string;
    messages: {
      id: number;
      content: string;
      sender: string;
      timestamp: string;
    }[];
  }) => {
    const formattedChat = updateLastMessage(updatedChat);

    if (activeTab === "general") {
      // Update the chat in the general chats array
      setChats(
        chats.map((chat) =>
          chat.id === formattedChat.id ? formattedChat : chat
        )
      );
    } else {
      // Update the chat in the collaboration chats array
      setCollaborationChats(
        collaborationChats.map((chat) =>
          chat.id === formattedChat.id ? formattedChat : chat
        )
      );
    }
  };

  // Handle screen resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const displayChats =
    activeTab === "collaborations" ? collaborationChats : chats;
  const currentChat = displayChats.find((chat) => chat.id === selectedChat);

  const handleSelectChat = (id: SetStateAction<null>) => {
    setSelectedChat(id);
  };

  const handleBack = () => {
    setSelectedChat(null);
  };

  const shouldShowMobileNav = !selectedChat || !isMobileView;

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
          ${
            shouldShowMobileNav ? "pb-16" : ""
          } /* Add padding when mobile nav is visible */
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
                setActiveTab={setActiveTab}
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
