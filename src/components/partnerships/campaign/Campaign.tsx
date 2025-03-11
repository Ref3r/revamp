'use client';

import React, { useState } from "react";
import { Search } from "lucide-react";
import Image from "next/image";
import { Button, Input } from "@lemonsqueezy/wedges";
import Link from "next/link";
 // Adjust import path as needed

const Campaign = () => {
  const [searchQuery, setSearchQuery] = useState("");

  // Campaign data array
  const campaigns = [
    {
      id: 1,
      logo: "campaign1.svg",
      name: "Random Brand",
      description: "We live and breathe collaborations!",
      status: "Active",
      statusColor: "from-[#0BA360] to-[#27A980]",
      amount: "$12,000",
      type: "Affiliate",
      deadline: "Deadline: 23rd Jan, 2025"
    },
    {
      id: 2,
      logo: "campaign2.svg",
      name: "Random Brand",
      description: "We live and breathe collaborations!",
      status: "Active",
      statusColor: "from-[#0BA360] to-[#27A980]",
      amount: "$12,000",
      type: "Sponsorship",
      deadline: "Deadline: 23rd Jan, 2025"
    },
    {
      id: 3,
      logo: "campaign3.svg",
      name: "Random Brand",
      description: "We live and breathe collaborations!",
      status: "Active",
      statusColor: "from-[#0BA360] to-[#27A980]",
      amount: "$12,000",
      type: "Referral",
      deadline: "Deadline: 23rd Jan, 2025"
    },
    {
      id: 4,
      logo: "campaign4.svg",
      name: "Random Brand",
      description: "We live and breathe collaborations!",
      status: "Finished",
      statusColor: "text-[#007AFF]",
      amount: "$12,000",
      type: "Affiliate",
      deadline: "Deadline: 23rd Jan, 2025"
    },
    {
      id: 5,
      logo: "campaign5.svg",
      name: "Random Brand",
      description: "We live and breathe collaborations!",
      status: "Cancelled",
      statusColor: "text-red-500",
      amount: "$12,000",
      type: "Sponsorship",
      deadline: "Deadline: 23rd Jan, 2025"
    }
  ];

  // Function to check if a campaign matches the search query
  const matchesSearchQuery = (campaign: { name: string; description: string; status: string; type: string; amount: string; deadline: string; }) => {
    if (!searchQuery.trim()) return true;
    
    const query = searchQuery.toLowerCase();
    return (
      campaign.name.toLowerCase().includes(query) ||
      campaign.description.toLowerCase().includes(query) ||
      campaign.status.toLowerCase().includes(query) ||
      campaign.type.toLowerCase().includes(query) ||
      campaign.amount.toLowerCase().includes(query) ||
      campaign.deadline.toLowerCase().includes(query)
    );
  };

  // Filter campaigns based on search query
  const filteredCampaigns = campaigns.filter(matchesSearchQuery);

  return (
    <div className="w-full mt-4">
      {/* Search Section */}
      <div className="w-full sm:w-[350px] mb-6 border border-[#FFFFFF33] rounded-md">
        <div className="relative">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none z-10">
            <Search className="w-5 h-5 text-[#FFFFFF7A]" />
          </div>
          <Input
            type="search"
            placeholder="Search for brands, Collab Type, etc."
            className="pl-10 bg-[#16161680] border-[#1212170D] text-white/60 placeholder:text-[#FFFFFF7A]"
            value={searchQuery}
            onChange={(e) => setSearchQuery((e.target as HTMLInputElement).value)}
          />
        </div>
      </div>
      
      {/* Campaigns List */}
      <div className="space-y-4">
        {filteredCampaigns.length > 0 ? (
          filteredCampaigns.map((campaign) => (
            <div key={campaign.id} className="bg-[#1A191933] rounded-md py-4">
              {/* Desktop view */}
              <div className="hidden md:flex md:items-center md:px-6 lg:px-12">
                {/* Left side with logo and name */}
                <div className="flex items-center min-w-[240px] w-[20%]">
                  <div className="pr-5">
                    <Image width={48} height={48} src={campaign.logo} alt={campaign.name} />
                  </div>
                  <div>
                    <h2 className="text-white font-medium">{campaign.name}</h2>
                    <p className="text-white/50 text-sm">{campaign.description}</p>
                  </div>
                </div>
                
                {/* Status */}
                <div className="w-[15%] pl-4">
                  {campaign.status === "Active" ? (
                    <p className={`font-medium bg-gradient-to-r ${campaign.statusColor} text-transparent bg-clip-text`}>
                      {campaign.status}
                    </p>
                  ) : (
                    <p className={`font-medium ${campaign.statusColor}`}>
                      {campaign.status}
                    </p>
                  )}
                </div>
                
                {/* Amount */}
                <div className="w-[15%] pl-4">
                  <p className="text-white/50 font-medium">{campaign.amount}</p>
                </div>
                
                {/* Type */}
                <div className="w-[15%] pl-4">
                  <p className="text-white/50 font-medium">{campaign.type}</p>
                </div>
                
                {/* Deadline */}
                <div className="w-[20%] pl-4">
                  <p className="text-white/50 font-medium">{campaign.deadline}</p>
                </div>
                
                {/* Button */}
                <div className="w-[15%] text-right">
                  <Button className="bg-white hover:bg-gray-100">
                    <Link href="#">
                      <span className="text-black px-2">View Campaign</span>
                    </Link>
                  </Button>
                </div>
              </div>

              {/* Mobile view */}
              <div className="md:hidden p-4">
                <div className="flex items-center mb-4">
                  <div className="mr-4">
                    <Image width={48} height={48} src={campaign.logo} alt={campaign.name} />
                  </div>
                  <div>
                    <h2 className="text-white font-medium">{campaign.name}</h2>
                    <p className="text-white/50 text-sm">{campaign.description}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-4 mt-4 mb-4">
                  <div>
                    {campaign.status === "Active" ? (
                      <p className={`font-medium bg-gradient-to-r ${campaign.statusColor} text-transparent bg-clip-text`}>
                        {campaign.status}
                      </p>
                    ) : (
                      <p className={`font-medium ${campaign.statusColor}`}>
                        {campaign.status}
                      </p>
                    )}
                  </div>
                  
                  <div>
                    <p className="text-white/50 font-medium">{campaign.amount}</p>
                  </div>
                  
                  <div>
                    <p className="text-white/50 font-medium">{campaign.type}</p>
                  </div>
                </div>
                
                <div className="flex items-center justify-between mt-4">
                  <p className="text-white/50 font-medium">{campaign.deadline}</p>
                  <Button className="bg-white hover:bg-gray-100">
                    <span className="text-black px-2">View Campaign</span>
                  </Button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="bg-[#1A191933] rounded-md py-8 text-center">
            <p className="text-white/70">No campaigns found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Campaign;