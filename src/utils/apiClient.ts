import axios from "axios";
import { getAuthToken } from "@/utils/auth";
import { ServiceError } from "@/utils/errors";

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to add auth token
apiClient.interceptors.request.use(
  (config) => {
    const token = getAuthToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor to handle errors
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (axios.isAxiosError(error)) {
      throw new ServiceError(
        error.response?.data?.message || "An unexpected error occurred",
        error.response?.status || 500
      );
    }
    throw new ServiceError("An unexpected error occurred", 500);
  }
);

export default apiClient;
