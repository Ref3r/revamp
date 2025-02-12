import React from 'react'
import Image from 'next/image'
import { Button } from "@lemonsqueezy/wedges";
import Link from 'next/link';

const Hero_learn_more = () => {
  const cards = [
    {
      icon: "/smiley.svg",
      title: "Creators",
      description: "Share your work, grow your audience, and connect with opportunities—right where the creative community thrives."
    },
    {
      icon: "/briefcase.svg",
      title: "Business",
      description: "Connect with diverse communities of creators on a platform designed for seamless collaboration."
    },
    {
      icon: "/home.svg",
      title: "Agencies",
      description: "Connect with emerging creative voices and the latest industry trends for a competitive edge."
    }
  ];

  return (
    <div className="bg-[#0E0E0E] min-h-screen">
      <div className="max-w-[1540px] mx-auto px-4 sm:px-6 lg:px-12">
        <h1 className="text-white font-bold text-3xl sm:text-4xl md:text-5xl text-center pt-32 pb-16">
          Who is REF3R for?
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map((card, index) => (
            <div 
              key={index}
              className="bg-[#1A1919] rounded-[20px] p-8 flex flex-col"
            >
              <Image 
                src={card.icon} 
                alt={`${card.title} icon`} 
                width={120} 
                height={120} 
                className="mb-6"
              />
              <h2 className="text-white font-medium text-2xl sm:text-3xl mb-4">
                {card.title}
              </h2>
              <p className="text-[#D1D1D1] text-base sm:text-lg">
                {card.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Hero_learn_more