import React from 'react'
import Image from 'next/image'
import { Button } from "@lemonsqueezy/wedges";
import Link from 'next/link';


const Hero_learn_more = () => {
  return (
      <div className='bg-[#0E0E0E] h-screen'>
          
        {/* first section */}

              <h1 className='flex justify-center items-center text-[#FFFFFF] font-bold text-5xl'>Who is REF3R for?</h1>
              <div className="flex justify-center items-center min-h-screen">
                <div className="flex flex-wrap justify-center gap-6">
                      <div className="bg-[#1A1919] w-[432px] h-[359px] rounded-[20px]">
                          <Image src="/smiley.svg" alt='/' width={120} height={120} className='ml-8 mt-[45px]' />
                          <h1 className='font-medium text-[31px] text-[#FFFFFF] ml-8'>Creators</h1>
                          <p className='text-[#D1D1D1] font-normal text-xl ml-8'>Share your work, grow your audience, and connect with opportunities—right where the creative community thrives.</p>
                </div>
                      <div className="bg-[#1A1919] w-[432px] h-[359px] ml-8 rounded-[20px]">
                          <Image src="/briefcase.svg" alt='/' width={120} height={120} className='ml-8 mt-[45px]' />
                          <h1 className='font-medium text-[31px] text-[#FFFFFF] ml-8'>Business</h1>
                          <p className='text-[#D1D1D1] font-normal text-xl ml-8'>Connect with diverse communities of creators on a platform designed for seamless collaboration.</p>
                </div>
                      <div className="bg-[#1A1919] w-[432px] h-[359px] ml-8 rounded-[20px]">
                          <Image src="/home.svg" alt='/' width={120} height={120} className='ml-8 mt-[45px]' />
                          <h1 className='font-medium text-[31px] text-[#FFFFFF] ml-8'>Agencies</h1>
                          <p className='text-[#D1D1D1] font-normal text-xl ml-8'>Connect with emerging creative voices and the latest industry trends for a competitive edge.</p>
                </div>
               </div>
              </div>
    </div>
  )
}

export default Hero_learn_more
