"use client"
import { Button } from '@lemonsqueezy/wedges';

import React, { useState } from 'react';
import Image from 'next/image';
import { useDiscoverUsers } from '@/hooks/useDiscoverUsers';
import { completeOnboarding, followUser } from '@/services/onboardingService';
import { useMutation } from '@tanstack/react-query';
import SubmitButton from '../SubmitButton';
import toast from 'react-hot-toast';
import ProfileCreationLoader from '../loader/ProfileCreationLoader';
import { useRouter } from 'next/navigation';
interface CommunityListProps {
  onFollow: () => void;
}

const CommunityList: React.FC<CommunityListProps> = ({ onFollow }) => {
  const { data: discoverUsers } = useDiscoverUsers();
  const [following, setFollowing] = useState<any[]>([]);
  const router = useRouter();

  const followMutation = useMutation({
    mutationFn: (userId: string) => followUser(userId),
    onSuccess: (data) => {
      setFollowing(data.user.following);
    },
  });

  const completeConboaringMutation = useMutation({
    mutationFn: completeOnboarding,
    onSuccess: (data) => {
      // onSuccess();
      toast.success('Onboarding completed successfully');
      router.push('/dashboard');
    },
    onError: (error) => {
      toast.error('Failed to complete onboarding');
    },
  });

  const users = discoverUsers?.users;


  if (completeConboaringMutation.isPending) {
    return <ProfileCreationLoader />;
  }




  return (
    <div className="w-full px-4 sm:px-6 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
      <div className="max-w-6xl mx-auto space-y-2">
        {users?.map((user) => (
          <div 
            key={user._id}
            className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 gap-3 sm:gap-4 rounded-lg hover:bg-neutral-800/50 transition-colors"
          >
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <div className="w-10 h-10 relative flex-shrink-0">
                <Image
                  src={user.profilePicture ? user.profilePicture : `https://avatar.iran.liara.run/username?username=${user.name}`}
                  alt={user.name}
                  className="rounded-full object-cover"
                  fill
                  sizes="(max-width: 640px) 2.5rem, 2.5rem"
                />
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="text-white font-medium truncate">{user.name}</h3>
                <p className="text-neutral-500 text-sm truncate">{user.bio}</p>
              </div>
            </div>
            <Button 
              onClick={() => followMutation.mutate(user._id)}
              disabled={followMutation.isPending || following.includes(user._id)}
              className="w-full sm:w-auto px-5 py-2 bg-white text-black rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors"
            >
              {following.includes(user._id) ? 'Following' : 'Follow'}
            </Button>
          </div>
        ))}
      </div>

      <SubmitButton
        onClick={() => completeConboaringMutation.mutate()}
        isLoading={completeConboaringMutation.isPending}
        disabled={completeConboaringMutation.isPending}
        label='Complete Onboarding'
      />
      
    </div>
  );
}

export default CommunityList;