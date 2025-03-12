"use client";
import { Button } from "@lemonsqueezy/wedges";
import { Menu, Plus, X } from "lucide-react";
import React, { useState } from "react";
import MainCommunityComponent from "../MainCommunityComponent/MainCommunityComponent";

// Header Component with responsive design and hamburger menu
const Header = ({
  selectedCategory,
  setSelectedCategory,
  isMobile,
}: {
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  isMobile: boolean;
}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showCommunity, setShowCommunity] = useState(false);

  // Toggle menu for mobile
  const toggleMenu = () => setMenuOpen(!menuOpen);

  // Handle New Community button click
  const handleNewCommunityClick = () => setShowCommunity(true);

  // Handle selecting a category
  const selectCategory = (category: string) => {
    setSelectedCategory(category);
    if (isMobile) setMenuOpen(false); // Close the menu on mobile after selecting a category
  };

  const categories = [
    "Design",
    "Code",
    "Twitter",
    "Playground",
    "Portfolio Mentors",
    "Tech Leaders",
    "Refer Folks",
  ];

  return (
    <div className="sticky top-0 z-30 bg-[#0E0E0E] py-3 sm:py-5 px-4 sm:px-6">
      <div className="flex justify-between items-center">
        <div className="flex flex-col">
          <h1 className="text-lg sm:text-xl font-semibold">Communities</h1>

          {/* Mobile Hamburger Icon */}
          {isMobile && (
            <button
              onClick={toggleMenu}
              className="mt-2 text-gray-400 hover:text-white"
              aria-label="Toggle menu"
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          )}
        </div>

        <Button
          className="bg-gradient-to-r from-[#0BA360] to-[#27A980] hover:from-[#27A980] hover:to-[#0BA360] text-white px-2 py-1 sm:px-3 sm:py-1.5 rounded-md text-xs sm:text-sm flex items-center"
          onClick={handleNewCommunityClick} // Attach the click handler here
        >
          {isMobile ? "New" : "New Community"}
        </Button>

        {/* Conditionally render MainCommunityComponent with animation */}
        <div
          className={`fixed inset-0 z-50 transition-transform duration-300 ease-in-out ${
            showCommunity ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {showCommunity && (
            <MainCommunityComponent
              show={showCommunity}
              setShow={setShowCommunity}
            />
          )}
        </div>
      </div>

      {/* Mobile Menu - Overlay content with absolute positioning */}
      {isMobile && menuOpen && (
        <div className="absolute top-full left-0 right-0 mt-1 px-4 py-2 bg-[#1A1919] rounded-lg shadow-lg z-40">
          {categories.map((category) => (
            <button
              key={category}
              className={`block w-full text-left px-4 py-2 text-sm ${
                selectedCategory === category
                  ? "bg-[#2D2D2D] text-white font-medium"
                  : "text-gray-400 hover:bg-[#222222]"
              }`}
              onClick={() => selectCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
      )}

      {/* Overlay for menu backdrop */}
      {isMobile && menuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20"
          onClick={() => setMenuOpen(false)} // Close menu when clicking outside
          style={{ top: "85px" }}
        />
      )}

      {/* Desktop Categories */}
      {!isMobile && (
        <div className="mt-4 overflow-x-auto pb-2">
          <div className="flex space-x-2 min-w-max">
            {categories.map((category) => (
              <button
                key={category}
                className={`px-4 py-1.5 rounded-full text-sm ${
                  selectedCategory === category
                    ? "bg-[#2D2D2D] text-white font-medium"
                    : "bg-[#191919] text-[#FFFFFF80] hover:bg-[#222222] border border-[#FFFFFF66]"
                }`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
