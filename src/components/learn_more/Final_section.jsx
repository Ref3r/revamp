import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@lemonsqueezy/wedges'

const Final_section = () => {
  return (
    <div className=' bg-[#0E0E0E] px-28 py-20 '>
      <div className='flex justify-between items-center'>
        <div className='flex flex-col mt-20'>
          <Image src="/logo.svg" width={100} height={100} alt='#' />
          <p className='font-normal text-[#FFFFFF] text-sm'>Elevate your creator journey with Refer</p>
          <div className='flex justify-center items-center'>
            <Button className='pr-3'><Link href="#"><Image src="/GitHub.svg" width={40} height={40} alt='#'/></Link></Button>
            <Button><Link href="#"><Image src="/Discord.svg" width={40} height={40} alt='#'/></Link></Button>
            <Button className='px-3'><Link href="#"><Image src="/Linkedin.svg" width={40} height={40} alt='#'/></Link></Button>
            <Button><Link href="#"><Image src="/Twitter_icon.svg" width={40} height={40} alt='#'/></Link></Button>
            <Button className='px-3'><Link href="#"><Image src="/Facebook.svg" width={40} height={40} alt='#'/></Link></Button>
          </div>
        </div>

        <div className='flex justify-between '>
          <div className='flex flex-col text-[#FFFFFF] pr-24'>
            <h1 className=' font-bold text-base py-3'><Link href="#">Resources</Link></h1>
            <p><Link href="#" className=' font-normal text-base'>Blog</Link></p>
            <p><Link href="#" className=' font-normal text-base'>Whitepaper</Link></p>
            <p><Link href="#" className=' font-normal text-base'>Channels</Link></p>
            <p><Link href="#" className=' font-normal text-base'>Roadmap</Link></p>
            <p><Link href="#" className=' font-normal text-base'>Discord</Link></p>
            <p><Link href="#" className=' font-normal text-base'>Affiliate</Link></p>
          </div>
          <div className='flex flex-col text-[#FFFFFF]'>
            <h1 className=' font-bold text-base py-3'><Link href="#">Legal</Link></h1>
            <p><Link href="#" className=' font-normal text-base'>Terms of service</Link></p>
            <p><Link href="#" className=' font-normal text-base'>Privacy Policy</Link></p>
            
          </div>
        </div>
      </div>
      <hr className='text-[#FFFFFF] opacity-10 my-8' />
      <div className='flex justify-between items-center'>
        <p className='text-[#D1D1D1] font-normal text-sm'>© Refer, 2024. All rights reserved.</p>
        <Button className="rounded-full border-none bg-[#FFFFFF] w-[160px] md:w-[217px] h-[45px] md:h-[57px] mt-4 md:mt-6 flex justify-center">
        <Link href="#" className='flex items-center gap-2'>
            <Image src="/discord_support.svg" width={30} height={30} alt='#' />
          <span className='text-black font-medium text-base pl-2'>Discord Support</span>
        </Link></Button>
      </div>
    </div>
  )
}

export default Final_section
