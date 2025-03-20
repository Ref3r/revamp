import React from 'react';
import Image from 'next/image';

const RecentPartners = () => {
  const partners = [
    { 
      id: 1, 
      name: 'Volkswagen',
      logoSrc: '/volkswagen.svg',
      status: 'Active',
      statusColor: 'text-[#0BA360]'
    },
    { 
      id: 2, 
      name: 'McDonalds',
      logoSrc: '/mcdonalds.svg',
      status: 'Completed',
      statusColor: 'text-[#FFFFFF7A]'
    }
  ];

  return (
    <div className="bg-[#1A1919] rounded-2xl p-4 h-full min-h-[160px]">
      <h2 className="text-gray-300 text-base mb-4">Recent Partnerships</h2>
      
      <div className="space-y-4">
        {partners.map((partner) => (
          <div key={partner.id} className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-8 h-8 relative flex-shrink-0">
                <Image 
                  src={partner.logoSrc} 
                  alt={partner.name} 
                  width={32} 
                  height={32}
                />
              </div>
              <span className="ml-4 text-white text-sm font-medium">
                {partner.name}
              </span>
            </div>
            
            <span className={`text-xs font-medium ${partner.statusColor}`}>
              {partner.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentPartners;