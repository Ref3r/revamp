"use client";

import React from "react";

interface StatCardProps {
  title: string;
  value: string | number;
  change?: string;
  changeColor?: string;
}

export default function StatCard({
  title,
  value,
  change,
  changeColor,
}: StatCardProps) {
  return (
    <div className="bg-[#1A1919CC] rounded-xl p-4">
      <div className="text-sm text-gray-300 mb-1">{title}</div>
      <div className="flex items-baseline">
        <span className="text-2xl font-bold text-white">{value}</span>
        {change && (
          <span className={`ml-2 text-xs text-${changeColor}-500`}>
            {change}
          </span>
        )}
      </div>
    </div>
  );
}
