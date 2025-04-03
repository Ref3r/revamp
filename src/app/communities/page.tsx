"use client";
import { useState, useEffect } from "react";
import Sidebar from "@/components/dashboard/Sidebar";
import ChatWindow from "@/components/chat-section/chat-window/ChatWindow";
import Header from "@/components/communities/leaderboard/Header";
import Leaderboard from "@/components/communities/leaderboard/leaderBoard";
import axios from "axios";
import { getAuthToken } from "@/utils/auth";
import { toast } from "react-hot-toast";
import {
  getMessages,
  sendMessage,
  markMessagesAsRead,
  Message as ApiMessage,
} from "@/services/messageService";

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
  id: string;
  name: string;
  avatar: string;
  lastSeen: string;
  messages: Message[];
  communityId: string;
}

interface JoinedCommunity {
  _id: string;
  name: string;
  description: string;
  image: string;
  niche: string;
  memberCount: number;
}

// Custom ChatWindow wrapper to fix mobile layout issues
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
        onChatUpdate={onChatUpdate}
        onSendMessage={onSendMessage}
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
  const [joinedCommunities, setJoinedCommunities] = useState<JoinedCommunity[]>(
    []
  );
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessages, setLoadingMessages] = useState(false);

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
      avatar: "/leaderboard1.svg",
      hasUnread: false,
      medal: "/medal.svg",
    },
    {
      id: 5,
      name: "Joseph Pearson",
      rank: "#5",
      community: "Design Community",
      avatar: "/leaderboard2.svg",
      hasUnread: true,
      medal: "/medal.svg",
    },
  ];

  // Fetch joined communities
  const fetchJoinedCommunities = async () => {
    const token = getAuthToken();
    if (!token) {
      toast.error("Please login to view your communities");
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/communities/user/joined?page=1&limit=10`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success && response.data.data) {
        setJoinedCommunities(
          response.data.data.map((community: any) => ({
            _id: community._id,
            name: community.name,
            description: community.description,
            image: community.image?.startsWith("http")
              ? "/community-1.svg"
              : community.image || "/community-1.svg",
            niche: community.niche,
            memberCount: community.members?.length || 0,
          }))
        );
      }
    } catch (error) {
      console.error("Error fetching joined communities:", error);
      toast.error("Failed to fetch your communities");
    } finally {
      setIsLoading(false);
    }
  };

  // Create sample chat objects for each leaderboard user
  const createChatForUser = (user: any): Chat => {
    return {
      id: user.id.toString(),
      name: user.name,
      avatar: user.avatar,
      lastSeen: "Online",
      communityId: user.id.toString(),
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

  // Convert API messages to UI message format
  const convertApiMessagesToUiFormat = (
    apiMessages: ApiMessage[],
    userId: string
  ): Message[] => {
    return apiMessages.map((msg, index) => ({
      id: index + 1,
      content: msg.content || "",
      sender: msg.sender && msg.sender._id === userId ? "self" : "other",
      timestamp: new Date(msg.createdAt || Date.now()).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      // Add file and image properties if needed
      ...(msg.attachments &&
        msg.attachments.length > 0 && {
          imageUrl: msg.attachments[0]?.startsWith("image/")
            ? msg.attachments[0]
            : undefined,
          fileUrl: !msg.attachments[0]?.startsWith("image/")
            ? msg.attachments[0]
            : undefined,
          fileName: !msg.attachments[0]?.startsWith("image/")
            ? "Attachment"
            : undefined,
        }),
    }));
  };

  // Fetch messages for a community
  const fetchCommunityMessages = async (
    communityId: string,
    communityName: string,
    communityAvatar: string
  ) => {
    setLoadingMessages(true);
    try {
      const response = await getMessages(communityId);

      if (response.success) {
        // Get user ID from token to determine message sender
        const token = getAuthToken();
        let userId = "";
        if (token) {
          const tokenParts = token.split(".");
          if (tokenParts.length === 3) {
            const payload = JSON.parse(atob(tokenParts[1]));
            userId = payload.userId || payload._id || payload.id || "";
          }
        }

        // Convert API messages to UI format
        const messages = convertApiMessagesToUiFormat(response.data, userId);

        // Create chat object
        const chat: Chat = {
          id: communityId,
          name: communityName,
          avatar: communityAvatar,
          lastSeen: `${response.data.length} messages`,
          messages: messages,
          communityId: communityId,
        };

        setCurrentChat(chat);

        // Mark messages as read
        await markMessagesAsRead(communityId);
      } else {
        toast.error(response.message || "Failed to load messages");
      }
    } catch (error) {
      console.error("Error fetching messages:", error);
      toast.error("Failed to load messages");
    } finally {
      setLoadingMessages(false);
    }
  };

  // Handle sending a message
  const handleSendMessage = async (communityId: string, content: string) => {
    try {
      // First, add the message to the UI immediately for better UX
      if (currentChat) {
        const now = new Date();
        const timeString = now.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });

        const tempMessage: Message = {
          id:
            (currentChat.messages.length > 0
              ? Math.max(...currentChat.messages.map((m) => m.id))
              : 0) + 1,
          content: content,
          sender: "self",
          timestamp: timeString,
        };

        const updatedChat = {
          ...currentChat,
          messages: [...currentChat.messages, tempMessage],
        };

        setCurrentChat(updatedChat);
      }

      // Then send the message to the API
      const response = await sendMessage(communityId, content);

      if (response.success) {
        // Refresh messages after sending, but preserve the current chat state
        if (currentChat) {
          const response = await getMessages(communityId);

          if (response.success) {
            // Get user ID from token to determine message sender
            const token = getAuthToken();
            let userId = "";
            if (token) {
              const tokenParts = token.split(".");
              if (tokenParts.length === 3) {
                const payload = JSON.parse(atob(tokenParts[1]));
                userId = payload.userId || payload._id || payload.id || "";
              }
            }

            // Convert API messages to UI format
            const messages = convertApiMessagesToUiFormat(
              response.data,
              userId
            );

            // Create updated chat object
            const updatedChat = {
              ...currentChat,
              messages: messages,
              lastSeen: `${response.data.length} messages`,
            };

            setCurrentChat(updatedChat);

            // Mark messages as read
            await markMessagesAsRead(communityId);
          }
        }
      } else {
        toast.error(response.message || "Failed to send message");
      }
    } catch (error) {
      console.error("Error sending message:", error);
      toast.error("Failed to send message");
    }
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
    // For My Communities, use real community data
    if (selectedCategory === "My Communities") {
      // Get the community ID from the user object
      const communityId = user.id;
      const communityName = user.name;
      const communityAvatar = user.avatar;

      // Fetch messages for this community
      fetchCommunityMessages(communityId, communityName, communityAvatar);
    } else {
      // For other categories, use sample data as before
      const chat = createChatForUser(user);
      setCurrentChat(chat);
    }

    if (isMobile) {
      setShowLeaderboard(false);
      setShowBottomNav(false); // Hide bottom nav when in chat on mobile
    }
  };

  // Function to handle fetching joined communities
  const handleFetchJoinedCommunities = async () => {
    await fetchJoinedCommunities();
    setSelectedCategory("My Communities");
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

  // Fetch joined communities when category changes to "My Communities"
  useEffect(() => {
    if (selectedCategory === "My Communities") {
      fetchJoinedCommunities();
    }
  }, [selectedCategory]);

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
          onFetchJoinedCommunities={handleFetchJoinedCommunities}
          isLoading={isLoading}
        />

        {/* Content Area */}
        <div className="flex-1 flex overflow-hidden">
          {/* Leaderboard Section */}
          {(showLeaderboard || !isMobile) && (
            <div className={`h-full ${isMobile ? "w-full" : "w-[400px]"} py-2`}>
              <Leaderboard
                selectedCategory={selectedCategory}
                users={
                  selectedCategory === "My Communities"
                    ? joinedCommunities.map((community) => ({
                        id: community._id,
                        name: community.name,
                        rank: `${community.memberCount} members`,
                        community: community.niche,
                        avatar: community.image?.startsWith("http")
                          ? "/community-1.svg"
                          : community.image || "/community-1.svg",
                        hasUnread: false,
                        medal: "/medal.svg",
                      }))
                    : leaderboardUsers
                }
                onChatSelect={handleChatSelect}
                isMobile={isSmallScreen}
                isLoading={isLoading && selectedCategory === "My Communities"}
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
                onSendMessage={(chatId, content) =>
                  handleSendMessage(chatId, content)
                }
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
