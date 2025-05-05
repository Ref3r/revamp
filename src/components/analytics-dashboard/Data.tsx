// Data.tsx
import React from "react";
import { ChevronUp, ChevronDown } from "lucide-react";

type AnalyticsItem = {
  label: string;
  data: any[];
  totalValue: number;
  average?: boolean;
};

type MockChange = {
  change: string;
  isPositive: boolean;
};

type MockChangesMap = {
  [key: string]: MockChange;
};

const Data = () => {
  // Using the provided analyticsData
  const analyticsData: AnalyticsItem[] = [
    {
      "label": "Views",
      "data": [],
      "totalValue": 10629
    },
    {
      "label": "Estimated Minutes Watched",
      "data": [],
      "totalValue": 0
    },
    {
      "label": "Average View Duration",
      "average": true,
      "data": [],
      "totalValue": 0
    },
    {
      "label": "Average View Percentage",
      "average": true,
      "data": [],
      "totalValue": 0
    },
    {
      "label": "Subscribers Gained",
      "data": [],
      "totalValue": 0
    },
    {
      "label": "Subscribers Lost",
      "data": [],
      "totalValue": 0
    },
    {
      "label": "Total Subscribers",
      "data": [],
      "totalValue": 20
    },
    {
      "label": "Likes",
      "data": [],
      "totalValue": 0
    },
    {
      "label": "Total Videos",
      "data": [],
      "totalValue": 2
    }
  ];

  // Mock data for change percentages that don't exist in analyticsData
  const mockChanges: MockChangesMap = {
    "Views": { change: "+12%", isPositive: true },
    "Estimated Minutes Watched": { change: "+5%", isPositive: true },
    "Average View Duration": { change: "-3%", isPositive: false },
    "Average View Percentage": { change: "+7%", isPositive: true },
    "Subscribers Gained": { change: "+20%", isPositive: true },
    "Subscribers Lost": { change: "+15%", isPositive: false },
    "Total Subscribers": { change: "+10%", isPositive: true },
    "Likes": { change: "-2%", isPositive: false },
    "Total Videos": { change: "+50%", isPositive: true },
  };

  // Format values for display
  const formatValue = (value: number, label: string): string => {
    if (label.includes("Percentage")) {
      return `${value}%`;
    } else if (value >= 1000) {
      return value.toLocaleString();
    }
    return value.toString();
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-4">
      {analyticsData.map((item, index) => (
        <div
          key={index}
          className="bg-[#1A1919] rounded-[20px] p-4 flex flex-col justify-between"
        >
          <p className="font-medium text-sm text-[#FFFFFF7A]">{item.label}</p>
          <div className="flex justify-between items-center mt-2">
            <p className="font-medium text-white text-lg">{formatValue(item.totalValue, item.label)}</p>
            <div className="flex items-center">
              {mockChanges[item.label].isPositive ? (
                <ChevronUp className="h-3 w-3 text-[#0BA360]" />
              ) : (
                <ChevronDown className="h-3 w-3 text-[#FF3B30]" />
              )}
              <span className={`text-xs font-medium ${mockChanges[item.label].isPositive ? 'text-[#0BA360]' : 'text-[#FF3B30]'}`}>
                {mockChanges[item.label].change}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Data;