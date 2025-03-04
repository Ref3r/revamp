import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { LayoutGrid, Users, MessageCircle, HeartHandshake, BarChart } from 'lucide-react';

const navItems = [
  { href: '#', icon: '/layout-grid.svg', alt: 'Dashboard', component: <LayoutGrid size={20} /> },
  { href: '#', icon: '/users.svg', alt: 'Users', component: <Users size={20} /> },
  { href: '#', icon: '/message-circle.svg', alt: 'Messages', component: <MessageCircle size={20} /> },
  { href: '#', icon: '/heart-handshake.svg', alt: 'Partnerships', component: <HeartHandshake size={20} /> },
  { href: '#', icon: '/bar-chart.svg', alt: 'Analytics', component: <BarChart size={20} /> }
];

const Sidebar = ({ isMobile = false }) => {
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
        <Link href="#" className="flex items-center justify-center p-2">
          <Image 
            src="/profile-photo.svg"
            width={24}
            height={24}
            alt="Profile"
            className="rounded-full"
          />
        </Link>
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

        {/* Profile/Settings */}
        <div className="pb-6">
          <Link href="#" className="block">
            <Image 
              src="/profile-photo.svg"
              width={36}
              height={36}
              alt="Profile"
              className="w-8 h-8 rounded-full"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;