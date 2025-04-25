"use client";

import React from "react";
import ProfileBox from "@/components/dashboard/ProfileBox";

export default function ProfileSection() {
  return (
    <div className="h-full bg-[#1A1919CC] rounded-xl overflow-hidden">
      <ProfileBox isPublicView={true} />
    </div>
  );
}