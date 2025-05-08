import {
  LoginPayload,
  RegisterPayload,
  ForgotPasswordPayload,
  ResetPasswordPayload,
  AuthResponse,
} from "@/services/authService";

export interface User {
  _id: string;
  email: string;
  profilePicture: string;
  bio: string;
  websiteUrl: string;
  role: string;
  isEmailVerified: boolean;
  followers: any[];
  following: string[];
  niches: string[];
  template: string;
  onboardingComplete: boolean;
  onboardingStep: string;
  authProvider: string;
  lastActive: Date;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
  name: string;
}

export interface AuthContextType {
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
