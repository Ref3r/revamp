import { Progress } from "@/components/ui/progress";
import React from "react";

interface ProgressBarComponentProps {
  progress: number;
}

const ProgressBarComponent: React.FC<ProgressBarComponentProps> = ({ progress }) => {
  return (
    <div className="flex justify-center w-full px-4 mb-8">
      <div className="flex items-center gap-2 w-full max-w-sm sm:max-w-md md:max-w-lg">
        <div className="flex-1 sm:w-80 md:w-96">
          <Progress
            value={progress}
            className="h-2 bg-neutral-800 rounded-full [&>div]:bg-emerald-500"
          />
        </div>
        <span className="text-xs sm:text-sm text-neutral-500 whitespace-nowrap">
          {progress}% Onboarding Complete
        </span>
      </div>
    </div>
  );
};

export default ProgressBarComponent;