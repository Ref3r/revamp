import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@lemonsqueezy/wedges'

const Homefeed = () => {
    return (
<div className=' bg-[#0E0E0E] absolute top-24 left-[460px]'>
    <div className='bg-[#1A1919] h-[160px] w-[630px] rounded-[20px] px-9 pt-4   '>
          <div className='flex flex-col'>
              <div>
                  <h1 className='font-medium text-lg text-[#FFFFFF7A] pb-4' >Home Feed</h1>
              </div>
              <div className=''>
                  <input type="text" placeholder='Create a new cool post..' className='focus:outline-none w-[570px] h-[80px] bg-[#282828] text-[#FFFFFF] placeholder:text-[#FFFFFF] placeholder:font-normal placeholder:text-sm rounded-[20px] px-4 pb-10' />
                  <div className='flex absolute top-[100px] left-14 '>
                    <Button className='bg-[#282828]'><Link href="#"><Image src="/add-photos.svg" width={20} height={20} alt='#' /></Link></Button>
                    <Button className='bg-[#282828]'><Link href="#"><Image src="/mic.svg" width={20} height={20} alt='#'className='ml-4'/></Link></Button>
                  </div>    
              </div>
      </div>
    </div>
</div>
  )
}

export default Homefeed
