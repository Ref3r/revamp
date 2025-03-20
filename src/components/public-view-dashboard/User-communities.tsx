import React from 'react';
import Image from 'next/image';
import { Button } from "@/components/ui/button";

const UserCommunities = () => {
  const communities = [
    {
      id: 1,
      name: 'Community 1',
      members: '70+ Members',
      iconSrc: '/community-1.svg'
    },
    {
      id: 2,
      name: 'Community 2', // Updated to match second image
      members: '70+ Members',
      iconSrc: '/community-2.svg'
    }
  ];

  return (
    <div className="bg-[#1A1919] rounded-2xl p-4 h-full min-h-[160px]">
      <h2 className="text-gray-300 text-base mb-4">Parry's Communities</h2>
      
      <div className="space-y-4">
        {communities.map((community) => (
          <div key={community.id} className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-8 h-8 relative flex-shrink-0">
                <Image 
                  src={community.iconSrc} 
                  alt={community.name} 
                  width={32} 
                  height={32} 
                  className="rounded-full"
                />
              </div>
              
              <div className="ml-4">
                <h3 className="text-white text-sm font-medium">{community.name}</h3>
                <p className="text-gray-400 text-xs">{community.members}</p>
              </div>
            </div>
            
            <Button
              variant="default"
              className="bg-white text-black hover:bg-gray-200 h-8 px-4 text-sm rounded-md"
            >
              Join
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserCommunities;