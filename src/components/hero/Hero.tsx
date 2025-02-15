import React from 'react'
import Image from 'next/image'
import { Button } from "@lemonsqueezy/wedges";
import Link from 'next/link';
import { ChevronsRight } from "lucide-react";
const Hero = () => {
  return (
    <div>
    <section className="content bg-[#0E0E0E] flex flex-col md:flex-row justify-between items-center pt-[34px] ">
      {/* Left Side - Text Content */}
      <div className="text-white text-center md:text-left ">
        <Image
          src="/doodle1.svg"
          alt="/"
          width={58}
          height={50.7}
          className="mx-auto md:ml-[650px]"
        />
        <h1 className="font-extrabold text-[36px] md:text-[64px] leading-tight mt-4 md:ml-[77px]">
          Elevate your Creator<br/> Journey
        </h1>
        <p className="text-[16px] md:text-[21px] font-normal text-[#D1D1D1] mt-4 md:ml-[77px]">
          Your all-in-one destination to showcase your work, grow your network, and<br/> discover game-changing opportunities.
        </p>
        {/* <Button className="rounded-full border-none bg-gradient-to-r from-[#0BA360] to-[#27A980] w-[180px] md:w-[217px] h-[50px] md:h-[57px] mt-6 md:ml-[77px]  flex justify-center mx-auto">
            <Link href="#" className='flex items-center gap-2'>
              <span>Start for Free!</span>
              <ChevronsRight className="w-6 h-6 text-[#D1D1D1]" />
            </Link>
          </Button> */}
        <Image
          src="/Vector.svg"
          alt="Doddle"
          width={280}
          height={180}
          className=" md:ml-0 mt-6 md:mt-3"
        />
      </div>

      {/* Right Side - Dashboard Image */}
      <div className="mt-10 md:mt-0">
        <Image
          src="/Dashboard.svg"
          alt="/"
          width={500}
          height={550}
          className="w-full max-w-[550px] mx-auto"
        />
      </div>
    </section>
    </div>
  )
}

export default Hero
