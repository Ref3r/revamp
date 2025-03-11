import React from 'react';
import { Search } from "lucide-react";
import Image from "next/image";
import { Button } from "@lemonsqueezy/wedges";
import Link from "next/link";

const Requests = () => {
    const partnershipRequests = [
        { id: 1, imageSrc: "/Frame%2076%20(1).svg", collabType: "Affiliate" },
        { id: 2, imageSrc: "/Frame%2076%20(2).svg", collabType: "Sponsorship" },
        { id: 3, imageSrc: "/Frame%2076%20(1).svg", collabType: "Referral" },
        { id: 4, imageSrc: "/Frame%2076%20(1).svg", collabType: "Affiliate" },
        { id: 5, imageSrc: "/Frame%2076%20(1).svg", collabType: "Sponsorship" },
        { id: 6, imageSrc: "/Frame%2076%20(1).svg", collabType: "Affiliate" }
    ];

  return (
    <div className="w-full p-3 sm:p-4 md:p-5 lg:p-6">
      <div className="max-w-full">
        {/* Header */}
        <h1 className="font-bold text-white text-lg sm:text-xl md:text-2xl pb-4 sm:pb-5 md:pb-6">Partnerships Requests</h1>
        
        {/* Search Bar */}
        <div className="w-full max-w-xs sm:max-w-sm mb-4 sm:mb-5 md:mb-6">
          <div className="flex items-center gap-2 bg-transparent border border-[#FFFFFF3D] px-3 py-2 rounded-md">
            <Search className="w-4 h-4 sm:w-5 sm:h-5 text-[#FFFFFF7A]" />
            <input
              type="search"
              placeholder="Search for brands, Collab Type, etc."
              className="bg-transparent text-[#FFFFFF5A] outline-none focus:ring-0 placeholder:text-[#FFFFFF7A] w-full text-xs sm:text-sm"
            />
          </div>
        </div>
        
        {/* Partnerships List */}
        <div className="space-y-3 sm:space-y-4">
          {partnershipRequests.map((request) => (
            <div key={request.id} className="rounded-md bg-[#1A191933] p-4 sm:py-4 md:py-5">
              {/* Mobile View (< 640px) */}
              <div className="sm:hidden">
                {/* Brand Info */}
                <div className="flex items-center mb-3">
                  <div className="mr-3">
                    <div className="w-[40px] h-[40px] rounded-full bg-gray-700 flex items-center justify-center overflow-hidden">
                      <Image 
                        src={request.imageSrc} 
                        width={40} 
                        height={40} 
                        alt="Brand logo"
                        className="rounded-full" 
                        unoptimized={true}
                      />
                    </div>
                  </div>
                  
                  <div className="flex flex-col">
                    <h2 className="text-white font-medium text-sm">Random Brand</h2>
                    <p className="text-[#FFFFFF7A] text-xs">We live and breathe collaborations!</p>
                  </div>
                </div>
                
                {/* Mobile Details */}
                <div className="flex flex-wrap gap-x-3 gap-y-2 mb-3">
                  <div className="text-[#FF9500] font-medium text-xs">Requested</div>
                  <div className="text-[#FFFFFF7A] font-medium text-xs">$12,000</div>
                  <div className="text-[#FFFFFF7A] font-medium text-xs">{request.collabType}</div>
                  <div className="text-[#FFFFFF7A] font-medium text-xs">Deadline: 23rd Jan, 2025</div>
                </div>
                
                {/* Mobile Button */}
                <Button className="w-full bg-white hover:bg-gray-100 rounded-md px-2 py-1">
                  <span className="text-black font-medium text-xs">Start Chatting</span>
                </Button>
              </div>
              
              {/* Small to Medium Screens (640px - 1023px) */}
              <div className="hidden sm:block lg:hidden">
                <div className="grid grid-cols-1 gap-4">
                  {/* Brand Info Row */}
                  <div className="flex items-center">
                    <div className="mr-3">
                      <div className="w-[40px] h-[40px] rounded-full bg-gray-700 flex items-center justify-center overflow-hidden">
                        <Image 
                          src={request.imageSrc} 
                          width={40} 
                          height={40} 
                          alt="Brand logo"
                          className="rounded-full" 
                          unoptimized={true}
                        />
                      </div>
                    </div>
                    
                    <div className="flex flex-col">
                      <h2 className="text-white font-medium text-sm md:text-base">Random Brand</h2>
                      <p className="text-[#FFFFFF7A] text-xs md:text-sm">We live and breathe collaborations!</p>
                    </div>
                  </div>
                  
                  {/* Details Row */}
                  <div className="grid grid-cols-5 gap-2 items-center">
                    <div className="text-[#FF9500] font-medium text-xs md:text-sm">Requested</div>
                    <div className="text-[#FFFFFF7A] font-medium text-xs md:text-sm">$12,000</div>
                    <div className="text-[#FFFFFF7A] font-medium text-xs md:text-sm">{request.collabType}</div>
                    <div className="text-[#FFFFFF7A] font-medium text-xs md:text-sm">Deadline: 23rd Jan, 2025</div>
                    <div className="text-right">
                      <Button className="w-auto bg-white hover:bg-gray-100 rounded-md px-3 py-1 md:px-4 md:py-1.5">
                        <span className="text-black font-medium text-xs md:text-sm">Start Chatting</span>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Desktop View (≥ 1024px) - Original Horizontal Layout */}
              <div className="hidden lg:flex items-center px-3">
                {/* Brand Info Section with Fixed Width */}
                <div className="flex items-center w-[220px]">
                  <div className="mr-4">
                    <div className="w-[50px] h-[50px] rounded-full bg-gray-700 flex items-center justify-center overflow-hidden">
                      <Image 
                        src={request.imageSrc} 
                        width={50} 
                        height={50} 
                        alt="Brand logo"
                        className="rounded-full" 
                        unoptimized={true}
                      />
                    </div>
                  </div>
                  
                  <div className="flex flex-col">
                    <h2 className="text-white font-medium text-base">Random Brand</h2>
                    <p className="text-[#FFFFFF7A] text-sm">We live and breathe collaborations!</p>
                  </div>
                </div>
                
                {/* Status Items with Original Spacing */}
                <div className="text-[#FF9500] font-medium text-base w-24 ml-24">Requested</div>
                <div className="text-[#FFFFFF7A] font-medium text-base w-24 ml-10">$12,000</div>
                <div className="text-[#FFFFFF7A] font-medium text-base w-28 ml-12">{request.collabType}</div>
                <div className="text-[#FFFFFF7A] font-medium text-base ml-12 flex-1">Deadline: 23rd Jan, 2025</div>
                
                {/* Button with Original Styling */}
                <Button className="w-auto bg-white hover:bg-gray-100 rounded-md px-5 py-2 ml-4">
                  <span className="text-black font-medium text-base">Start Chatting</span>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Requests;