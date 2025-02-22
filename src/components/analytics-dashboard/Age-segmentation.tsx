"use client"
import React from 'react'
import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"
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
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

const Agesegmentation = () => {
    const chartData = [
  { desktop: 186, mobile: 80 },
  { desktop: 305, mobile: 200 },
  { desktop: 237, mobile: 120 },
  { desktop: 73, mobile: 190 },
  { desktop: 209, mobile: 130 },
  { desktop: 214, mobile: 140 },
]
const chartConfig = {
  desktop: {
    label: "Female",
    color: "#F72585",
  },
  mobile: {
    label: "Male",
    color: "#5D00D3",
  },
} satisfies ChartConfig
  return (
      <div className='absolute top-48 left-[770px]'>
          <div className='bg-[#1A1919] w-[620px] rounded-[20px]'>
          <div className='py-3'>
              <p className='text-[#FFFFFF] font-medium text-base px-4'>Segmentation by age</p>
          </div>
          <div className='text-[#FFFFFF]'>
              <CardContent className='w-[600px] hover:bg-[#1A1919]'>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
            <ChartLegend content={<ChartLegendContent />} />
            <Bar
              dataKey="desktop"
              stackId="a"
              fill="var(--color-desktop)"
              radius={[0, 0, 4, 4]}
            />
            <Bar
              dataKey="mobile"
              stackId="a"
              fill="var(--color-mobile)"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
              </div>
              </div>
    </div>
  )
}

export default Agesegmentation
