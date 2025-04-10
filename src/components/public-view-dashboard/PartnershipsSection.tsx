"use client";

import React from "react";
import PartnershipCarousel from "./PartnershipCarousel";

export default function PartnershipsSection() {
  const partners = [
    { name: "McDonalds", logoSrc: "/mcd logo 1.svg" },
    { name: "Nike", logoSrc: "/nike-logo.svg" },
    { name: "Apple", logoSrc: "/apple-logo.svg" },
    { name: "Spotify", logoSrc: "/spotify-logo.svg" },
  ];

  return (
    <div className="h-full bg-[#1A191999] rounded-xl p-3 flex flex-col">
      <div className="text-sm text-gray-300 mb-2">Recent Partnerships</div>
      <div className="flex-1 flex items-center">
        <PartnershipCarousel partners={partners} />
      </div>
    </div>
  );
}