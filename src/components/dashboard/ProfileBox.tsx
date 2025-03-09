'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import CollaborationForm from '../chat-section/collab-request-form/CollaborationForm '
import { X } from 'lucide-react'

const ProfileBox = ({ isPublicView = false }) => {
  const [showForm, setShowForm] = useState(false);

  const toggleForm = () => {
    setShowForm(!showForm);
    if (!showForm) {
      document.body.style.overflow = 'hidden'; 
    } else {
      document.body.style.overflow = 'auto'; 
    }
  };
  return (
    <div className='w-full'>
      <div className='bg-[#1A1919] rounded-[20px] p-4'>
        <div className='flex flex-col 2xl:hidden'>
          <div className='flex flex-col items-center'>
            <div className='mb-2'>
              <Image 
                src="/profile-photo.svg" 
                width={80} 
                height={80} 
                alt="Profile photo" 
                className='rounded-full w-20 h-20'
              />
            </div>
            <div className='flex flex-col items-center mb-1'>
              <h1 className='text-white font-bold text-xl'>Parry</h1>
              <div className='border border-white rounded-full px-2 py-0.5 text-[8px] text-white bg-[#0E0E0E]'>
                Rank 49
              </div>
            </div>
            <p className='text-sm text-[#FFFFFF7A] font-normal text-center mb-2 max-w-[220px]'>
              Sometimes like to design, sometimes just like to create chaos
            </p>
            {isPublicView && (
              <Button 
                className='bg-gradient-to-r from-[#0BA360] to-[#27A980] hover:bg-gradient-to-r hover:from-[#27A980] hover:to-[#0BA360] text-white rounded-md font-medium text-sm px-4 py-2 mb-3'
                onClick={toggleForm}
              >
                Contact Creator
              </Button>
            )}
            {showForm && (
              <>
                <div 
                  className='fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-40'
                  onClick={toggleForm}
                />
                <div
                  className={`fixed top-0 right-0 z-50 h-full w-[370px] bg-[#0E0E0E] shadow-lg transition-transform duration-1000 ease-in-out transform ${
                    showForm ? 'translate-x-0 delay-500' : 'translate-x-full'
                  } overflow-y-auto`}
                  style={{ maxHeight: '100vh' }}
                >
                  <div className='p-6'>
                    <button className='text-white mb-4 absolute top-12 pt-1 right-12 z-50' onClick={toggleForm}>
                      <X />
                    </button>
                    <CollaborationForm />
                  </div>
                </div>
              </>
            )}
            <div className='flex items-center justify-center'>
              <Image 
                src="/gold-medal.svg" 
                width={16} 
                height={16} 
                alt="Gold medal"
                className='mr-2'
              />
              <p className='text-white font-medium text-sm'>
                Voted #1 in Design Community
              </p>
            </div>
          </div>
        </div>


        <div className='hidden 2xl:flex items-center gap-4'>
          <Image 
            src="/profile-photo.svg" 
            width={130} 
            height={130} 
            alt="Profile photo" 
            className='rounded-full w-32 h-32'
          />
          <div className='flex flex-col'>
            <div className='flex items-center gap-2'>
              <h1 className='text-white font-bold text-xl'>Parry</h1>
              <div className='border border-white rounded-full px-2 py-0.5 text-[8px] text-white bg-[#0E0E0E]'>
                Rank 49
              </div>
            </div>
            <p className='text-sm text-[#FFFFFF7A] font-normal mt-2'>
              Sometimes like to design, sometimes just like to create chaos
            </p>
            {isPublicView && (
              <Button 
                className='bg-gradient-to-r from-[#0BA360] to-[#27A980] hover:bg-gradient-to-r hover:from-[#27A980] hover:to-[#0BA360] text-white rounded-md font-medium text-sm px-4 py-2 mt-2 mb-2 w-fit'
                onClick={toggleForm}
              >
                Contact Creator
              </Button>
            )}
            {showForm && (
              <>
                <div 
                  className='fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-40'
                  onClick={toggleForm}
                />
                <div
                  className={`fixed top-0 right-0 z-50 h-full w-[510px] bg-[#0E0E0E] shadow-lg transition-transform duration-500 ease-in-out transform ${
                    showForm ? 'translate-x-0 delay-1000' : 'translate-x-full'
                  } overflow-y-auto`}
                  style={{ maxHeight: '100vh' }}
                >
                  <div className='p-6  '>
                    <button className='text-white mb-4 absolute top-12 pt-1 right-12 z-50' onClick={toggleForm}>
                      <X />
                    </button>
                    <CollaborationForm />
                  </div>
                </div>
              </>
            )}
            <div className='flex items-center mt-1'>
              <Image 
                src="/gold-medal.svg" 
                width={16} 
                height={16} 
                alt="Gold medal"
                className='mr-2'
              />
              <p className='text-white font-medium text-xs'>
                Voted #1 in Design Community
              </p>
            </div>
          </div>  
        </div>
      </div>
    </div>
  )
}

export default ProfileBox
