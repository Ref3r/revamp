// src/utils/auth.ts
// Re-export authentication utility functions

import {
  getAuthToken as getToken,
  setAuthToken as setToken,
  removeAuthToken as removeToken,
  isAuthenticated as checkAuth,
} from "@/services/authService";

// Re-export with the same names
export const getAuthToken = getToken;
export const setAuthToken = setToken;
export const removeAuthToken = removeToken;
export const isAuthenticated = checkAuth;

// Debug function to check authentication status
export const checkAuthStatus = (): {
  isAuthenticated: boolean;
  token?: string | null;
} => {
  const token = getAuthToken();
  const status = {
    isAuthenticated: !!token,
    token: token,
  };

  console.log("Auth Status:", status);

  if (!status.isAuthenticated) {
    console.warn("Not authenticated. Make sure you are logged in.");
  } else {
    console.log("Authentication token found.");
  }

  return status;
};
