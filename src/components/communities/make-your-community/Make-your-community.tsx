"use client";
import { Button, Label, Textarea } from "@lemonsqueezy/wedges";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectPortal,
  SelectTrigger,
  SelectValue,
} from "@lemonsqueezy/wedges";
import { useState, useEffect } from "react";
import React from "react";
import { Input } from "@lemonsqueezy/wedges";
import Image from "next/image";
import axios from "axios";
import { useRouter } from "next/navigation";
import { getAuthToken, checkAuthStatus } from "@/utils/auth";
import { toast } from "react-hot-toast";

const Makeyourcommunity = () => {
  const router = useRouter();
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [communityName, setCommunityName] = useState("");
  const [communityDescription, setCommunityDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const [selectedMembers, setSelectedMembers] = useState<string[]>([]);
  const [isNicheDropdownOpen, setIsNicheDropdownOpen] = useState(false);

  // Run once the component is mounted on the client
  useEffect(() => {
    setMounted(true);
    // Check auth status when component mounts
    const authStatus = checkAuthStatus();
    if (!authStatus.isAuthenticated) {
      router.push("/login");
    }
  }, [router]);

  const collabTypes = [
    { value: "lifestyle", label: "Lifestyle" },
    { value: "tech", label: "Tech" },
    { value: "fitness", label: "Fitness" },
    { value: "fashion", label: "Fashion" },
    { value: "gaming", label: "Gaming" },
    { value: "photography", label: "Photography" },
    { value: "art", label: "Art & Design" },
    { value: "music", label: "Music" },
    { value: "food", label: "Food & Cooking" },
    { value: "travel", label: "Travel" },
    { value: "education", label: "Education" },
    { value: "finance", label: "Finance" },
    { value: "business", label: "Business" },
    { value: "marketing", label: "Marketing" },
    { value: "sports", label: "Sports" },
    { value: "movies", label: "Movies & TV" },
    { value: "books", label: "Books & Literature" },
    { value: "pets", label: "Pets & Animals" },
    { value: "health", label: "Health & Wellness" },
    { value: "science", label: "Science" },
  ];

  const creators = [
    { id: "creator1", image: "invitecreator1.svg", name: "Creator 1" },
    { id: "creator2", image: "invitecreator2.svg", name: "Creator 2" },
    { id: "creator3", image: "invitecreator3.svg", name: "Creator 3" },
  ];

  const toggleSelection = (value: string) => {
    setSelectedTypes((prevSelected) =>
      prevSelected.includes(value)
        ? prevSelected.filter((item) => item !== value)
        : [...prevSelected, value]
    );
  };

  const toggleMemberSelection = (memberId: string) => {
    setSelectedMembers((prev) =>
      prev.includes(memberId)
        ? prev.filter((id) => id !== memberId)
        : [...prev, memberId]
    );
  };

  const handleCreateCommunity = async () => {
    // Only run on the client after mounting
    if (!mounted) return;

    const token = getAuthToken();
    console.log("Creating community with auth status:", checkAuthStatus());

    if (!token) {
      setError("Authentication token not found. Please login again.");
      router.push("/login");
      return;
    }

    if (!communityName.trim()) {
      setError("Community name is required");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/communities`,
        {
          name: communityName,
          description: communityDescription,
          image: "https://example.com/community.jpg", // Default image, could be improved with image upload
          niche: selectedTypes.join(", "),
          visibility: "public",
          initialMembers: selectedMembers,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 201) {
        toast.success("Community created successfully! 🎉", {
          duration: 3000,
          position: "top-center",
          style: {
            background: "#0BA360",
            color: "white",
          },
        });
        // Add a small delay before redirecting to show the toast
        setTimeout(() => {
          router.push("/communities");
        }, 1000);
      }
    } catch (err: any) {
      console.error("Error creating community:", err);
      setError(err.response?.data?.message || "Failed to create community");
      if (err.response?.status === 401) {
        router.push("/login");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full p-6 rounded-lg">
      <h1 className="text-xl sm:text-2xl text-[#FFFFFF] font-bold mb-6">
        Make your own Community
      </h1>

      {error && (
        <div className="bg-red-500/10 border border-red-500 text-red-500 p-3 rounded-lg mb-4">
          {error}
        </div>
      )}

      <div className="space-y-6 text-white">
        <div>
          <Label
            className="block text-sm mb-2 text-white"
            htmlFor="communityName"
          >
            Community Name
          </Label>
          <Input
            type="text"
            id="communityName"
            value={communityName}
            onChange={(e) =>
              setCommunityName((e.target as HTMLInputElement).value)
            }
            className="w-full p-2 bg-transparent border border-[#FFFFFF33] rounded-lg outline-none focus:ring-2 focus:ring-[#FFFFFF33]"
            placeholder="Twitter community"
          />
        </div>

        <div>
          <Label
            className="block text-sm mb-2 text-white"
            htmlFor="communityDescription"
          >
            Community Description
          </Label>
          <Textarea
            id="communityDescription"
            value={communityDescription}
            onChange={(e) =>
              setCommunityDescription((e.target as HTMLTextAreaElement).value)
            }
            className="w-full p-2 bg-transparent border border-[#FFFFFF33] rounded-lg outline-none focus:ring-2 focus:ring-[#FFFFFF33]"
            rows={3}
            placeholder="Write some interesting shit about your community"
          />
        </div>

        <div>
          <Label className="block text-sm mb-2 text-white">
            Community niches
          </Label>
          <div className="relative">
            <button
              type="button"
              onClick={() => setIsNicheDropdownOpen(!isNicheDropdownOpen)}
              className="w-full p-3 bg-transparent border border-[#FFFFFF33] rounded-lg outline-none focus:ring-2 focus:ring-[#FFFFFF33] text-white flex items-center justify-between"
            >
              <div className="flex flex-wrap gap-2">
                {selectedTypes.length > 0 ? (
                  selectedTypes.map((type) => (
                    <span
                      key={type}
                      className="bg-[#333333] px-2 py-1 rounded-full text-sm"
                    >
                      {collabTypes.find((t) => t.value === type)?.label}
                    </span>
                  ))
                ) : (
                  <span className="text-gray-400">Select niches...</span>
                )}
              </div>
              <svg
                className={`w-4 h-4 transition-transform duration-200 ${
                  isNicheDropdownOpen ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {isNicheDropdownOpen && (
              <div className="absolute z-50 w-full mt-2 bg-[#1E1E1E] border border-[#FFFFFF33] rounded-lg shadow-lg max-h-[300px] overflow-y-auto">
                {collabTypes.map((type) => (
                  <div
                    key={type.value}
                    className={`p-3 hover:bg-[#333333] cursor-pointer flex items-center ${
                      selectedTypes.includes(type.value) ? "bg-[#333333]" : ""
                    }`}
                    onClick={() => {
                      toggleSelection(type.value);
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={selectedTypes.includes(type.value)}
                      onChange={() => toggleSelection(type.value)}
                      className="mr-3"
                    />
                    <span>{type.label}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div>
          <h2 className="text-white font-medium text-sm mb-4">
            Invite folks to your community
          </h2>
          <div className="space-y-4">
            {creators.map((creator, index) => (
              <div
                key={index}
                className="flex items-center justify-between gap-4 bg-[#0E0E0E] p-4 rounded-lg"
              >
                <div className="flex items-center gap-4 flex-1 min-w-0">
                  <div className="flex-shrink-0">
                    <Image
                      width={48}
                      height={48}
                      src={creator.image}
                      alt={creator.name}
                      className="rounded-full"
                    />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-white font-medium text-sm truncate">
                      {creator.name}
                    </h3>
                    <p className="text-white/70 text-xs truncate">
                      We live and breathe twitter!
                    </p>
                  </div>
                </div>
                <Button
                  className={`${
                    selectedMembers.includes(creator.id)
                      ? "bg-green-500"
                      : "bg-white"
                  } hover:bg-opacity-90 transition-colors rounded-md shrink-0`}
                  onClick={() => toggleMemberSelection(creator.id)}
                >
                  <span
                    className={`${
                      selectedMembers.includes(creator.id)
                        ? "text-white"
                        : "text-black"
                    } px-4 sm:px-6 py-1`}
                  >
                    {selectedMembers.includes(creator.id)
                      ? "Selected"
                      : "Invite"}
                  </span>
                </Button>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center pt-6">
          <Button
            className="bg-gradient-to-r from-[#0BA360] to-[#27A980] rounded-md w-full sm:w-auto"
            onClick={handleCreateCommunity}
            disabled={isLoading}
          >
            <span className="block py-2 px-8 sm:px-16">
              {isLoading
                ? "Creating community..."
                : "Start building that community!"}
            </span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Makeyourcommunity;
