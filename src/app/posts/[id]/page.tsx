"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Sidebar from "@/components/dashboard/Sidebar";
import WalletBalance from "@/components/dashboard/WalletBalance";
import Post from "@/components/dashboard/Post";
import { getPostById } from "@/services/postService";
import { isAuthenticated } from "@/utils/auth";
import { toast } from "react-hot-toast";

const PostDetail = () => {
  const params = useParams();
  const router = useRouter();
  const postId = params.id as string;

  const [post, setPost] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  // Check if user is authenticated
  useEffect(() => {
    if (!isAuthenticated()) {
      // For development, we'll just show a toast but allow access
      // In production, uncomment the router.push line to force login
      toast.error("You're not logged in. Using development mode.");
      // router.push('/sign-up');
    }
  }, [router]);

  // Fetch post when component mounts
  const fetchPost = async () => {
    setIsLoading(true);
    setError("");

    try {
      const response = await getPostById(postId);

      if (response.success) {
        setPost(response.data);
      } else {
        setError(response.message);
        toast.error(response.message);
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to fetch post";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (postId) {
      fetchPost();
    }
  }, [postId]);

  // Handle back to feed
  const handleBackToFeed = () => {
    router.push("/dashboard");
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
      </div>

      {/* Main Content */}
      <div className="pt-20 px-3 lg:pl-24 lg:pr-4 pb-16 lg:pb-4">
        <div className="max-w-3xl mx-auto">
          {/* Back button */}
          <button
            onClick={handleBackToFeed}
            className="flex items-center mb-6 text-white hover:text-gray-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            <span className="ml-2">Back to Feed</span>
          </button>

          {/* Post content */}
          {isLoading ? (
            <div className="text-center py-10">
              <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-green-500 mx-auto"></div>
              <p className="text-white mt-4">Loading post...</p>
            </div>
          ) : error ? (
            <div className="bg-[#1A1919] rounded-[20px] p-6 text-center">
              <p className="text-red-400">{error}</p>
              <button
                onClick={fetchPost}
                className="mt-4 bg-[#282828] text-white px-4 py-2 rounded-lg hover:bg-[#383838]"
              >
                Retry
              </button>
            </div>
          ) : post ? (
            <>
              <Post post={post} />

              {/* Additional post details can be added here */}
              <div className="bg-[#1A1919] rounded-[20px] p-4 mt-4">
                <h2 className="text-white text-lg font-medium mb-2">
                  Post Details
                </h2>
                <div className="text-gray-400 text-sm">
                  <p>Post ID: {post.id}</p>
                  {post.createdAt && (
                    <p>Created: {new Date(post.createdAt).toLocaleString()}</p>
                  )}
                  <p>Visibility: {post.visibility || "Public"}</p>
                </div>
              </div>
            </>
          ) : (
            <div className="bg-[#1A1919] rounded-[20px] p-6 text-center">
              <p className="text-white mb-4">Post not found</p>
              <button
                onClick={handleBackToFeed}
                className="bg-[#00B24E] hover:bg-[#00A047] text-white px-4 py-2 rounded-lg"
              >
                Back to Feed
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PostDetail;
