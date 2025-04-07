// page.tsx
import React from "react";
import Header from "@/components/analytics-dashboard/Header";
import Data from "@/components/analytics-dashboard/Data";
import AgeSegmentation from "@/components/analytics-dashboard/Age-segmentation";
import Leaderboard from "@/components/analytics-dashboard/Leaderboard";
import Sidebar from "@/components/dashboard/Sidebar";
import FollowerCharts from "@/components/public-view-dashboard/PartnershipsSection";

const Page = () => {
  return (
    <div className="bg-[#0E0E0E] min-h-screen flex">
      <div className="fixed left-3 top-0 bottom-0 z-30 hidden lg:block w-16">
        <Sidebar />
      </div>

      <div className="w-full lg:ml-16 flex flex-col">
        <Header />
        <div className="px-4 md:px-6 lg:px-8 pt-16 pb-8 flex flex-col gap-6">
          <Data />

          {/* Analytics charts section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <FollowerCharts className="h-80" />
            <AgeSegmentation className="h-80" />
            </div>

          {/* Leaderboard section */}
          <Leaderboard />
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 z-30 lg:hidden bg-[#1A1919] py-2">
        <div className="flex justify-around items-center px-2">
          <Sidebar isMobile={true} />
        </div>
      </div>
    </div>
  );
};

export default Page;
