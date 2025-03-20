// Data.tsx
import React from "react";
import { ChevronUp, ChevronDown } from "lucide-react";

const Data = () => {
  const stats = [
    { label: "Total Posts", value: "4645", change: "+18%", isPositive: true },
    { label: "Average Likes", value: "25,645", change: "+18%", isPositive: true },
    { label: "Average Comments", value: "654", change: "-9%", isPositive: false },
    { label: "Average Shares", value: "645", change: "-9%", isPositive: false },
    { label: "Engagement Rate", value: "9%", change: "+18%", isPositive: true },
    { label: "Average Impressions", value: "23,000", change: "-9%", isPositive: false },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-6 gap-4">
      {stats.map((item, index) => (
        <div
          key={index}
          className="bg-[#1A1919] rounded-[20px] p-4 flex flex-col justify-between"
        >
          <p className="font-medium text-sm text-[#FFFFFF7A]">{item.label}</p>
          <div className="flex justify-between items-center mt-2">
            <p className="font-medium text-white text-lg">{item.value}</p>
            <div className="flex items-center">
              {item.isPositive ? (
                <ChevronUp className="h-3 w-3 text-[#0BA360]" />
              ) : (
                <ChevronDown className="h-3 w-3 text-[#FF3B30]" />
              )}
              <span className={`text-xs font-medium ${item.isPositive ? 'text-[#0BA360]' : 'text-[#FF3B30]'}`}>
                {item.change}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Data;