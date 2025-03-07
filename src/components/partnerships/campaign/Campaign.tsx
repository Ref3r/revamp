import React from "react";
import { Search } from "lucide-react";
import Image from "next/image";
import { Button } from "@lemonsqueezy/wedges";
import Link from "next/link";

const Campaign = () => {
  return (
    <div className="absolute top-[500px] left-24 flex flex-col ">
      <div className="w-96 pb-14">
        <form action="#">
          <div className="flex items-center gap-2 bg-transparent border border-[#FFFFFF3D] px-3 py-2 rounded-md">
            <Search className="w-5 h-5 text-[#FFFFFF7A]" />
            <input
              type="search"
              placeholder="Search for brands, Collab Type, etc."
              className="bg-transparent text-[#FFFFFF5A] outline-none focus:ring-0 placeholder:text-[#FFFFFF7A] w-72"
            />
          </div>
        </form>
          </div>
          {/* here is where the campaign details will be displayed */}
          <div className="flex justify-between items-center rounded-md bg-[#1A191933] my-3">
          <div className="flex justify-center items-center py-2">
              <div className="pr-9">
                  <Image width={48} height={48} src="campaign1.svg" alt="/" />
              </div>
              <div className="flex flex-col">
                  <h1 className="text-[#FFFFFF] font-medium text-base">Random Brand</h1>
                  <p className="text-[#FFFFFF7A] font-medium text-base">We live and breathe collaborations!</p>
              </div>
              <div className="px-12">
                  <h1 className="font-medium text-base bg-gradient-to-r from-[#0BA360] to-[#27A980] text-transparent bg-clip-text">Active</h1>
              </div>
              <div>
                  <h1 className="font-medium text-[#FFFFFF7A] text-base">$12,000</h1>
              </div>
              <div className="px-12">
                  <h1 className="font-medium text-[#FFFFFF7A] text-base">Affiliate</h1>
              </div>
              <div>
                  <h1 className="font-medium text-[#FFFFFF7A] text-base">Deadline:  23rd Jan, 2025</h1>
              </div>
              </div>
              <div className="pl-64">
                  <Button className="bg-[#FFFFFF]">
                      <Link href="#">
                         <span className="text-[#000000] px-4">View Campaign</span> 
                      </Link>
                  </Button>
              </div>
              </div>
          <div className="flex justify-between items-center rounded-md bg-[#1A191933]">
          <div className="flex justify-center items-center py-2">
              <div className="pr-9">
                  <Image width={48} height={48} src="campaign2.svg" alt="/" />
              </div>
              <div className="flex flex-col">
                  <h1 className="text-[#FFFFFF] font-medium text-base">Random Brand</h1>
                  <p className="text-[#FFFFFF7A] font-medium text-base">We live and breathe collaborations!</p>
              </div>
              <div className="px-12">
                  <h1 className="font-medium text-base bg-gradient-to-r from-[#0BA360] to-[#27A980] text-transparent bg-clip-text">Active</h1>
              </div>
              <div>
                  <h1 className="font-medium text-[#FFFFFF7A] text-base">$12,000</h1>
              </div>
              <div className="px-12">
                  <h1 className="font-medium text-[#FFFFFF7A] text-base">Sponsorship</h1>
              </div>
              <div>
                  <h1 className="font-medium text-[#FFFFFF7A] text-base">Deadline:  23rd Jan, 2025</h1>
              </div>
              </div>
              <div className="pl-64">
                  <Button className="bg-[#FFFFFF]">
                      <Link href="#">
                         <span className="text-[#000000] px-4">View Campaign</span> 
                      </Link>
                  </Button>
              </div>
              </div>
          <div className="flex justify-between items-center rounded-md bg-[#1A191933] my-3">
          <div className="flex justify-center items-center py-2">
              <div className="pr-9">
                  <Image width={48} height={48} src="campaign3.svg" alt="/" />
              </div>
              <div className="flex flex-col">
                  <h1 className="text-[#FFFFFF] font-medium text-base">Random Brand</h1>
                  <p className="text-[#FFFFFF7A] font-medium text-base">We live and breathe collaborations!</p>
              </div>
              <div className="px-12">
                  <h1 className="font-medium text-base bg-gradient-to-r from-[#0BA360] to-[#27A980] text-transparent bg-clip-text">Active</h1>
              </div>
              <div>
                  <h1 className="font-medium text-[#FFFFFF7A] text-base">$12,000</h1>
              </div>
              <div className="px-12">
                  <h1 className="font-medium text-[#FFFFFF7A] text-base">Referral</h1>
              </div>
              <div>
                  <h1 className="font-medium text-[#FFFFFF7A] text-base">Deadline:  23rd Jan, 2025</h1>
              </div>
              </div>
              <div className="pl-64">
                  <Button className="bg-[#FFFFFF]">
                      <Link href="#">
                         <span className="text-[#000000] px-4">View Campaign</span> 
                      </Link>
                  </Button>
              </div>
              </div>
          <div className="flex justify-between items-center rounded-md bg-[#1A191933]">
          <div className="flex justify-center items-center py-2">
              <div className="pr-9">
                  <Image width={48} height={48} src="campaign4.svg" alt="/" />
              </div>
              <div className="flex flex-col">
                  <h1 className="text-[#FFFFFF] font-medium text-base">Random Brand</h1>
                  <p className="text-[#FFFFFF7A] font-medium text-base">We live and breathe collaborations!</p>
              </div>
              <div className="px-12">
                  <h1 className="font-medium text-base bg-gradient-to-r text-[#007AFF] text-transparent bg-clip-text">Finished</h1>
              </div>
              <div>
                  <h1 className="font-medium text-[#FFFFFF7A] text-base">$12,000</h1>
              </div>
              <div className="px-12">
                  <h1 className="font-medium text-[#FFFFFF7A] text-base">Affiliate</h1>
              </div>
              <div>
                  <h1 className="font-medium text-[#FFFFFF7A] text-base">Deadline:  23rd Jan, 2025</h1>
              </div>
              </div>
              <div className="pl-64">
                  <Button className="bg-[#FFFFFF]">
                      <Link href="#">
                         <span className="text-[#000000] px-4">View Campaign</span> 
                      </Link>
                  </Button>
              </div>
              </div>
          <div className="flex justify-between items-center rounded-md bg-[#1A191933] my-3">
          <div className="flex justify-center items-center py-2">
              <div className="pr-9">
                  <Image width={48} height={48} src="campaign5.svg" alt="/" />
              </div>
              <div className="flex flex-col">
                  <h1 className="text-[#FFFFFF] font-medium text-base">Random Brand</h1>
                  <p className="text-[#FFFFFF7A] font-medium text-base">We live and breathe collaborations!</p>
              </div>
              <div className="px-12">
                  <h1 className="font-medium text-base bg-gradient-to-r text-red-500 text-transparent bg-clip-text">Cancelled</h1>
              </div>
              <div>
                  <h1 className="font-medium text-[#FFFFFF7A] text-base">$12,000</h1>
              </div>
              <div className="px-12">
                  <h1 className="font-medium text-[#FFFFFF7A] text-base">Sponsorship</h1>
              </div>
              <div>
                  <h1 className="font-medium text-[#FFFFFF7A] text-base">Deadline:  23rd Jan, 2025</h1>
              </div>
              </div>
              <div className="pl-64">
                  <Button className="bg-[#FFFFFF]">
                      <Link href="#">
                         <span className="text-[#000000] px-4">View Campaign</span> 
                      </Link>
                  </Button>
              </div>
              </div>
    </div>
  );
};

export default Campaign;
