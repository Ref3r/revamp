"use client";
import { Button } from "@lemonsqueezy/wedges";

interface SubmitButtonProps {
  onClick: () => void;
  onBack?: () => void;
  isLoading?: boolean;
  disabled?: boolean;
  label?: string;
}

export default function SubmitButton({
  onClick,
  onBack,
  isLoading = false,
  disabled = false,
  label = "Next",
}: SubmitButtonProps) {
  return (
    <div className="max-w-md mx-auto flex flex-col gap-5 mt-6">
      <Button
        className="w-full bg-gradient-to-r from-[#0BA360] to-[#27A980] hover:from-[#27A980] hover:to-[#0BA360] text-white py-3 rounded-lg"
        onClick={onClick}
        disabled={disabled || isLoading}
      >
        {isLoading ? "Loading..." : label}
      </Button>

      {onBack && (
        <Button
          className="w-full bg-[#262626] hover:bg-[#4D4D4D] text-white py-3 rounded-lg"
          onClick={onBack}
        >
          Go Back
        </Button>
      )}
    </div>
  );
}
