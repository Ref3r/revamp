"use client";
import Image from "next/image";
import { Button } from "@lemonsqueezy/wedges";
import { toast } from "react-hot-toast";
import { getAllCommunities, joinCommunity } from "@/services/communityService";
import { useMutation, useQuery } from "@tanstack/react-query";
import { handleImageUrl } from "@/utils/placeholder";
import { useAuth } from "@/contexts/AuthContext";

const Newcommunities = () => {
  const { user } = useAuth();

  const {
    data: allCommunities,
    isLoading: isLoadingAllCommunities,
    refetch: refetchAllCommunities,
  } = useQuery({
    queryKey: ["all-communities"],
    queryFn: async () => getAllCommunities(),
  });

  const joinCommunityMutation = useMutation({
    mutationFn: async (communityId: string) => joinCommunity(communityId),
  });

  const joiningCommunity = joinCommunityMutation.isPending
    ? joinCommunityMutation.variables
    : null;

  const notJoinedCommunities = allCommunities?.data?.filter(
    (community) => !community?.members.includes(user?._id || "")
  );


  return (
    <div className="w-full p-6 rounded-lg">
      <h2 className="text-[#FFFFFF] font-bold text-xl mb-6">
        Suggested Communities
      </h2>

      <div className="space-y-4">
        {isLoadingAllCommunities ? (
          <div className="flex justify-center items-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-green-500"></div>
          </div>
        ) : allCommunities?.data?.length === 0 ? (
          <div className="text-center py-8 text-gray-400">
            No communities available
          </div>
        ) : (
          notJoinedCommunities?.map((community) => (
            <div
              key={community._id}
              className="flex items-center justify-between gap-4 bg-[#0E0E0E] p-4 rounded-lg"
            >
              <div className="flex items-center gap-4 flex-1 min-w-0">
                <div className="flex-shrink-0">
                  <Image
                    height={48}
                    width={48}
                    src={handleImageUrl(community.image, community.name)}
                    alt={community.name}
                    className="rounded-full"
                  />
                </div>
                <div className="min-w-0">
                  <h2 className="text-[#FFFFFF] text-sm sm:text-base font-medium truncate">
                    {community.name}
                  </h2>
                  <p className="text-[#FFFFFF7A] text-xs sm:text-sm font-medium truncate">
                    {community.description}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-gray-400 text-xs bg-[#282828] px-2 py-1 rounded-full">
                      {community.niche}
                    </span>
                    <span className="text-gray-400 text-xs">
                      {community.members.length} members
                    </span>
                  </div>
                </div>
              </div>
              <Button
                onClick={() =>
                  joinCommunityMutation.mutate(community._id, {
                    onSuccess: () => {
                      toast.success("Successfully joined the community!");
                      refetchAllCommunities();
                    },
                  })
                }
                disabled={joiningCommunity === community._id}
                className={`bg-white hover:bg-white/90 transition-colors rounded-md shrink-0 ${
                  joiningCommunity === community._id ? "opacity-50" : ""
                }`}
              >
                {joiningCommunity === community._id ? (
                  <div className="flex items-center px-4 sm:px-6 py-1">
                    <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-black mr-2"></div>
                    <span className="text-black">Joining...</span>
                  </div>
                ) : (
                  <span className="text-black px-4 sm:px-6 py-1">Join</span>
                )}
              </Button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Newcommunities;
