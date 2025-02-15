import React from 'react'
import { ChevronUp, ChevronDown } from 'lucide-react';

const Engagementrate = () => {
  return (
    <div className='bg-[#0E0E0E]  absolute top-60 left-[105px]'>
    <div className='flex flex-col bg-[#1A1919] h-[120px] w-[345px] rounded-[20px] px-4 py-6'>
            <div className='flex justify-between items-center'>
                <h1 className='font-medium text-sm text-[#FFFFFF]'>Total Aggregated Followers</h1>
                  <div className='flex  justify-center items-center'>
                      <div>
                          <p className='font-medium text-[20px] text-[#FFFFFF] px-2'>4645</p>
                      </div>
                      <div className='flex items-center'>
                          <ChevronUp className='h-3 w-3 text-[#0BA360]'/>
                          <span className='text-[12px] font-medium text-[#0BA360] '>+18%</span>
                      </div>
                  </div> 
            </div>      
        <div className='flex justify-between items-center py-4'>
                <h1 className='font-medium text-sm text-[#FFFFFF]'>Engagement Rate</h1>
                  <div className='flex  justify-center items-center'>
                      <div>
                          <p className='font-medium text-[20px] text-[#FFFFFF] px-4'>4.5%</p>
                      </div>
                      <div className='flex items-center'>
                          <ChevronUp className='h-3 w-3 text-[#FF3B30]'/>
                          <span className='text-[12px] font-medium text-[#FF3B30] '>-9%</span>
                      </div>
                  </div> 
            </div>     
    </div>
    </div>
  )
}

export default Engagementrate
