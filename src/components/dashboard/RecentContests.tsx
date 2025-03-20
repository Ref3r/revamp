'use client'
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@lemonsqueezy/wedges'

const RecentContests = () => {
  return (
    <div className='w-full'>
      <div className='bg-[#1A1919] rounded-[20px] p-3 sm:p-4'>
        <div className='flex justify-between items-center mb-3 sm:mb-4'>
          <h1 className='text-[#FFFFFF7A] font-medium text-base sm:text-lg'>Recent Contests</h1> 
          <Link href="#" className='text-white font-medium text-xs sm:text-sm'>View Contest</Link> 
        </div> 
        <div className='flex flex-col gap-4 sm:gap-6'>
          <div className='flex justify-between items-center'>
            <div className='flex items-center'>
              <Image 
                src="/creator1.svg" 
                width={32} 
                height={32} 
                alt='Creator 1'
                className='w-8 h-8'
              />
              <div className='ml-3 sm:ml-4'>
                <h2 className='font-medium text-xs sm:text-sm text-white'>Creator 1</h2>
                <p className='font-medium text-xs sm:text-sm text-[#FFFFFF7A]'>Creator short bio</p>
              </div>
            </div>    
            <div>
              <Button className='bg-white h-6 sm:h-7 px-3 sm:px-4'>
                <span className='text-black font-medium text-xs sm:text-sm'>vote</span>
              </Button>
            </div>       
          </div> 
          
          <div className='flex justify-between items-center'>
            <div className='flex items-center'>
              <Image 
                src="/creator2.svg" 
                width={32} 
                height={32} 
                alt='Creator 1'
                className='w-8 h-8'
              />
              <div className='ml-3 sm:ml-4'>
                <h2 className='font-medium text-xs sm:text-sm text-white'>Creator 1</h2>
                <p className='font-medium text-xs sm:text-sm text-[#FFFFFF7A]'>Creator short bio</p>
              </div>
            </div>    
            <div>
              <Button className='bg-white h-6 sm:h-7 px-3 sm:px-4'>
                <span className='text-black font-medium text-xs sm:text-sm'>vote</span>
              </Button>
            </div>       
          </div> 
          
          <div className='flex justify-between items-center'>
            <div className='flex items-center'>
              <Image 
                src="/creator3.svg" 
                width={32} 
                height={32} 
                alt='Creator 1'
                className='w-8 h-8'
              />
              <div className='ml-3 sm:ml-4'>
                <h2 className='font-medium text-xs sm:text-sm text-white'>Creator 1</h2>
                <p className='font-medium text-xs sm:text-sm text-[#FFFFFF7A]'>Creator short bio</p>
              </div>
            </div>    
            <div>
              <Button className='bg-white h-6 sm:h-7 px-3 sm:px-4'>
                <span className='text-black font-medium text-xs sm:text-sm'>vote</span>
              </Button>
            </div>       
          </div> 
        </div>  
      </div>
    </div>
  )
}

export default RecentContests