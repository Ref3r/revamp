import React from 'react'
import Link from 'next/link'
import { Button, Input } from '@lemonsqueezy/wedges'
import Image from 'next/image'

const Seventh_section = () => {
  return (
    <div className="bg-[#0E0E0E] px-4 sm:px-6 md:px-8 lg:px-12 py-8 sm:py-12 md:py-16">
      <div className="bg-[#242323] w-full max-w-[1540px] mx-auto rounded-2xl sm:rounded-[30px] px-4 sm:px-6 md:px-8 lg:px-12 py-8 sm:py-12">
        <div className="text-center max-w-2xl mx-auto">
          <h1 className="font-bold text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
            Subscribe to the Newsletter
          </h1>
          <p className="font-normal text-[#D1D1D1] text-base sm:text-lg md:text-xl mt-2 sm:mt-3">
            For occasional updates, news, and events
          </p>
        </div>

 
        <div className="mt-8 sm:mt-10 md:mt-12 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
          <div className="w-full max-w-lg relative">
            <Input 
              type="email" 
              placeholder="Enter your email" 
              className="w-full rounded-full bg-[#3D3D3D] text-white py-3 sm:py-4 md:py-5 px-4 sm:px-6 
                        focus:outline-none focus:ring-2 focus:ring-white/20
                        text-base sm:text-lg"
            />
            <Button className="absolute right-2 top-1/2 transform -translate-y-1/2 
                             bg-white text-black font-medium text-sm sm:text-base 
                             rounded-full py-2 sm:py-3 px-4 sm:px-6
                             hover:bg-gray-100 transition-colors
                             whitespace-nowrap">
              Subscribe
            </Button>
          </div>

          {/* Doodle Image */}
          <div className="flex-shrink-0">
            <Image 
              src="/doodle3.svg" 
              width={120} 
              height={55} 
              alt="Decorative doodle"
              className="w-24 sm:w-28 md:w-32 h-auto"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Seventh_section