import React from 'react'
import Link from 'next/link';
import { ChevronsUp} from "lucide-react";
const Dashboardmenue = () => {
  return (
    <div className='bg-[#0E0E0E]  absolute top-[750px] left-[1100px]'>
      <div className='bg-[#1A1919] h-[50px] w-[345px] rounded-[20px] pl-7  flex justify-between items-center'>
        <h1 className='font-medium text-lg text-[#FFFFFF7A] '>Messages</h1>
        <ChevronsUp className='text-[#FFFFFF] w-[80px] h-[25px]' />
      </div>
    </div>
  )
}

export default Dashboardmenue
