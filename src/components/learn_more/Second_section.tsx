import React from 'react'
import Image from 'next/image'
import { Button } from "@lemonsqueezy/wedges";
import Link from 'next/link';

const Second_section = () => {
  return (
  <div className='bg-[#0E0E0E] min-h-screen flex flex-col items-center'>
  <h1 className='text-white font-bold text-5xl text-center py-10'>
    All the tools required for social<br /> media growth in one place
  </h1>

  <div className='grid grid-cols-5 lg:grid-cols-3 gap-6 w-full max-w-[1320px] px-6 md:grid-cols-1'>
    {/* Community Section */}
    <div className='col-span-5 bg-gradient-to-r from-[#FC6076] to-[#FF9A44] border border-white border-opacity-50 rounded-[32px] flex flex-col lg:flex-row justify-between items-center p-6'>
      <div className='ml-6'>
        <span className='bg-white/20 text-white text-lg px-4 py-2 rounded-full font-medium'>COMMUNITY</span>
        <h1 className='text-white font-semibold text-3xl md:text-5xl mt-4'>Community Collaborations</h1>
        <p className='text-white text-lg mt-4'>
          Collaborate with fellow creators and businesses to bring<br />
          visionary projects to life, fostering growth through<br />
          meaningful partnerships.
        </p>
      </div>
      <Image src='/user_medal.svg' alt='/' width={600} height={500} className='mr-6' />
    </div>

        {/* Showcase & Tokens Section */}
    
    <div className='bg-gradient-to-b from-[#4A0047] to-[#B611B0] border border-white border-opacity-50 rounded-[32px] p-6 flex flex-col justify-between col-span-3 md:col-span-3'>
      <div className='ml-6'>
        <span className='bg-white/20 text-white text-lg px-4 py-2 rounded-full font-medium'>SHOWCASE</span>
        <h1 className='text-white font-semibold text-3xl md:text-5xl mt-4'>Portfolio Page</h1>
        <p className='text-white text-lg mt-4'>
          Showcase your creativity in style with a sleek,<br />
          customizable portfolio designed to highlight your best<br />
          work and attract the right opportunities.
        </p>
      </div>
      <Image src='/showcase.svg' alt='/' width={500} height={400} className='ml-6 mt-6' />
    </div>

    <div className='bg-gradient-to-b from-[#9033ED] to-[#3C0078] border border-white border-opacity-50 rounded-[32px] p-6 flex flex-col justify-between lg:col-span-2 md:col-span-2'>
      <Image src='/tokens.svg' width={180} height={100} alt='/' className='mt-12 ml-6' />
      <div className='ml-6 mt-6'>
        <span className='bg-white/20 text-white text-lg px-4 py-2 rounded-full font-medium'>Tokens</span>
        <h1 className='text-white font-semibold text-3xl md:text-5xl mt-4'>Governance Tokens</h1>
        <p className='text-white text-lg mt-4'>
          Empower your voice with governance tokens,<br />
          giving you a say in the platform's growth and<br />
          decisions that shape your creative future.
        </p>
    </div>
    </div> 

  {/* Vanity Metrics Section */}
  <div className='w-full max-w-[1320px] px-[1px] mt-6 col-span-5'>
    <div className='bg-gradient-to-r from-[#C71D6F] to-[#D09693] border border-white border-opacity-50 rounded-[32px] flex flex-col lg:flex-row justify-between items-center p-6'>
      <div className='ml-6'>
        <span className='bg-white/20 text-white text-lg px-4 py-2 rounded-full font-medium'>Analytics</span>
        <h1 className='text-white font-semibold text-3xl md:text-5xl mt-4'>Vanity Metrics</h1>
        <p className='text-white text-lg mt-4'>
          Track your growth and influence with insights that<br />
          measure your impact across projects, collaborations,<br />
          and the creative community.
        </p>
      </div>
      <Image src='/vanity_metrics.svg' alt='/' width={600} height={500} className='mr-6' />
    </div>
  </div>
      </div>
      </div>

  )
}

export default Second_section
