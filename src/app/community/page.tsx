import Sidebar from "@/components/dashboard/Sidebar";
import React from "react";
import Form from "@/components/communities/community-challenge-form/Form";
import Makeyourcommunity from "@/components/communities/make-your-community/Make-your-community";
import Newcommunities from "@/components/communities/newCommunities/newCommunities";

const page = () => {
  return (
    <div className="bg-[#0E0E0E] min-h-screen">
      {/* Fixed Sidebar */}
      <div className="fixed left-3 top-0 bottom-0 z-30 hidden lg:block">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="px-4 lg:pl-24 xl:pl-32 py-6 lg:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Newcommunities />
          <Makeyourcommunity />
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 z-30 lg:hidden bg-[#1A1919] py-2">
        <div className="flex justify-around items-center px-2">
          <Sidebar isMobile={true} />
        </div>
      </div>
    </div>
  );
};

export default page;