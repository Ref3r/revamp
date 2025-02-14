import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@lemonsqueezy/wedges'

const Recentcontests = () => {
return (
    <div className='bg-[#0E0E0E]  absolute top-96 left-[1100px]'>
        <div className='bg-[#1A1919] h-full w-[345px] rounded-[20px] px-4  flex flex-col'>
            <div className='flex justify-between items-center py-4'>
               <h1 className='text-[#FFFFFF7A] font-medium text-lg'>Recent Contests</h1> 
               <h1 className='text-[#FFFFFF] font-medium text-sm '>View Contest</h1> 
            </div> 
            <div className='flex flex-col'>
                <div className='flex justify-between items-center pb-8'>
                      <div className='flex items-center'>
                          <div>
                              <Image src="/creator1.svg" width={32} height={32} alt='#'/>
                          </div>
                          <div className='flex flex-col px-4'>
                            <div>
                                <h1 className='font-medium text-sm text-[#FFFFFF]'>Creator 1</h1>
                              </div>
                              <div>
                                  <p className='font-medium text-sm text-[#FFFFFF7A]'>Creator short bio</p>
                              </div>
                          </div>
                      </div>    
                      <div>
                          <Button className='bg-[#FFFFFF] h-7 flex justify-center items-center'>
                              <Link href="#" className='text-black font-medium text-sm  px-5'>vote</Link>
                          </Button>
                      </div>       
                </div> 
                  <div>
                      <div className='flex justify-between items-center'>
                      <div className='flex items-center'>
                          <div>
                              <Image src="/creator2.svg" width={32} height={32} alt='#'/>
                          </div>
                          <div className='flex flex-col px-4'>
                              <div>
                                <h1 className='font-medium text-sm text-[#FFFFFF]'>Creator 1</h1>
                              </div>
                              <div>
                                  <p className='font-medium text-sm text-[#FFFFFF7A]'>Creator short bio</p>
                              </div>
                          </div>
                      </div>    
                      <div>
                          <Button className='bg-[#FFFFFF] h-7 flex justify-center items-center'>
                              <Link href="#" className='text-black font-medium text-sm  px-5'>vote</Link>
                          </Button>
                      </div>       
                </div> 
                  </div> 
                  <div>
                      <div className='flex justify-between items-center py-8'>
                      <div className='flex items-center'>
                          <div>
                              <Image src="/creator3.svg" width={32} height={32} alt='#'/>
                          </div>
                          <div className='flex flex-col px-4'>
                              <div>
                                <h1 className='font-medium text-sm text-[#FFFFFF]'>Creator 1</h1>
                              </div>
                              <div>
                                  <p className='font-medium text-sm text-[#FFFFFF7A]'>Creator short bio</p>
                              </div>
                          </div>
                      </div>    
                      <div>
                          <Button className='bg-[#FFFFFF] h-7 flex justify-center items-center'>
                              <Link href="#" className='text-black font-medium text-sm  px-5'>vote</Link>
                          </Button>
                      </div>       
                </div> 
                  </div> 
            </div>  
      </div>
    </div>
  )
}

export default Recentcontests
