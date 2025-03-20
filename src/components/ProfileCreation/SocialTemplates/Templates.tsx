import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const SocialTemplatesGrid = () => {
  const [selectedPlatform, setSelectedPlatform] = useState<keyof SelectedTemplates>('instagram');
  const [showPlatformDropdown, setShowPlatformDropdown] = useState(false);
  const [selectedTemplates, setSelectedTemplates] = useState<SelectedTemplates>({
    instagram: [1], 
    facebook: [],
    youtube: [],
    tiktok: [],
    twitter: []
  });
  
  // Social platform options
  const platforms = [
    { id: 'instagram', name: 'Instagram', templateCount: 5 },
    { id: 'facebook', name: 'Facebook', templateCount: 4 },
    { id: 'youtube', name: 'YouTube', templateCount: 3 },
    { id: 'tiktok', name: 'TikTok', templateCount: 3 },
    { id: 'twitter', name: 'Twitter', templateCount: 4 }
  ];
  
  // Templates for each platform
  const templatesByPlatform = {
    instagram: [
      {
        id: 1,
        title: "Shop My Feed",
        image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80"
      },
      {
        id: 2,
        title: "Facebook Posts",
        image: "https://images.unsplash.com/photo-1526047932273-341f2a7631f9?w=800&q=80"
      },
      {
        id: 3,
        title: "Social Feed Posts",
        image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&q=80"
      },
      {
        id: 4,
        title: "My Recipe Feed",
        image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&q=80"
      },
      {
        id: 5,
        title: "Photo Collection",
        image: "https://images.unsplash.com/photo-1452457750107-cd084dce177d?w=800&q=80"
      }
    ],
    facebook: [
      {
        id: 1,
        title: "Reviews Wall",
        image: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=800&q=80"
      },
      {
        id: 2,
        title: "Facebook Feed",
        image: "https://images.unsplash.com/photo-1611162616475-46b635cb6868?w=800&q=80"
      },
      {
        id: 3,
        title: "Event Gallery",
        image: "https://images.unsplash.com/photo-1579208575657-c595a05383b7?w=800&q=80"
      },
      {
        id: 4,
        title: "Testimonials",
        image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&q=80"
      }
    ],
    youtube: [
      {
        id: 1,
        title: "Video Gallery",
        image: "https://images.unsplash.com/photo-1611162618071-b39a2ec055fb?w=800&q=80"
      },
      {
        id: 2,
        title: "Channel Feed",
        image: "https://images.unsplash.com/photo-1626379953822-baec29cb1b8f?w=800&q=80"
      },
      {
        id: 3,
        title: "Featured Videos",
        image: "https://images.unsplash.com/photo-1595231776515-ddffb1f4eb73?w=800&q=80"
      }
    ],
    tiktok: [
      {
        id: 1,
        title: "TikTok Feed",
        image: "https://images.unsplash.com/photo-1659294609605-27215cba4424?w=800&q=80"
      },
      {
        id: 2,
        title: "Trending Videos",
        image: "https://images.unsplash.com/photo-1596558450268-9c27524ba856?w=800&q=80"
      },
      {
        id: 3,
        title: "Video Showcase",
        image: "https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?w=800&q=80"
      }
    ],
    twitter: [
      {
        id: 1,
        title: "Tweet Wall",
        image: "https://images.unsplash.com/photo-1611605698335-8b1569810432?w=800&q=80"
      },
      {
        id: 2,
        title: "Latest Tweets",
        image: "https://images.unsplash.com/photo-1611944212129-29977ae1398c?w=800&q=80"
      },
      {
        id: 3,
        title: "Hashtag Feed",
        image: "https://images.unsplash.com/photo-1500916434205-0c77489c6cf7?w=800&q=80"
      },
      {
        id: 4,
        title: "Mentions Gallery",
        image: "https://images.unsplash.com/photo-1614028674026-a65e31bfd27c?w=800&q=80"
      }
    ]
  };

  interface Template {
    id: number;
    title: string;
    image: string;
  }

  interface Platform {
    id: string;
    name: string;
    templateCount: number;
  }

  interface SelectedTemplates {
    instagram: number[];
    facebook: number[];
    youtube: number[];
    tiktok: number[];
    twitter: number[];
  }

  const toggleTemplateSelection = (templateId: number) => {
    setSelectedTemplates((prev: SelectedTemplates) => {
      const currentSelected = [...prev[selectedPlatform]];
      
      if (currentSelected.includes(templateId)) {
        // Remove if already selected
        return {
          ...prev,
          [selectedPlatform]: currentSelected.filter(id => id !== templateId)
        };
      } else {
        // Add if not selected
        return {
          ...prev,
          [selectedPlatform]: [...currentSelected, templateId]
        };
      }
    });
  };

  const selectedPlatformObj = platforms.find(p => p.id === selectedPlatform);
  const currentTemplates = templatesByPlatform[selectedPlatform] || [];

  return (
    <div >
      {/* Platform selector dropdown */}
      <div className="relative mb-6 flex justify-center">
        <button 
          className="w-full max-w-md px-6 py-4 bg-[#0E0E0E] border border-[#333333] rounded-lg flex items-center justify-between text-white hover:bg-[#1a1a1a] transition-colors"
          onClick={() => setShowPlatformDropdown(!showPlatformDropdown)}
        >
          <span className="text-lg">{selectedPlatformObj?.name} ({selectedPlatformObj?.templateCount} Templates)</span>
          <ChevronDown className="w-5 h-5" />
        </button>
        
        {/* Platform dropdown menu */}
                  {showPlatformDropdown && (
          <div className="absolute z-10 w-full max-w-md mx-auto mt-1 bg-[#0E0E0E] border border-[#333333] rounded-lg shadow-lg overflow-hidden">
            {platforms.map(platform => (
              <button
                key={platform.id}
                className="w-full p-4 text-left hover:bg-[#2a2a2a] transition-colors flex justify-between items-center text-white"
                onClick={() => {
                  setSelectedPlatform(platform.id as keyof SelectedTemplates);
                  setShowPlatformDropdown(false);
                }}
              >
                <span>{platform.name}</span>
                <span className="text-sm text-[#3D9DF6]">({platform.templateCount})</span>
              </button>
            ))}
          </div>
        )}
      </div>
      
      {/* Templates grid */}
      <div className="grid grid-cols-5 gap-4">
        {currentTemplates.map((template) => {
          const isSelected = selectedTemplates[selectedPlatform].includes(template.id);
          
          return (
            <div 
              key={template.id}
              onClick={() => toggleTemplateSelection(template.id)}
              className={`
                relative rounded-lg overflow-hidden cursor-pointer 
                ${isSelected ? 'ring-2 ring-green-500' : ''}
              `}
              style={{ 
                aspectRatio: '1/1',
                border: isSelected ? '2px solid #0BA360' : 'none'
              }}
            >
              <img 
                src={template.image} 
                alt={template.title}
                className="w-full h-full object-cover"
              />
              
              {/* Selected badge */}
              {isSelected && (
                <div className="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                  Selected
                </div>
              )}
              
              {/* Platform icon */}
              <div className="absolute bottom-2 right-2 bg-white rounded-full p-1 w-8 h-8 flex items-center justify-center" style={{ backgroundColor: "#fff" }}>
                {selectedPlatform === 'instagram' && (
                  <svg viewBox="0 0 448 512" width="18" height="18" xmlns="http://www.w3.org/2000/svg">
                    <linearGradient id="insta-gradient" x1="0%" y1="70%" x2="100%" y2="30%">
                      <stop offset="0%" stopColor="#ffdb58" />
                      <stop offset="25%" stopColor="#ff3a49" />
                      <stop offset="50%" stopColor="#e6683c" />
                      <stop offset="75%" stopColor="#bc3081" />
                      <stop offset="100%" stopColor="#4c64d3" />
                    </linearGradient>
                    <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" fill="#DD2A7B" />
                  </svg>
                )}
                {selectedPlatform === 'facebook' && (
                  <svg viewBox="0 0 24 24" width="16" height="16" xmlns="http://www.w3.org/2000/svg">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" fill="#1877F2"/>
                  </svg>
                )}
                {selectedPlatform === 'youtube' && (
                  <svg viewBox="0 0 24 24" width="16" height="16" xmlns="http://www.w3.org/2000/svg">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" fill="#FF0000"/>
                  </svg>
                )}
                {selectedPlatform === 'tiktok' && (
                  <svg viewBox="0 0 24 24" width="16" height="16" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" fill="#000000"/>
                  </svg>
                )}
                {selectedPlatform === 'twitter' && (
                  <svg viewBox="0 0 24 24" width="16" height="16" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" fill="#1DA1F2"/>
                  </svg>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SocialTemplatesGrid;