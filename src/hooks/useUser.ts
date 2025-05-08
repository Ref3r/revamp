
import { useQuery } from "@tanstack/react-query";
import { getUser } from "@/services/onboardingService";

export const useUser = () => {
  return useQuery({
    queryKey: ["user"],
    queryFn: () => getUser(),
  });
};
