import React from "react";
import Image from "next/image";
import { Button } from "@lemonsqueezy/wedges";

const Newcommunities = () => {
  const communities = [
    {
      image: "newcommunity1.svg",
      name: "Twitter Maniacs",
      description: "We live and breathe twitter!",
    },
    {
      image: "newcommunity2.svg",
      name: "Photography group",
      description: "We live and breathe twitter!",
    },
    {
      image: "newcommunity3.svg",
      name: "Random group",
      description: "We live and breathe twitter!",
    },
    {
      image: "newcommunity4.svg",
      name: "Reel kings",
      description: "We live and breathe twitter!",
    },
    {
      image: "newcommunity5.svg",
      name: "Content creators",
      description: "We live and breathe twitter!",
    },
    {
      image: "newcommunity6.svg",
      name: "Newcomers group",
      description: "We live and breathe twitter!",
    },
  ];

  return (
    <div className="w-full p-6 rounded-lg">
      <h2 className="text-[#FFFFFF] font-bold text-xl mb-6">
        Suggested Communities
      </h2>

      <div className="space-y-4">
        {communities.map((community, index) => (
          <div
            key={index}
            className="flex items-center justify-between gap-4 bg-[#0E0E0E] p-4 rounded-lg"
          >
            <div className="flex items-center gap-4 flex-1 min-w-0">
              <div className="flex-shrink-0">
                <Image
                  height={48}
                  width={48}
                  src={community.image}
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
              </div>
            </div>
            <Button className="bg-white hover:bg-white/90 transition-colors rounded-md shrink-0">
              <span className="text-black px-4 sm:px-6 py-1">Follow</span>
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Newcommunities;
