// src/services/authService.ts

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
    console.log(
      "Attempting to connect to:",
      `${API_URL}${AUTH_BASE_PATH}/login`
    );

    const response = await fetch(`${API_URL}${AUTH_BASE_PATH}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(credentials),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Login failed");
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
  localStorage.setItem("auth_token", token);
}

/**
 * Get the stored JWT token
 * @returns The stored JWT token or null if not found
 */
export function getAuthToken(): string | null {
  if (typeof window !== "undefined") {
    return localStorage.getItem("auth_token");
  }
  return null;
}

/**
 * Remove the stored JWT token
 */
export function removeAuthToken(): void {
  localStorage.removeItem("auth_token");
}

/**
 * Check if user is authenticated
 * @returns Boolean indicating if user is authenticated
 */
export function isAuthenticated(): boolean {
  return !!getAuthToken();
}
