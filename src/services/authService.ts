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

export interface GoogleAuthPayload {
  idToken: string;
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
  isNewUser?: boolean;
}

// API URL - should be set in .env
const rawApiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";
// Remove trailing /api/v1 if present
const API_URL = rawApiUrl.endsWith("/api/v1")
  ? rawApiUrl.slice(0, -7)
  : rawApiUrl;

// Base API path for auth endpoints
const AUTH_BASE_PATH = "/api/v1/auth";

/**
 * Login a user
 * @param credentials - User credentials
 * @returns Authentication response with token
 */
export async function loginUser(
  credentials: LoginPayload
): Promise<AuthResponse> {
  try {
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

    if (response.status !== 200) {
      console.error("Login failed:", data.message);
      throw new Error(data.message || "Login failed");
    }

    // Verify we received a token
    if (!data.token) {
      console.error("No token received in login response");
      throw new Error("No authentication token received");
    }

    // Store the token
    setAuthToken(data.token);

    // Verify token was stored
    const storedToken = getAuthToken();
    if (!storedToken) {
      console.error("Failed to store authentication token");
      throw new Error("Failed to store authentication token");
    }

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
 * Authenticate with Google
 * @param payload - Google authentication token
 * @returns Authentication response
 */
export async function googleAuth(
  payload: GoogleAuthPayload
): Promise<AuthResponse> {
  try {
    const response = await apiClient.post(`/auth/google`, payload, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    const data = response.data;

    if (response.status !== 200 && response.status !== 201) {
      throw new Error(data.message || "Google authentication failed");
    }

    // Verify we received a token
    if (!data.token) {
      throw new Error("No authentication token received");
    }

    // Store the token
    setAuthToken(data.token);

    return {
      success: true,
      token: data.token,
      message: data.message || "Google authentication successful",
      isNewUser: data.isNewUser,
    };
  } catch (error) {
    console.error("Google authentication error:", error);
    return {
      success: false,
      message: error instanceof Error ? error.message : "Google authentication failed",
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
  // Make sure we're in a browser environment
  if (typeof window !== "undefined" && window.localStorage) {
    try {
      localStorage.setItem("auth_token", token);
      const storedToken = localStorage.getItem("auth_token");
      if (storedToken === token) {
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
  }
}

/**
 * Get the stored JWT token
 * @returns The stored JWT token or null if not found
 */
export function getAuthToken(): string | null {
  // Make sure we're in a browser environment
  if (typeof window !== "undefined" && window.localStorage) {
    try {
      const token = localStorage.getItem("auth_token");
      if (token) {
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

    return null;
  }
}

/**
 * Remove the stored JWT token
 */
export function removeAuthToken(): void {
  // Make sure we're in a browser environment
  if (typeof window !== "undefined" && window.localStorage) {
    try {
      const tokenBefore = localStorage.getItem("auth_token");
      localStorage.removeItem("auth_token");
      const tokenAfter = localStorage.getItem("auth_token");

      if (!tokenAfter && tokenBefore) {
      } else if (tokenAfter) {
        console.error("Failed to remove auth token");
      } else {
      }
    } catch (error) {
      console.error("Error removing auth token:", error);
    }
  } else {
    console.warn(
      "Unable to remove auth token: Not in browser environment or localStorage not available"
    );
  }
}

/**
 * Check if user is authenticated
 * @returns Boolean indicating if user is authenticated
 */
export function isAuthenticated(): boolean {
  const token = getAuthToken();
  const isAuth = !!token;

  return isAuth;
}
