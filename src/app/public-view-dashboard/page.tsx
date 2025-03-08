"use client";
import React from "react";
import ProfileBox from "@/components/dashboard/ProfileBox";
import FollowerCharts from "@/components/public-view-dashboard/Follower-chart";
import EngagementChart from "@/components/public-view-dashboard/Engagement-chart";
import Work from "@/components/public-view-dashboard/Work";
import RecentPartners from "@/components/public-view-dashboard/Recent-partners";
import UserCommunities from "@/components/public-view-dashboard/User-communities";

const PublicViewDashboard = () => {
  return (
    <div className="bg-[#0E0E0E] min-h-screen px-2 sm:px-4 py-4">
      <div className="max-w-[1440px] mx-auto">
        {/* Main grid layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          {/* Left column - Profile and Charts */}
          <div className="lg:col-span-4 space-y-4 md:space-y-6 lg:space-y-8">
            {/* Profile Box with isPublicView prop set to true */}
            <ProfileBox isPublicView={true} />

            {/* Total Aggregated Followers Chart */}
            <div className="bg-[#1A1919] rounded-2xl p-4 min-h-[280px] md:min-h-[320px]">
              <FollowerCharts />
            </div>

            {/* Engagement Chart */}
            <div className="bg-[#1A1919] rounded-2xl p-4 min-h-[280px] md:min-h-[320px]">
              <EngagementChart />
            </div>
          </div>

          {/* Right column - Work gallery and Partners/Communities */}
          <div className="lg:col-span-8 flex flex-col">
            {/* Work Gallery */}
            <div className="mb-4">
              <Work />
            </div>
            
            {/* Partners and Communities Row - aligned directly under Work gallery */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Recent Partners */}
              <RecentPartners />
  
              {/* User Communities */}
              <UserCommunities />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PublicViewDashboard;