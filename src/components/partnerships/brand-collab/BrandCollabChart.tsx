'use client';

import React from 'react';
import dynamic from 'next/dynamic';

// Dynamically import Recharts components with SSR disabled
import { BarChart, Bar, ResponsiveContainer } from 'recharts';

const Brandcollabchart = () => {
  const chartData = [
    { month: "Jan", collabs: 42 },
    { month: "Feb", collabs: 80 },
    { month: "Mar", collabs: 60 },
    { month: "Apr", collabs: 25 },
    { month: "May", collabs: 50 },
    { month: "Jun", collabs: 55 },
    { month: "Jul", collabs: 58 },
    { month: "Aug", collabs: 60 },
    { month: "Sep", collabs: 55 },
    { month: "Oct", collabs: 58 },
    { month: "Nov", collabs: 60 },
    { month: "Dec", collabs: 62 },
  ];

  return (
    <div className="bg-[#1A191933] rounded-lg p-4">
      <div className="mb-2">
        <h3 className="text-white text-base">4 Brand Collabs this month</h3>
      </div>
      
      <div className="h-[120px] w-full">
        {/* Chart will only render client-side */}
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
          >
            <Bar 
              dataKey="collabs" 
              fill="#0B4357" 
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Brandcollabchart;