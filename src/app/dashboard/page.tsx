'use client'
import React from "react";
import Sidebar from "@/components/dashboard/Sidebar";
import Profile_box from "@/components/dashboard/ProfileBox";
import Homefeed from "@/components/dashboard/Home-feed";
import Communities from "@/components/dashboard/Communities";
import Engagementrate from "@/components/dashboard/Engagement-rate";
import Partnership from "@/components/dashboard/Partnership";
import Post from "@/components/dashboard/Post";
import Post2 from "@/components/dashboard/Post-2";
import WalletBalance from "@/components/dashboard/WalletBalance";
import RecentContests from "@/components/dashboard/RecentContests";
import DashboardMenu from "@/components/dashboard/DashboardMenu";
import ProfileBox from "@/components/dashboard/ProfileBox";

const Dashboard = () => {
  return (
    <div className="bg-[#0E0E0E] min-h-screen">
      {/* Fixed Sidebar */}
      <div className="fixed left-3 top-0 bottom-0 z-30 hidden lg:block">
        <Sidebar />
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 z-30 lg:hidden bg-[#1A1919] py-2">
        <div className="flex justify-around items-center px-2">
          <Sidebar isMobile={true} />
        </div>
      </div>

      {/* Fixed Header/Wallet Balance */}
      <div className="fixed top-0 left-0 right-0 z-20 px-3 lg:pl-20">
        <WalletBalance />
      </div>

      {/* Main Content */}
      <div className="pt-20 px-3 lg:pl-24 lg:pr-4 pb-16 lg:pb-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          {/* Left Column - Only visible on large screens */}
          <div className="hidden lg:block lg:col-span-3 relative">
            <div className="sticky top-24 space-y-4">
              <Profile_box />
              <div className="mt-4">
                <Engagementrate />
              </div>
              <div className="mt-4">
                <Partnership />
              </div>
            </div>
          </div>

          {/* Middle Column - Visible on all screen sizes */}
          <div className="col-span-1 lg:col-span-6">
            {/* Home Feed (Create Post) - Fixed */}
            <div className="mb-4 mt-4">
              <Homefeed />
            </div>
            
            {/* Scrollable Posts Area */}
            <div className="space-y-4 overflow-y-auto max-h-[calc(100vh-220px)]" id="scrollable-posts">
              <Post />
              <Post2 />
              {/* Add more posts as needed */}
            </div>
          </div>

          {/* Right Column - Only visible on large screens */}
          <div className="hidden lg:block lg:col-span-3 relative">
            <div className="sticky top-24 space-y-4">
              <Communities />
              <div className="mt-4">
                <RecentContests />
              </div>
              <div className="mt-4">
                <DashboardMenu />
              </div>
            </div>
          </div>
          
          {/* Mobile Components - Now hidden on all screen sizes */}
          <div className="hidden">
            <ProfileBox />
            <Engagementrate />
            <Partnership />
            <Communities />
            <RecentContests />
            <DashboardMenu />
          </div>
        </div>
      </div>

      {/* Custom scrollbar styles */}
      <style jsx>{`
        #scrollable-posts::-webkit-scrollbar {
          width: 6px;
        }
        #scrollable-posts::-webkit-scrollbar-track {
          background: #1a1919;
          border-radius: 10px;
        }
        #scrollable-posts::-webkit-scrollbar-thumb {
          background: #4a4a4a;
          border-radius: 10px;
        }
        #scrollable-posts::-webkit-scrollbar-thumb:hover {
          background: #555;
        }
      `}</style>
    </div>
  );
};

export default Dashboard;