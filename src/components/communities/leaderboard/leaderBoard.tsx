// Leaderboard Component
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
    <div className="h-full overflow-y-auto bg-[#1A191966] rounded-xl mx-2">
      <div className="px-4 sm:px-5 py-3 sm:py-4">
        <h2 className="text-gray-400 text-base sm:text-lg">
          Leaderboard (May)
        </h2>
      </div>

      <div>
        {users.map((user) => (
          <div
            key={user.id}
            className="flex items-center p-3 sm:p-4 px-4 sm:px-5 hover:bg-[#141414] cursor-pointer transition-colors"
            onClick={() => onChatSelect(user)}
          >
            <div className="relative mr-3">
              {/* User Avatar */}
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden bg-[#2D2D33] flex items-center justify-center">
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
                <p className="font-medium text-sm sm:text-[15px] truncate pr-2">
                  {user.name}
                </p>
                {/* Medal Icon */}
                <div className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0">
                  <Image src={user.medal} alt="Medal" width={24} height={24} />
                </div>
              </div>
              <p className="text-xs sm:text-sm text-gray-400 mt-0.5 truncate">
                Voted {user.rank} in {user.community}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Leaderboard;
