"use client";

import SocialConnect from "@/components/ProfileCreation/SocialConnect/SocilaConnect";

export default function ConnectSocials() {
  return (
    <div className="min-h-screen bg-[#0E0E0E] flex flex-col">
      <div className="w-full max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-white text-center mb-6">Connect Your Social Accounts</h1>
        <SocialConnect onConnect={() => {}} />
      </div>
    </div>
  );
}
