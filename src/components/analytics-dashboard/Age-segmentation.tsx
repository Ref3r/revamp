// Age-segmentation.tsx
"use client";
import React from 'react';
import { BarChart, Bar, XAxis, ResponsiveContainer, LabelList } from 'recharts';

interface AgeSegmentationProps {
  className?: string;
}

const AgeSegmentation: React.FC<AgeSegmentationProps> = ({ className }) => {
  const data = [
    { name: '180-180', female: 180, male: 180 },
    { name: '120-100', female: 120, male: 100 },
    { name: '95-80', female: 95, male: 80 },
    { name: '165-110', female: 165, male: 110 },
    { name: '70+', female: 85, male: 60 },
  ];

  const renderCustomizedLabel = (props: any) => {
    const { x, y, width, height, value } = props;
    
    return (
      <text 
        x={x + width / 2} 
        y={y + height / 2} 
        fill="white" 
        textAnchor="middle" 
        dominantBaseline="central"
        fontSize={12}
        fontWeight="bold"
      >
        {value}
      </text>
    );
  };

  return (
    <div className={`bg-[#1A1919] rounded-[20px] p-4 h-full  ${className}`}>
      <div className="flex justify-between items-center mb-4">
        <p className="text-white font-medium text-base">Segmentation by age</p>
      </div>
      
      <div className="w-full h-[240px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart 
            data={data}
            margin={{ top: 0, right: 20, left: 20, bottom: 30 }}
            barGap={0}
            barCategoryGap={40}
          >
            <XAxis 
              dataKey="name" 
              axisLine={false}
              tickLine={false}
              tick={{ fill: 'white', fontSize: 12 }}
              tickFormatter={(value) => value} 
            />
            <Bar 
              dataKey="female" 
              fill="#F72585" 
              barSize={50}
              radius={[8, 0, 0, 8]} 
              name="Female"
            >
              <LabelList 
                dataKey="female" 
                position="center" 
                fill="white" 
                fontSize={12} 
                fontWeight="bold" 
              />
            </Bar>
            <Bar 
              dataKey="male" 
              fill="#5D00D3" 
              barSize={50}
              radius={[0, 8, 8, 0]} 
              name="Male"
            >
              <LabelList 
                dataKey="male" 
                position="center" 
                fill="white" 
                fontSize={12} 
                fontWeight="bold" 
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
      
      <div className="flex items-center space-x-8 -mt-7 pl-4">
        <div className="flex items-center">
          <div className="w-8 h-4 rounded-full bg-[#F72585] mr-3"></div>
          <span className="text-white text-sm">Female</span>
        </div>
        <div className="flex items-center">
          <div className="w-8 h-4 rounded-full bg-[#5D00D3] mr-3"></div>
          <span className="text-white text-sm">Male</span>
        </div>
      </div>
    </div>
  );
};

export default AgeSegmentation;