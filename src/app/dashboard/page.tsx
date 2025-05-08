/** @format */

"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/dashboard/Sidebar";
import Profile_box from "@/components/dashboard/ProfileBox";
import Homefeed from "@/components/dashboard/Home-feed";
import Communities from "@/components/dashboard/Communities";
import Engagementrate from "@/components/dashboard/Engagement-rate";
import Partnership from "@/components/dashboard/Partnership";
import Post from "@/components/dashboard/Post";
import WalletBalance from "@/components/dashboard/WalletBalance";
import RecentContests from "@/components/dashboard/RecentContests";
import DashboardMenu from "@/components/dashboard/DashboardMenu";
import ProfileBox from "@/components/dashboard/ProfileBox";
import { getPostFeed, PostResponse } from "@/services/postService";
import { toast } from "react-hot-toast";
import { API_BASE_URL } from "@/config/api";
import { useQuery } from "@tanstack/react-query";
import apiClient from "@/utils/apiClient";
import CreatePosts from "@/components/dashboard/CreatePost";

const Dashboard = () => {
  const router = useRouter();
  // const [posts, setPosts] = useState<any[]>([]);
  // const [isLoading, setIsLoading] = useState(true);
  // const [error, setError] = useState("");
  // const [userData, setUserData] = useState<any>(null);
  // const [userLoading, setUserLoading] = useState(true);
  // const [userError, setUserError] = useState("");


  const {
    refetch: fetchPosts,
    data: posts,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["posts"],
    queryFn: () => getPostFeed(),
  });

  const {
    data: userData,
    isLoading: userLoading,
    error: userError,
  } = useQuery({
    queryKey: ["userData"],
    queryFn: async () => {
      // const response = await fetch(`${API_BASE_URL}/users/me`, {
      //   headers: {
      //     Authorization: `Bearer ${token}`,
      //   },
      // });

      const response = await apiClient.get("/users/me");

      if (response.status !== 200) {
        router.push("/sign-up");
        toast.error("Failed to fetch user data");
      }

      const data = await response.data;
      return data.user;
    },
  });


  if (isLoading || userLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#1A1919]">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

  // if (isError) {
  // 	return (
  // 		<div className="flex items-center justify-center min-h-screen">
  // 			<p className="text-red-500">{error.message}</p>
  // 		</div>
  // 	);
  // }

  if (!posts) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-red-500">No posts</p>
      </div>
    );
  }

  // if (!userData) {
  // 	return (
  // 		<div className="flex items-center justify-center min-h-screen">
  // 			<p className="text-red-500">No user data found.</p>
  // 		</div>
  // 	);
  // }

  return (
    <div className="bg-[#0E0E0E] min-h-screen">
      {/* Fixed Sidebar */}
      <div className="fixed left-3 top-0 bottom-0 z-30 hidden lg:block">
        <Sidebar />
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 z-30 lg:hidden bg-[#1A1919] py-2">
        <div className="flex justify-around items-center px-2">
          <Sidebar isMobile={true} />
        </div>
      </div>

      {/* Fixed Header/Wallet Balance */}
      {/* <div className="fixed top-0 left-0 right-0 z-20 px-3 lg:pl-20">
        <WalletBalance />
      </div> */}

      {/* Main Content */}
      <div className="pt-2 px-3 lg:pl-24 lg:pr-4 pb-16 lg:pb-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          {/* Left Column - Only visible on large screens */}
          <div className="hidden lg:block lg:col-span-3 relative">
            <div className="sticky top-6 space-y-4">
              <Profile_box
                userData={userData}
                isLoading={userLoading}
                error={userError?.message}
              />
              <div className="mt-4">
                <Engagementrate />
              </div>
              <div className="mt-4">
                <Partnership />
              </div>
            </div>
          </div>

          {/* Middle Column - Visible on all screen sizes */}
          <div className="col-span-1 lg:col-span-6">
            {/* Home Feed (Create Post) - Fixed */}
            <div className="mb-4 mt-4">
              <CreatePosts onPostCreated={fetchPosts} />
            </div>

            {/* Scrollable Posts Area */}
            <div
              className="space-y-4 overflow-y-auto max-h-[calc(100vh-220px)]"
              id="scrollable-posts"
            >
              {isLoading ? (
                <div className="text-center py-10">
                  <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-green-500 mx-auto"></div>
                  <p className="text-white mt-4">Loading posts...</p>
                </div>
              ) : error ? (
                <div className="bg-[#1A1919] rounded-[20px] p-6 text-center">
                  <p className="text-red-400">{error.message}</p>
                  <button
                    onClick={() => fetchPosts()}
                    className="mt-4 bg-[#282828] text-white px-4 py-2 rounded-lg hover:bg-[#383838]"
                  >
                    Retry
                  </button>
                </div>
              ) : posts.data && posts!.data.length > 0 ? (
                posts!.data.map((post: any) => (
                  <Post key={post._id} post={post} />
                ))
              ) : (
                <div className="bg-[#1A1919] rounded-[20px] p-6 text-center">
                  <p className="text-white mb-4">
                    No posts yet. Be the first to share something!
                  </p>
                  <button
                    onClick={() =>
                      window.scrollTo({ top: 0, behavior: "smooth" })
                    }
                    className="bg-[#00B24E] hover:bg-[#00A047] text-white px-4 py-2 rounded-lg"
                  >
                    Create Post
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Only visible on large screens */}
          <div className="hidden lg:block lg:col-span-3 relative">
            <div className="sticky top-6 space-y-4">
              <Communities />
              <div className="mt-4">
                <RecentContests />
              </div>
              <div className="mt-4">
                <DashboardMenu />
              </div>
            </div>
          </div>

          {/* Mobile Components - Now hidden on all screen sizes */}
          <div className="hidden">
            <ProfileBox
              userData={userData}
              isLoading={userLoading}
              error={userError?.message}
            />
            <Engagementrate />
            <Partnership />
            <Communities />
            <RecentContests />
            <DashboardMenu />
          </div>
        </div>
      </div>

      {/* Custom scrollbar styles */}
      <style jsx>{`
        #scrollable-posts::-webkit-scrollbar {
          width: 6px;
        }
        #scrollable-posts::-webkit-scrollbar-track {
          background: #1a1919;
          border-radius: 10px;
        }
        #scrollable-posts::-webkit-scrollbar-thumb {
          background: #4a4a4a;
          border-radius: 10px;
        }
        #scrollable-posts::-webkit-scrollbar-thumb:hover {
          background: #555;
        }
      `}</style>
    </div>
  );
};

export default Dashboard;
