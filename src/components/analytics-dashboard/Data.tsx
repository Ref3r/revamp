import React from "react";
import { ChevronUp, ChevronDown } from "lucide-react";

const Data = () => {
  return (
    <div className="absolute top-20 left-0 lg:left-28  w-full px-4 flex flex-wrap justify-center md:justify-start gap-5">
      {[
        { label: "Total Posts", value: "4645", change: "+18%", icon: <ChevronUp className="h-3 w-3 text-[#0BA360]" />, color: "text-[#0BA360]" },
        { label: "Average Likes", value: "25,645", change: "+18%", icon: <ChevronUp className="h-3 w-3 text-[#0BA360]" />, color: "text-[#0BA360]" },
        { label: "Average Comments", value: "654", change: "-9%", icon: <ChevronDown className="h-3 w-3 text-[#FF3B30]" />, color: "text-[#FF3B30]" },
        { label: "Average Shares", value: "645", change: "-9%", icon: <ChevronDown className="h-3 w-3 text-[#FF3B30]" />, color: "text-[#FF3B30]" },
        { label: "Engagement Rate", value: "9%", change: "+18%", icon: <ChevronUp className="h-3 w-3 text-[#0BA360]" />, color: "text-[#0BA360]" },
        { label: "Average Impressions", value: "23,000", change: "-9%", icon: <ChevronDown className="h-3 w-3 text-[#FF3B30]" />, color: "text-[#FF3B30]" },
      ].map((item, index) => (
        <div
          key={index}
          className="bg-[#1A191999] w-48 h-24 rounded-[20px] flex flex-col px-6 py-5"
        >
          <div>
            <p className="font-medium text-sm text-[#FFFFFF7A]">{item.label}</p>
          </div>
          <div className="flex justify-between items-center">
            <div>
              <p className="font-medium text-[#FFFFFF] text-lg">{item.value}</p>
            </div>
            <div className="flex items-center">
              {item.icon}
              <span className={`text-[12px] font-medium ${item.color}`}>{item.change}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Data;