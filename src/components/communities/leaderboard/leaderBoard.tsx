import Image from "next/image";

// Leaderboard Component
const Leaderboard = ({
  selectedCategory,
  users,
  onChatSelect,
  isMobile,
}: {
  selectedCategory: string;
  users: any[];
  onChatSelect: (user: any) => void;
  isMobile: boolean;
}) => {
  return (
    <div className="h-full flex flex-col gap-3">
      {/* Stats Card */}
      <div className="bg-[#1A191966] rounded-xl mx-2 p-4">
        <div className="space-y-7">
          <div className="flex justify-between">
            <p className="text-md text-gray-400 mt-1">Community Members</p>
            <p className="text-2xl font-semibold ">4645</p>
          </div>
          <div className="flex justify-between">
            <p className="text-md text-gray-400 mt-1">Active Contests</p>
            <p className="text-2xl font-semibold ">4</p>
          </div>
        </div>
      </div>

      {/* Leaderboard Section - with fixed height */}
      <div className="bg-[#1A191966] rounded-xl mx-2 overflow-hidden flex flex-col h-[380px]">
        <div className="px-4 py-4">
          <h2 className="text-[#FFFFFFB2] text-lg">
            Leaderboard
          </h2>
        </div>

        <div className="overflow-y-auto hide-scrollbar">
          {users.map((user) => (
            <div
              key={user.id}
              className="flex items-center p-4 px-5 hover:bg-[#141414] cursor-pointer transition-colors"
              onClick={() => onChatSelect(user)}
            >
              <div className="relative mr-4">
                {/* User Avatar */}
                <div className="w-12 h-12 rounded-full overflow-hidden bg-[#2D2D33] flex items-center justify-center">
                  {user.avatar ? (
                    <Image
                      src={user.avatar}
                      alt={user.name}
                      width={48}
                      height={48}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-lg font-medium">
                      {user.name.charAt(0)}
                    </span>
                  )}
                </div>
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center">
                  <p className="font-medium text-base truncate pr-2">
                    {user.name}
                  </p>
                  {/* Medal Icon */}
                  <div className="w-6 h-6 flex-shrink-0">
                    <Image src={user.medal} alt="Medal" width={24} height={24} />
                  </div>
                </div>
                <p className="text-sm text-[#FFFFFFB2] mt-1 truncate">
                  Voted {user.rank} in Design Community
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;