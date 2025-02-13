import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@lemonsqueezy/wedges'

const Final_section = () => {
  const socialLinks = [
    { icon: "/GitHub.svg", href: "#", alt: "GitHub" },
    { icon: "/Discord.svg", href: "#", alt: "Discord" },
    { icon: "/Linkedin.svg", href: "#", alt: "LinkedIn" },
    { icon: "/Twitter_icon.svg", href: "#", alt: "Twitter" },
    { icon: "/Facebook.svg", href: "#", alt: "Facebook" }
  ]

  return (
    <div className='bg-[#0E0E0E] px-4 sm:px-6 md:px-8 lg:px-24 py-8 sm:py-12 lg:py-20'>
      <div className='max-w-[1540px] mx-auto'>
        <div className='flex flex-col lg:flex-row gap-12 lg:gap-96 '>
          <div className='flex flex-col items-center lg:items-start '>
            <Image 
              src="/logo.svg" 
              width={100} 
              height={100} 
              alt='Refer logo'
              className='w-20 sm:w-24 lg:w-28'
            />
            <p className='font-normal text-white text-sm sm:text-base mt-4 mb-6'>
              Elevate your creator journey with Refer
            </p>
            
            {/* Social Links */}
            <div className='flex flex-wrap justify-center gap-2 sm:gap-3'>
              {socialLinks.map((social, index) => (
                <Button 
                  key={index}
                  className='p-2 hover:bg-white/10 transition-colors'
                >
                  <Link href={social.href}>
                    <Image 
                      src={social.icon} 
                      width={40} 
                      height={40} 
                      alt={social.alt}
                      className='w-8 sm:w-10'
                    />
                  </Link>
                </Button>
              ))}
            </div>
          </div>

          {/* Navigation Links */}
          <div className='flex flex-col sm:flex-row gap-8 sm:gap-16 lg:gap-24'>
            <div className='text-white'>
              <h2 className='font-bold text-lg mb-4'>Resources</h2>
              <div className='flex flex-col gap-2'>
                {['Blog', 'Whitepaper', 'Channels', 'Roadmap', 'Discord', 'Affiliate'].map((item, index) => (
                  <Link 
                    key={index} 
                    href="#" 
                    className='text-base hover:text-gray-300 transition-colors'
                  >
                    {item}
                  </Link>
                ))}
              </div>
            </div>

 
            <div className='text-white'>
              <h2 className='font-bold text-lg mb-4'>Legal</h2>
              <div className='flex flex-col gap-2'>
                {['Terms of service', 'Privacy Policy'].map((item, index) => (
                  <Link 
                    key={index} 
                    href="#" 
                    className='text-base hover:text-gray-300 transition-colors'
                  >
                    {item}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <hr className='border-white/10 my-8 sm:my-12' />
        
        <div className='flex flex-col sm:flex-row justify-between items-center gap-4'>
          <p className='text-[#D1D1D1] text-sm sm:text-base order-2 sm:order-1'>
            © Refer, 2024. All rights reserved.
          </p>
          
          <Button className="rounded-full bg-white hover:bg-gray-100 transition-colors w-full sm:w-auto px-6 py-3 order-1 sm:order-2">
            <Link href="#" className='flex items-center justify-center gap-2'>
              <Image 
                src="/discord_support.svg" 
                width={30} 
                height={30} 
                alt='Discord support'
                className='w-6 h-6'
              />
              <span className='text-black font-medium text-base'>
                Discord Support
              </span>
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Final_section