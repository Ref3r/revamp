import React from 'react'
import Link from 'next/link'
import { Button } from '@lemonsqueezy/wedges'
import Image from 'next/image'



const Sidebar = () => {
  return (
    <div className='bg-[#0E0E0E] h-screen  '>
      <div className='flex flex-col justify-between items-center bg-[#1A1919] w-[55px] h-[700px] rounded-[20px] ml-[29px] '>
      <div className='pt-[35px]'>
        <Image src="/r-logo.svg" width={30} height={20} alt='/' />
      </div>
      <nav className=' flex flex-col justify-between items-centre bg-[#1A1919]'> 
        <ul>
          <li className='pb-6'>
            <Link href="#"><Image src="/layout-grid.svg" width={18} height={18} alt='/' /></Link>
          </li>
          <li>
            <Link href="#" className='hover:text-white focus:text-white transition duration-200'><Image src="/users.svg" width={18} height={18} alt='/' /></Link>
          </li>
          <li className='py-6'>
            <Link href="#"><Image src="/message-circle.svg" width={18} height={18} alt='/' /></Link>
          </li>
          <li>
            <Link href="#"><Image src="/heart-handshake.svg" width={18} height={18} alt='/' /></Link>
          </li>
          <li className='py-6'>
            <Link href="#"><Image src="/bar-chart.svg" width={18} height={18} alt='/' /></Link>
          </li>
        </ul>      
        </nav>
        <div className='pb-[35px] mt-32'>
          <Link href="#"><Image src="/profile-photo.svg" width={36} height={36} alt='/' /></Link>
        </div>
      </div>
    
</div>
  )
}

export default Sidebar
