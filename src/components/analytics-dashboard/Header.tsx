// Header.tsx
"use client";
import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  
  return (
    <div className="fixed top-0 left-0 lg:left-16 right-0 bg-[#0E0E0E] shadow-md z-20 flex justify-between items-center px-4 py-2 md:px-6 lg:px-8">
      <div>
        <p className="font-medium text-base text-[#FFFFFF7A]">This month stats</p>
      </div>
      <div className="relative">
        {/* Dropdown Button */}
        <button
          onClick={toggleDropdown}
          className="bg-[#0E0E0E] text-[#FFFFFF8A] font-medium px-4 py-2 rounded-md border border-[#FFFFFF7A] flex items-center justify-between hover:text-white hover:border-white w-full md:w-48 lg:w-56"
        >
          <span className="truncate mr-2">Instagram</span>
          <ChevronDown
            className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180" : ""}`}
          />
        </button>

        {/* Dropdown Menu */}
        {isOpen && (
          <div className="absolute right-0 mt-2 w-full md:w-48 lg:w-56 rounded-md bg-[#0E0E0E] border border-[#FFFFFF40] z-50">
            <div className="py-1">
              <button className="block w-full text-left px-4 py-2 text-[#FFFFFF8A] hover:text-white hover:bg-[#FFFFFF10]">
                Instagram
              </button>
              <button className="block w-full text-left px-4 py-2 text-[#FFFFFF8A] hover:text-white hover:bg-[#FFFFFF10]">
                X
              </button>
              <button className="block w-full text-left px-4 py-2 text-[#FFFFFF8A] hover:text-white hover:bg-[#FFFFFF10]">
                TikTok
              </button>
              <button className="block w-full text-left px-4 py-2 text-[#FFFFFF8A] hover:text-white hover:bg-[#FFFFFF10]">
                Youtube
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;