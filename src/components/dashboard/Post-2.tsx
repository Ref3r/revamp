import React from 'react'
import Image from 'next/image'

const Post2 = () => {
  return (
    <div className=' bg-[#0E0E0E] absolute top-[810px] left-[460px]'>
        <div className='bg-[#1A1919] h-[140px] w-[630px] rounded-[20px] px-9 pt-4 flex flex-col'>
              <div className='flex items-center'>
                  <Image src="/user-profile-photo-2.svg" width={42} height={42} alt='#' />
                  <h1 className='text-lg font-medium text-[#FFFFFF] px-6'>Kishen Maran</h1>
              </div>
              <div>
                <p className='font-medium text-sm text-[#FFFFFF7A] py-3'>A small post bio should suffice. Even though there is not much to write, I'd rather keep writing and fill in all the empty spots and make them not empty.</p>
              </div>      
        </div>
    </div>
  )
}

export default Post2
