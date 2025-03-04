'use client'
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

const Post = () => {
  return (
    <div className='w-full'>
      <div className='bg-[#1A1919] rounded-[20px] p-4'>
        <div className='flex items-center mb-4'>
          <Image 
            src="/user-profile-photo.svg" 
            width={42} 
            height={42} 
            alt='User profile'
            className='rounded-full'
          /> 
          <h1 className='font-medium text-lg text-white ml-4'>Rahul Kathuria</h1>      
        </div>
        
        <div className='mb-4'>
          <div className='relative w-full pb-[56.25%]'> {/* 16:9 aspect ratio container */}
            <Image 
              src="/user-post.svg"
              alt='Post image'
              fill
              style={{objectFit: 'cover'}}
              className='rounded-lg'
            />
          </div>
        </div>

        {/* Comment, likes, share buttons */}
        <div className='flex justify-between items-center'>
          <Link href="#" className='flex items-center'>
            <Image src="/thumbs-up.svg" width={22} height={22} alt='Like' /> 
            <span className='font-medium text-white ml-2'>Like</span> 
          </Link>   
          
          <Link href="#" className='flex items-center'>
            <Image src="/comment-icon.svg" width={22} height={22} alt='Comment' /> 
            <span className='font-medium text-white ml-2'>Comment</span> 
          </Link>   
          
          <Link href="#" className='flex items-center'>
            <Image src="/share.svg" width={22} height={22} alt='Share' /> 
            <span className='font-medium text-white ml-2'>Share</span> 
          </Link>   
        </div>
      </div>
    </div>
  )
}

export default Post