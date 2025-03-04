'use client'
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@lemonsqueezy/wedges'

const Homefeed = () => {
  return (
    <div className='w-full'>
      <div className='bg-[#1A1919] rounded-[20px] p-4'>
        <div className='mb-4'>
          <h1 className='font-medium text-lg text-[#FFFFFF7A]'>Home Feed</h1>
        </div>
        <div className='relative'>
          <textarea 
            placeholder='Create a new cool post..' 
            className='focus:outline-none w-full h-20 bg-[#282828] text-white placeholder-white placeholder:font-normal placeholder:text-sm rounded-[20px] p-4 resize-none'
          ></textarea>
          <div className='absolute bottom-3 left-4 flex space-x-2'>
            <Button className='bg-[#282828] hover:bg-[#383838] p-1'>
              <Image src="/add-photos.svg" width={20} height={20} alt='Add photos' />
            </Button>
            <Button className='bg-[#282828] hover:bg-[#383838] p-1'>
              <Image src="/mic.svg" width={20} height={20} alt='Voice recording' />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Homefeed