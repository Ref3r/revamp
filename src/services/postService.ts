import { getAuthToken } from "@/utils/auth";

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
    const token = getAuthToken();
    if (!token) {
      return {
        success: false,
        message: "Authentication required",
      };
    }

    const API_URL = process.env.NEXT_PUBLIC_API_URL;
    if (!API_URL) {
      throw new Error("API URL not configured");
    }

    console.log("Creating post with data:", postData);
    console.log("Create post URL:", `${API_URL}/api/v1/posts`);

    const response = await fetch(`${API_URL}/api/v1/posts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(postData),
    });

    // Try to parse JSON, but handle non-JSON responses
    let data;
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      data = await response.json();
    } else {
      const text = await response.text();
      console.error("Non-JSON response:", text);
      throw new Error("Server returned non-JSON response");
    }

    if (!response.ok) {
      return {
        success: false,
        message: data.message || "Failed to create post",
      };
    }

    return {
      success: true,
      message: "Post created successfully",
      data: data,
    };
  } catch (error) {
    console.error("Error creating post:", error);
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "An unexpected error occurred",
    };
  }
};

// Like a post
export const likePost = async (postId: string): Promise<PostResponse> => {
  try {
    const token = getAuthToken();
    if (!token) {
      return {
        success: false,
        message: "Authentication required",
      };
    }

    const API_URL = process.env.NEXT_PUBLIC_API_URL;
    if (!API_URL) {
      throw new Error("API URL not configured");
    }

    console.log("Liking post with ID:", postId);
    console.log("Like request URL:", `${API_URL}/api/v1/posts/${postId}/like`);

    const response = await fetch(`${API_URL}/api/v1/posts/${postId}/like`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({}),
    });

    // Try to parse JSON, but handle non-JSON responses
    let data;
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      data = await response.json();
    } else {
      const text = await response.text();
      console.error("Non-JSON response:", text);
      throw new Error("Server returned non-JSON response");
    }

    if (!response.ok) {
      return {
        success: false,
        message: data.message || "Failed to like post",
      };
    }

    return {
      success: true,
      message: "Post liked successfully",
      data: data,
    };
  } catch (error) {
    console.error("Error liking post:", error);
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "An unexpected error occurred",
    };
  }
};

// Unlike a post
export const unlikePost = async (postId: string): Promise<PostResponse> => {
  try {
    const token = getAuthToken();
    if (!token) {
      return {
        success: false,
        message: "Authentication required",
      };
    }

    const API_URL = process.env.NEXT_PUBLIC_API_URL;
    if (!API_URL) {
      throw new Error("API URL not configured");
    }

    console.log("Unliking post with ID:", postId);
    console.log(
      "Unlike request URL:",
      `${API_URL}/api/v1/posts/${postId}/unlike`
    );

    const response = await fetch(`${API_URL}/api/v1/posts/${postId}/unlike`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({}),
    });

    // Try to parse JSON, but handle non-JSON responses
    let data;
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      data = await response.json();
    } else {
      const text = await response.text();
      console.error("Non-JSON response:", text);
      throw new Error("Server returned non-JSON response");
    }

    if (!response.ok) {
      return {
        success: false,
        message: data.message || "Failed to unlike post",
      };
    }

    return {
      success: true,
      message: "Post unliked successfully",
      data: data,
    };
  } catch (error) {
    console.error("Error unliking post:", error);
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "An unexpected error occurred",
    };
  }
};

// Comment on a post
export const commentOnPost = async (
  postId: string,
  commentData: CommentData
): Promise<PostResponse> => {
  try {
    const token = getAuthToken();
    if (!token) {
      return {
        success: false,
        message: "Authentication required",
      };
    }

    const API_URL = process.env.NEXT_PUBLIC_API_URL;
    if (!API_URL) {
      throw new Error("API URL not configured");
    }

    console.log("Commenting on post with ID:", postId);
    console.log(
      "Comment request URL:",
      `${API_URL}/api/v1/posts/${postId}/comments`
    );
    console.log("Comment data:", commentData);

    const response = await fetch(`${API_URL}/api/v1/posts/${postId}/comments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(commentData),
    });

    // Try to parse JSON, but handle non-JSON responses
    let data;
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      data = await response.json();
    } else {
      const text = await response.text();
      console.error("Non-JSON response:", text);
      throw new Error("Server returned non-JSON response");
    }

    if (!response.ok) {
      return {
        success: false,
        message: data.message || "Failed to add comment",
      };
    }

    return {
      success: true,
      message: "Comment added successfully",
      data: data,
    };
  } catch (error) {
    console.error("Error commenting on post:", error);
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "An unexpected error occurred",
    };
  }
};

// Get post feed
export const getPostFeed = async (
  page: number = 1,
  limit: number = 10
): Promise<PostResponse> => {
  try {
    const token = getAuthToken();
    if (!token) {
      return {
        success: false,
        message: "Authentication required",
      };
    }

    const API_URL = process.env.NEXT_PUBLIC_API_URL;
    if (!API_URL) {
      throw new Error("API URL not configured");
    }

    console.log(
      "Fetching posts from:",
      `${API_URL}/api/v1/posts/timeline?page=${page}&limit=${limit}`
    );

    const response = await fetch(
      `${API_URL}/api/v1/posts/timeline?page=${page}&limit=${limit}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await response.json();
    console.log("Post API response:", data);

    if (!response.ok) {
      console.error("Failed to fetch posts:", response.status, data);
      return {
        success: false,
        message: data.message || "Failed to fetch posts",
      };
    }

    return {
      success: true,
      message: "Posts retrieved successfully",
      data: data.posts || [], // Extract posts array from the response
      pagination: {
        totalCount: data.totalCount || 0,
        page: data.page || 1,
        limit: data.limit || 10,
        totalPages: data.totalPages || 1,
      },
    };
  } catch (error) {
    console.error("Error fetching posts:", error);
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "An unexpected error occurred",
    };
  }
};

// Get post by ID
export const getPostById = async (postId: string): Promise<PostResponse> => {
  try {
    const token = getAuthToken();
    if (!token) {
      return {
        success: false,
        message: "Authentication required",
      };
    }

    const API_URL = process.env.NEXT_PUBLIC_API_URL;
    if (!API_URL) {
      throw new Error("API URL not configured");
    }

    console.log("Fetching post with ID:", postId);
    console.log("Get post URL:", `${API_URL}/api/v1/posts/${postId}`);

    const response = await fetch(`${API_URL}/api/v1/posts/${postId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    // Try to parse JSON, but handle non-JSON responses
    let data;
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      data = await response.json();
    } else {
      const text = await response.text();
      console.error("Non-JSON response:", text);
      throw new Error("Server returned non-JSON response");
    }

    if (!response.ok) {
      console.error("Failed to fetch post:", response.status, data);
      return {
        success: false,
        message: data.message || "Failed to fetch post",
      };
    }

    return {
      success: true,
      message: "Post retrieved successfully",
      data: data,
    };
  } catch (error) {
    console.error("Error fetching post:", error);
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "An unexpected error occurred",
    };
  }
};
