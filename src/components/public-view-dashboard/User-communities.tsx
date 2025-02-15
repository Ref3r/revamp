import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@lemonsqueezy/wedges'

const Usercommunities = () => {
  return (
    <div className='bg-[#0E0E0E]  absolute top-[550px] left-[990px]'>
        <div className='bg-[#1A1919] h-full w-[290px] rounded-[20px] px-4  flex flex-col'>
            <div>
               <h1 className='text-[#FFFFFF7A] font-medium text-base py-2'>Parry's Communities</h1>   
            </div> 
            <div className='flex flex-col'>
                <div className='flex justify-between items-center pb-4'>
                      <div className='flex items-center'>
                          <div>
                              <Image src="/community-1.svg" width={32} height={32} alt='#'/>
                          </div>
                          <div className='flex flex-col px-4'>
                            <div>
                                <h1 className='font-medium text-sm text-[#FFFFFF]'>Community 1</h1>
                              </div>
                              <div>
                                  <p className='font-medium text-sm text-[#FFFFFF7A]'>70+ Members</p>
                              </div>
                          </div>
                      </div>    
                      <div>
                          <Button className='bg-[#FFFFFF] h-7 flex justify-center items-center'>
                              <Link href="#" className='text-black font-medium text-sm  px-5'>Join</Link>
                          </Button>
                      </div>       
                </div> 
                  <div className='pb-4'>
                      <div className='flex justify-between items-center'>
                      <div className='flex items-center'>
                          <div>
                              <Image src="/community-2.svg" width={32} height={32} alt='#'/>
                          </div>
                          <div className='flex flex-col px-4'>
                              <div>
                                <h1 className='font-medium text-sm text-[#FFFFFF]'>Community 1</h1>
                              </div>
                              <div>
                                  <p className='font-medium text-sm text-[#FFFFFF7A]'>70+ Members</p>
                              </div>
                          </div>
                      </div>    
                      <div>
                          <Button className='bg-[#FFFFFF] h-7 flex justify-center items-center'>
                              <Link href="#" className='text-black font-medium text-sm  px-5'>Join</Link>
                          </Button>
                      </div>       
                </div> 
                  </div>  
            </div>  
      </div>
    </div>
  )
}

export default Usercommunities
