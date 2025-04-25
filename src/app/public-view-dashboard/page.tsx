"use client";

import React from "react";
import ProfileSection from "@/components/public-view-dashboard/ProfileSection";
import StatsSection from "@/components/public-view-dashboard/StatsSection";
import PartnershipsSection from "@/components/public-view-dashboard/PartnershipsSection";
import ContentHighlights from "@/components/public-view-dashboard/ContentHighlights";

export default function Dashboard() {
  return (
    <div className="h-screen bg-[#0E0E0E] text-white p-4 flex flex-col overflow-hidden">
      <div className="max-w-7xl mx-auto w-full h-full flex flex-col">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 h-1/3 mb-4">
          <div className="lg:col-span-4 h-full overflow-hidden">
            <ProfileSection />
          </div>
          <div className="lg:col-span-4 h-full overflow-hidden">
            <StatsSection />
          </div>

          <div className="lg:col-span-4 h-full overflow-hidden">
            <PartnershipsSection />
          </div>
        </div>

        <div className="flex-1 overflow-hidden">
          <ContentHighlights />
        </div>
      </div>
    </div>
  );
}
