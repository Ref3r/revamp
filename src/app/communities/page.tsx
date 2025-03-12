"use client";
import { useState, useEffect } from "react";
import Sidebar from "@/components/dashboard/Sidebar";
import ChatWindow from "@/components/chat-section/chat-window/ChatWindow";
import Header from "@/components/communities/leaderboard/Header";
import Leaderboard from "@/components/communities/leaderboard/leaderBoard";

// Define types based on your existing code
interface Message {
  id: number;
  content: string;
  sender: "self" | "other";
  timestamp: string;
  imageUrl?: string;
  fileUrl?: string;
  fileName?: string;
}

interface Chat {
  id: number;
  name: string;
  avatar: string;
  lastSeen: string;
  messages: Message[];
}

// Custom ChatWindow wrapper to fix mobile layout issues
const ChatWindowWrapper = ({
  chat,
  activeTab,
  onBack,
  onChatUpdate,
}: {
  chat: Chat;
  activeTab: string;
  onBack: () => void;
  onChatUpdate: (updatedChat: Chat) => void;
}) => {
  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden pb-16 md:pb-0">
      <ChatWindow
        chat={chat}
        activeTab={activeTab}
        onBack={onBack}
        onChatUpdate={onChatUpdate}
      />
    </div>
  );
};

export default function CommunityApp() {
  const [selectedCategory, setSelectedCategory] = useState("Design");
  const [activeTab, setActiveTab] = useState("communities");
  const [currentChat, setCurrentChat] = useState<Chat | undefined>(undefined);
  const [showLeaderboard, setShowLeaderboard] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [showBottomNav, setShowBottomNav] = useState(true);

  // Sample leaderboard users with actual images
  const leaderboardUsers = [
    {
      id: 1,
      name: "Christopher Campbell",
      rank: "#1",
      community: "Design Community",
      avatar: "/leaderboard1.svg",
      hasUnread: true,
      medal: "/medal.svg",
    },
    {
      id: 2,
      name: "Houcine Ncib",
      rank: "#2",
      community: "Design Community",
      avatar: "/leaderBoard2.svg",
      hasUnread: false,
      medal: "/medal.svg",
    },
    {
      id: 3,
      name: "Kelly Sikkema",
      rank: "#3",
      community: "Design Community",
      avatar: "/leaderboard3.svg",
      hasUnread: true,
      medal: "/medal.svg",
    },
    {
      id: 4,
      name: "Ethan Hoover",
      rank: "#4",
      community: "Design Community",
      avatar: "/leaderboard4.svg",
      hasUnread: false,
      medal: "/medal.svg",
    },
    {
      id: 5,
      name: "Joseph Pearson",
      rank: "#5",
      community: "Design Community",
      avatar: "/leaderboard5.svg",
      hasUnread: true,
      medal: "/medal.svg",
    },
  ];

  // Create sample chat objects for each leaderboard user
  const createChatForUser = (user: any): Chat => {
    return {
      id: user.id,
      name: user.name,
      avatar: user.avatar,
      lastSeen: "Online",
      messages: [
        {
          id: 1,
          content: "Hey, how are you?",
          sender: "self",
          timestamp: "10:30",
        },
        {
          id: 2,
          content: "I'm fine, how about you?",
          sender: "other",
          timestamp: "10:31",
        },
        {
          id: 3,
          content: "I am fine, thanks for asking!",
          sender: "self",
          timestamp: "10:32",
        },
      ],
    };
  };

  const handleBack = () => {
    setCurrentChat(undefined);
    if (isMobile) {
      setShowLeaderboard(true);
      setShowBottomNav(true); // Show bottom nav when returning to leaderboard
    }
  };

  const handleChatUpdate = (updatedChat: Chat) => {
    setCurrentChat(updatedChat);
  };

  const handleChatSelect = (user: any) => {
    const chat = createChatForUser(user);
    setCurrentChat(chat);
    if (isMobile) {
      setShowLeaderboard(false);
      setShowBottomNav(false); // Hide bottom nav when in chat on mobile
    }
  };

  // Handle window resize for responsive behavior
  useEffect(() => {
    const checkScreenSize = () => {
      const mobile = window.innerWidth < 768;
      const small = window.innerWidth < 640;
      setIsMobile(mobile);
      setIsSmallScreen(small);

      // Always show leaderboard on desktop
      if (!mobile) {
        setShowLeaderboard(true);
        setShowBottomNav(true); // Always show bottom nav on desktop
      }
    };

    // Initial check
    checkScreenSize();

    // Add event listener for window resize
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  return (
    <div className="flex h-screen overflow-hidden bg-[#0E0E0E] text-white">
      {/* Sidebar - Desktop only with margin */}
      <div className="hidden md:block w-[70px] px-2 py-2">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-screen">
        {/* Header Section */}
        <Header
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          isMobile={isSmallScreen}
        />

        {/* Content Area */}
        <div className="flex-1 flex overflow-hidden">
          {/* Leaderboard Section */}
          {(showLeaderboard || !isMobile) && (
            <div className={`h-full ${isMobile ? "w-full" : "w-[400px]"} py-2`}>
              <Leaderboard
                selectedCategory={selectedCategory}
                users={leaderboardUsers}
                onChatSelect={handleChatSelect}
                isMobile={isSmallScreen}
              />
            </div>
          )}

          {/* Chat Section - Absolute position so it doesn't push content */}
          {currentChat && (isMobile ? !showLeaderboard : true) && (
            <div
              className={`${
                isMobile ? "absolute inset-0 pt-[72px] z-10" : "flex-1"
              } h-full overflow-hidden`}
            >
              {/* Use our custom wrapper for better mobile layout */}
              <ChatWindowWrapper
                chat={currentChat}
                activeTab={activeTab}
                onBack={handleBack}
                onChatUpdate={handleChatUpdate}
              />
            </div>
          )}
        </div>
      </div>

      {/* Mobile Bottom Navigation - Only show when not in chat on mobile */}
      {showBottomNav && (
        <div className="fixed bottom-0 left-0 right-0 z-30 md:hidden bg-[#1A1919] py-2 px-2 mx-2 mb-2 rounded-xl">
          <div className="flex justify-around items-center">
            <Sidebar isMobile={true} />
          </div>
        </div>
      )}
    </div>
  );
}
