import React, { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@lemonsqueezy/wedges";
import { FacebookIcon, Linkedin, LinkedinIcon, LucideLinkedin, TwitterIcon } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";

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
        const items = await axios.get("http://localhost:4200/integrations");
        console.log("integrations", items.data);
        setPlatforms(items.data.social);
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
    const iconMap: Record<string, any> = {
      instagram: "/lucide_instagram.svg",
      facebook: <FacebookIcon className="w-5 h-5" />,
      tiktok: "/tiktok.svg",
      youtube: "/lucide_youtube.svg",
      x: <TwitterIcon className="w-5 h-5" />,
      linkedin: <LinkedinIcon className="w-5 h-5" />,
      "instagram-standalone": "/lucide_instagram.svg",
      "linkedin-page": <LucideLinkedin className="w-5 h-5" />,
    };

    return iconMap[identifier] || "/default-icon.svg";
  };

  const getSocialLink = useCallback(
    (identifier: string) =>
      async () => {
        console.log("identifier", identifier);
        const gotoIntegration = async (externalUrl?: string) => {
          const { url, err } = ( await axios.get(
              `http://localhost:4200/integrations/social/${identifier}${
                externalUrl ? `?externalUrl=${externalUrl}` : ``
              }`
            )).data;

          console.log("gotoIntegration", url, err);

          if (err) {
            toast.error('Could not connect to the platform');
            return;
          }
          window.location.href = url;
        };

        console.log("gotoIntegration", "url");

        await gotoIntegration();
      },
    []
  );

  if (loading) {
    return <div className="text-center">Loading social platforms...</div>;
  }

  return (
    <div className="space-y-6 mx-auto max-w-md">
      {platforms.map((platform) => (
        <Button
          key={platform.identifier}
          onClick={getSocialLink(platform.identifier)}
          className="w-full p-4 bg-[#0E0E0E] border border-white/20 rounded-lg text-white 
          hover:bg-[#1a1a1a] transition-colors shadow-[0_1px_2px_rgba(18,18,23,0.05)]"
        >
          <div className="flex justify-center items-center gap-2">
            <div className="w-5">
              {typeof getIconPath(platform.identifier) === "string" ? (
                <Image
                  src={getIconPath(platform.identifier)}
                  alt={platform.name}
                  width={16}
                  height={16}
                />
              ) : (
                getIconPath(platform.identifier)
              )}
            </div>
            <span className="text-sm">{platform.name}</span>
          </div>
        </Button>
      ))}
    </div>
  );
};

export default SocialConnect;
