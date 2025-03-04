'use client'
import React from 'react'
import { ChevronUp } from 'lucide-react';

const Engagementrate = () => {
  return (
    <div className='w-full'>
      <div className='bg-[#1A1919] rounded-[20px] p-4'>
        {/* First row */}
        <div className='flex flex-col md:flex-row md:justify-between md:items-center mb-3'>
          <div className='mb-1 md:mb-0'>
            <h1 className='font-medium text-sm text-[#FFFFFF7A]'>
              Total Aggregated
              <span className="md:hidden"> </span>
              <span className="hidden md:inline lg:hidden xl:inline"> </span>
              <br className="hidden md:inline lg:inline xl:hidden" />
              Followers
            </h1>
          </div>
          <div className='flex items-center'>
            <p className='font-medium text-xl text-white mr-2'>4645</p>
            <div className='flex items-center'>
              <ChevronUp className='h-3 w-3 text-[#0BA360]'/>
              <span className='text-xs font-medium text-[#0BA360]'>+18%</span>
            </div>
          </div> 
        </div>
        
        {/* Second row */}
        <div className='flex flex-col md:flex-row md:justify-between md:items-center'>
          <div className='mb-1 md:mb-0'>
            <h1 className='font-medium text-sm text-[#FFFFFF7A]'>Engagement Rate</h1>
          </div>
          <div className='flex items-center'>
            <p className='font-medium text-xl text-white mr-2'>4.5%</p>
            <div className='flex items-center'>
              <ChevronUp className='h-3 w-3 text-[#FF3B30] transform rotate-180'/>
              <span className='text-xs font-medium text-[#FF3B30]'>-9%</span>
            </div>
          </div> 
        </div>     
      </div>
    </div>
  )
}

export default Engagementrate