
import { useQuery } from "@tanstack/react-query";
import { getDiscoverUsers } from "@/services/onboardingService";

export const useDiscoverUsers = () => {
  return useQuery({
    queryKey: ["discoverUsers"],
    queryFn: () => getDiscoverUsers({}),
  });
};
