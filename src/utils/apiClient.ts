import axios from "axios";
import { ServiceError } from "@/utils/errors";

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // Enable sending cookies with cross-origin requests
});

// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    config.headers["Content-Type"] = "application/json";
    config.headers["Access-Control-Allow-Origin"] = "*";
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor to handle errors
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API response error:", error);
    if (axios.isAxiosError(error)) {
      console.error("Response data:", error.response?.data);
      console.error("Response status:", error.response?.status);
      throw new ServiceError(
        error.response?.data?.message || "An unexpected error occurred",
        error.response?.status || 500
      );
    }
    throw new ServiceError("An unexpected error occurred", 500);
  }
);

export default apiClient;
