/**
 * @param {Object} props
 * @param {string} props.tweetId
 * @returns {JSX.Element}
 */ /**
 * @typedef {Object} YouTubeItem
 * @property {number} id
 * @property {string} title
 * @property {string} videoId
 * @property {string} duration
 */

/**
 * @typedef {Object} InstagramReel
 * @property {number} id
 * @property {string} username
 * @property {string} videoUrl
 * @property {string} thumbnailImage
 * @property {string} caption
 * @property {boolean} verified
 */

/**

 * @returns {JSX.Element} 
 */ "use client";

import React, { useState, useEffect, useRef } from "react";
import YouTube from "react-youtube";

export default function ContentHighlights() {
  const [activeTab, setActiveTab] = useState("Instagram");

  const youtubeHighlights = [
    {
      id: 1,
      title: "Color Explosion",
      videoId: "dQw4w9WgXcQ",
      duration: "3:42",
    },
    {
      id: 2,
      title: "Betta Fish Motion Study",
      videoId: "3JZ_D3ELwOQ",
      duration: "3:42",
    },
  ];

  const instagramReels = [
    {
      id: 1,
      username: "Parry",
      videoUrl: "/ig.mp4",
      thumbnailImage: "/sunflowers.jpg",
      caption: "Lorem ipsum dolor sit amet...",
      verified: true,
    },
    {
      id: 2,
      username: "Parry",
      videoUrl: "/ig.mp4",
      thumbnailImage: "/purple-crystals.jpg",
      caption: "Lorem ipsum dolor sit amet...",
      verified: true,
    },
    {
      id: 3,
      username: "Parry",
      videoUrl: "/ig.mp4",
      thumbnailImage: "/leaf.jpg",
      caption: "Lorem ipsum dolor sit amet...",
      verified: true,
    },
    {
      id: 4,
      username: "Parry",
      videoUrl: "/ig.mp4",
      thumbnailImage: "/wolf.jpg",
      caption: "Lorem ipsum dolor sit amet...",
      verified: true,
    },
  ];

  const twitterPosts = [
    "1905292428010979412",
    "1905292428010979412",
    "1905292428010979412",
  ];

  return (
    <div className="bg-[#1A1919CC] rounded-xl p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-4xl font-bold text-white">Highlights</h2>
        <ContentHighlightTabs
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
      </div>

      {activeTab === "YouTube" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {youtubeHighlights.map((item) => (
            <YouTubeItem key={item.id} item={item} />
          ))}
        </div>
      )}

      {activeTab === "Instagram" && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {instagramReels.map((reel) => (
            <InstagramReelItem key={reel.id} reel={reel} />
          ))}
        </div>
      )}

      {activeTab === "Twitter" && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {twitterPosts.map((tweetId) => (
            <div key={tweetId} className="w-full">
              <TwitterEmbed tweetId={tweetId} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

interface ContentHighlightTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

function ContentHighlightTabs({
  activeTab,
  setActiveTab,
}: ContentHighlightTabsProps) {
  const tabs = ["YouTube", "Instagram", "Twitter"];

  return (
    <div className="flex justify-end gap-2">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => setActiveTab(tab)}
          className={`px-5 py-3 rounded-full text-sm transition-all ${
            activeTab === tab
              ? "bg-white text-black "
              : "bg-white bg-opacity-10 text-[#6C6C89] border border-[#FFFFFF66]"
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}

interface YouTubeItemProps {
  item: {
    id: number;
    title: string;
    videoId: string;
    duration: string;
  };
}

function YouTubeItem({ item }: YouTubeItemProps) {
  return (
    <div className="space-y-2">
      <div className="relative aspect-video bg-black rounded-lg overflow-hidden">
        <YouTube videoId={item.videoId} className="w-full h-full" />
      </div>
    </div>
  );
}

interface InstagramReelItemProps {
  reel: {
    id: number;
    username: string;
    videoUrl: string;
    thumbnailImage: string;
    caption: string;
    verified: boolean;
  };
}

function InstagramReelItem({ reel }: InstagramReelItemProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;

    if (video) {
      if (video.readyState >= 3) {
        setIsLoading(false);
      }

      const handleCanPlay = () => {
        setIsLoading(false);
      };

      video.addEventListener("canplay", handleCanPlay);
      video.addEventListener("loadeddata", handleCanPlay);

      return () => {
        video.removeEventListener("canplay", handleCanPlay);
        video.removeEventListener("loadeddata", handleCanPlay);
        video.pause();
      };
    }
  }, []);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play().catch((error) => {
          console.error("Error playing video:", error);
        });
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="relative rounded-xl overflow-hidden aspect-[9/16] bg-gradient-to-br from-gray-900 to-black">
      <div className="absolute inset-0 w-full h-full z-0 bg-black">
        <video
          ref={videoRef}
          src={reel.videoUrl}
          className="w-full h-full object-cover"
          loop
          muted
          playsInline
          preload="auto"
        />
      </div>

      {isLoading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center z-20 bg-black bg-opacity-60">
          <div className="w-16 h-16 rounded-full border-4 border-gray-300 border-t-white animate-spin mb-4"></div>

          <div className="absolute bottom-0 left-0 right-0 p-3">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gray-600 rounded-full animate-pulse"></div>
              <div className="h-4 w-24 bg-gray-600 rounded animate-pulse"></div>
            </div>
            <div className="h-3 w-32 bg-gray-600 rounded mt-2 animate-pulse"></div>
          </div>
        </div>
      )}

      <div className="absolute top-3 left-3 z-10">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="24" height="24" rx="6" fill="white" fillOpacity="0.2" />
          <path
            d="M12 7.38C9.45 7.38 7.38 9.46 7.38 12C7.38 14.55 9.46 16.62 12 16.62C14.54 16.62 16.62 14.54 16.62 12C16.62 9.46 14.54 7.38 12 7.38ZM12 15.12C10.27 15.12 8.88 13.73 8.88 12C8.88 10.27 10.27 8.88 12 8.88C13.73 8.88 15.12 10.27 15.12 12C15.12 13.73 13.73 15.12 12 15.12Z"
            fill="white"
          />
          <path
            d="M16.82 8.08C17.42 8.08 17.9 7.59 17.9 7C17.9 6.4 17.41 5.92 16.82 5.92C16.23 5.92 15.74 6.41 15.74 7C15.74 7.59 16.23 8.08 16.82 8.08Z"
            fill="white"
          />
          <path
            d="M19.2 5.9C18.95 5.14 18.36 4.56 17.6 4.3C17.03 4.1 16.42 4 15.8 4H8.2C7.58 4 6.97 4.1 6.4 4.3C5.64 4.56 5.05 5.14 4.8 5.9C4.6 6.47 4.5 7.08 4.5 7.7V15.3C4.5 15.92 4.6 16.53 4.8 17.1C5.05 17.86 5.64 18.44 6.4 18.7C6.97 18.9 7.58 19 8.2 19H15.8C16.42 19 17.03 18.9 17.6 18.7C18.36 18.44 18.95 17.86 19.2 17.1C19.4 16.53 19.5 15.92 19.5 15.3V7.7C19.5 7.08 19.4 6.47 19.2 5.9ZM18 15.3C18 16.37 17.37 17 16.3 17H7.7C6.63 17 6 16.37 6 15.3V7.7C6 6.63 6.63 6 7.7 6H16.3C17.37 6 18 6.63 18 7.7V15.3Z"
            fill="white"
          />
        </svg>
      </div>

      <div
        className="absolute inset-0 flex items-center justify-center z-10 cursor-pointer"
        onClick={togglePlay}
      >
        {!isPlaying && !isLoading && (
          <div className="w-12 h-12 bg-black bg-opacity-30 rounded-full flex items-center justify-center">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="white"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M8 5V19L19 12L8 5Z" fill="white" />
            </svg>
          </div>
        )}
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/70 to-transparent z-10">
        <div className="flex items-center">
          <div className="flex items-center space-x-1">
            <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
              P
            </div>
            <span className="text-white text-sm font-medium">
              {reel.username}
            </span>
            {reel.verified && (
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 2L14.39 8.26L21 9.27L16.5 14.14L17.77 21L12 17.77L6.23 21L7.5 14.14L3 9.27L9.61 8.26L12 2Z"
                  fill="#3897F0"
                />
              </svg>
            )}
          </div>
        </div>
        <p className="text-white text-xs mt-1 opacity-80 truncate">
          {reel.caption}
        </p>
      </div>
    </div>
  );
}

interface TwitterEmbedProps {
  tweetId: string;
}

declare global {
  interface Window {
    twttr: any;
  }
}

function TwitterEmbed({ tweetId }: TwitterEmbedProps) {
  const tweetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://platform.twitter.com/widgets.js";
    script.async = true;
    script.charset = "utf-8";
    document.body.appendChild(script);

    const renderTweet = () => {
      if (window.twttr && tweetRef.current) {
        tweetRef.current.innerHTML = "";
        window.twttr.widgets.createTweet(tweetId, tweetRef.current, {
          theme: "dark",
        });
      }
    };

    script.onload = renderTweet;

    if (window.twttr) {
      renderTweet();
    }

    return () => {
      document.body.removeChild(script);
    };
  }, [tweetId]);

  return (
    <div
      ref={tweetRef}
      className="twitter-embed overflow-hidden bg-[#1A191999] rounded-xl min-h-64"
    >
      <div className="flex items-center justify-center w-full h-full p-6 text-white">
        <svg
          className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
        Loading tweet...
      </div>
    </div>
  );
}
