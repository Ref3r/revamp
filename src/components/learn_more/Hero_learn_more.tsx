import React from 'react'
import Image from 'next/image'
import { Button } from "@lemonsqueezy/wedges";
import Link from 'next/link';


const Hero_learn_more = () => {
  return (
  <div className="bg-[#0E0E0E] min-h-screen">
  <h1 className="flex justify-center items-center text-[#FFFFFF] font-bold text-4xl sm:text-5xl text-center pt-20 ">
    Who is REF3R for?
  </h1>
  <div className="flex justify-center items-center pt-16">
    <div className="flex flex-wrap justify-center gap-6">
      <div className="bg-[#1A1919] w-full max-w-[432px] h-auto sm:h-[359px] rounded-[20px] p-4 sm:p-6">
        <Image src="/smiley.svg" alt="/" width={120} height={120} className="ml-8 mt-[45px]" />
        <h1 className="font-medium text-[31px] text-[#FFFFFF] ml-8">Creators</h1>
        <p className="text-[#D1D1D1] font-normal text-xl ml-8">
          Share your work, grow your audience, and connect with opportunities—right where the creative community thrives.
        </p>
      </div>
      <div className="bg-[#1A1919] w-full max-w-[432px] h-auto sm:h-[359px] rounded-[20px] p-4 sm:p-6">
        <Image src="/briefcase.svg" alt="/" width={120} height={120} className="ml-8 mt-[45px]" />
        <h1 className="font-medium text-[31px] text-[#FFFFFF] ml-8">Business</h1>
        <p className="text-[#D1D1D1] font-normal text-xl ml-8">
          Connect with diverse communities of creators on a platform designed for seamless collaboration.
        </p>
      </div>
      <div className="bg-[#1A1919] w-full max-w-[432px] h-auto sm:h-[359px] rounded-[20px] p-4 sm:p-6">
        <Image src="/home.svg" alt="/" width={120} height={120} className="ml-8 mt-[45px]" />
        <h1 className="font-medium text-[31px] text-[#FFFFFF] ml-8">Agencies</h1>
        <p className="text-[#D1D1D1] font-normal text-xl ml-8">
          Connect with emerging creative voices and the latest industry trends for a competitive edge.
        </p>
      </div>
    </div>
  </div>
</div>
  )
}

export default Hero_learn_more
