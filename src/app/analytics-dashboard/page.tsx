import React from "react";
import Analyticssidebar from "@/components/analytics-dashboard/Analytics-sidebar";
import Header from "@/components/analytics-dashboard/Header";
import Data from "@/components/analytics-dashboard/Data";
import Followeranalytics from "@/components/analytics-dashboard/Followers-analytics";
import Agesegmentation from "@/components/analytics-dashboard/Age-segmentation";
import Leaderboard from "@/components/analytics-dashboard/Leaderboard";

const page = () => {
  return (
    <div className="bg-[#0E0E0E] h-full">
      <Analyticssidebar />
      <Header />
      <Data />
      <Followeranalytics />
      <Agesegmentation />
      <Leaderboard />
    </div>
  );
};

export default page;
