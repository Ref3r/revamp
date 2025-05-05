// Header.tsx
"use client";
import React, { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

interface Platform {
  name: string;
}

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedPlatform, setSelectedPlatform] = useState<Platform>({ name: "Instagram" });
  const dropdownRef = useRef<HTMLDivElement>(null);

  const platforms: Platform[] = [
    { name: "Instagram" },
    { name: "X" },
    { name: "TikTok" },
    { name: "Youtube" },
  ];

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (platform: Platform) => {
    setSelectedPlatform(platform);
    setIsOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);
  
  return (
    <div className="fixed top-0 left-0 lg:left-16 right-0 bg-[#0E0E0E] shadow-md z-20 flex justify-between items-center px-4 py-2 md:px-6 lg:px-8">
      <div>
        <p className="font-medium text-base text-[#FFFFFF7A]">This month stats</p>
      </div>
      <div className="relative" ref={dropdownRef}>
        {/* Dropdown Button */}
        <button
          onClick={toggleDropdown}
          className="bg-[#0E0E0E] text-[#FFFFFF8A] font-medium px-4 py-2 rounded-md border border-[#FFFFFF7A] flex items-center justify-between hover:text-white hover:border-white w-full md:w-48 lg:w-56"
        >
          <span className="truncate mr-2">{selectedPlatform.name}</span>
          <ChevronDown
            className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180" : ""}`}
          />
        </button>

        {/* Dropdown Menu */}
        {isOpen && (
          <div className="absolute right-0 mt-2 w-full md:w-48 lg:w-56 rounded-md bg-[#0E0E0E] border border-[#FFFFFF40] z-50">
            <div className="py-1">
              {platforms.map((platform) => (
                <button 
                  key={platform.name}
                  onClick={() => handleSelect(platform)}
                  className={`block w-full text-left px-4 py-2 ${
                    selectedPlatform.name === platform.name 
                      ? 'text-white bg-[#FFFFFF20]' 
                      : 'text-[#FFFFFF8A] hover:text-white hover:bg-[#FFFFFF10]'
                  }`}
                >
                  {platform.name}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;