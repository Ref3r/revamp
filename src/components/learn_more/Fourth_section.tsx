import React from 'react'
import { Button } from '@lemonsqueezy/wedges'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronsRight } from 'lucide-react'

const Fourth_section = () => {
  return (
      <div className='flex justify-center items-center bg-[#0E0E0E] px-6 md:px-[41px] py-10 md:py-[90px] '>
  <div className='flex flex-col md:flex-row justify-between items-center bg-gradient-to-r from-[#0BA360] to-[#27A980] w-full max-w-[1320px] min-h-[246px] rounded-3xl mx-14 md:px-[60px] py-6 md:py-0 gap-6'>
    <div className='text-center md:text-left'>
      <h1 className='font-bold text-3xl md:text-5xl text-[#FFFFFF]'>
        Ready to get started?
      </h1>
      <p className='font-normal text-[#FFFFFF] text-lg md:text-xl mt-2'>
        Elevate your creator presence and achieve new heights<br className='hidden md:block' />
        of efficiency and effectiveness with Refer.
      </p>
    </div>
    <div className='flex flex-col md:flex-row justify-center items-center gap-4'>
      <Image src="/doodle2.svg" width={115} height={126} alt='/' className="w-[80px] md:w-[115px] h-auto"/>
      <Button className="rounded-full border-none bg-[#FFFFFF] w-[160px] md:w-[217px] h-[45px] md:h-[57px] mt-4 md:mt-6 flex justify-center">
        <Link href="#" className='flex items-center gap-2'>
          <span className='text-black'>Start for Free!</span>
          <ChevronsRight className="w-5 md:w-6 h-5 md:h-6 text-black" />
        </Link>
      </Button>
    </div>
  </div>
</div>
  )
}

export default Fourth_section
