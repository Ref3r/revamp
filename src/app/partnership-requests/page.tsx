import React from "react";
import Sidebar from "@/components/dashboard/Sidebar";
import Requests from "@/components/partnership-requests/Requests";

const page = () => {
  return (
    <div className="bg-[#0E0E0E] min-h-screen">
      {/* Fixed Sidebar */}
      <div className="fixed left-4 top-0 bottom-0 z-30 hidden lg:block">
        <Sidebar />
      </div>

      {/* Main Content Container */}
      <div className="w-full pt-4 lg:pl-16 overflow-x-hidden">
        <Requests />
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