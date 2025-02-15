import React from 'react'
import Image from 'next/image'
import { Button } from '@lemonsqueezy/wedges'
import Link from 'next/link'

const Profile = () => {
  return (
    <div className='bg-[#0E0E0E]  absolute top-4 left-[205px]'>
              
              {/* main div */}
    
            <div className='flex  bg-[#1A1919] h-[200px] w-[480px] rounded-[20px] px-2'>
                  <div className='px-3 py-3'>
                      <Image src="/profile-photo.svg" width={140} height={140} alt="#" />
                  </div>  
                  <div className='flex flex-col py-2'>
                      <div className='flex  items-center'>
                          <h1 className='text-[#FFFFFF] font-bold text-lg pr-2'>Parry</h1>
                          <p className='border-white border rounded-[100px] h-4 w-12 bg-none text-[8px] text-white text-center'>Rank 49</p>
                      </div>
                      <div>
                          <p className='text-sm text-[#FFFFFF7A] font-normal'>Sometimes like to design, sometimes just like to create chaos</p>
                  </div>
                  <div className='py-4'>
                      <Button className="rounded-md border-none bg-gradient-to-r from-[#0BA360] to-[#27A980] ">
                          <Link href="#" className='flex items-center px-5 '>
                              <span>Contact Creator</span>
                          </Link>
                      </Button>
                  </div>
                      <div className='flex items-center py-2'>
                          <Image src="/gold-medal.svg" width={20} height={20} alt='#' />
                          <p className='text-white font-medium text-sm'>Voted #1 in Design Community</p>
                      </div>
                  </div>  
          </div>
      </div>
  )
}

export default Profile
