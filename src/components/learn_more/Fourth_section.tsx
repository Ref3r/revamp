import React from 'react'
import { Button } from '@lemonsqueezy/wedges'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronsRight } from 'lucide-react'
import JoinWaitlistButton from '../join-waitlist/JoinWaitlistButton'

const Fourth_section = () => {
  return (
    <div className='flex justify-center items-center bg-[#0E0E0E] px-4 sm:px-6 lg:px-8 py-8 sm:py-10 lg:py-20'>
      <div className='flex flex-col md:flex-row justify-between items-center bg-gradient-to-r from-[#0BA360] to-[#27A980] w-full max-w-[1410px] rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 lg:p-16 gap-6 md:gap-8'>
        

        <div className='text-center md:text-left max-w-xl'>
          <h1 className='font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white'>
            Become a pioneer
          </h1>
          <p className='font-normal text-white text-base sm:text-lg md:text-xl mt-2 sm:mt-3 md:mt-4'>
            Elevate your creator presence and achieve new heights
            <br className='hidden md:block' />
            of efficiency and effectiveness with Refer.
          </p>
        </div>

    
        <div className='flex flex-col md:flex-row items-center gap-4 md:gap-6'>
          <Image 
            src="/doodle2.svg" 
            width={115} 
            height={126} 
            alt='Decorative doodle'
            className="w-16 sm:w-20 md:w-24 lg:w-28 h-auto"
          />
          {/* <Button className="rounded-full border-none bg-white w-40 sm:w-48 md:w-52 lg:w-56 h-12 sm:h-14 md:h-16 flex justify-center items-center hover:bg-gray-100 transition-colors">
            <Link href="#" className='flex items-center gap-2 px-4'>
              <span className='text-black text-sm sm:text-base md:text-lg'>Start for free!</span>
              <ChevronsRight className="w-4 sm:w-5 md:w-6 h-4 sm:h-5 md:h-6 text-black" />
            </Link>
          </Button> */}
          <div className="scale-150 px-7">
            <JoinWaitlistButton/>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Fourth_section