'use client'
import React from 'react'
import Image from 'next/image'

const Post2 = () => {
  return (
    <div className='w-full'>
      <div className='bg-[#1A1919] rounded-[20px] p-4'>
        <div className='flex items-center mb-3'>
          <Image 
            src="/user-profile-photo-2.svg" 
            width={42} 
            height={42} 
            alt='User profile'
            className='rounded-full'
          />
          <h1 className='text-lg font-medium text-white ml-4'>Kishen Maran</h1>
        </div>
        <div>
          <p className='font-medium text-sm text-[#FFFFFF7A]'>
            A small post bio should suffice. Even though there is not much to write, I'd rather keep writing and fill in all the empty spots and make them not empty.
          </p>
        </div>      
      </div>
    </div>
  )
}

export default Post2