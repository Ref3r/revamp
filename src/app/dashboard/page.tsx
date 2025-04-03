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
import Post2 from "@/components/dashboard/Post-2";
import WalletBalance from "@/components/dashboard/WalletBalance";
import RecentContests from "@/components/dashboard/RecentContests";
import DashboardMenu from "@/components/dashboard/DashboardMenu";
import ProfileBox from "@/components/dashboard/ProfileBox";
import { getPostFeed } from "@/services/postService";
import { isAuthenticated, getAuthToken, checkAuthStatus } from "@/utils/auth";
import { toast } from "react-hot-toast";
import { API_BASE_URL } from "@/config/api";

const Dashboard = () => {
  const router = useRouter();
  const [posts, setPosts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [userData, setUserData] = useState<any>(null);
  const [userLoading, setUserLoading] = useState(true);
  const [userError, setUserError] = useState("");

  // Check if user is authenticated
  useEffect(() => {
    // Debug authentication status
    if (typeof window !== "undefined") {
      // Wait a moment for any localStorage operations to complete
      setTimeout(() => {
        const token = getAuthToken();
        console.log("Dashboard - Auth Token Check:", {
          hasToken: !!token,
          tokenFirstChars: token ? `${token.substring(0, 10)}...` : null,
        });
      }, 500);
    }

    if (!isAuthenticated()) {
      // For development, we'll just show a toast but allow access
      // In production, uncomment the router.push line to force login
      toast.error("You're not logged in. Using development mode.");
      // router.push('/sign-up');
    }
  }, [router]);

  // Fetch user data
  const fetchUserData = async () => {
    setUserLoading(true);
    setUserError("");

    try {
      const token = getAuthToken();
      if (!token) {
        setUserError("No authentication token found");
        setUserLoading(false);
        return;
      }

      const response = await fetch(`${API_BASE_URL}/api/v1/users/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch user data: ${response.statusText}`);
      }

      const data = await response.json();
      setUserData(data.user);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to fetch user data";
      setUserError(errorMessage);
      console.error("User data fetch error:", errorMessage);
    } finally {
      setUserLoading(false);
    }
  };

  // Fetch posts when component mounts
  const fetchPosts = async () => {
    setIsLoading(true);
    setError("");

    try {
      const response = await getPostFeed();

      if (response.success) {
        setPosts(response.data || []);
      } else {
        setError(response.message);
        toast.error(response.message);
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to fetch posts";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
    fetchUserData();
  }, []);

  // Debug function to check auth status
  const handleCheckAuth = () => {
    const status = checkAuthStatus();
    if (status.isAuthenticated) {
      toast.success("You are properly authenticated!");
    } else {
      toast.error("Not authenticated. Check console for details.");
    }
  };

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
      <div className="fixed top-0 left-0 right-0 z-20 px-3 lg:pl-20">
        <WalletBalance />

        {/* Debug button - only in development */}
        {process.env.NODE_ENV !== "production" && (
          <div className="absolute top-2 right-4">
            <button
              onClick={handleCheckAuth}
              className="text-xs px-2 py-1 bg-gray-800 text-gray-300 rounded hover:bg-gray-700"
            >
              Check Auth
            </button>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="pt-20 px-3 lg:pl-24 lg:pr-4 pb-16 lg:pb-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          {/* Left Column - Only visible on large screens */}
          <div className="hidden lg:block lg:col-span-3 relative">
            <div className="sticky top-24 space-y-4">
              <Profile_box
                userData={userData}
                isLoading={userLoading}
                error={userError}
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
              <Homefeed onPostCreated={fetchPosts} />
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
                  <p className="text-red-400">{error}</p>
                  <button
                    onClick={fetchPosts}
                    className="mt-4 bg-[#282828] text-white px-4 py-2 rounded-lg hover:bg-[#383838]"
                  >
                    Retry
                  </button>
                </div>
              ) : posts.length > 0 ? (
                posts.map((post) => <Post key={post.id} post={post} />)
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
            <div className="sticky top-24 space-y-4">
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
              error={userError}
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
