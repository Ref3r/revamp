import React from 'react';
import { ChevronDown } from 'lucide-react';
import { Button } from '@lemonsqueezy/wedges';

interface InstagramTemplatesProps {
  onSelect: () => void;
}

const InstagramTemplates: React.FC<InstagramTemplatesProps> = ({ onSelect }) => {
  const templates = [
    {
      id: 1,
      title: "Shop My Feed",
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80",
      selected: true
    },
    {
      id: 2,
      title: "Facebook Posts",
      image: "https://images.unsplash.com/photo-1526047932273-341f2a7631f9?w=800&q=80",
      selected: false
    },
    {
      id: 3,
      title: "Social Feed Posts",
      image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&q=80",
      selected: false
    },
    {
      id: 4,
      title: "My Recipe Feed",
      image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&q=80",
      selected: false
    },
    {
      id: 5,
      title: "Photo Collection",
      image: "https://images.unsplash.com/photo-1452457750107-cd084dce177d?w=800&q=80",
      selected: false
    }
  ];

  return (
    <div className="space-y-10 w-full max-w-7xl mx-auto px-4">
      <div className="flex justify-center"> {/* Center align the button */}
        <Button 
          className="w-full max-w-xs p-1.5 bg-[#111111] border border-[#333333] rounded-lg flex items-center text-white hover:bg-[#1a1a1a] transition-colors"
        >
          <span className="text-sm">Instagram (5 Templates)</span>
          <ChevronDown className="w-4 h-4 ml-auto" /> {/* Align icon to the right */}
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {templates.map((template) => (
          <div 
            key={template.id}
            onClick={onSelect}
            className="relative aspect-square bg-[#111111] rounded-lg overflow-hidden cursor-pointer group"
          >
            <img 
              src={template.image} 
              alt={template.title}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            {template.selected && (
              <div className="absolute top-3 right-3">
                <span className="bg-[#0BA360] text-white text-xs px-3 py-1 rounded-full">
                  Selected
                </span>
              </div>
            )}
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-opacity duration-300" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default InstagramTemplates;
