'use client'
import React from 'react'
import { ChevronsUp } from "lucide-react";

const DashboardMenu = () => {
  return (
    <div className='w-full'>
      <div className='bg-[#1A1919] rounded-[20px] px-3 sm:px-4 py-2 sm:py-3 flex justify-between items-center'>
        <h1 className='font-medium text-base sm:text-lg text-[#FFFFFF7A]'>Messages</h1>
        <ChevronsUp className='text-white w-5 h-5 sm:w-6 sm:h-6' />
      </div>
    </div>
  )
}

export default DashboardMenu