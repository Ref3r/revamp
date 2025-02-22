import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const Analyticssidebar = () => {
  return (
    <div className='bg-[#0E0E0E] lg:h-screen'>
      <div className='fixed left-0 top-2 lg:flex flex-col items-center bg-[#1A1919] w-[50px] h-screen rounded-[20px] ml-4 hidden'>
        <div className='pt-6'>
          <Image src='/r-logo.svg' width={30} height={20} alt='/' />
        </div>
        <nav className='flex flex-col justify-between items-center bg-[#1A1919] mt-40'>
          <ul>
            <li className='pb-6'>
              <Link href='#'>
                <Image src='/layout-grid.svg' width={18} height={18} alt='/' />
              </Link>
            </li>
            <li>
              <Link href='#' className='hover:text-white focus:text-white transition duration-200'>
                <Image src='/users.svg' width={18} height={18} alt='/' />
              </Link>
            </li>
            <li className='py-6'>
              <Link href='#'>
                <Image src='/message-circle.svg' width={18} height={18} alt='/' />
              </Link>
            </li>
            <li>
              <Link href='#'>
                <Image src='/heart-handshake.svg' width={18} height={18} alt='/' />
              </Link>
            </li>
            <li className='py-6'>
              <Link href='#'>
                <Image src='/bar-chart.svg' width={18} height={18} alt='/' />
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      {/* Mobile Bottom Navigation */}
      <div className='lg:hidden fixed bottom-0 left-0 right-0 bg-[#1A1919] flex justify-around py-1 shadow-lg'>
        <Link href='#'>
          <Image src='/layout-grid.svg' width={24} height={24} alt='/' />
        </Link>
        <Link href='#'>
          <Image src='/users.svg' width={24} height={24} alt='/' />
        </Link>
        <Link href='#'>
          <Image src='/message-circle.svg' width={24} height={24} alt='/' />
        </Link>
        <Link href='#'>
          <Image src='/heart-handshake.svg' width={24} height={24} alt='/' />
        </Link>
        <Link href='#'>
          <Image src='/bar-chart.svg' width={24} height={24} alt='/' />
        </Link>
      </div>
    </div>
  );
};

export default Analyticssidebar;