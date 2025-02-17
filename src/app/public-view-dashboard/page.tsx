import React from "react";
import Profile from "@/components/public-view-dashboard/Profile";
import Recentpartners from "@/components/public-view-dashboard/Recent-partners";
import Usercommunities from "@/components/public-view-dashboard/User-communities";
import Work from "@/components/public-view-dashboard/Work";
import Followerchart from "@/components/public-view-dashboard/Follower-chart";
import Engagementchart from "@/components/public-view-dashboard/Engagement-chart";

const Page = () => {
  return (
    <div className="bg-[#0E0E0E] h-[1160px] md:h-[1100px] lg:h-[780px] xl:h-[725px]">
      <Profile />
      <Recentpartners />
      <Usercommunities />
      <Work />
      <Followerchart />
      <Engagementchart/>
    </div>
  );
};

export default Page;
