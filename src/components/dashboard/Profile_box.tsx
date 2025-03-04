'use client'
import React from 'react'
import Image from 'next/image'

const Profile_box = () => {
  return (
    <div className='w-full'>
      <div className='bg-[#1A1919] rounded-[20px] p-4'>
        {/* Design matching the image - for screens smaller than 1300px */}
        <div className='flex flex-col 2xl:hidden'>
          {/* Center-aligned layout like in the image */}
          <div className='flex flex-col items-center'>
            {/* Profile image */}
            <div className='mb-2'>
              <Image 
                src="/profile-photo.svg" 
                width={80} 
                height={80} 
                alt="Profile photo" 
                className='rounded-full w-20 h-20'
              />
            </div>
            
            {/* Name and rank */}
            <div className='flex flex-col items-center mb-1'>
              <h1 className='text-white font-bold text-xl'>Parry</h1>
              <div className='inline-block border border-white rounded-full px-2 py-0.5 text-[8px] text-white text-center bg-[#0E0E0E] mt-1'>
                Rank 49
              </div>
            </div>
            
            {/* Bio */}
            <p className='text-sm text-[#FFFFFF7A] font-normal text-center mb-2 max-w-[220px]'>
              Sometimes like to design, sometimes just like to create chaos
            </p>
            
            {/* Community badge */}
            <div className='flex items-center justify-center'>
              <Image 
                src="/gold-medal.svg" 
                width={16} 
                height={16} 
                alt='Gold medal'
                className='mr-2 w-4 h-4'
              />
              <p className='text-white font-medium text-sm'>
                Voted #1 in Design Community
              </p>
            </div>
          </div>
        </div>

        {/* Desktop layout for extra large screens (1300px+) */}
        <div className='hidden 2xl:flex items-center gap-4'>
          <div>
            <Image 
              src="/profile-photo.svg" 
              width={60} 
              height={60} 
              alt="Profile photo" 
              className='rounded-full w-16 h-16'
            />
          </div>  
          <div className='flex flex-col'>
            <div className='flex items-center gap-2'>
              <h1 className='text-white font-bold text-xl'>Parry</h1>
              <p className='border border-white rounded-full px-2 py-0.5 text-[8px] text-white text-center bg-[#0E0E0E]'>
                Rank 49
              </p>
            </div>
            <div>
              <p className='text-sm text-[#FFFFFF7A] font-normal'>
                Sometimes like to design, sometimes just like to create chaos
              </p>
            </div>
            <div className='flex items-center mt-1'>
              <Image 
                src="/gold-medal.svg" 
                width={16} 
                height={16} 
                alt='Gold medal'
                className='mr-2 w-4 h-4'
              />
              <p className='text-white font-medium text-xs'>
                Voted #1 in Design Community
              </p>
            </div>
          </div>  
        </div>
      </div>
    </div>
  )
}

export default Profile_box