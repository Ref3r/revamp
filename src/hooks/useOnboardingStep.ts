import { useQuery } from "@tanstack/react-query";
import { getOnboardingStatus } from "@/services/onboardingService";

export const useOnboardingStep = () => {
  return useQuery({
    queryKey: ["onboardingStep"],
    queryFn: getOnboardingStatus,
  });
};
