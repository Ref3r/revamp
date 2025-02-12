'use client';
import { useState } from 'react';
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@lemonsqueezy/wedges';
import { ChevronDown } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"


const Sixth_section = () => {
  function Dropdown() {
    const [isOpen, setIsOpen] = useState(false);
  }
  return (
    <div className='flex flex-col lg:flex-row justify-between bg-[#0E0E0E] p-6 lg:px-10 gap-8'>
      <div className='pl-16'>
        <h1 className='font-bold text-5xl text-[#FFFFFF] '>Frequently<br/> asked<br/> questions</h1>
        <Image src="/underline2.svg" height={62} width={220} alt="#"/>
      </div>
      <div className=' px-28 w-full lg:w-full'>
      <Accordion type="single" collapsible className='py-1'>
        <AccordionItem value="item-1">
          <AccordionTrigger className='text-white bg-[#1A1919] w-[900px] h-[75px] rounded-[20px] '>What channels does Refer support?</AccordionTrigger>
            <AccordionContent></AccordionContent>
          </AccordionItem>
        </Accordion>
        
        <Accordion type="single" collapsible className='py-1'>
        <AccordionItem value="item-1">
          <AccordionTrigger className='text-white bg-[#1A1919] w-[900px] h-[75px] rounded-[20px] '>What kind of payment methods are supported by Refer?</AccordionTrigger>
            <AccordionContent></AccordionContent>
          </AccordionItem>
        </Accordion>

        <Accordion type="single" collapsible className='py-1'>
        <AccordionItem value="item-1">
          <AccordionTrigger className='text-white bg-[#1A1919] w-[900px] h-[75px] rounded-[20px] '>Can I trust Refer?</AccordionTrigger>
            <AccordionContent></AccordionContent>
          </AccordionItem>
        </Accordion>

        <Accordion type="single" collapsible className='py-1'>
        <AccordionItem value="item-1">
          <AccordionTrigger className='text-white bg-[#1A1919] w-[900px] h-[75px] rounded-[20px] '>What is your cancellation policy?</AccordionTrigger>
            <AccordionContent></AccordionContent>
          </AccordionItem>
          </Accordion>
          
        </div>
    </div>
  )
}

export default Sixth_section
