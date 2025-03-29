"use client";

import React from "react";
import ProfileBox from "@/components/dashboard/ProfileBox";

export default function ProfileSection() {
  return (
    <div className="lg:col-span-4 bg-[#1A1919CC] rounded-xl">
      <ProfileBox isPublicView={true} />
    </div>
  );
}
