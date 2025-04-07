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
    <div className="lg:col-span-4 bg-[#1A191999] rounded-xl p-4">
      <div className="text-sm text-gray-300 mb-3">Recent Partnerships</div>
      <PartnershipCarousel partners={partners} />
    </div>
  );
}
