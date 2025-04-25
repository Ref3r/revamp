"use client";

import React, { useState, useEffect, useRef } from "react";
import YouTube from "react-youtube";

declare global {
  interface Window {
    twttr: any;
  }
}

export default function ContentHighlights() {
  const [activeTab, setActiveTab] = useState("YouTube");
  const [loading, setLoading] = useState(true);

  // Simulated loading effect for tab changes
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [activeTab]); // Reset loading when tab changes

  const youtubeHighlights = [
    {
      id: 1,
      title: "Never Gonna Give You Up",
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
    "1909647660497113116",
    "1909643882062578139",
  ];

  // Simple circular loading spinner
  const SimpleCircularLoader = () => (
    <div className="flex items-center justify-center w-full h-full min-h-64">
      <div className="w-12 h-12 border-2 border-gray-600 border-t-white rounded-full animate-spin"></div>
    </div>
  );

  return (
    <div className="bg-[#1A1919CC] rounded-xl p-2 sm:p-4 h-full flex flex-col">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-2">
        <h2 className="text-xl sm:text-2xl font-bold text-white mb-1 sm:mb-0">Highlights</h2>
        <ContentHighlightTabs
          activeTab={activeTab}
          setActiveTab={(tab) => {
            setActiveTab(tab);
          }}
        />
      </div>

      <div className="flex-1 overflow-hidden">
        {loading ? (
          <SimpleCircularLoader />
        ) : (
          <>
            {activeTab === "YouTube" && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 h-full">
                {youtubeHighlights.map((item) => (
                  <YouTubeItem key={item.id} item={item} />
                ))}
              </div>
            )}

            {activeTab === "Instagram" && (
              <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 h-full">
                {instagramReels.map((reel) => (
                  <InstagramReelItem key={reel.id} reel={reel} />
                ))}
              </div>
            )}

            {activeTab === "Twitter" && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 h-full">
                {twitterPosts.map((tweetId) => (
                  <div key={tweetId} className="w-full h-full" style={{ minHeight: "300px", maxHeight: "400px" }}>
                    <TwitterEmbed tweetId={tweetId} />
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
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
    <div className="flex overflow-x-auto scrollbar-hide justify-start sm:justify-end gap-2 pb-1">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => setActiveTab(tab)}
          className={`px-2 py-1 sm:px-3 md:px-4 sm:py-1 rounded-full text-xs whitespace-nowrap transition-all ${
            activeTab === tab
              ? "bg-white text-black font-medium"
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
  const [playerReady, setPlayerReady] = useState(false);
  const [showThumbnail, setShowThumbnail] = useState(true);
  
  const onPlayerReady = () => {
    setPlayerReady(true);
  };
   
  const opts = {
    playerVars: {
      autoplay: 0,
      modestbranding: 1,
    },
    width: '100%',
    height: '100%',
  };

  const handlePlayVideo = () => {
    setShowThumbnail(false);
  };

  return (
    <div className="space-y-2">
      <div className="relative aspect-video bg-black rounded-lg overflow-hidden">
        {showThumbnail ? (
          <div 
            className="absolute inset-0 cursor-pointer" 
            onClick={handlePlayVideo}
            style={{
              backgroundImage: `url(https://img.youtube.com/vi/${item.videoId}/mqdefault.jpg)`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          >
            <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-red-600 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>
          </div>
        ) : (
          <>
            {!playerReady && (
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-70 z-10">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-4 border-gray-300 border-t-white animate-spin"></div>
              </div>
            )}
            <YouTube 
              videoId={item.videoId} 
              className="w-full h-full" 
              opts={opts}
              onReady={onPlayerReady}
            />
          </>
        )}
      </div>
      <div className="px-1">
        <h3 className="text-sm sm:text-base text-white font-medium truncate">{item.title}</h3>
        <span className="text-xs text-gray-400">{item.duration}</span>
      </div>
    </div>
  );
}

interface InstagramReelProps {
  reel: {
    id: number;
    username: string;
    videoUrl: string;
    thumbnailImage: string;
    caption: string;
    verified: boolean;
  };
}

function InstagramReelItem({ reel }: InstagramReelProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef(null);

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
    <div 
      ref={containerRef}
      className="relative rounded-xl overflow-hidden bg-gradient-to-br from-gray-900 to-black h-full"
      style={{ aspectRatio: '9/16', maxHeight: '100%' }}
    >
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
        <div className="absolute inset-0 flex items-center justify-center z-20 bg-black bg-opacity-60">
          <div className="w-10 h-10 rounded-full border-4 border-gray-300 border-t-white animate-spin"></div>
        </div>
      )}

      <div className="absolute top-2 left-2 z-10">
        <svg
          width="20"
          height="20"
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
          <div className="w-8 h-8 bg-black bg-opacity-30 rounded-full flex items-center justify-center">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="white"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M8 5V19L19 12L8 5Z" fill="white" />
            </svg>
          </div>
        )}
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/70 to-transparent z-10">
        <div className="flex items-center">
          <div className="flex items-center space-x-1">
            <div className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
              P
            </div>
            <span className="text-white text-xs font-medium">
              {reel.username}
            </span>
            {reel.verified && (
              <svg
                width="10"
                height="10"
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

function TwitterEmbed({ tweetId }: { tweetId: string }) {
  const tweetRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [failedToLoad, setFailedToLoad] = useState(false);
  
  useEffect(() => {
    let isMounted = true;
    
    const loadTwitterScript = () => {
      return new Promise((resolve, reject) => {
        // Check if script already exists
        if (window.twttr) {
          return resolve(window.twttr);
        }
        
        // Create script element
        const script = document.createElement('script');
        script.setAttribute('src', 'https://platform.twitter.com/widgets.js');
        script.setAttribute('async', 'true');
        script.onload = () => resolve(window.twttr);
        script.onerror = reject;
        document.head.appendChild(script);
      });
    };
    
    const renderTweet = async () => {
      if (!tweetRef.current) return;
      
      try {
        // Load Twitter script and wait for it to be ready
        const twitter = await loadTwitterScript() as {
          widgets: any;
          ready: (callback: () => void) => void;
        };
        
        // Wait for widgets to be ready
        await new Promise<void>(resolve => {
          if (twitter.widgets) {
            resolve(void 0);
          } else {
            twitter.ready(resolve);
          }
        });
        
        if (!isMounted || !tweetRef.current) return;
        
        // Clear any existing content
        tweetRef.current.innerHTML = '';
        
        // Create the tweet
        const tweetElement = await twitter.widgets.createTweet(tweetId, tweetRef.current, {
          theme: 'dark',
          dnt: true,
          width: '100%'
        });
        
        if (isMounted) {
          if (tweetElement) {
            setIsLoading(false);
          } else {
            setFailedToLoad(true);
            setIsLoading(false);
          }
        }
      } catch (error) {
        console.error('Error loading tweet:', error);
        if (isMounted) {
          setFailedToLoad(true);
          setIsLoading(false);
        }
      }
    };
    
    renderTweet();
    
    return () => {
      isMounted = false;
    };
  }, [tweetId]);
  
  // Simple circular loading spinner
  const SimpleCircularLoader = () => (
    <div className="flex items-center justify-center w-full h-full min-h-[300px] bg-[#1A191999]">
      <div className="w-10 h-10 border-2 border-gray-600 border-t-white rounded-full animate-spin"></div>
    </div>
  );
  
  // Fallback component for failed loads
  const tweetFallback = (
    <div className="flex flex-col p-4 bg-[#1A191999] border border-gray-800 rounded-xl h-full min-h-[300px]">
      <div className="flex items-center mb-3">
        <div className="w-10 h-10 rounded-full bg-[#1DA1F2] flex items-center justify-center text-white font-bold">
          X
        </div>
        <div className="ml-3">
          <p className="text-white font-medium">Tweet not available</p>
          <p className="text-gray-400 text-xs">@x</p>
        </div>
      </div>
      
      <p className="text-gray-300 text-sm my-2">
        This tweet couldn't be loaded. It may be private, deleted, or temporarily unavailable.
      </p>
      
      <a 
        href={`https://x.com/i/web/status/${tweetId}`}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-auto self-start px-4 py-2 bg-[#222] hover:bg-[#333] text-white rounded-full text-sm transition-colors"
      >
        View on X.com
      </a>
    </div>
  );

  return (
    <div className="bg-[#1A191999] rounded-xl h-full overflow-hidden">
      {isLoading ? (
        <SimpleCircularLoader />
      ) : (
        <div 
          ref={tweetRef} 
          className="w-full h-full overflow-y-auto"
        ></div>
      )}
      
      {failedToLoad && !isLoading && (
        <div className="absolute inset-0 z-20">
          {tweetFallback}
        </div>
      )}
    </div>
  );
}