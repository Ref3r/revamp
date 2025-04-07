/** @format */

"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button, Input } from "@lemonsqueezy/wedges";
import {
  likePost,
  unlikePost,
  commentOnPost,
  PostResponse,
} from "@/services/postService";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { getAuthToken } from "@/utils/auth";
import { useMutation } from "@tanstack/react-query";

interface PostProps {
  post: {
    _id: string;
    content: string;
    media: string[];
    author: {
      _id: string;
      profilePicture: string;
      name: string; // Assuming author has a name
    };
    likes: string[];
    tags: string[];
    visibility: string;
    comments: any[];
    createdAt: string;
    updatedAt: string;
    location?: {
      coordinates: {
        latitude: number;
        longitude: number;
      };
      name: string;
    };
  };
}

const Post = ({ post }: PostProps) => {
  const router = useRouter();
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const [comments, setComments] = useState<any[]>(post.comments || []);

  // Fetch current user ID on mount
  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const token = getAuthToken();
        if (!token) return;

        const API_URL = process.env.NEXT_PUBLIC_API_URL;
        if (!API_URL) return;

        const response = await fetch(`${API_URL}/api/v1/users/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setCurrentUserId(data.user._id);
        }
      } catch (error) {
        console.error("Error fetching current user:", error);
      }
    };

    fetchCurrentUser();
  }, []);

  const [isLiked, setIsLiked] = useState(
    post.likes?.includes(currentUserId || "") || false
  );
  const [likesCount, setLikesCount] = useState(post.likes?.length || 0);
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState("");
  // const [isSubmittingComment, setIsSubmittingComment] = useState(false);
  // const [comments, setComments] = useState<any[]>(post.comments || []);

  // Update isLiked when currentUserId changes
  useEffect(() => {
    if (currentUserId) {
      setIsLiked(post.likes?.includes(currentUserId) || false);
    }
  }, [currentUserId, post.likes]);

  const { mutate: handleLikeToggle } = useMutation({
    mutationFn: async () => {
      if (!currentUserId) {
        toast.error("Please log in to like posts");
        return;
      }

      if (isLiked) {
        // Unlike post
        await unlikePost(post._id);
      } else {
        // Like post
        await likePost(post._id);
      }
    },
    onSuccess: () => {
      // Update local state after successful mutation
      setIsLiked((prev) => !prev);
      setLikesCount((prev) => (isLiked ? prev - 1 : prev + 1));
    },
    onError: (error) => {
      console.error("Error toggling like:", error);
      toast.error("Failed to process your request");
    },
  });

  const { isPending: isSubmittingComment, mutate: handleCommentSubmit } =
    useMutation({
      mutationFn: async () => {
        if (!commentText.trim()) return;

        const response = await commentOnPost(post._id, {
          content: commentText,
        });

        setComments([
          ...comments,
          {
            _id: response.data?._id || `temp-${Date.now()}`,
            content: commentText,
            author: {
              _id: "current-user", // This would be the current user's ID
              profilePicture: "/user-profile-photo.svg", // This would be the current user's avatar
            },
          },
        ]);
      },
      onSuccess: () => {
        // Add the new comment to local state
        setCommentText("");
        toast.success("Comment added");
      },
      onError: (error) => {
        console.error("Error adding comment:", error);
        toast.error("Failed to add comment");
      },
    });

  useEffect(() => {
    console.log(comments);
  }, [comments]);

  // Navigate to post detail page
  const handlePostClick = () => {
    router.push(`/posts/${post._id}`);
  };

  return (
    <div className="w-full">
      <div className="bg-[#1A1919] rounded-[20px] p-4">
        <div className="flex items-center mb-4">
          <Image
            src={false || "/user-profile-photo.svg"}
            width={42}
            height={42}
            alt="User profile"
            className="rounded-full"
          />
          <div className="ml-4">
            <h1 className="font-medium text-lg text-white">
              {post.author?.name}
            </h1>
            {post.location && (
              <div className="text-sm text-gray-400 flex items-center">
                <Image
                  src="/location.svg"
                  width={12}
                  height={12}
                  alt="Location"
                  className="mr-1"
                />
                <span>{post.location.name}</span>
              </div>
            )}
          </div>
        </div>

        <div className="mb-4 cursor-pointer" onClick={handlePostClick}>
          {/* Post content */}
          <p className="text-white mb-3">{post.content}</p>

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-3">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="bg-[#282828] text-gray-300 text-xs py-1 px-2 rounded-full"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* Post media (image or video) */}
          {post.media && post.media.length > 0 && (
            <div className="relative w-full pb-[56.25%]">
              {" "}
              {/* 16:9 aspect ratio container */}
              <Image
                src={post.media[0]}
                alt="Post media"
                fill
                style={{ objectFit: "cover" }}
                className="rounded-lg"
              />
            </div>
          )}
        </div>

        {/* Likes count */}
        {likesCount > 0 && (
          <div className="flex items-center mb-3 text-gray-400 text-sm">
            {/* <Image
              src="/thumbs-up-filled.svg"
              width={16}
              height={16}
              alt="Likes"
            /> */}
            <span className="ml-2">{likesCount} likes</span>
          </div>
        )}

        {/* Comment, likes, share buttons */}
        <div className="flex justify-between items-center mb-3">
          <Button
            onClick={() => handleLikeToggle()}
            className="flex items-center bg-transparent hover:bg-[#282828] rounded-lg px-3 py-2"
          >
            <Image
              src={isLiked ? "/thumbs-up.svg" : "/thumbs-up.svg"}
              width={22}
              height={22}
              alt="Like"
            />
            <span
              className={`font-medium ml-2 ${
                isLiked ? "text-green-500" : "text-white"
              }`}
            >
              {isLiked ? "Liked" : "Like"}
            </span>
          </Button>

          <Button
            onClick={() => setShowComments(!showComments)}
            className="flex items-center bg-transparent hover:bg-[#282828] rounded-lg px-3 py-2"
          >
            <Image
              src="/comment-icon.svg"
              width={22}
              height={22}
              alt="Comment"
            />
            <span className="font-medium text-white ml-2">Comment</span>
          </Button>

          <Button className="flex items-center bg-transparent hover:bg-[#282828] rounded-lg px-3 py-2">
            <Image src="/share.svg" width={22} height={22} alt="Share" />
            <span className="font-medium text-white ml-2">Share</span>
          </Button>
        </div>

        {/* Comments section */}
        {showComments && (
          <div className="mt-4 border-t border-[#282828] pt-3">
            {/* Comment input */}
            <div className="flex items-center mb-4">
              <Image
                src="/user-profile-photo.svg"
                width={32}
                height={32}
                alt="Your profile"
                className="rounded-full mr-3"
              />
              <div className="flex-1 relative">
                <Input
                  type="text"
                  value={commentText}
                  onChange={(e) =>
                    setCommentText((e.target as HTMLInputElement).value)
                  }
                  placeholder="Write a comment..."
                  className="w-full bg-[#282828] text-white border-none focus:outline-none rounded-full py-2 pr-12"
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleCommentSubmit();
                    }
                  }}
                />
                <Button
                  onClick={() => handleCommentSubmit()}
                  disabled={isSubmittingComment || !commentText.trim()}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-transparent hover:bg-transparent"
                >
                  {isSubmittingComment ? (
                    <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-green-500"></div>
                  ) : (
                    <Image
                      src="/send.svg"
                      width={20}
                      height={20}
                      alt="Send"
                      className="opacity-50 hover:opacity-100"
                    />
                  )}
                </Button>
              </div>
            </div>

            {/* Comments list */}
            <div className="space-y-4">
              {comments.map((comment: any) => (
                <div key={comment._id} className="flex items-start">
                  <Image
                    src={false || "/user-profile-photo.svg"}
                    width={32}
                    height={32}
                    alt="Commenter profile"
                    className="rounded-full mr-3"
                  />
                  <div className="flex-1">
                    <div className="bg-[#282828] rounded-lg p-3">
                      <p className="text-white text-sm">{comment.content}</p>
                    </div>
                    <p className="text-gray-400 text-xs mt-1">
                      {comment.author?._id}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Post;
