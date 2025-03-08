'use client'

import React from 'react'
import { ChevronUp } from 'lucide-react'
import { TrendingUp } from "lucide-react"
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"


const Followeranalytics = () => {
  const chartData = [
    { month: "June", desktop: 12000 },
    { month: "July", desktop: 28000 },
    { month: "August", desktop: 38000 },
    { month: "September", desktop: 22000 },
    { month: "October", desktop: 14000 },
  ]

  const yAxisTicks = [0, 10000, 20000, 30000, 40000, 50000];
  const chartConfig = {
    desktop: {
      label: "Followers",
      color: "#00C4C9",
    },
  } satisfies ChartConfig
  return (
    <div className='bg-[#0E0E0E]  absolute top-48 left-32 '>
      <div className='flex flex-col bg-[#1A1919] w-[620px] rounded-[20px] '>
        <div className='flex justify-between items-center pt-4'>
          <h1 className='font-medium text-sm text-[#FFFFFF] px-4 '>Total Aggregated Followers</h1>
          <div className='flex  justify-center items-center'>
            <div>
              <p className='font-medium text-[20px] text-[#FFFFFF] px-2'>4645</p>
            </div>
            <div className='flex items-center'>
              <ChevronUp className='h-3 w-3 text-[#0BA360]' />
              <span className='text-[12px] font-medium text-[#0BA360] pr-4'>+18%</span>
            </div>
          </div>
        </div>
        <div className='flex justify-center items-center '>
          <Card className='w-[600px]'>
            <CardContent className=''>
              <ChartContainer config={chartConfig}>
                <LineChart
                  accessibilityLayer
                  data={chartData}
                  margin={{
                    left: 12,
                    right: 12,
                    top: 50,
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
                    tickFormatter={(value) => value.slice(0, 3)}
                  />
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent hideLabel />}
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
                    dataKey="desktop"
                    type="natural"
                    stroke="#00C4C9"
                    strokeWidth={4}
                    dot={false}
                  />
                </LineChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default Followeranalytics
