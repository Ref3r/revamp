/** @format */

"use client";
import { useState, useEffect } from "react";
import Leaderboard from "@/components/communities/leaderboard/leaderBoard";
import { getAuthToken } from "@/utils/auth";
import { toast } from "react-hot-toast";
import {
    getMessages,
    sendMessage,
    markMessagesAsRead,
    Message as ApiMessage,
} from "@/services/messageService";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
    Community, getJoinedCommunities
} from "@/services/communityService";
import ChatWindowWrapper, { Chat } from "./ChatWrapper";


export default function CommunityContent({
  community,
  isMobile,
  showLeaderboard,
}: {
  community: Community;
  isMobile: boolean;
  showLeaderboard: boolean;
}) {
  const [selectedCategory, setSelectedCategory] = useState("Design");
  const [activeTab, setActiveTab] = useState("communities");
  const [currentChat, setCurrentChat] = useState<Chat | undefined>(undefined);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [showBottomNav, setShowBottomNav] = useState(true);

  const [loadingMessages, setLoadingMessages] = useState(false);

  const { data: joinedCommunities, isLoading } = useQuery({
    queryKey: ["joinedCommunities"],
    queryFn: async () => {
      const response = await getJoinedCommunities();

      return response.data;
    },
  });

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

  // Create sample chat objects for each leaderboard user
  const createChastForUser = (user: any): Chat => {
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

  const { mutateAsync: handleSendMessage } = useMutation({
    mutationFn: async ({
      communityId,
      content,
    }: {
      communityId: string;
      content: string;
    }) => {
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
          content,
          sender: "self",
          timestamp: timeString,
        };

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

              return updatedChat;
            }
          }
        }
      }
    },
    onSuccess: async (updatedChat) => {
      if (updatedChat) {
        setCurrentChat(updatedChat);
      }

      await markMessagesAsRead(updatedChat?.communityId!);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

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
    <div className="flex-1 flex overflow-hidden">
      {(showLeaderboard || !isMobile) && (
        <div className={`h-full ${isMobile ? "w-full" : "w-[400px]"} py-2`}>
          <Leaderboard
            selectedCategory={selectedCategory}
            users={
              selectedCategory === "My Communities"
                ? joinedCommunities?.map((community: any) => ({
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
            // isLoading={isLoading && selectedCategory === "My Communities"}
          />
        </div>
      )}

      <div
        className={`${
          isMobile ? "absolute inset-0 pt-[72px] z-10" : "flex-1"
        } h-full overflow-hidden`}
      >
        <ChatWindowWrapper
          chat={currentChat}
          activeTab={activeTab}
          onBack={handleBack}
          onChatUpdate={handleChatUpdate}
          onSendMessage={async (chatId, content) => {
            await handleSendMessage({ communityId: chatId, content });
          }}
        />
      </div>
    </div>
  );
}
