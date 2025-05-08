// src/utils/auth.ts
// Authentication utility functions for cookie-based authentication

import { isAuthenticated as checkAuth } from "@/services/authService";

// Re-export with the same names
export const isAuthenticated = checkAuth;

// Debug function to check authentication status
export const checkAuthStatus = (): {
  isAuthenticated: boolean;
} => {
  // With cookie-based auth, we can't reliably check if the user is authenticated
  // from the client side without making a request to the server
  const status = {
    isAuthenticated: false,
  };

  console.log("Auth Status:", status);
  console.warn("With cookie-based auth, authentication status can only be determined by making a request to the server.");

  return status;
};
