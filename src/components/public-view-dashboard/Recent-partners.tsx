import React from 'react'
import Image from 'next/image'

const Recentpartners = () => {
  return (
    <div className='bg-[#0E0E0E]  absolute top-[550px] left-[700px]'>
          <div className='bg-[#1A1919] h-full w-[270px] rounded-[20px] px-4  flex flex-col'>
                <div>
                   <h1 className='text-[#FFFFFF7A] font-medium text-base py-3'>Recent Partnerships</h1>   
                </div> 
                <div className='flex flex-col pt-2'>
                    <div className='flex justify-between items-center pb-4'>
                          <div className='flex items-center'>
                              <div>
                                  <Image src="/volkswagen.svg" width={32} height={32} alt='#'/>
                              </div>
                              <div className='text-[#FFFFFF] font-medium text-sm px-6'>
                                <p>Volkswagen</p>
                              </div>
                          </div>    
                          <div>
                              <p className='font-medium text-[12px] text-[#0BA360] '>Active</p>
                          </div>       
                      </div>
                    <div className='flex justify-between items-center pb-4'>
                          <div className='flex items-center'>
                              <div>
                                  <Image src="/mcdonalds.svg" width={32} height={32} alt='#'/>
                              </div>
                              <div className='text-[#FFFFFF] font-medium text-sm px-6'>
                                <p>McDonalds</p>
                              </div>
                          </div>    
                          <div>
                              <p className='font-medium text-[12px] text-[#FFFFFF7A] '>Completed</p>
                          </div>       
                      </div>  
                </div>  
          </div>
        </div>
  )
}

export default Recentpartners
