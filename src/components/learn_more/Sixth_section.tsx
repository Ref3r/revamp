'use client';

import React from 'react'
import Image from 'next/image'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

// Common layout constants for all sections
const LAYOUT_STYLES = {
  container: "max-w-[1540px] mx-auto px-4 sm:px-6 lg:px-12",
  section: "bg-[#0E0E0E]"
};


const Sixth_section = () => {
  const faqItems = [
    {
      question: "What channels does Refer support?",
      answer: "We support a wide range of social media channels."
    },
    {
      question: "What kind of payment methods are supported by Refer?",
      answer: "We accept various payment methods including credit cards and digital payments."
    },
    {
      question: "Can I trust Refer?",
      answer: "Yes, we prioritize security and transparency in all our operations."
    },
    {
      question: "What is your cancellation policy?",
      answer: "We offer flexible cancellation options for our users."
    }
  ];

  return (
    <div  id="Sixth_section" className={LAYOUT_STYLES.section}>
    <div className={LAYOUT_STYLES.container + " py-16 md:py-24"}>
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
        <div className="lg:w-1/3">
          <h1 className="text-white font-bold text-3xl sm:text-4xl lg:text-5xl">
            Frequently<br/> asked<br/> questions
          </h1>
          <Image src="/underline2.svg" height={62} width={220} alt="Decorative underline" className="mt-4" />
        </div>
        
        <div className="lg:w-2/3">
          {faqItems.map((item, index) => (
            <Accordion 
              key={index} 
              type="single" 
              collapsible 
              className='mb-4'
            >
              <AccordionItem value={`item-${index + 1}`}>
                <AccordionTrigger 
                  className='text-white bg-[#1A1919] w-full rounded-[20px] p-4 sm:p-6 text-base sm:text-lg text-left hover:no-underline'
                >
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className='text-white mt-2 px-4'>
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          ))}
        </div>
      </div>
    </div>
    </div>
  )
}

export default Sixth_section