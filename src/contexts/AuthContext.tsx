"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import {
  getAuthToken,
  removeAuthToken,
  setAuthToken,
  loginUser,
  registerUser,
  forgotPassword as forgotPasswordApi,
  resetPassword as resetPasswordApi,
  LoginPayload,
  RegisterPayload,
  ForgotPasswordPayload,
  ResetPasswordPayload,
  AuthResponse,
} from "@/services/authService";
import { useRouter } from "next/navigation";
import apiClient from "@/utils/apiClient";

// Base API path for auth endpoints
const AUTH_BASE_PATH = "/api/v1/auth";

interface User {
  id?: string;
  email?: string;
  // Add other user properties as needed
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: LoginPayload) => Promise<AuthResponse>;
  signUp: (credentials: RegisterPayload) => Promise<AuthResponse>;
  loginWithToken: (token: string) => Promise<AuthResponse>;
  logout: () => void;
  forgotPassword: (payload: ForgotPasswordPayload) => Promise<AuthResponse>;
  resetPassword: (payload: ResetPasswordPayload) => Promise<AuthResponse>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Check if user is already logged in
    const checkAuth = async () => {
      try {
        const token = getAuthToken();

        if (token) {
          // Here you would typically validate the token with your backend
          // and fetch the user's information
          // const API_URL =
          //   process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
          // const response = await fetch(`${API_URL}/users/me`, {
          //   headers: {
          //     Authorization: `Bearer ${token}`,
          //   },
          // });
          const response = await apiClient.get("/users/me");

          if (response.status === 200) {
            const userData = await response.data;
            setUser(userData);
          } else {
            // If token is invalid, remove it
            removeAuthToken();
            setUser(null);
          }
        }
      } catch (error) {
        console.error("Error checking authentication:", error);
        removeAuthToken();
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (credentials: LoginPayload): Promise<AuthResponse> => {
    try {
      console.log("Attempting login with:", credentials.email);
      const response = await loginUser(credentials);

      if (response.success && response.token) {
        console.log("Login successful, token received");

        // Store the token
        setAuthToken(response.token);

        // Verify token was stored correctly
        const storedToken = getAuthToken();
        if (storedToken) {
          console.log("Token successfully stored in localStorage");
        } else {
          console.error("Failed to store token in localStorage");
        }

        // Here we would typically decode the JWT token to get basic user info
        // For now, we're just setting a placeholder user
        setUser({ email: credentials.email });
      } else {
        console.warn("Login failed:", response.message);
      }

      return response;
    } catch (error) {
      console.error("Login error:", error);
      return {
        success: false,
        message: error instanceof Error ? error.message : "Login failed",
      };
    }
  };

  const signUp = async (credentials: RegisterPayload) => {
    try {
      console.log("Attempting registration with:", credentials.email);
      const response = await registerUser(credentials);

      // If registration is successful and we get a token, save it
      if (response.success && response.token) {
        console.log("Registration successful, token received");

        // Store the token
        setAuthToken(response.token);

        // Verify token was stored correctly
        const storedToken = getAuthToken();
        if (storedToken) {
          console.log("Token successfully stored in localStorage");
        } else {
          console.error("Failed to store token in localStorage");
        }

        // Set basic user info
        setUser({ email: credentials.email });
      } else {
        console.warn("Registration failed:", response.message);
      }

      return response;
    } catch (error) {
      console.error("Registration error:", error);
      return {
        success: false,
        message: error instanceof Error ? error.message : "Registration failed",
      };
    }
  };

  const loginWithToken = async (token: string): Promise<AuthResponse> => {
    try {
      console.log("Logging in with token");
      
      // Store the token
      setAuthToken(token);
      
      // Verify token was stored correctly
      const storedToken = getAuthToken();
      if (!storedToken) {
        console.error("Failed to store token in localStorage");
        return {
          success: false,
          message: "Failed to store authentication token",
        };
      }
      
      // Attempt to get user info with the token
      try {
        const response = await apiClient.get("/users/me");
        
        if (response.status === 200) {
          const userData = response.data;
          setUser(userData);
          
          return {
            success: true,
            token,
            message: "Login successful",
          };
        } else {
          // If token is invalid, remove it
          removeAuthToken();
          setUser(null);
          
          return {
            success: false,
            message: "Invalid authentication token",
          };
        }
      } catch (apiError) {
        console.error("API error when validating token:", apiError);
        // Keep the token for now, it might just be a temporary API issue
        
        // Set a basic user just to continue the flow
        setUser({ id: "unknown" });
        
        return {
          success: true, // Consider it a success for now
          token,
          message: "Login partially successful, user data unavailable",
        };
      }
    } catch (error) {
      console.error("Login with token error:", error);
      return {
        success: false,
        message: error instanceof Error ? error.message : "Login failed",
      };
    }
  };

  const forgotPassword = async (payload: ForgotPasswordPayload) => {
    try {
      return await forgotPasswordApi(payload);
    } catch (error) {
      console.error("Forgot password error:", error);
      return {
        success: false,
        message:
          error instanceof Error ? error.message : "Failed to process request",
      };
    }
  };

  const resetPassword = async (payload: ResetPasswordPayload) => {
    try {
      return await resetPasswordApi(payload);
    } catch (error) {
      console.error("Reset password error:", error);
      return {
        success: false,
        message:
          error instanceof Error ? error.message : "Failed to reset password",
      };
    }
  };

  const logout = () => {
    removeAuthToken();
    setUser(null);
    router.push("/sign-up");
  };

  const value = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    signUp,
    loginWithToken,
    logout,
    forgotPassword,
    resetPassword,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
