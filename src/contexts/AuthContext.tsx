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
import { AxiosError } from "axios";
const AuthContext = createContext<AuthContextType | undefined>(undefined);

const publicRoutes = ["/", "/login", "/sign-up", "/forgot-password"];

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const checkAuth = useCallback(async () => {
    try {
      const response = await apiClient.get("/users/me");

      if (response.status === 200) {
        const user: User = response.data?.user;

        if (!user.onboardingComplete) {
          router.push("/onboarding");
        }

        setUser(user);
      } else {
        setUser(null);
        toast.error("Invalid authentication token");
      }
    } catch (error: any) {
      const errorCode = error.statusCode;

      if (
        errorCode === 401 &&
        !publicRoutes.includes(window.location.pathname)
      ) {
        setUser(null);
        router.push("/login");
      }
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

      if (response.success) {
        await checkAuth(); // Fetch user data after successful login
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

      if (response.success) {
        console.log("Registration successful");
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

      // This function is typically used for OAuth callbacks
      // With cookie-based auth, we don't need to store the token
      // The server should set the cookie during the OAuth callback

      // Attempt to get user info with the cookie
      await checkAuth();

      if (user) {
        return {
          success: true,
          message: "Login successful",
        };
      } else {
        return {
          success: false,
          message: "Invalid authentication token",
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

  const logout = async () => {
    try {
      // Call the logout endpoint to clear the cookie
      await apiClient.post("/auth/logout");
      setUser(null);
      router.push("/sign-up");
    } catch (error) {
      console.error("Logout error:", error);
      // Even if the API call fails, clear the user from state
      setUser(null);
      router.push("/sign-up");
    }
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
    checkAuth,
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
