import React from "react";
import { Button } from "@lemonsqueezy/wedges";
import Link from "next/link";

const Partnershipsheader = () => {
  return (
    <div className="fixed top-0 left-20 w-[calc(100%-3.5rem)] px-4 z-50 bg-[#0E0E0E] shadow-md">
      <div className="flex flex-wrap justify-between items-center p-4 rounded-lg max-w-screen-xl mx-auto">
        <h1 className="font-bold text-xl sm:text-2xl text-[#FFFFFF]">Partnerships</h1>
        <Button className="rounded-md border-none bg-gradient-to-r from-[#0BA360] to-[#27A980] mt-2 sm:mt-0">
          <Link href="#" className="flex items-center">
            <span className="font-medium text-[#FFFFFF] text-sm sm:text-base px-4 ">
              Partnership Requests
            </span>
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default Partnershipsheader;