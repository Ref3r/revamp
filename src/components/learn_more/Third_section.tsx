import React from 'react';
import Image from 'next/image';

interface CreatorType {
  id: number;
  title: string;
  imageUrl: string;
  row: 1 | 2 | 3;
}

const CreatorGrid = () => {
  const creators: CreatorType[] = [
    // First row
    { id: 1, title: '', imageUrl: '', row: 1 },
    { id: 2, title: 'Content Creators', imageUrl: '/unsplash_4bL8yZ8-qQU.svg', row: 1 },
    { id: 3, title: 'Musicians', imageUrl: '/unsplash_4bL8yZ8-qQU (1).svg', row: 1 },
    { id: 4, title: 'Designers', imageUrl: '/unsplash_4bL8yZ8-qQU (2).svg', row: 1 },
    { id: 5, title: 'Fashion Designers', imageUrl: '/unsplash_4bL8yZ8-qQU (3).svg', row: 1 },
    { id: 6, title: 'Copywriters', imageUrl: '/unsplash_4bL8yZ8-qQU (4).svg', row: 1 },
    { id: 7, title: '', imageUrl: '', row: 1 },
    
    // Second row
    { id: 8, title: '', imageUrl: '', row: 2 },
    { id: 9, title: 'Devs', imageUrl: '/unsplash_4bL8yZ8-qQU (5).svg', row: 2 },
    { id: 10, title: 'Architects', imageUrl: '/unsplash_4bL8yZ8-qQU (6).svg', row: 2 },
    { id: 11, title: 'Influencers', imageUrl: '/unsplash_4bL8yZ8-qQU (7).svg', row: 2 },
    { id: 12, title: 'Artists', imageUrl: '/unsplash_4bL8yZ8-qQU (8).svg', row: 2 },
    { id: 13, title: '', imageUrl: '', row: 2 },
    { id: 14, title: '', imageUrl: '', row: 2 },
    
    // Third row
    ...Array(7).fill(null).map((_, index) => ({
      id: 15 + index,
      title: '',
      imageUrl: '',
      row: 3 as const
    }))
  ];

  const getCardStyle = (row: number) => {
    const styles = {
      1: 'bg-[#190B30] border border-[#B491FF] border-opacity-15',
      2: 'bg-[#170C29] border border-[#B491FF] border-opacity-15',
      3: 'bg-[#140C1F]'
    };
    return styles[row as keyof typeof styles];
  };

  const CreatorCard = ({ title, imageUrl, row }: { title: string; imageUrl: string; row: number }) => (
    <div className={`relative aspect-square rounded-2xl sm:rounded-3xl overflow-hidden transition-all duration-300
      ${getCardStyle(row)}
      ${title ? 'hover:bg-opacity-90' : ''}`}
    >
      {title && (
        <div className="absolute inset-0 p-2 sm:p-3 md:p-4 flex flex-col">
          <p className="text-white text-xs sm:text-sm font-medium mb-1 sm:mb-2">{title}</p>
          <div className="relative flex-grow mt-auto">
            <Image
              src={imageUrl}
              alt={title}
              fill
              className="rounded-xl sm:rounded-2xl object-cover"
            />
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0E0E0E] to-[#0B0B0B]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 py-8 sm:py-12 md:py-16 lg:py-20">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <h1 className="text-white font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl mb-2 sm:mb-4">
            Wide list of creator needs
            <br className="hidden sm:block" />
            catered by Ref3r
          </h1>
          <div className="relative inline-block my-4">
            <span className="absolute bottom-5 sm:ml-0 ml-10 left-1/2 -translate-x-1/2 w-24 sm:w-32 h-1">
              <Image
                src="/creators.svg"
                alt="Underline"
                width={200}
                height={4}
                className="lg:max-w-[1360px] md:max-w-[1360px] "
              />
            </span>
          </div>
          <p className="text-white/80 text-sm sm:text-base md:text-lg mt-4 sm:mt-6 max-w-xl sm:max-w-2xl mx-auto px-4">
            From design to storytelling, we empower every creator's journey with
            tailored tools and opportunities.
          </p>
        </div>

        <div className="relative overflow-hidden">
          {/* Left Gradient */}
          <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-16 md:w-24 
            bg-gradient-to-r from-[#0E0E0E] to-transparent z-10" />
          
          {/* Right Gradient */}
          <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-16 md:w-24 
            bg-gradient-to-l from-[#0E0E0E] to-transparent z-10" />
          
          {/* Grid */}
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 gap-2 sm:gap-3 md:gap-4 relative">
            {creators.map((creator) => (
              <CreatorCard
                key={creator.id}
                title={creator.title}
                imageUrl={creator.imageUrl}
                row={creator.row}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatorGrid;