import apiClient from "@/utils/apiClient";

/**
 * Onboarding step identifiers
 */
export const ONBOARDING_STEPS = {
  REGISTRATION: "registration",
  PROFILE_INFO: "profile_info",
  SOCIAL_ACCOUNTS: "social_accounts",
  TEMPLATE: "template",
  FOLLOW: "follow",
  COMPLETED: "completed",
};

// Define the types for onboarding
export interface OnboardingStatus {
  onboardingComplete: boolean;
  hasNiches: boolean;
  hasSocialAccounts: boolean;
  hasTemplate: boolean;
  onboardingStep: string;
  hasProfileInfo: boolean;
  hasFollowing: boolean;
}

export interface ProfileUpdatePayload {
  name?: string;
  bio?: string;
  profilePicture?: string;
  websiteUrl?: string;
  niches?: string[];
}

export interface SocialAccountsPayload {
  instagram?: string;
  twitter?: string;
  linkedin?: string;
  github?: string;
}

export interface OnboardingResponse {
  success: boolean;
  user?: any;
  message?: string;
}

/**
 * Get the user's onboarding status
 * @returns Onboarding status
 */
export async function getOnboardingStatus(): Promise<OnboardingStatus | null> {
  try {
    const response = await apiClient.get(`/users/me/onboarding/status`);
    return response.data.status;
  } catch (error) {
    console.error("Error fetching onboarding status:", error);
    return null;
  }
}

/**
 * Update user profile information (PROFILE_INFO step)
 * @param data Profile information
 * @returns Response with updated user
 */
export async function updateProfile(
  data: ProfileUpdatePayload
): Promise<OnboardingResponse> {
  const response = await apiClient.put(`/users/me`, data);

  return {
    success: true,
    user: response.data.user,
    message: "Profile updated successfully",
  };
}

export async function getUser(): Promise<any> {
  const response = await apiClient.get(`/users/me`);
  return response.data.user;
}

export async function updateSocialAccounts(
  socialAccounts: SocialAccountsPayload
): Promise<OnboardingResponse> {
  try {
    const response = await apiClient.put(`/users/me/social-accounts`, {
      socialAccounts,
    });
    return {
      success: true,
      user: response.data.user,
      message: response.data.message || "Social accounts updated successfully",
    };
  } catch (error) {
    console.error("Error updating social accounts:", error);
    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Failed to update social accounts",
    };
  }
}

/**
 * Update user template selection (TEMPLATE step)
 * @param template Selected template ID
 * @returns Response with updated user
 */
export async function updateTemplate(
  template: string
): Promise<OnboardingResponse> {
  try {
    const response = await apiClient.put(`/users/me/template`, { template });
    return {
      success: true,
      user: response.data.user,
      message: response.data.message || "Template updated successfully",
    };
  } catch (error) {
    console.error("Error updating template:", error);
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "Failed to update template",
    };
  }
}

/**
 * Get users to follow
 * @param options Query parameters
 * @returns List of users
 */
export async function getDiscoverUsers(options: {
  page?: number;
  limit?: number;
  interests?: string[];
  sortBy?: "followers" | "posts" | "recent";
}): Promise<{ users: any[]; total: number; success: boolean }> {
  try {
    const response = await apiClient.get(`/users/discover`, {
      params: options,
    });
    return {
      success: true,
      users: response.data.data,
      total: response.data.pagination.total,
    };
  } catch (error) {
    console.error("Error fetching users to follow:", error);
    return {
      success: false,
      users: [],
      total: 0,
    };
  }
}

/**
 * Follow a user (FOLLOW step)
 * @param userId ID of the user to follow
 * @returns Response with updated user
 */
export async function followUser(userId: string): Promise<OnboardingResponse> {
  const response = await apiClient.post(`/users/${userId}/follow`);
  return {
    success: true,
    user: response.data.user,
    message: "User followed successfully",
  };
}

/**
 * Complete the onboarding process
 * @returns Response with updated user
 */
export async function completeOnboarding(): Promise<OnboardingResponse> {
  try {
    const response = await apiClient.put(`/users/me/onboarding/complete`);
    return {
      success: true,
      user: response.data.user,
      message: response.data.message || "Onboarding completed successfully",
    };
  } catch (error) {
    console.error("Error completing onboarding:", error);
    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Failed to complete onboarding",
    };
  }
}

/**
 * Update onboarding step
 * @param step The step identifier to set
 * @returns Response with updated user
 */
export async function updateOnboardingStep(
  step: string
): Promise<OnboardingResponse> {
  try {
    const response = await apiClient.put(`/users/me/onboarding/step`, { step });
    return {
      success: true,
      user: response.data.user,
      message: response.data.message || "Onboarding step updated",
    };
  } catch (error) {
    console.error("Error updating onboarding step:", error);
    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Failed to update onboarding step",
    };
  }
}
