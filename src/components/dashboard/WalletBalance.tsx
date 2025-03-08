'use client'
import React from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'

const WalletBalance = () => {
  const router = useRouter();
  
  const handlePublicView = () => {
    router.push('/public-view-dashboard');
  };
  
  return (
    <div className='bg-[#0E0E0E] w-full py-3 sm:py-4'>
      <div className='bg-[#1A1919] rounded-[20px] w-full'>
        <div className='flex flex-col xs:flex-row justify-between items-center px-3 sm:px-6 py-2 sm:py-3'>
          <div className='flex flex-col xs:flex-row items-center xs:items-start sm:items-center mb-2 xs:mb-0'>
            <p className='text-[#FFFFFF7A] font-medium text-xs sm:text-sm md:text-base mb-1 xs:mb-0'>
              Ref3r Token Price: <span className='text-white'>$69,420</span>
            </p>
            <p className='text-[#FFFFFF7A] font-medium text-xs sm:text-sm md:text-base xs:ml-4 sm:ml-6 md:ml-10'>
              Wallet Balance: <span className='text-white'>$420</span>
            </p>
          </div>
          <div>
            <Button 
              className='bg-[#FFFFFF1A] hover:bg-[#FFFFFF33] rounded-full h-7 sm:h-8 text-white text-xs sm:text-sm px-3 sm:px-5 py-1 sm:py-2'
              onClick={handlePublicView}
            >
              Public View
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WalletBalance