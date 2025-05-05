"use client";
import { ReactNode } from "react";

interface FormContainerProps {
  title: string;
  children: ReactNode;
  error?: string;
  successMessage?: string;
}

export default function FormContainer({
  title,
  children,
  error,
  successMessage,
}: FormContainerProps) {
  return (
    <div className="min-h-screen bg-[#0E0E0E] flex items-center justify-center">
      <div className="w-full max-w-md p-8">
        <div className="text-center mb-8">
          <h1 className="text-[#FFFFFF] text-4xl font-semibold">{title}</h1>
        </div>

        {/* Error and success messages */}
        {error && (
          <div className="bg-red-500/10 border border-red-500 text-red-500 rounded-lg p-3 mb-4">
            {error}
          </div>
        )}

        {successMessage && (
          <div className="bg-green-500/10 border border-green-500 text-green-500 rounded-lg p-3 mb-4">
            {successMessage}
          </div>
        )}

        {children}
      </div>
    </div>
  );
} 