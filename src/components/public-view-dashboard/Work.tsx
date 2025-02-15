import React from 'react'
import Image from 'next/image'
import { Button } from '@lemonsqueezy/wedges'
import Link from 'next/link'
const Work = () => {
  return (
    <div className='bg-[#1A1919]  absolute top-4 left-[700px] h-[525px] w-[580px] rounded-[20px] flex flex-col px-8 py-3'>
        <div>
            <h1 className='font-medium text-base text-[#FFFFFF7A] '>Work</h1>  
          </div>
          
          {/* placement needs to be done */}

          <div className='flex flex-col'>
              <div className='flex items-center'>
                  <Link href="#" className=' absolute top-16 left-8'><Image src="/work1.svg" width={160} height={200} alt='#' /></Link>
                  <Link href="#" className=' absolute top-16 left-52'><Image src="/work2.svg" width={160} height={200} alt='#' /></Link>
                  <Link href="#" className='absolute top-16 left-96'><Image src="/work3.svg" width={160} height={200} alt='#' className='' /></Link>
              </div>
              <div className='flex  items-center'>
                  <Link href="#" className='absolute top-48 left-8'><Image src="/work4.svg" width={160} height={200} alt='#' /></Link>
                  <Link href="#" className='absolute top-64 left-52  '><Image src="/work5.svg" width={300} height={100} alt='#' className='w-[340px]' /></Link>
              </div>
              <div className='flex  items-center'>
                  <Link href="#" className=' absolute top-96 left-8'><Image src="/work6.svg" width={240} height={120} alt='#' /></Link>
                  <Link href="#" className=' absolute top-96 left-[285px] w-96'><Image src="/work7.svg" width={240} height={120} alt='#' className=' w-[260px]' /></Link>
              </div>
          </div>
    </div>
  )
}

export default Work
