import apiClient from '@/utils/apiClient';
import { SocketMessage, RoomType } from '@/types/socket';
import { DirectChatResponse } from '@/types/chat.type';

// Get all direct chat conversations for the current user
export const getDirectChats = async () => {
  try {
    const response = await apiClient.get('/chats/direct');
    return response.data as DirectChatResponse[];
  } catch (error: any) {
    // Forward the error to be handled by the component
    if (error.response && error.response.status === 401) {
      throw error; // Let the component handle auth errors
    }
    console.error('Error fetching direct chats:', error);
    throw new Error('Failed to fetch your conversations');
  }
};

// Get direct messages between current user and another user
export const getDirectMessages = async (userId: string, page = 1, limit = 50) => {
  try {
    const response = await apiClient.get(`/chats/direct/${userId}`, {
      params: { page, limit }
    });
    return response.data;
  } catch (error: any) {
    if (error.response && error.response.status === 401) {
      throw error; // Let the component handle auth errors
    }
    console.error('Error fetching direct messages:', error);
    throw new Error('Failed to fetch messages');
  }
};

// Send a direct message to another user via REST API
export const sendDirectMessage = async (userId: string, content: string, type = 'text', metadata = {}) => {
  try {
    const response = await apiClient.post(`/chats/direct/${userId}`, {
      content,
      type,
      metadata
    });
    return response.data;
  } catch (error: any) {
    if (error.response && error.response.status === 401) {
      throw error; // Let the component handle auth errors
    }
    console.error('Error sending message:', error);
    throw new Error('Failed to send message');
  }
};

// Mark direct messages as read
export const markDirectMessagesAsRead = async (userId: string) => {
  try {
    const response = await apiClient.post(`/chats/direct/${userId}/read`);
    return response.data;
  } catch (error: any) {
    if (error.response && error.response.status === 401) {
      throw error; // Let the component handle auth errors
    }
    console.error('Error marking messages as read:', error);
    throw new Error('Failed to mark messages as read');
  }
};

// Get all communities the user is a member of
export const getUserCommunities = async () => {
  try {
    const response = await apiClient.get('/chats/communities');
    return response.data;
  } catch (error: any) {
    if (error.response && error.response.status === 401) {
      throw error; // Let the component handle auth errors
    }
    console.error('Error fetching communities:', error);
    throw new Error('Failed to fetch communities');
  }
};

// Get community messages
export const getCommunityMessages = async (communityId: string, page = 1, limit = 50) => {
  try {
    const response = await apiClient.get(`/chats/community/${communityId}`, {
      params: { page, limit }
    });
    return response.data;
  } catch (error: any) {
    if (error.response && error.response.status === 401) {
      throw error; // Let the component handle auth errors
    }
    console.error('Error fetching community messages:', error);
    throw new Error('Failed to fetch messages');
  }
};

// Format a message for socket sending
export const formatSocketMessage = (
  content: string, 
  senderId: string, 
  recipientId: string, 
  senderName?: string,
  senderPicture?: string
): SocketMessage => {
  // For direct messages, the room ID is a combination of both user IDs (sorted)
  const userIds = [senderId, recipientId].sort();
  const roomId = userIds.join('-');
  
  return {
    content,
    senderId,
    senderName,
    senderPicture,
    roomId,
    roomType: RoomType.DIRECT,
    timestamp: new Date()
  };
}; 