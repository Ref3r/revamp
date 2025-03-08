'use client'

import React from 'react'
import { ChevronUp } from 'lucide-react'
import { CartesianGrid, Line, LineChart, XAxis, YAxis, ResponsiveContainer } from "recharts"

const FollowerCharts = () => {
  const chartData = [
    { month: "Jun", value: 12000 },
    { month: "Jul", value: 28000 },
    { month: "Aug", value: 38000 },
    { month: "Sep", value: 22000 },
    { month: "Oct", value: 14000 },
  ]

  const yAxisTicks = [0, 10000, 20000, 30000, 40000, 50000];
  
  // Custom tooltip component
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-[#0E0E0E] px-2 py-1 rounded-md border border-gray-700 text-xs">
          <p className="text-white">{`${payload[0].value.toLocaleString()}`}</p>
        </div>
      );
    }
    return null;
  };
  
  return (
    <div className='bg-[#1A1919] rounded-2xl p-6'>
      <div className='flex justify-between items-center mb-2'>
        <h1 className='font-medium text-sm text-[#FFFFFF7A]'>Total Aggregated Followers</h1>
        <div className='flex justify-center items-center'>
          <div>
            <p className='font-medium text-[20px] text-[#FFFFFF] px-2'>4645</p>
          </div>
          <div className='flex items-center'>
            <ChevronUp className='h-3 w-3 text-[#0BA360]' />
            <span className='text-[12px] font-medium text-[#0BA360] pr-0'>+18%</span>
          </div>
        </div>
      </div>
      
      <div className='h-[220px] w-full'>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={chartData}
            margin={{
              left: 12,
              right: 12,
              top: 20,
              bottom: 5
            }}
          >
            <CartesianGrid 
              horizontal={true} 
              vertical={false} 
              stroke="#333" 
              strokeDasharray="3 3" 
            />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tick={{ fill: '#666', fontSize: 12 }}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#666', fontSize: 12 }}
              width={40}
              tickFormatter={(value) => {
                if (value === 0) return '0';
                return `${value / 10000}0K`;
              }}
              ticks={yAxisTicks}
              domain={[0, 50000]}
            />
            <Line 
              dataKey="value"
              type="monotone"
              stroke="#00C4C9"
              strokeWidth={4}
              dot={{ stroke: '#00C4C9', fill: '#00C4C9', strokeWidth: 2, r: 3 }}
              activeDot={{ fill: "#00C4C9", stroke: "#00C4C9", r: 5 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default FollowerCharts