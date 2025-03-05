import React from "react";
import Header from "@/components/analytics-dashboard/Header";
import Data from "@/components/analytics-dashboard/Data";
import Followeranalytics from "@/components/analytics-dashboard/Followers-analytics";
import Agesegmentation from "@/components/analytics-dashboard/Age-segmentation";
import Leaderboard from "@/components/analytics-dashboard/Leaderboard";
import Sidebar from "@/components/dashboard/Sidebar";

const page = () => {
  return (
    <div className="bg-[#0E0E0E] h-full">
      <Sidebar/>
      <Header />
      <Data />
      <Followeranalytics />
      <Agesegmentation />
      <Leaderboard />
    </div>
  );
};

export default page;
