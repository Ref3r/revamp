"use client";

import React from 'react'
import Image from 'next/image'
import { Button } from "@lemonsqueezy/wedges";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { ChevronsRight } from "lucide-react";
import Link from 'next/link';

const Navbar_learn_more = () => {
    const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <nav className="bg-[#0E0E0E] py-4 px-6 md:px-12 flex justify-between items-center">
      {/* Logo (Left Side) */}
      <div className="logo">
        <Image src="/logo.svg" alt="Logo" width={104} height={40.7} />
      </div>

      {/* Navigation Links (Centered) */}
      <div className="hidden md:flex justify-center items-center flex-1">
        <ul className="flex items-center space-x-10 text-white text-[15px] font-normal">
          <li className="animation">
            <Link href="/">Whitepaper</Link>
          </li>
          <li className="animation">
            <Link href="/">Feauture</Link>
          </li>
          <li className="animation">
            <Link href="/">FAQ</Link>
          </li>
          <li className="animation">
            <Link href="/">Blog</Link>
          </li>
        </ul>
      </div>

      {/* Buttons (Right Side) */}
      <div className="hidden md:flex space-x-4">
        <Button className="border text-white rounded-full w-[95px] h-[48px] font-medium">
          <Link href="/">Log In</Link>
        </Button>
       <Button className="bg-white text-[#0E0E0E] rounded-full w-[175px] h-[49px] font-medium flex justify-center items-center">
          <Link href="/" className="flex items-center gap-2">
            <span>Get Started</span>
            <ChevronsRight className="w-6 h-6 text-[#0E0E0E]" />
          </Link>
       </Button>
      </div>

      {/* Hamburger Menu (Mobile) */}
      <div className="md:hidden">
        <button onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} color="white" /> : <Menu size={28} color="white" />}
        </button>
      </div>

      {/* Mobile Menu (Opens when isOpen is true) */}
      <div
        className={`absolute top-[70px] left-0 w-full bg-[#0E0E0E] md:hidden transition-all duration-300 ease-in-out ${
          isOpen ? "block" : "hidden"
        }`}
      >
        <ul className="flex flex-col items-center space-y-6 text-white text-[15px] font-normal mt-4">
          <li className="animation">
            <Link href="/">Whitepaper</Link>
          </li>
          <li className="animation">
            <Link href="/">Feauture</Link>
          </li>
          <li className="animation">
            <Link href="/">FAQ</Link>
          </li>
           <li className="animation">
            <Link href="/">Blog</Link>
          </li>       
        </ul>

        {/* Buttons (Side by Side in Mobile Menu) */}
        <div className="flex justify-center items-center gap-4 mt-6">
          <Button className="border text-white rounded-full w-[95px] h-[48px] font-medium">
            <Link href="/">Log In</Link>
          </Button>
          <Button className="bg-white text-[#0E0E0E] rounded-full w-[175px] h-[49px] font-medium flex justify-center items-center">
          <Link href="/" className="flex items-center gap-2">
            <span>Get Started</span>
            <ChevronsRight className="w-6 h-6 text-[#0E0E0E]" />
          </Link>
       </Button>
        </div>
      </div>
    </nav>
    </div>
  )
}

export default Navbar_learn_more
