import { getAuthToken } from "@/utils/auth";
import axios from "axios";
import { ServiceError } from "@/utils/errors";
import apiClient from "@/utils/apiClient";

// Use the Next.js app URL for API calls
const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

interface LocationData {
  name: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
}

interface CreatePostData {
  content: string;
  media?: string[];
  tags?: string[];
  location?: LocationData;
  visibility?: "public" | "private" | "friends";
}

interface CommentData {
  content: string;
}

export interface PostResponse {
  success: boolean;
  message: string;
  data?: any;
  pagination?: {
    totalCount: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

// Create a new post
export const createPost = async (
  postData: CreatePostData
): Promise<PostResponse> => {
  try {
    console.log("Creating post with data:", postData);

    const response = await apiClient.post("/posts", postData);

    if (!response.data.success) {
      throw new ServiceError(
        response.data.message || "Failed to create post",
        response.status
      );
    }

    return {
      success: true,
      message: "Post created successfully",
      data: response.data,
    };
  } catch (error) {
    console.error("Error creating post:", error);
    throw error;
  }
};

// Like a post
export const likePost = async (postId: string): Promise<PostResponse> => {
  try {
    console.log("Liking post with ID:", postId);

    const response = await apiClient.post(`/posts/${postId}/like`);

    if (!response.data.success) {
      throw new ServiceError(
        response.data.message || "Failed to like post",
        response.status
      );
    }

    return {
      success: true,
      message: "Post liked successfully",
      data: response.data,
    };
  } catch (error) {
    console.error("Error liking post:", error);
    throw error;
  }
};

// Unlike a post
export const unlikePost = async (postId: string): Promise<PostResponse> => {
  try {
    console.log("Unliking post with ID:", postId);

    const response = await apiClient.post(`/posts/${postId}/unlike`);

    if (!response.data.success) {
      throw new ServiceError(
        response.data.message || "Failed to unlike post",
        response.status
      );
    }

    return {
      success: true,
      message: "Post unliked successfully",
      data: response.data,
    };
  } catch (error) {
    console.error("Error unliking post:", error);
    throw error;
  }
};

// Comment on a post
export const commentOnPost = async (
  postId: string,
  commentData: CommentData
): Promise<PostResponse> => {
  try {
    console.log("Commenting on post with ID:", postId);
    console.log("Comment data:", commentData);

    const response = await apiClient.post(
      `/posts/${postId}/comments`,
      commentData
    );

    if (!response.data.success) {
      throw new ServiceError(
        response.data.message || "Failed to add comment",
        response.status
      );
    }

    return {
      success: true,
      message: "Comment added successfully",
      data: response.data,
    };
  } catch (error) {
    console.error("Error commenting on post:", error);
    throw error;
  }
};

// Get post feed
export const getPostFeed = async (
  page: number = 1,
  limit: number = 10
): Promise<PostResponse> => {
  try {
    console.log(`Fetching posts for page ${page} with limit ${limit}`);

    const response = await apiClient.get(`/posts/timeline`, {
      params: { page, limit },
    });

    if (!response.data.success) {
      throw new ServiceError(
        response.data.message || "Failed to fetch posts",
        response.status
      );
    }

    return {
      success: true,
      message: "Posts retrieved successfully",
      data: response.data.posts || [],
      pagination: {
        totalCount: response.data.totalCount || 0,
        page: response.data.page || 1,
        limit: response.data.limit || 10,
        totalPages: response.data.totalPages || 1,
      },
    };
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw error;
  }
};

// Get post by ID
export const getPostById = async (postId: string): Promise<PostResponse> => {
  try {
    console.log("Fetching post with ID:", postId);

    const response = await apiClient.get(`/posts/${postId}`);

    if (!response.data.success) {
      throw new ServiceError(
        response.data.message || "Failed to fetch post",
        response.status
      );
    }

    return {
      success: true,
      message: "Post retrieved successfully",
      data: response.data,
    };
  } catch (error) {
    console.error("Error fetching post:", error);
    throw error;
  }
};
