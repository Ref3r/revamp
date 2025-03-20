'use client'
import React from "react";
import { Button } from "@lemonsqueezy/wedges";
import { useRouter } from "next/navigation";

const PartnershipsHeader = () => {
  const router = useRouter();
  return (
    <div className="flex justify-between items-center p-4">
      <h1 className="font-bold text-xl text-white">Partnerships</h1>
      <Button className="bg-gradient-to-r from-[#00A86B] to-[#008f5b] hover:from-[#008f5b] hover:to-[#00A86B]  border-none rounded-md"
       onClick={() => router.push('/partnership-requests')}
      >
          <span className="text-white px-4 font-medium">
            Partnership Requests
          </span>
      </Button>
    </div>
  );
};

export default PartnershipsHeader;