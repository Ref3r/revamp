"use client";
import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  LayoutGrid,
  Users,
  MessageCircle,
  HeartHandshake,
  BarChart,
  LogOut,
  Share2,
  User,
  ChevronUp,
} from "lucide-react";

const navItems = [
  {
    href: "/dashboard",
    icon: "/layout-grid.svg",
    alt: "Dashboard",
    component: <LayoutGrid size={20} />,
  },
  {
    href: "/communities",
    icon: "/users.svg",
    alt: "Users",
    component: <Users size={20} />,
  },
  {
    href: "/chat",
    icon: "/message-circle.svg",
    alt: "Messages",
    component: <MessageCircle size={20} />,
  },
  {
    href: "/partnerships",
    icon: "/heart-handshake.svg",
    alt: "Partnerships",
    component: <HeartHandshake size={20} />,
  },
  {
    href: "/analytics-dashboard",
    icon: "/bar-chart.svg",
    alt: "Analytics",
    component: <BarChart size={20} />,
  },
];

const Sidebar = ({ isMobile = false }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  if (isMobile) {
    return (
      <div className="flex justify-between items-center w-full">
        {navItems.map((item, index) => (
          <Link
            key={index}
            href={item.href}
            className="flex items-center justify-center p-2 text-white hover:text-gray-300"
          >
            <span className="text-gray-400 hover:text-white transition-colors">
              {item.component}
            </span>
          </Link>
        ))}
        <div className="relative" ref={dropdownRef}>
          <button 
            onClick={toggleDropdown} 
            className="flex items-center justify-center p-2 focus:outline-none"
          >
            <Image
              src="/profile-photo.svg"
              width={24}
              height={24}
              alt="Profile"
              className="rounded-full"
            />
          </button>
          
          {showDropdown && (
            <div className="absolute right-0 mt-2 w-48 bg-[#1A1919] rounded-lg shadow-lg py-1 z-10">
              <Link 
                href="/profile" 
                className="flex items-center px-4 py-2 text-sm text-white hover:bg-[#2A2A2A]"
              >
                <User size={16} className="mr-2" />
                Profile
              </Link>
              <Link 
                href="/connect" 
                className="flex items-center px-4 py-2 text-sm text-white hover:bg-[#2A2A2A]"
              >
                <Share2 size={16} className="mr-2" />
                Connect Social Media
              </Link>
              <button 
                className="flex items-center px-4 py-2 text-sm text-white hover:bg-[#2A2A2A] w-full text-left"
                onClick={() => console.log("Logout clicked")}
              >
                <LogOut size={16} className="mr-2" />
                Log Out
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="h-full">
      <div className="flex flex-col justify-between items-center bg-[#1A1919] w-14 my-4 rounded-2xl h-[calc(100vh-2rem)]">
        {/* Logo */}
        <div className="pt-6">
          <Image
            src="/r-logo.svg"
            width={30}
            height={20}
            alt="Logo"
            className="w-8 h-8"
          />
        </div>

        {/* Navigation */}
        <nav className="flex-1 flex flex-col items-center justify-center">
          <ul className="space-y-8">
            {navItems.map((item, index) => (
              <li key={index}>
                <Link
                  href={item.href}
                  className="block transition-colors duration-200 hover:text-white focus:text-white"
                >
                  <Image
                    src={item.icon}
                    width={18}
                    height={18}
                    alt={item.alt}
                    className="w-5 h-5"
                  />
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Profile/Settings with Dropdown */}
        <div className="pb-6 relative" ref={dropdownRef}>
          <button 
            onClick={toggleDropdown}
            className="flex items-center focus:outline-none"
          >
            <Image
              src="/profile-photo.svg"
              width={36}
              height={36}
              alt="Profile"
              className="w-8 h-8 rounded-full"
            />
            {showDropdown && (
              <ChevronUp size={12} className="absolute -top-3 text-gray-400" />
            )}
          </button>
          
          {showDropdown && (
            <div className="absolute bottom-14 left-16 w-48 bg-[#1A1919] rounded-lg shadow-lg py-1 z-10">
              <Link 
                href="/profile" 
                className="flex items-center px-4 py-2 text-sm text-white hover:bg-[#2A2A2A]"
              >
                <User size={16} className="mr-2" />
                Profile
              </Link>
              <Link 
                href="/connect" 
                className="flex items-center px-4 py-2 text-sm text-white hover:bg-[#2A2A2A]"
              >
                <Share2 size={16} className="mr-2" />
                Connect Social Media
              </Link>
              <button 
                className="flex items-center px-4 py-2 text-sm text-white hover:bg-[#2A2A2A] w-full text-left"
                onClick={() => console.log("Logout clicked")}
              >
                <LogOut size={16} className="mr-2" />
                Log Out
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
