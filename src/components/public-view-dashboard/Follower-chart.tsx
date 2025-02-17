'use client'

import React from 'react'
import { ChevronUp } from 'lucide-react'
import { TrendingUp } from "lucide-react"
import { CartesianGrid, Line, LineChart, XAxis } from "recharts"
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


const Followerchart = () => {
  const chartData = [
    { month: "June", desktop: 86 },
    { month: "July", desktop: 105 },
    { month: "August", desktop: 337 },
    { month: "September", desktop: 23 },
    { month: "October", desktop: 209 },
  ]
  const chartConfig = {
    desktop: {
      label: "Followers",
      color: "#00C4C9",
    },
  } satisfies ChartConfig
  return (
    <div className='bg-[#0E0E0E]  absolute md:top-4 md:left-[500px]  lg:top-2 xl:top-56 xl:left-[205px] lg:left-[400px] top-[230px] left-4'>
      <div className='flex flex-col bg-[#1A1919] h-[200px] w-[300px] md:w-[300px] xl:h-[240px] xl:w-[480px] rounded-[20px] py-1'>
        <div className='flex justify-between items-center'>
          <h1 className='font-medium text-sm text-[#FFFFFF] px-4'>Total Aggregated Followers</h1>
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
        <div className='flex justify-center items-center'>
          <Card className='w-[400px]'>
            <CardContent className=''>
              <ChartContainer config={chartConfig}>
                <LineChart
                  accessibilityLayer
                  data={chartData}
                  margin={{
                    left: 12,
                    right: 12,
                    top: 12,
                  }}
                >
                  <CartesianGrid vertical={false} />
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

export default Followerchart
