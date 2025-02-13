import React from 'react'
import Image from 'next/image'


const Second_section = () => {
  return (
    
    <div  id="Second_section" className='bg-[#0E0E0E] min-h-screen flex flex-col items-center px-4 sm:px-6 lg:px-8'>
      <h1 className='text-white font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-center py-6 sm:py-8 lg:py-10'>
        All the tools required for social<br className='hidden sm:block' /> media growth in one place
      </h1>

      <div className='grid grid-cols-1 lg:grid-cols-5 gap-4 sm:gap-6 w-full max-w-[1410px]'>
        <div className='col-span-1 lg:col-span-5 bg-gradient-to-r from-[#FC6076] to-[#FF9A44] border border-white border-opacity-50 rounded-2xl sm:rounded-[32px] p-4 sm:p-6'>
          <div className='flex flex-col lg:flex-row justify-between items-center'>
            <div className='space-y-4 text-center lg:text-left'>
              <span className='inline-block bg-white/20 text-white text-base sm:text-lg px-4 py-2 rounded-full font-medium'>COMMUNITY</span>
              <h2 className='text-white font-semibold text-2xl sm:text-3xl md:text-4xl lg:text-5xl'>Community Collaborations</h2>
              <p className='text-white text-base sm:text-lg max-w-xl'>
                Collaborate with fellow creators and businesses to bring
                visionary projects to life, fostering growth through
                meaningful partnerships.
              </p>
            </div>
            <div className='mt-6 lg:mt-0'>
              <Image 
                src='/user_medal.svg' 
                alt='Community collaboration illustration' 
                width={600} 
                height={500} 
                className='w-full max-w-md lg:max-w-xl h-auto'
              />
            </div>
          </div>
        </div>


        <div className='col-span-1 lg:col-span-3 bg-gradient-to-b from-[#4A0047] to-[#B611B0] border border-white border-opacity-50 rounded-2xl sm:rounded-[32px] p-4 sm:p-6'>
          <div className='space-y-4'>
            <span className='inline-block bg-white/20 text-white text-base sm:text-lg px-4 py-2 rounded-full font-medium'>SHOWCASE</span>
            <h2 className='text-white font-semibold text-2xl sm:text-3xl md:text-4xl lg:text-5xl'>Portfolio Page</h2>
            <p className='text-white text-base sm:text-lg max-w-xl'>
              Showcase your creativity in style with a sleek,
              customizable portfolio designed to highlight your best
              work and attract the right opportunities.
            </p>
          </div>
          <div className='mt-6'>
            <Image 
              src='/showcase.svg' 
              alt='Portfolio showcase illustration' 
              width={500} 
              height={400} 
              className='w-full max-w-md h-auto'
            />
          </div>
        </div>

     
        <div className='col-span-1 lg:col-span-2 bg-gradient-to-b from-[#9033ED] to-[#3C0078] border border-white border-opacity-50 rounded-2xl sm:rounded-[32px] p-4 sm:p-6'>
          <div className='flex flex-col justify-between h-full'>
            <Image 
              src='/tokens.svg' 
              width={180} 
              height={100} 
              alt='Tokens illustration' 
              className='w-32 sm:w-40 h-auto'
            />
            <div className='space-y-4 mt-6'>
              <span className='inline-block bg-white/20 text-white text-base sm:text-lg px-4 py-2 rounded-full font-medium'>Tokens</span>
              <h2 className='text-white font-semibold text-2xl sm:text-3xl md:text-4xl'>Governance Tokens</h2>
              <p className='text-white text-base sm:text-lg max-w-xl'>
                Empower your voice with governance tokens,
                giving you a say in the platform's growth and
                decisions that shape your creative future.
              </p>
            </div>
          </div>
        </div>

        {/* Vanity Metrics Section */}
        <div className='col-span-1 lg:col-span-5 mt-4 sm:mt-6'>
          <div className='bg-gradient-to-r from-[#C71D6F] to-[#D09693] border border-white border-opacity-50 rounded-2xl sm:rounded-[32px] p-4 sm:p-6'>
            <div className='flex flex-col lg:flex-row justify-between items-center'>
              <div className='space-y-4 text-center lg:text-left'>
                <span className='inline-block bg-white/20 text-white text-base sm:text-lg px-4 py-2 rounded-full font-medium'>Analytics</span>
                <h2 className='text-white font-semibold text-2xl sm:text-3xl md:text-4xl lg:text-5xl'>Vanity Metrics</h2>
                <p className='text-white text-base sm:text-lg max-w-xl'>
                  Track your growth and influence with insights that
                  measure your impact across projects, collaborations,
                  and the creative community.
                </p>
              </div>
              <div className='mt-6 lg:mt-0'>
                <Image 
                  src='/vanity_metrics.svg' 
                  alt='Vanity metrics illustration' 
                  width={600} 
                  height={500} 
                  className='w-full max-w-md lg:max-w-xl h-auto'
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Second_section