"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@lemonsqueezy/wedges";
import { Menu, X, ChevronsRight } from "lucide-react";
import Link from "next/link";
import JoinWaitlistButton from "../join-waitlist/JoinWaitlistButton";


const Navbar_learn_more = () => {
  const [isOpen, setIsOpen] = useState(false);
 
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
      setIsOpen(false);
    }
  };

  const navLinks = [
    { href: "/", label: "Whitepaper" },
    { 
      label: "Feature", 
      onClick: () => scrollToSection("Second_section")
    },
    { 
      label: "FAQ",
      onClick: () => scrollToSection("Sixth_section")
    },
    {
      href: "https://medium.com/@kishenmaran06/collaborative-marketing-the-new-era-of-modern-marketing-57ac2b1843f7",
      target: "_blank",
      rel: "noopener noreferrer",
      label: "Blog",
    },
  ];

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30"
          onClick={() => setIsOpen(false)}
        />
      )}

      <nav className="fixed top-0 left-0 right-0 bg-[#0E0E0E] py-5 px-4 sm:px-6 lg:px-12 flex justify-between items-center z-40">
        {/* Logo */}
        <div className="relative z-40">
          <Link href="/">
            <Image
              src="/logo.svg"
              alt="Logo"
              width={104}
              height={41}
              className="w-20 sm:w-24 lg:w-28"
            />
          </Link>
        </div>

        {/* Desktop Navigation Links */}
        <div className="hidden lg:flex justify-center items-center flex-1">
          <ul className="flex items-center space-x-8 xl:space-x-10 text-white">
            {navLinks.map((link, index) => (
              <li key={index}>
                {link.onClick ? (
                  <button
                    className="text-base font-normal hover:text-gray-300 transition-colors relative outline-none"
                    onClick={link.onClick}
                  >
                    {link.label}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full" />
                  </button>
                ) : (
                  <Link
                    href={link.href || "/"}
                    target={link.target}
                    rel={link.rel}
                    className="text-base font-normal hover:text-gray-300 transition-colors relative outline-none"
                  >
                    {link.label}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full" />
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* Desktop Buttons */}
        <div className="hidden lg:flex items-center space-x-4">
          {/* <Button
            className="text-white rounded-full px-6 py-2 hover:bg-white/10 transition-colors border-none outline-none focus:outline-none focus:ring-0"
            onClick={() => router.push("/sign-up")}
          >
            Log In
          </Button>
          <Button className="bg-white text-black rounded-full px-6 py-2 hover:bg-gray-100 transition-colors border-none outline-none focus:outline-none focus:ring-0">
            <Link href="/" className="flex items-center gap-2">
              <span>Get Started</span>
              <ChevronsRight className="w-5 h-5" />
            </Link>
          </Button> */}

<JoinWaitlistButton />

          {/* <Button className="bg-white text-black rounded-full px-6 py-2 hover:bg-gray-100 transition-colors border-none outline-none focus:outline-none focus:ring-0">
            <Link href="/" className="flex items-center gap-2">
              <span>Join Waitlist</span>
              <ChevronsRight className="w-5 h-5" />
            </Link>
          </Button> */}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden z-50 p-2 hover:bg-white/10 rounded-full transition-colors border-none outline-none focus:outline-none focus:ring-0"
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} color="white" /> : <Menu size={24} color="white" />}
        </button>

        {/* Mobile Menu */}
        <div
          className={`fixed top-0 right-0 h-screen w-4/5 max-w-sm bg-[#0E0E0E] shadow-lg transform transition-transform duration-300 ease-in-out z-40 lg:hidden ${
            isOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex flex-col h-full pt-20 px-6">
            <ul className="space-y-6 text-white">
              {navLinks.map((link, index) => (
                <li key={index}>
                  {link.onClick ? (
                    <button
                      className="text-lg font-normal hover:text-gray-300 transition-colors outline-none w-full text-left"
                      onClick={link.onClick}
                    >
                      {link.label}
                    </button>
                  ) : (
                    <Link
                      href={link.href || "/"}
                      target={link.target}
                      rel={link.rel}
                      className="text-lg font-normal hover:text-gray-300 transition-colors outline-none block"
                      onClick={() => setIsOpen(false)}
                    >
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>

            <div className="flex flex-col space-y-4 mt-8">
              {/* <Button className="text-white rounded-full px-6 py-3 hover:bg-white/10 transition-colors w-full border-none outline-none focus:outline-none focus:ring-0">
                <Link href="/">Log In</Link>
              </Button>
              <Button className="bg-white text-black rounded-full px-6 py-3 hover:bg-gray-100 transition-colors w-full border-none outline-none focus:outline-none focus:ring-0">
                <Link href="/" className="flex items-center justify-center gap-2">
                  <span>Get Started</span>
                  <ChevronsRight className="w-5 h-5" />
                </Link>
              </Button> */}

<JoinWaitlistButton />

              {/* <Button className="bg-white text-black rounded-full px-6 py-3 hover:bg-gray-100 transition-colors w-full border-none outline-none focus:outline-none focus:ring-0">
                
                  <span>Join waitlist</span>
                  <ChevronsRight className="w-5 h-5" />
                
              </Button> */}
            </div>
          </div>
        </div>
      </nav>
      <div className="h-16 sm:h-20" />
    </>
  );
};

export default Navbar_learn_more;