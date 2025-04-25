import apiClient from "@/utils/apiClient";
import { ServiceError } from "@/utils/errors";

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
    console.log("Sending message to community:", communityId);

    const response = await apiClient.post(`/messages/${communityId}`, {
      content,
      attachments,
    });

    if (!response.data.success) {
      throw new ServiceError(
        response.data.message || "Failed to send message",
        response.status
      );
    }

    return response.data;
  } catch (error) {
    console.error("Send message error:", error);
    throw error;
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
    console.log(
      `Fetching messages for community ${communityId}, page ${page}, limit ${limit}`
    );

    const response = await apiClient.get(`/messages/${communityId}`, {
      params: { page, limit },
    });

    if (!response.data.success) {
      throw new ServiceError(
        response.data.message || "Failed to get messages",
        response.status
      );
    }

    return response.data;
  } catch (error) {
    console.error("Get messages error:", error);
    throw error;
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
    console.log("Marking messages as read for community:", communityId);

    const response = await apiClient.post(`/messages/${communityId}/read`);

    if (!response.data.success) {
      throw new ServiceError(
        response.data.message || "Failed to mark messages as read",
        response.status
      );
    }

    return response.data;
  } catch (error) {
    console.error("Mark as read error:", error);
    throw error;
  }
}
