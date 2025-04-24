import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@lemonsqueezy/wedges";

interface SocialPlatform {
  identifier: string;
  name: string;
  link: {
    url: string;
    codeVerifier: string;
    state: string;
  };
}

interface SocialConnectProps {
  onConnect: () => void;
}

const SocialConnect: React.FC<SocialConnectProps> = ({ onConnect }) => {
  const [platforms, setPlatforms] = useState<SocialPlatform[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSocialPlatforms = async () => {
      try {
        const response = await fetch("http://localhost:4002/integrate");
        const data = await response.json();
        setPlatforms(data);
      } catch (error) {
        console.error("Failed to fetch social platforms:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSocialPlatforms();
  }, []);

  const handleConnect = (platform: SocialPlatform) => {
    // Store codeVerifier and state in localStorage
    localStorage.setItem(
      `${platform.identifier}_codeVerifier`,
      platform.link.codeVerifier
    );
    localStorage.setItem(`${platform.identifier}_state`, platform.link.state);

    // Open the redirect URL
    window.open(platform.link.url, "_blank");

    // Notify parent component
    onConnect();
  };

  // Map platform identifiers to corresponding icon paths
  const getIconPath = (identifier: string) => {
    const iconMap: Record<string, string> = {
      instagram: "/lucide_instagram.svg",
      facebook: "/lucide_facebook.svg",
      tiktok: "/tiktok.svg",
      youtube: "/lucide_youtube.svg",
      x: "/lucide_twitter.svg",
      linkedin: "/lucide_linkedin.svg",
      "instagram-standalone": "/lucide_instagram.svg",
      "linkedin-page": "/lucide_linkedin.svg",
    };

    return iconMap[identifier] || "/default-icon.svg";
  };

  if (loading) {
    return <div className="text-center">Loading social platforms...</div>;
  }

  return (
    <div className="space-y-6 mx-auto max-w-md">
      {platforms.map((platform) => (
        <Button
          key={platform.identifier}
          onClick={() => handleConnect(platform)}
          className="w-full p-4 bg-[#0E0E0E] border border-white/20 rounded-lg text-white 
          hover:bg-[#1a1a1a] transition-colors shadow-[0_1px_2px_rgba(18,18,23,0.05)]"
        >
          <div className="flex justify-center items-center gap-2">
            <div className="w-5">
              <Image
                src={getIconPath(platform.identifier)}
                alt={platform.name}
                width={16}
                height={16}
              />
            </div>
            <span className="text-sm">{platform.name}</span>
          </div>
        </Button>
      ))}
    </div>
  );
};

export default SocialConnect;
