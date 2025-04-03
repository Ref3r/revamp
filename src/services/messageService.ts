import { getAuthToken } from "@/utils/auth";

// Define types for messages
export interface Message {
  _id: string;
  sender: {
    _id: string;
    name?: string;
    email: string;
    profilePicture?: string;
  };
  community: string;
  content: string;
  attachments?: string[];
  readBy: string[];
  createdAt: string;
  updatedAt: string;
}

// Types for API responses
export interface GetMessagesResponse {
  success: boolean;
  data: Message[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    pages: number;
  };
  message?: string;
}

export interface SendMessageResponse {
  success: boolean;
  data: Message;
  message?: string;
}

export interface MarkAsReadResponse {
  success: boolean;
  message?: string;
}

// Get API URL from environment
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";
const MESSAGE_BASE_PATH = "/api/v1/messages";

/**
 * Send a message to a community
 * @param communityId - ID of the community
 * @param content - Message content
 * @param attachments - Optional array of attachment URLs
 * @returns Response with the created message
 */
export async function sendMessage(
  communityId: string,
  content: string,
  attachments?: string[]
): Promise<SendMessageResponse> {
  try {
    const token = getAuthToken();
    if (!token) {
      return {
        success: false,
        message: "Authentication required",
      } as SendMessageResponse;
    }

    const response = await fetch(
      `${API_URL}${MESSAGE_BASE_PATH}/${communityId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          content,
          attachments,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to send message");
    }

    return data;
  } catch (error) {
    console.error("Send message error:", error);
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "Failed to send message",
    } as SendMessageResponse;
  }
}

/**
 * Get messages from a community
 * @param communityId - ID of the community
 * @param page - Page number for pagination
 * @param limit - Number of messages per page
 * @returns Response with messages and pagination data
 */
export async function getMessages(
  communityId: string,
  page: number = 1,
  limit: number = 20
): Promise<GetMessagesResponse> {
  try {
    const token = getAuthToken();
    if (!token) {
      return {
        success: false,
        data: [],
        pagination: { total: 0, page, limit, pages: 0 },
        message: "Authentication required",
      } as GetMessagesResponse;
    }

    const response = await fetch(
      `${API_URL}${MESSAGE_BASE_PATH}/${communityId}?page=${page}&limit=${limit}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to get messages");
    }

    return data;
  } catch (error) {
    console.error("Get messages error:", error);
    return {
      success: false,
      data: [],
      pagination: { total: 0, page, limit, pages: 0 },
      message:
        error instanceof Error ? error.message : "Failed to get messages",
    } as GetMessagesResponse;
  }
}

/**
 * Mark messages in a community as read
 * @param communityId - ID of the community
 * @returns Response indicating success or failure
 */
export async function markMessagesAsRead(
  communityId: string
): Promise<MarkAsReadResponse> {
  try {
    const token = getAuthToken();
    if (!token) {
      return {
        success: false,
        message: "Authentication required",
      } as MarkAsReadResponse;
    }

    const response = await fetch(
      `${API_URL}${MESSAGE_BASE_PATH}/${communityId}/read`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to mark messages as read");
    }

    return data;
  } catch (error) {
    console.error("Mark as read error:", error);
    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Failed to mark messages as read",
    } as MarkAsReadResponse;
  }
}
