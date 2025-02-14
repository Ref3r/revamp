import { Button } from '@lemonsqueezy/wedges'
import React from 'react'
import Link from 'next/link'

const Wallet_balance = () => {
  return (
    <div className='bg-[#0E0E0E] float-end ml-0 pl-0'>
    <div className='bg-[#1A1919] mr-6 rounded-[20px] w-[1340px] '>
      <div className='flex justify-between items-center px-8 py-3'>
        <div className='flex justify-between items-center '>
          <p className='text-[#FFFFFF7A] font-medium text-lg '>Ref3r Token Price: <span className='text-white'>$69,420</span></p>
          <p className='text-[#FFFFFF7A] font-medium text-lg px-10'>Wallet Balance: <span className='text-white'>$420</span></p>
        </div>
        <div>
          <Button className='bg-[#FFFFFF1A] rounded-full'><Link href="#" className='text-white px-8 py-3'>Public View</Link></Button>
        </div>
        </div>
      </div>
      </div>
  )
}

export default Wallet_balance
