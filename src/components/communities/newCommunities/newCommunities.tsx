"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@lemonsqueezy/wedges";
import axios from "axios";
import { getAuthToken } from "@/utils/auth";
import { toast } from "react-hot-toast";

interface Community {
  _id: string;
  name: string;
  description: string;
  image: string;
  niche: string;
  creator: {
    _id: string;
    email: string;
    profilePicture: string;
    name?: string;
  };
  members: string[];
  admins: string[];
  visibility: string;
  createdAt: string;
  updatedAt: string;
}

const Newcommunities = () => {
  const [communities, setCommunities] = useState<Community[]>([]);
  const [joiningCommunity, setJoiningCommunity] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch suggested communities
  const fetchSuggestedCommunities = async () => {
    try {
      const token = getAuthToken();
      if (!token) return;

      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/communities`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        setCommunities(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching suggested communities:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle joining a community
  const handleJoinCommunity = async (communityId: string) => {
    try {
      setJoiningCommunity(communityId);
      const token = getAuthToken();
      if (!token) {
        toast.error("Please log in to join communities");
        return;
      }

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/communities/${communityId}/join`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        toast.success("Successfully joined the community!");
        // Refresh the communities list
        fetchSuggestedCommunities();
      }
    } catch (error) {
      console.error("Error joining community:", error);
      toast.error("Failed to join community");
    } finally {
      setJoiningCommunity(null);
    }
  };

  useEffect(() => {
    fetchSuggestedCommunities();
  }, []);

  return (
    <div className="w-full p-6 rounded-lg">
      <h2 className="text-[#FFFFFF] font-bold text-xl mb-6">
        Suggested Communities
      </h2>

      <div className="space-y-4">
        {isLoading ? (
          <div className="flex justify-center items-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-green-500"></div>
          </div>
        ) : communities.length === 0 ? (
          <div className="text-center py-8 text-gray-400">
            No communities available
          </div>
        ) : (
          communities.map((community) => (
            <div
              key={community._id}
              className="flex items-center justify-between gap-4 bg-[#0E0E0E] p-4 rounded-lg"
            >
              <div className="flex items-center gap-4 flex-1 min-w-0">
                <div className="flex-shrink-0">
                  <Image
                    height={48}
                    width={48}
                    src={community.image || "/default-community.svg"}
                    alt={community.name}
                    className="rounded-full"
                  />
                </div>
                <div className="min-w-0">
                  <h2 className="text-[#FFFFFF] text-sm sm:text-base font-medium truncate">
                    {community.name}
                  </h2>
                  <p className="text-[#FFFFFF7A] text-xs sm:text-sm font-medium truncate">
                    {community.description}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-gray-400 text-xs bg-[#282828] px-2 py-1 rounded-full">
                      {community.niche}
                    </span>
                    <span className="text-gray-400 text-xs">
                      {community.members.length} members
                    </span>
                  </div>
                </div>
              </div>
              <Button
                onClick={() => handleJoinCommunity(community._id)}
                disabled={joiningCommunity === community._id}
                className={`bg-white hover:bg-white/90 transition-colors rounded-md shrink-0 ${
                  joiningCommunity === community._id ? "opacity-50" : ""
                }`}
              >
                {joiningCommunity === community._id ? (
                  <div className="flex items-center px-4 sm:px-6 py-1">
                    <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-black mr-2"></div>
                    <span className="text-black">Joining...</span>
                  </div>
                ) : (
                  <span className="text-black px-4 sm:px-6 py-1">Join</span>
                )}
              </Button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Newcommunities;
