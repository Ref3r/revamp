"use client";
import React, { useState } from "react";
import { Button } from "@lemonsqueezy/wedges";
import Link from "next/link";
import Image from "next/image";
import { ChevronDown } from "lucide-react";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  
  return (
    <div className="fixed top-0 left-0 lg:left-[68px] w-full bg-[#0E0E0E] shadow-md z-50 flex justify-between items-center px-4 pt-2 md:px-6 md:pt-2 lg:px-8 lg:pt-2">
      <div className="px-2 md:px-2 lg:px-1">
        <p className="font-medium text-[16px] text-[#FFFFFF7A]">This month stats</p>
      </div>
      <div className="px-4 md:pl-6 lg:px-8">
        <div className="relative inline-block text-left lg:pr-10 md:pr-1 ">
          {/* Dropdown Button */}
          <Button
            onClick={toggleDropdown}
            className="bg-[#0E0E0E] text-[#FFFFFF8A] font-medium w-96 rounded-md border border-[#FFFFFF7A] flex  hover:text-white hover:border-white "
          >
            <div className="flex justify-between items-center"><span className="pr-56">Your Platforms</span>
            <ChevronDown
              className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180" : ""}`}
            /></div>
          </Button>

          {/* Dropdown Menu */}
          {isOpen && (
            <div className="absolute mt-2 w-44 md:max-2xl:w-[144px] rounded-md bg-[#0E0E0E]">
              <div className="py-1">
                <Link href="#" className="block px-4 py-2 text-[#FFFFFF8A] hover:text-white ">
                  Instagram
                </Link>
                <Link href="#" className="block px-4 py-2 text-[#FFFFFF8A] hover:text-white ">
                  X
                </Link>
                <Link href="#" className="block px-4 py-2 text-[#FFFFFF8A] hover:text-white ">
                  TikTok
                </Link>
                <Link href="#" className="block px-4 py-2 text-[#FFFFFF8A] hover:text-white ">
                  Youtube
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;