import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const Work = () => {
  return (
    <div className='bg-[#1A1919] w-full h-auto rounded-[20px] p-6'>
      <h1 className='font-medium text-base text-[#FFFFFF7A] mb-4'>Work</h1>  
      
      {/* Grid layout for better responsiveness */}
      <div className='grid grid-cols-3 gap-4'>
        {/* First row */}
        <div className='relative h-32 sm:h-40 md:h-48'>
          <Link href="#" className='block h-full'>
            <div className='relative w-full h-full'>
              <Image 
                src="/work1.svg" 
                fill 
                style={{objectFit: 'cover'}} 
                alt='Work sample 1'
                className='rounded-lg'
              />
            </div>
          </Link>
        </div>
        
        <div className='relative h-32 sm:h-40 md:h-48'>
          <Link href="#" className='block h-full'>
            <div className='relative w-full h-full'>
              <Image 
                src="/work2.svg" 
                fill 
                style={{objectFit: 'cover'}} 
                alt='Work sample 2'
                className='rounded-lg'
              />
            </div>
          </Link>
        </div>
        
        <div className='relative h-32 sm:h-40 md:h-48'>
          <Link href="#" className='block h-full'>
            <div className='relative w-full h-full'>
              <Image 
                src="/work3.svg" 
                fill 
                style={{objectFit: 'cover'}} 
                alt='Work sample 3'
                className='rounded-lg'
              />
            </div>
          </Link>
        </div>
        
        {/* Second row */}
        <div className='relative h-32 sm:h-40 md:h-48'>
          <Link href="#" className='block h-full'>
            <div className='relative w-full h-full'>
              <Image 
                src="/work4.svg" 
                fill 
                style={{objectFit: 'cover'}} 
                alt='Work sample 4'
                className='rounded-lg'
              />
            </div>
          </Link>
        </div>
        
        <div className='relative h-32 sm:h-40 md:h-48 col-span-2'>
          <Link href="#" className='block h-full'>
            <div className='relative w-full h-full'>
              <Image 
                src="/work5.svg" 
                fill 
                style={{objectFit: 'cover'}} 
                alt='Work sample 5'
                className='rounded-lg'
              />
            </div>
          </Link>
        </div>
        
        {/* Third row */}
        <div className='relative h-32 sm:h-40 md:h-48 col-span-3'>
          <div className='grid grid-cols-2 gap-4 h-full'>
            <Link href="#" className='block h-full'>
              <div className='relative w-full h-full'>
                <Image 
                  src="/work6.svg" 
                  fill 
                  style={{objectFit: 'cover'}} 
                  alt='Work sample 6'
                  className='rounded-lg'
                />
              </div>
            </Link>
            
            <Link href="#" className='block h-full'>
              <div className='relative w-full h-full'>
                <Image 
                  src="/work7.svg" 
                  fill 
                  style={{objectFit: 'cover'}} 
                  alt='Work sample 7'
                  className='rounded-lg'
                />
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Work;