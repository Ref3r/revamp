import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@lemonsqueezy/wedges'

const Post = () => {
  return (
    <div className=' bg-[#0E0E0E] absolute top-[270px] left-[460px]'>
        <div className='bg-[#1A1919] h-[520px] w-[630px] rounded-[20px] px-9 pt-4 flex flex-col'>
          <div className='flex items-center'>
            <Image src="/user-profile-photo.svg" width={42} height={42} alt='#' /> 
            <h1 className='font-medium text-lg text-[#FFFFFF] px-6'>Rahul Kathuria</h1>      
          </div>
          <div className='py-5'>
            <Image src="/user-post.svg" width={600} height={600} alt='#' />     
              </div>

              {/* comment,likes,hare buttons */}

            <div className='flex justify-between items-center'>
            <div className=''>
                  <Link href="#" className='flex items-center'>
                    <Image src="/thumbs-up.svg" width={25} height={25} alt='#' /> 
                    <h1 className='font-medium text-base text-[#FFFFFF] px-4'>Like</h1> 
                  </Link>   
                  </div>
                  <div>
                  <Link href="#" className='flex items-center'>
                    <Image src="/comment-icon.svg" width={25} height={25} alt='#' /> 
                    <h1 className='font-medium text-base text-[#FFFFFF] px-4'>Comment</h1> 
                  </Link>   
                  </div>
                  <div className=''>
                  <Link href="#" className='flex items-center'>
                    <Image src="/share.svg" width={25} height={25} alt='#' /> 
                    <h1 className='font-medium text-base text-[#FFFFFF] px-4'>Share</h1> 
                  </Link>   
            </div>
            </div>
      </div>
    </div>
  )
}

export default Post
