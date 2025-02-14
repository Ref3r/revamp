import { Button } from '@lemonsqueezy/wedges';
import React from 'react';
import Image from 'next/image';

interface CommunityListProps {
  onFollow: () => void;
}

const CommunityList: React.FC<CommunityListProps> = ({ onFollow }) => {
  const communities = [
    {
      id: 1,
      name: 'Twitter Maniacs',
      description: 'We live and breathe twitter!',
      imageUrl: 'Frame 76.svg',
    },
    {
      id: 2,
      name: 'Photography group',
      description: 'Share your best shots!',
      imageUrl: 'Frame 76 (1).svg',
    },
    {
      id: 3,
      name: 'Random group',
      description: 'We live and breathe twitter!',
      imageUrl: 'Frame 76 (2).svg',
    },
    {
      id: 4,
      name: 'Reel kings',
      description: 'We live and breathe twitter!',
      imageUrl: 'Frame 76 (3).svg',
    },
    {
      id: 5,
      name: 'Content creators',
      description: 'We live and breathe twitter!',
      imageUrl: 'Frame 76 (4).svg',
    },
    {
      id: 6,
      name: 'Newcomers group',
      description: 'We live and breathe twitter!',
      imageUrl: 'Frame 76 (5).svg',
    },
  ];

  return (
    <div className="w-full px-4 sm:px-6 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
      <div className="max-w-6xl mx-auto space-y-2">
        {communities.map((community) => (
          <div 
            key={community.id}
            className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 gap-3 sm:gap-4 rounded-lg hover:bg-neutral-800/50 transition-colors"
          >
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <div className="w-10 h-10 relative flex-shrink-0">
                <Image
                  src={community.imageUrl}
                  alt={community.name}
                  className="rounded-full object-cover"
                  fill
                  sizes="(max-width: 640px) 2.5rem, 2.5rem"
                />
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="text-white font-medium truncate">{community.name}</h3>
                <p className="text-neutral-500 text-sm truncate">{community.description}</p>
              </div>
            </div>
            <Button 
              onClick={onFollow}
              className="w-full sm:w-auto px-5 py-2 bg-white text-black rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors"
            >
              Follow
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CommunityList;