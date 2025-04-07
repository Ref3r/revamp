// src/services/authService.ts

import apiClient from "@/utils/apiClient";

// Define the types for authentication payloads and responses
export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  email: string;
  password: string;
}

export interface ForgotPasswordPayload {
  email: string;
}

export interface ResetPasswordPayload {
  token: string;
  newPassword: string;
}

export interface AuthResponse {
  success: boolean;
  token?: string;
  message?: string;
}

// API URL - should be set in .env
const rawApiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";
// Remove trailing /api/v1 if present
const API_URL = rawApiUrl.endsWith("/api/v1")
  ? rawApiUrl.slice(0, -8)
  : rawApiUrl;
console.log("API URL:", API_URL); // Debug log

// Base API path for auth endpoints
const AUTH_BASE_PATH = "/api/v1/auth";
console.log("Full Auth URL:", `${API_URL}${AUTH_BASE_PATH}/login`); // Debug log

/**
 * Login a user
 * @param credentials - User credentials
 * @returns Authentication response with token
 */
export async function loginUser(
  credentials: LoginPayload
): Promise<AuthResponse> {
  try {
    console.log("Attempting login for email:", credentials.email);
    console.log("Connecting to:", `${API_URL}/auth/login`);

    // const response = await fetch(`${API_URL}${AUTH_BASE_PATH}/login`, {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //     Accept: "application/json",
    //   },
    //   body: JSON.stringify(credentials),
    // });

    const response = await apiClient.post(`/auth/login`, credentials, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    const data = await response.data;
    console.log("Login response status:", response.status);

    if (response.status !== 200) {
      console.error("Login failed:", data.message);
      throw new Error(data.message || "Login failed");
    }

    // Verify we received a token
    if (!data.token) {
      console.error("No token received in login response");
      throw new Error("No authentication token received");
    }

    console.log("Login successful, received token");

    // Store the token
    setAuthToken(data.token);

    // Verify token was stored
    const storedToken = getAuthToken();
    if (!storedToken) {
      console.error("Failed to store authentication token");
      throw new Error("Failed to store authentication token");
    }

    console.log("Token stored successfully");

    return {
      success: true,
      token: data.token,
      message: "Login successful",
    };
  } catch (error) {
    console.error("Login error:", error);
    // More detailed error message for connection issues
    if (error instanceof TypeError && error.message === "Failed to fetch") {
      return {
        success: false,
        message:
          "Unable to connect to the server. Please ensure the server is running on " +
          API_URL,
      };
    }
    return {
      success: false,
      message: error instanceof Error ? error.message : "Login failed",
    };
  }
}

/**
 * Register a new user
 * @param credentials - User registration details
 * @returns Authentication response
 */
export async function registerUser(
  credentials: RegisterPayload
): Promise<AuthResponse> {
  try {
    const response = await fetch(`${API_URL}${AUTH_BASE_PATH}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Registration failed");
    }

    return {
      success: true,
      token: data.token,
      message:
        data.message ||
        "Registration successful! Please check your email to verify your account.",
    };
  } catch (error) {
    console.error("Registration error:", error);
    return {
      success: false,
      message: error instanceof Error ? error.message : "Registration failed",
    };
  }
}

/**
 * Request a password reset
 * @param payload - Email for password reset
 * @returns Authentication response
 */
export async function forgotPassword(
  payload: ForgotPasswordPayload
): Promise<AuthResponse> {
  try {
    const response = await fetch(
      `${API_URL}${AUTH_BASE_PATH}/forgot-password`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to send reset email");
    }

    return {
      success: true,
      message:
        "If your email exists in our system, you will receive a password reset link",
    };
  } catch (error) {
    console.error("Forgot password error:", error);
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "Failed to process request",
    };
  }
}

/**
 * Reset a user's password
 * @param payload - Reset token and new password
 * @returns Authentication response
 */
export async function resetPassword(
  payload: ResetPasswordPayload
): Promise<AuthResponse> {
  try {
    const response = await fetch(`${API_URL}${AUTH_BASE_PATH}/reset-password`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to reset password");
    }

    return {
      success: true,
      message: "Password has been reset successfully",
    };
  } catch (error) {
    console.error("Reset password error:", error);
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "Failed to reset password",
    };
  }
}

/**
 * Store the JWT token securely
 * @param token - JWT token to store
 */
export function setAuthToken(token: string): void {
  console.log("Attempting to store auth token...");

  // Make sure we're in a browser environment
  if (typeof window !== "undefined" && window.localStorage) {
    try {
      localStorage.setItem("auth_token", token);
      const storedToken = localStorage.getItem("auth_token");
      if (storedToken === token) {
        console.log("Auth token saved and verified successfully");
      } else {
        console.error("Token verification failed after storage");
      }
    } catch (error) {
      console.error("Error saving auth token:", error);
    }
  } else {
    console.warn(
      "Unable to store auth token: Not in browser environment or localStorage not available"
    );
    console.log("Environment check:", {
      hasWindow: typeof window !== "undefined",
      hasLocalStorage: typeof window !== "undefined" && !!window.localStorage,
    });
  }
}

/**
 * Get the stored JWT token
 * @returns The stored JWT token or null if not found
 */
export function getAuthToken(): string | null {
  console.log("Attempting to retrieve auth token...");

  // Make sure we're in a browser environment
  if (typeof window !== "undefined" && window.localStorage) {
    try {
      const token = localStorage.getItem("auth_token");
      if (token) {
        console.log("Auth token found:", token.substring(0, 10) + "...");
      } else {
        console.warn("No auth token found in localStorage");
      }
      return token;
    } catch (error) {
      console.error("Error retrieving auth token:", error);
      return null;
    }
  } else {
    console.warn(
      "Unable to retrieve auth token: Not in browser environment or localStorage not available"
    );
    console.log("Environment check:", {
      hasWindow: typeof window !== "undefined",
      hasLocalStorage: typeof window !== "undefined" && !!window.localStorage,
    });
    return null;
  }
}

/**
 * Remove the stored JWT token
 */
export function removeAuthToken(): void {
  console.log("Attempting to remove auth token...");

  // Make sure we're in a browser environment
  if (typeof window !== "undefined" && window.localStorage) {
    try {
      const tokenBefore = localStorage.getItem("auth_token");
      localStorage.removeItem("auth_token");
      const tokenAfter = localStorage.getItem("auth_token");

      if (!tokenAfter && tokenBefore) {
        console.log("Auth token removed successfully");
      } else if (tokenAfter) {
        console.error("Failed to remove auth token");
      } else {
        console.log("No token was present to remove");
      }
    } catch (error) {
      console.error("Error removing auth token:", error);
    }
  } else {
    console.warn(
      "Unable to remove auth token: Not in browser environment or localStorage not available"
    );
    console.log("Environment check:", {
      hasWindow: typeof window !== "undefined",
      hasLocalStorage: typeof window !== "undefined" && !!window.localStorage,
    });
  }
}

/**
 * Check if user is authenticated
 * @returns Boolean indicating if user is authenticated
 */
export function isAuthenticated(): boolean {
  console.log("Checking authentication status...");
  const token = getAuthToken();
  const isAuth = !!token;
  console.log("Authentication check result:", { isAuthenticated: isAuth });
  return isAuth;
}
