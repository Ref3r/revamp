import React from 'react';
import Image from 'next/image';
import { Button } from '@lemonsqueezy/wedges';

interface SocialConnectProps {
  onConnect: () => void;
}

const SocialConnect: React.FC<SocialConnectProps> = ({ onConnect }) => {
  const handleConnect = () => {
    onConnect();
  };

  return (
    <div className="space-y-6 mx-auto max-w-md"> {/* Reduced spacing and added max-width */}
      {[
        { image: "/lucide_instagram.svg", name: "Instagram" },
        { image: "/lucide_facebook.svg", name: "Facebook Username" },
        { image: "/tiktok.svg", name: "TikTok" },
        { image: "/lucide_youtube.svg", name: "YouTube" },
      ].map((social) => (
        <Button
          key={social.name}
          onClick={handleConnect}
          className="w-full p-4 bg-[#0E0E0E] border border-white/20 rounded-lg text-white 
          hover:bg-[#1a1a1a] transition-colors shadow-[0_1px_2px_rgba(18,18,23,0.05)]"
        >
          <div className="flex justify-center items-center gap-2">
            <div className="w-5"> {/* Further reduced the width of the image container */}
              <Image src={social.image} alt={social.name} width={16} height={16} /> {/* Reduced icon size */}
            </div>
            <span className="text-sm">{social.name}</span> {/* Reduced font size */}
          </div>
        </Button>
      ))}
    </div>
  );
};

export default SocialConnect;
