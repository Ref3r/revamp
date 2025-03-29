// 1. Main Dashboard Page
// pages/index.jsx
'use client'

import ProfileBox from '@/components/dashboard/ProfileBox';
import StatsSection from '@/components/public-view-dashboard/StatsSection';
import PartnershipsSection from '@/components/public-view-dashboard/PartnershipsSection';
import ProfileSection from '@/components/public-view-dashboard/ProfileSection';
import ContentHighlights from '@/components/public-view-dashboard/ContentHighlights';
import React from 'react';


export default function Dashboard() {
  return (
    <div className="min-h-screen bg-[#0E0E0E] text-white p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Top Section: Profile, Stats, and Partnerships in one row */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          {/* Profile Section - 4 columns */}
          <ProfileSection />
          
          {/* Stats Section - 4 columns */}
          <StatsSection />
          
          {/* Partnerships Section - 4 columns */}
          <PartnershipsSection />
        </div>
        
        {/* Content Highlights */}
        <ContentHighlights />
      </div>
    </div>
  );
}