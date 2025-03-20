'use client'
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

const Partnership = () => {
  return (
    <div className='w-full'>
      <div className='bg-[#1A1919] rounded-[20px] p-3 sm:p-4'>
        <div>
          <h1 className='text-[#FFFFFF7A] font-medium text-base sm:text-lg mb-3 sm:mb-4'>Recent Partnerships</h1>   
        </div> 
        <div className='flex flex-col gap-4 sm:gap-6'>
          <div className='flex justify-between items-center'>
            <div className='flex items-center'>
              <Image 
                src="/volkswagen.svg" 
                width={32} 
                height={32} 
                alt='Volkswagen'
                className='w-8 h-8'
              />
              <p className='text-white font-medium text-xs sm:text-sm ml-3 sm:ml-4'>
                Volkswagen
              </p>
            </div>    
            <div>
              <p className='font-medium text-[10px] sm:text-xs text-[#0BA360]'>Active</p>
            </div>       
          </div>
          
          <div className='flex justify-between items-center'>
            <div className='flex items-center'>
              <Image 
                src="/mcdonalds.svg" 
                width={32} 
                height={32} 
                alt='McDonalds'
                className='w-8 h-8'
              />
              <p className='text-white font-medium text-xs sm:text-sm ml-3 sm:ml-4'>
                McDonalds
              </p>
            </div>    
            <div>
              <p className='font-medium text-[10px] sm:text-xs text-[#FFFFFF7A]'>Completed</p>
            </div>       
          </div>
          
          <div className='flex justify-between items-center'>
            <div className='flex items-center'>
              <Image 
                src="/tesla.svg" 
                width={32} 
                height={32} 
                alt='Tesla'
                className='w-8 h-8'
              />
              <p className='text-white font-medium text-xs sm:text-sm ml-3 sm:ml-4'>
                Tesla
              </p>
            </div>    
            <div>
              <p className='font-medium text-[10px] sm:text-xs text-[#0BA360]'>Active</p>
            </div>       
          </div>  
        </div>  
      </div>
    </div>
  )
}

export default Partnership