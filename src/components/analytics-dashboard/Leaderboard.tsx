// Leaderboard.tsx
import React from "react";
import Image from "next/image";

const Leaderboard = () => {
  const leaders = [
    {
      image: "/leaderboard1.svg",
      name: "Christopher Campbell",
      position: "Voted #1 in Design Community",
      medal: "/gold-medal.svg"
    },
    {
      image: "/leaderboard2.svg",
      name: "Kristin Watson",
      position: "Voted #2 in Design Community",
      medal: "/silver-medal.svg"
    },
    {
      image: "/leaderboard3.svg",
      name: "Bessie Cooper",
      position: "Voted #3 in Design Community",
      medal: "/bronze-medal.svg"
    }
  ];

  return (
    <div className="bg-[#1A1919] rounded-[20px] p-4 md:p-6">
      <h2 className="font-medium text-[#FFFFFF7A] text-base mb-4">
        Leaderboard (May)
      </h2>
      <div className="flex flex-col gap-6">
        {leaders.map((leader, index) => (
          <div key={index} className="flex justify-between items-center">
            <div className="flex items-center">
              <div className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 relative flex-shrink-0">
                <Image 
                  src={leader.image} 
                  layout="fill" 
                  objectFit="cover" 
                  alt={leader.name}
                  className="rounded-full"
                />
              </div>
              <div className="ml-3 md:ml-6 overflow-hidden">
                <h3 className="font-medium text-white text-base md:text-lg truncate">
                  {leader.name}
                </h3>
                <p className="font-normal text-[#FFFFFF7A] text-sm md:text-base truncate">
                  {leader.position}
                </p>
              </div>
            </div>
            <div className="flex-shrink-0 w-6 h-6 md:w-8 md:h-8 relative">
              <Image 
                src={leader.medal}
                layout="fill"
                objectFit="contain"
                alt="Medal"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Leaderboard;