"use client";

import { useState, useEffect } from "react";
import {
  MessageSquare,
  Users,
  Heart,
  BarChart2,
  Grid,
  ArrowLeft,
} from "lucide-react";
import ChatList from "@/components/chat-section/chat-list/ChatList";
import ChatWindow from "@/components/chat-section/chat-window/ChatWindow";
// import Sidebar from "@/components/chat-section/SideBar";


// Sample data structure
const initialChats = [
  {
    id: 1,
    name: "Christopher Campbell",
    avatar: "/Frame 76.svg", 
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
    avatar: "/Frame 70.svg",
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
    avatar: "/Frame 70.svg",
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
];


const initialCollaborationChats = [
  {
    id: 4,
    name: "Design Team",
    avatar: "/Frame 70.svg",
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
    avatar: "/Frame 70.svg",
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
  const [selectedChat, setSelectedChat] = useState<number | null>(null);
  const [isMobileView, setIsMobileView] = useState(false);
  const [chats, setChats] = useState(initialChats);
  const [collaborationChats, setCollaborationChats] = useState(
    initialCollaborationChats
  );


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


  const handleSelectChat = (id: number) => {
    setSelectedChat(id);
  };


  const handleBack = () => {
    setSelectedChat(null);
  };


  return (
    <div className="flex h-screen bg-[#0E0E0E] text-white overflow-hidden">
      {/* Sidebar - Fixed */}
      {/* <div className="fixed left-0 top-0 h-full z-40">
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      </div> */}


      {/* Main content area */}
      <div className="flex flex-1 overflow-hidden pl-[6rem] transition-all duration-300">
        {/* Chat list - Scrollable */}
        <div
          className={`
          ${selectedChat && isMobileView ? "hidden" : "block"}
          md:block w-full md:w-80 lg:w-96 flex-shrink-0
          transition-all duration-300 ease-in-out
          border-r border-neutral-800 overflow-y-auto
        `}
        >
          <div className="h-full flex flex-col">
            {/* Chat List Header */}
            <div className="p-4 lg:ml-0 sticky top-0 bg-[#0E0E0E] z-10">
              <h1 className="text-lg sm:text-xl font-semibold">Chats</h1>
            </div>


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
          {/* Add top padding when back button is visible */}
          <div
            className={`h-full flex flex-col ${selectedChat && isMobileView ? "pt-16" : ""}`}
          >
            <ChatWindow
            // @ts-ignore
              chat={currentChat}
              activeTab={activeTab}
              onBack={handleBack}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
