import apiClient from '@/utils/apiClient';

// Types
export enum CommunityVisibility {
  PUBLIC = 'public',
  PRIVATE = 'private',
}

export interface Community {
  _id: string;
  name: string;
  description: string;
  image?: string;
  niche: string;
  visibility: CommunityVisibility;
  creator: string;
  admins: string[];
  members: string[];
  memberCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface CommunityStats {
  memberCount: number;
  postCount: number;
  activeMembers: number;
  growthRate: number;
}

export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    pages: number;
  };
}

export interface SingleResponse<T> {
  success: boolean;
  data: T;
}

interface CreateCommunityParams {
  name: string;
  description: string;
  image?: string;
  niche: string;
  visibility?: CommunityVisibility;
  initialMembers?: string[];
}

interface UpdateCommunityParams {
  name?: string;
  description?: string;
  image?: string;
  niche?: string;
  visibility?: CommunityVisibility;
}

interface SearchCommunitiesParams {
  query?: string;
  niche?: string;
  page?: number;
  limit?: number;
}

interface GetAllCommunitiesParams {
  page?: number;
  limit?: number;
  sortBy?: 'createdAt' | 'memberCount' | 'name';
  sortOrder?: 'asc' | 'desc';
}

// Service functions
export const getAllCommunities = async (params?: GetAllCommunitiesParams): Promise<PaginatedResponse<Community>> => {
  const response = await apiClient.get('/communities', { params });
  return response.data;
};

export const createCommunity = async (communityData: CreateCommunityParams): Promise<SingleResponse<Community>> => {
  const response = await apiClient.post('/communities', communityData);
  return response.data;
};

export const getCommunityById = async (id: string): Promise<SingleResponse<Community>> => {
  const response = await apiClient.get(`/communities/${id}`);
  return response.data;
};

export const getCreatedCommunities = async (page = 1, limit = 10): Promise<PaginatedResponse<Community>> => {
  const response = await apiClient.get('/communities/user/created', { params: { page, limit } });
  return response.data;
};

export const getJoinedCommunities = async (page = 1, limit = 10): Promise<PaginatedResponse<Community>> => {
  const response = await apiClient.get('/communities/user/joined', { params: { page, limit } });
  return response.data;
};

export const searchCommunities = async (params: SearchCommunitiesParams): Promise<PaginatedResponse<Community>> => {
  const response = await apiClient.get('/communities/search', { params });
  return response.data;
};

export const updateCommunity = async (id: string, updateData: UpdateCommunityParams): Promise<SingleResponse<Community>> => {
  const response = await apiClient.put(`/communities/${id}`, updateData);
  return response.data;
};

export const joinCommunity = async (id: string): Promise<SingleResponse<Community>> => {
  const response = await apiClient.post(`/communities/${id}/join`);
  return response.data;
};

export const leaveCommunity = async (id: string): Promise<SingleResponse<Community>> => {
  const response = await apiClient.post(`/communities/${id}/leave`);
  return response.data;
};

export const addAdmin = async (communityId: string, adminId: string): Promise<SingleResponse<Community>> => {
  const response = await apiClient.post(`/communities/${communityId}/admins`, { adminId });
  return response.data;
};

export const removeAdmin = async (communityId: string, adminId: string): Promise<SingleResponse<Community>> => {
  const response = await apiClient.delete(`/communities/${communityId}/admins`, { 
    data: { adminId } 
  });
  return response.data;
};

export const deleteCommunity = async (id: string): Promise<{ success: boolean; message: string }> => {
  const response = await apiClient.delete(`/communities/${id}`);
  return response.data;
};

export const getCommunityStats = async (id: string): Promise<SingleResponse<CommunityStats>> => {
  const response = await apiClient.get(`/communities/${id}/stats`);
  return response.data;
};
