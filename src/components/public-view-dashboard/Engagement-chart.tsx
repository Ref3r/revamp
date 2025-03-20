"use client"

import React from "react"
import { ChevronUp } from "lucide-react"
import { CartesianGrid, Line, LineChart, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts"

const EngagementChart = () => {
  // Data points that match the engagement chart in the image
  const chartData = [
    { month: "Jun", value: 2 },
    { month: "Jul", value: 3.5 },
    { month: "Aug", value: 5 },
    { month: "Sep", value: 3 },
    { month: "Oct", value: 2.5 },
  ]
  
  // Format Y-axis values for percentage
  const formatYAxis = (value: number) => {
    if (value === 0) return '0'
    return `${value}%`
  }
  
  // Custom tooltip component
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-[#0E0E0E] px-2 py-1 rounded-md border border-gray-700 text-xs">
          <p className="text-white">{`${payload[0].value}%`}</p>
        </div>
      );
    }
    return null;
  };
  
  return (
    <div className="bg-[#1A1919] rounded-2xl p-6">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-gray-300 text-sm">Average Engagement Rate</h2>
        <div className="flex items-center">
          <p className="text-white font-medium text-xl">5%</p>
          <div className="flex items-center ml-2">
            <ChevronUp className="h-3 w-3 text-[#0BA360]" />
            <span className="text-xs font-medium text-[#0BA360]">+18%</span>
          </div>
        </div>
      </div>
      
      <div className="h-[220px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={chartData}
            margin={{
              top: 20,
              right: 12,
              left: 12,
              bottom: 5,
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
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#666', fontSize: 12 }}
              dy={5}
            />
            <Tooltip 
              content={<CustomTooltip />} 
              cursor={false}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#666', fontSize: 12 }}
              ticks={[0, 2, 4, 6, 8]}
              tickFormatter={formatYAxis}
              width={40}
            />
            <Line 
              type="monotone" 
              dataKey="value" 
              stroke="#00C4C9" 
              strokeWidth={4} 
              dot={{ stroke: '#00C4C9', fill: '#00C4C9', strokeWidth: 4, r: 4 }} 
              activeDot={{ fill: "#00C4C9", stroke: "#00C4C9", r: 5 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default EngagementChart