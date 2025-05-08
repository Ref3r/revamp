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
 * @returns Authentication response
 */
export async function loginUser(
  credentials: LoginPayload
): Promise<AuthResponse> {
  try {
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

    return {
      success: true,
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
    const response = await apiClient.post(`/auth/register`, credentials, {
      headers: { "Content-Type": "application/json" },
    });

    const data = await response.data;

    if (response.status !== 201) {
      throw new Error(data.message || "Registration failed");
    }

    return {
      success: true,
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

    return {
      success: true,
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
    const response = await apiClient.post(
      `/auth/forgot-password`,
      payload,
      {
        headers: { "Content-Type": "application/json" },
      }
    );

    const data = await response.data;

    if (response.status !== 200) {
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
    const response = await apiClient.post(`/auth/reset-password`, payload, {
      headers: { "Content-Type": "application/json" },
    });

    const data = await response.data;

    if (response.status !== 200) {
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
 * Check if user is authenticated
 * @returns Boolean indicating if user is authenticated
 */
export function isAuthenticated(): boolean {
  // With cookie-based auth, we can't reliably check if the user is authenticated
  // from the client side without making a request to the server
  // This function is kept for backward compatibility
  return false;
}

/**
 * Logout the user
 * @returns Authentication response
 */
export async function logout(): Promise<AuthResponse> {
  try {
    const response = await apiClient.post(`/auth/logout`);
    
    return {
      success: true,
      message: "Logout successful",
    };
  } catch (error) {
    console.error("Logout error:", error);
    return {
      success: false,
      message: error instanceof Error ? error.message : "Logout failed",
    };
  }
}
