"use client";
import React from "react";

import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const Brandcollabchart = () => {
  const chartData = [
    { month: "January", desktop: 186 },
    { month: "February", desktop: 305 },
    { month: "March", desktop: 237 },
    { month: "April", desktop: 73 },
    { month: "May", desktop: 209 },
    { month: "June", desktop: 214 },
    { month: "July", desktop: 214 },
    { month: "August", desktop: 214 },
    { month: "September", desktop: 214 },
    { month: "October", desktop: 214 },
    { month: "November", desktop: 214 },
    { month: "December", desktop: 214 },
  ];
  const chartConfig = {
    desktop: {
      label: "Collabs",
      color: "#0B4357",
    },
  } satisfies ChartConfig;
  return (
    <div className="bg-[#1A191933] rounded-[15px] absolute top-24 left-[780px] flex flex-col">
      <div>
        <h1 className="font-medium text-base text-[#FFFFFF] ml-14 pb-14">
          4 Brand Collabs this month
        </h1>
      </div>
      <div>
        <Card>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-52 w-[600px]">
              <BarChart barCategoryGap={40} accessibilityLayer data={chartData}>
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                  tickFormatter={(value) => value.slice(0, 3)}
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent hideLabel />}
                />
                <Bar
                  dataKey="desktop"
                  fill="var(--color-desktop)"
                  radius={8}
                  activeBar={{ fill: "#00C4C9" }}
                />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Brandcollabchart;
