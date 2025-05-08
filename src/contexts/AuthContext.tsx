"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useCallback,
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
import { AuthContextType, User } from "./types";
import { toast } from "react-hot-toast";
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const checkAuth = useCallback(async () => {
    try {
      const token = getAuthToken();

      if (token) {
        const response = await apiClient.get("/users/me");

        if (response.status === 200) {
          const user: User = response.data?.user;

          if (!user.onboardingComplete) {
            router.push("/onboarding");
          }

          setUser(user);
        } else {
          removeAuthToken();
          setUser(null);
          toast.error("Invalid authentication token");
        }
      }
    } catch (error) {
      removeAuthToken();
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }, [router]);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const login = async (credentials: LoginPayload): Promise<AuthResponse> => {
    try {
      const response = await loginUser(credentials);

      if (response.success && response.token) {
        setAuthToken(response.token);
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

       await checkAuth();

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
