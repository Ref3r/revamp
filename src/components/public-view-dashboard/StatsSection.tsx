"use client";

import React from "react";
import StatCard from "./StatCard";

export default function StatsSection() {
  const stats = [
    { title: "Clout", value: "4645", change: "+18%", changeColor: "green" },
    {
      title: "Popularity Score",
      value: "4645",
      change: undefined,
      changeColor: undefined,
    },
    {
      title: "Engagement Rate",
      value: "4.5%",
      change: "-9%",
      changeColor: "red",
    },
    {
      title: "Approval Rating",
      value: "4.5",
      change: undefined,
      changeColor: undefined,
    },
  ];

  return (
    <div className="h-full grid grid-cols-1 sm:grid-cols-2 gap-2">
      {stats.map((stat, index) => (
        <StatCard
          key={index}
          title={stat.title}
          value={stat.value}
          change={stat.change}
          changeColor={stat.changeColor}
        />
      ))}
    </div>
  );
}