"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import {
  DollarSign,
  Image as ImageIcon,
  Send,
  ArrowLeft,
  Mic,
  X,
  Award,
  Check,
} from "lucide-react";
import { Button, Input } from "@lemonsqueezy/wedges";
import CollaborationForm, { CollaborationFormData } from "../collab-request-form/CollaborationForm ";
import Form from "@/components/communities/community-challenge-form/Form";

interface Message {
  id: number;
  content: string;
  sender: "self" | "other";
  timestamp: string;
  imageUrl?: string;
  fileUrl?: string;
  fileName?: string;
  isCollabRequest?: boolean;
  collabData?: CollaborationFormData;
  collabAccepted?: boolean;
}

interface Chat {
  id: number;
  name: string;
  avatar: string;
  lastSeen: string;
  messages: Message[];
}

interface ChatWindowProps {
  chat: Chat | undefined;
  activeTab: string;
  onBack: () => void;
  onChatUpdate: (updatedChat: Chat) => void;
}

export default function ChatWindow({
  chat: initialChat,
  activeTab,
  onBack,
  onChatUpdate,
}: ChatWindowProps) {
  const [chat, setChat] = useState<Chat | undefined>(initialChat);
  const [newMessage, setNewMessage] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const messageEndRef = useRef<HTMLDivElement>(null);
  const [showForm, setShowForm] = useState(false);
  const [showAwardForm, setShowAwardForm] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if it's a mobile device
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Initial check
    checkIfMobile();

    // Add event listener for window resize
    window.addEventListener("resize", checkIfMobile);

    // Cleanup
    return () => {
      window.removeEventListener("resize", checkIfMobile);
    };
  }, []);

  useEffect(() => {
    setChat(initialChat);
  }, [initialChat]);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat?.messages]);

  // Recording timer effect
  useEffect(() => {
    if (isRecording) {
      timerRef.current = setInterval(() => {
        setRecordingTime((prevTime) => prevTime + 1);
      }, 1000);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        setRecordingTime(0);
      }
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isRecording]);

  // Format recording time to MM:SS
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
      .toString()
      .padStart(2, "0")}`;
  };

  if (!chat) {
    return (
      <div className="flex-1 bg-[#0E0E0E] flex items-center justify-center h-[100dvh] md:h-full">
        <p className="text-gray-400 text-sm sm:text-base md:text-lg px-4 text-center">
          Select a chat to start messaging
        </p>
      </div>
    );
  }

  // Function to get the display name of a collaboration type
  const getCollabTypeLabel = (value: string) => {
    const collabTypes = [
      { value: "sponsored-post", label: "Sponsored Post" },
      { value: "affiliate-marketing", label: "Affiliate Marketing" },
      { value: "product-review", label: "Product Review" },
      { value: "brand-ambassador", label: "Brand Ambassador" },
      { value: "content-creation", label: "Content Creation" },
      { value: "social-media-takeover", label: "Social Media Takeover" },
    ];
    const type = collabTypes.find(type => type.value === value);
    return type ? type.label : value;
  };

  const generateHardcodedResponse = (userMessage: string) => {
    const responses = [
      "That's interesting! Tell me more.",
      "I understand. What else is on your mind?",
      "Great point! I'll keep that in mind.",
      "I appreciate your perspective on this.",
      "Let's explore that idea further.",
      "I hadn't thought of it that way before.",
    ];

    return responses[Math.floor(Math.random() * responses.length)];
  };

  const handleSendMessage = () => {
    if (newMessage.trim() === "" && !selectedImage && !selectedFile) return;

    const now = new Date();
    const timeString = now.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    const userMessage: Message = {
      id:
        (chat.messages.length > 0
          ? Math.max(...chat.messages.map((m) => m.id))
          : 0) + 1,
      content: newMessage,
      sender: "self",
      timestamp: timeString,
    };

    if (selectedImage) {
      const imageUrl = URL.createObjectURL(selectedImage);
      userMessage.imageUrl = imageUrl;

      if (!newMessage.trim()) {
        userMessage.content = "";
      }
    }

    if (selectedFile) {
      const fileUrl = URL.createObjectURL(selectedFile);
      userMessage.fileUrl = fileUrl;
      userMessage.fileName = selectedFile.name;

      if (!newMessage.trim()) {
        userMessage.content = `Sent a file: ${selectedFile.name}`;
      }
    }

    const updatedMessages = [...chat.messages, userMessage];

    const updatedChat = {
      ...chat,
      messages: updatedMessages,
    };

    setChat(updatedChat);
    if (onChatUpdate) {
      onChatUpdate(updatedChat);
    }

    setNewMessage("");
    setSelectedImage(null);
    setSelectedFile(null);

    setTimeout(() => {
      const responseContent = generateHardcodedResponse(userMessage.content);
      const responseTime = new Date();
      const responseTimeString = responseTime.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });

      const responseMessage: Message = {
        id:
          (updatedMessages.length > 0
            ? Math.max(...updatedMessages.map((m) => m.id))
            : 0) + 1,
        content: responseContent,
        sender: "other",
        timestamp: responseTimeString,
      };

      const updatedChatWithResponse = {
        ...chat,
        messages: [...updatedMessages, responseMessage],
      };

      setChat(updatedChatWithResponse);
      if (onChatUpdate) {
        onChatUpdate(updatedChatWithResponse);
      }
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleFileUpload = (type: "image" | "file") => {
    if (fileInputRef.current) {
      // Set accept attribute based on type
      if (type === "image") {
        fileInputRef.current.accept = "image/*";
      } else {
        fileInputRef.current.accept = "*/*";
      }
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];

      if (file.type.startsWith("image/")) {
        setSelectedImage(file);
        setSelectedFile(null);
      } else {
        setSelectedFile(file);
        setSelectedImage(null);
      }

      e.target.value = "";
    }
  };

  const removeSelectedImage = () => {
    setSelectedImage(null);
  };

  const removeSelectedFile = () => {
    setSelectedFile(null);
  };

  const handleVoiceRecording = () => {
    setIsRecording(!isRecording);
    if (!isRecording) {
      console.log("Starting voice recording...");
    } else {
      console.log("Stopping voice recording...");
    }
  };

  const toggleForm = () => {
    setShowForm(!showForm);
    if (!showForm) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  };

  const toggleAwardForm = () => {
    setShowAwardForm(!showAwardForm);
    if (!showAwardForm) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  };

  // Handle collaboration form submission
  const handleCollabFormSubmit = (formData: CollaborationFormData) => {
    const now = new Date();
    const timeString = now.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    // Create a new message with the collaboration request
    const collabMessage: Message = {
      id:
        (chat.messages.length > 0
          ? Math.max(...chat.messages.map((m) => m.id))
          : 0) + 1,
      content: "",
      sender: "self",
      timestamp: timeString,
      isCollabRequest: true,
      collabData: formData,
      collabAccepted: false,
    };

    const updatedMessages = [...chat.messages, collabMessage];
    const updatedChat = {
      ...chat,
      messages: updatedMessages,
    };

    setChat(updatedChat);
    if (onChatUpdate) {
      onChatUpdate(updatedChat);
    }

    // Close the form
    setShowForm(false);
  };

  // Handle accepting a collaboration project
  const handleAcceptProject = (messageId: number) => {
    const updatedMessages = chat.messages.map((message) => {
      if (message.id === messageId) {
        return {
          ...message,
          collabAccepted: true,
        };
      }
      return message;
    });

    const updatedChat = {
      ...chat,
      messages: updatedMessages,
    };

    setChat(updatedChat);
    if (onChatUpdate) {
      onChatUpdate(updatedChat);
    }
  };

  return (
    <div className="flex-1 bg-[#0E0E0E] flex flex-col h-screen md:h-full relative">
      {/* Add these styles to your global CSS or inline styles here */}
      <style jsx global>{`
        @keyframes slideIn {
          from {
            transform: translateX(100%);
          }
          to {
            transform: translateX(0);
          }
        }

        .animate-slide-in {
          animation: slideIn 0.3s ease-out forwards;
        }
      `}</style>

      {/* Header */}
      <div className="px-2 sm:px-4 lg:px-6 py-2 sm:py-4 backdrop-blur-sm bg-[#0E0E0E]/80 sticky top-0 z-10">
        <div className="flex items-center gap-2 sm:gap-4">
          <button
            onClick={onBack}
            className="p-1.5 sm:p-2 hover:bg-white/10 rounded-lg transition-colors"
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
            </div>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-2 sm:px-4 lg:px-6 py-3 sm:py-6 space-y-4 sm:space-y-6 mb-[60px] md:mb-0">
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

            {message.isCollabRequest && message.collabData ? (
              // Collaboration Request Card
              <div className="max-w-[300px] bg-[#DBDBDB0A] rounded-lg overflow-hidden shadow-lg">
                <div className="p-4 space-y-2 text-white">
                  <h3 className="font-bold">Collab Request: {message.collabData.collaborationRequest}</h3>
                  <p className="text-sm text-gray-300">
                    Collab Type: {message.collabData.collaborationTypes.length > 0 
                      ? getCollabTypeLabel(message.collabData.collaborationTypes[0]) 
                      : "Not specified"}
                  </p>
                  <p className="text-sm text-gray-300">
                    Deadline: {message.collabData.deadline 
                      ? new Date(message.collabData.deadline).toLocaleDateString() 
                      : "Not specified"}
                  </p>
                  <p className="text-sm text-gray-300">
                    Budget: ${message.collabData.price || "0"} (Funded)
                  </p>
                  
                  {message.collabAccepted ? (
                    <div className="bg-none text-white px-4 py-2 rounded flex items-center justify-center gap-2">
                      <Check size={16} />
                      <span>Project accepted! Please share all the details here</span>
                    </div>
                  ) : (
                    <Button
                      className="w-full mt-2 pr-20 bg-none text-white py-2 rounded"
                      onClick={() => handleAcceptProject(message.id)}
                    >
                      Accept Project
                    </Button>
                  )}
                </div>
              </div>
            ) : (
              // Regular Message
              <div
                className={`max-w-[80%] sm:max-w-[70%] lg:max-w-[60%] ${
                  message.imageUrl && !message.content
                    ? "rounded-xl overflow-hidden"
                    : `rounded-2xl px-3 sm:px-4 py-2 sm:py-3 ${
                        message.sender === "self"
                          ? "bg-transparent text-white border border-[#0BA360] rounded-br-none rounded-full"
                          : "bg-gradient-to-r from-[#0BA360] to-[#27A980] text-white rounded-tl-none rounded-full"
                      }`
                }`}
              >
                {/* Message content */}
                {message.content && (
                  <p className="break-words text-xs sm:text-base lg:text-lg">
                    {message.content}
                  </p>
                )}

                {/* Image preview */}
                {message.imageUrl && (
                  <div
                    className={`${
                      message.content ? "mt-2" : "-m-3 sm:-m-4"
                    } rounded-lg overflow-hidden`}
                  >
                    <img
                      src={message.imageUrl}
                      alt="Shared image"
                      className="max-w-full h-auto max-h-80 object-contain"
                    />
                  </div>
                )}

                {/* File attachment */}
                {message.fileUrl && message.fileName && (
                  <div className="mt-2 flex items-center bg-gray-800/30 rounded-lg p-2">
                    <div className="bg-gray-700 p-2 rounded-lg mr-2">
                      <svg
                        className="w-5 h-5 text-gray-300"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div className="overflow-hidden">
                      <p className="text-xs text-gray-200 truncate">
                        {message.fileName}
                      </p>
                      <a
                        href={message.fileUrl}
                        download={message.fileName}
                        className="text-[10px] text-blue-400 hover:underline"
                      >
                        Download
                      </a>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
        <div ref={messageEndRef} />
      </div>

      {(selectedImage || selectedFile) && (
        <div className="px-2 sm:px-4 lg:px-6 py-2 border-t border-gray-800/50">
          <div className="flex items-center bg-gray-800/30 rounded-lg p-2">
            {selectedImage && (
              <div className="flex items-center flex-1">
                <div className="w-12 h-12 relative mr-2">
                  <img
                    src={URL.createObjectURL(selectedImage)}
                    alt="Selected"
                    className="w-full h-full rounded-md object-cover"
                  />
                </div>
                <span className="text-xs text-gray-300">
                  Image ready to send
                </span>
                <button
                  onClick={removeSelectedImage}
                  className="ml-auto p-1 hover:bg-gray-700 rounded-full"
                >
                  <X className="w-4 h-4 text-gray-400" />
                </button>
              </div>
            )}

            {selectedFile && (
              <div className="flex items-center flex-1">
                <div className="bg-gray-700 p-2 rounded-lg mr-2">
                  <svg
                    className="w-6 h-6 text-gray-300"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <span className="text-xs text-gray-300 truncate max-w-[150px]">
                  {selectedFile.name}
                </span>
                <button
                  onClick={removeSelectedFile}
                  className="ml-auto p-1 hover:bg-gray-700 rounded-full"
                >
                  <X className="w-4 h-4 text-gray-400" />
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        onChange={handleFileChange}
      />

      {/* Input area - Fixed at bottom on mobile */}
      <div
        className={`${
          isMobile ? "fixed bottom-0 left-0 right-0 z-20" : "sticky bottom-0"
        } bg-[#0E0E0E] p-2 sm:p-4`}
      >
        <div className="flex items-center justify-between bg-[#282828] rounded-full px-3 py-2">
          <Button
            onClick={() => handleFileUpload("image")}
            className="p-2 rounded-full transition-colors bg-[#282828]"
            aria-label="Upload image"
          >
            <ImageIcon className="w-5 h-5" />
          </Button>

          <Button
            onClick={handleVoiceRecording}
            className={`p-2 bg-[#282828] rounded-full transition-colors flex items-center space-x-1 ${
              isRecording ? "text-red-500" : ""
            }`}
            aria-label={
              isRecording ? "Stop recording" : "Start voice recording"
            }
          >
            {isRecording ? (
              <>
                <div className="w-5 h-5 flex items-center justify-center">
                  <div className="w-3 h-3 bg-red-500 rounded-sm"></div>
                </div>
                <span className="text-xs text-white ml-1">
                  {formatTime(recordingTime)}
                </span>
              </>
            ) : (
              <Mic className="w-5 h-5" />
            )}
          </Button>

          {/* Show Award button for communities section, Dollar Sign for collaborations */}
          {activeTab === "communities" ? (
            <Button
              onClick={toggleAwardForm}
              className="p-2 bg-[#282828] rounded-full transition-colors"
              aria-label="Award"
            >
              <Award className="w-5 h-5 text-white" />
            </Button>
          ) : (
            activeTab === "collaborations" && (
              <Button
                onClick={toggleForm}
                className="p-2 bg-[#282828] rounded-full transition-colors"
                aria-label="Payment options"
              >
                <DollarSign className="w-5 h-5 text-gray-400" />
              </Button>
            )
          )}

          <div className="flex-1 mx-2">
            <Input
              type="text"
              placeholder="Type message..."
              className="w-full bg-transparent text-white text-sm
                focus:outline-none border-none"
              value={newMessage}
              onChange={(e) =>
                setNewMessage((e.target as HTMLInputElement).value)
              }
              onKeyPress={handleKeyPress}
            />
          </div>

          <button
            onClick={handleSendMessage}
            className="p-2 hover:bg-gray-800/50 rounded-full transition-colors"
            aria-label="Send message"
          >
            <Send className="w-5 h-5 text-gray-400" />
          </button>
        </div>
      </div>

      {/* Collaboration Form Slide-in Panel */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end">
          <div className="fixed top-0 right-0 h-full w-full md:w-[450px] bg-[#0E0E0E] shadow-lg overflow-y-auto animate-slide-in">
            <div className="flex justify-between items-center p-4 pt-6" />
            <div className="px-4 pb-6">
              <CollaborationForm 
                isFromChat={true} 
                onClose={toggleForm} 
                onSubmit={handleCollabFormSubmit}
              />
            </div>
          </div>
        </div>
      )}

      {/* Award Form Slide-in Panel */}
      {showAwardForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end">
          <div className="fixed top-0 right-0 h-full w-full md:w-[450px] bg-[#0E0E0E] shadow-lg overflow-y-auto animate-slide-in">
            <div className="flex justify-between items-center p-4 pt-6">
              <h2 className="text-xl font-bold">Community Challenge</h2>
              <button
                onClick={toggleAwardForm}
                className="p-2 hover:bg-gray-800 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="px-4 pb-6">
              <Form isFromChat={true} onClose={toggleAwardForm} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}