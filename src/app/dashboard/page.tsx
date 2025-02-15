import React from "react";
import Sidebar from "@/components/dashboard/Sidebar";
import Wallet_balance from "@/components/dashboard/Wallet_balance";
import Profile_box from "@/components/dashboard/Profile_box";
import Homefeed from "@/components/dashboard/Home-feed";
import Communities from "@/components/dashboard/Communities";
import Engagementrate from "@/components/dashboard/Engagement-rate";
import Partnership from "@/components/dashboard/Partnership";
import Recentcontests from "@/components/dashboard/Recent-contests";
import Post from "@/components/dashboard/Post";
import Post2 from "@/components/dashboard/Post-2";
import Dashboardmenue from "@/components/dashboard/Dashboard-menue";


const dashboard = () => {
  return (
    <div className="bg-[#0E0E0E] py-6 ">
      <Wallet_balance />
      <Sidebar />
      <Profile_box />
      <Homefeed />
      <Communities />
      <Engagementrate />
      <Partnership />
      <Recentcontests />
      <Post />
      <Post2 />
      <Dashboardmenue />
    </div>
  );
};

export default dashboard;
