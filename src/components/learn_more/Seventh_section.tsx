import React from 'react'
import Link from 'next/link'
import { Button } from '@lemonsqueezy/wedges'
import Image from 'next/image'

const Seventh_section = () => {
  return (
    <div className="bg-[#0E0E0E] px-5 sm:px-10 flex justify-center items-center py-10">
  <div className="bg-[#242323] max-w-[90%] sm:w-[1280px] rounded-[30px] px-5 sm:px-10 pt-10 pb-16 flex flex-col">
    {/* Heading Section */}
    <div className="flex flex-col items-center text-center">
      <h1 className="font-bold text-white text-3xl sm:text-5xl pt-3">
        Subscribe to the Newsletter
      </h1>
      <p className="font-normal text-[#D1D1D1] text-lg sm:text-xl pt-2">
        For occasional updates, news, and events
      </p>
    </div>

    {/* Input and Button Section */}
    <div className="flex flex-wrap justify-center items-center pt-8">
      {/* Input Field with Button */}
      <div className="relative w-full sm:w-[500px] ml-24">
        <input type="text" placeholder="Enter your email" className="rounded-full bg-[#3D3D3D] focus:outline-none text-white py-6 px-10 w-full pr-[170px]" />
        <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white text-black font-medium text-base sm:text-lg rounded-full py-4 px-7 sm:px-7 hover:bg-opacity-80">Subscribe</button>
      </div>

      {/* Image */}
      <div className="mt-5 sm:mt-0 sm:ml-3">
        <img src="/doodle3.svg" width={120} height={55} alt="Doodle"/>
      </div>
    </div>
  </div>
</div>
  )
}

export default Seventh_section
