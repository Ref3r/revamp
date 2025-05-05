"use client";
import { Button, Input, Label } from "@lemonsqueezy/wedges";
import { useRouter } from "next/navigation";
import { useState, FormEvent, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import FormContainer from "./FormContainer";
import GoogleAuthComponent from "./GoogleAuthComponent";

interface LoginComponentProps {
  onToggleSignup: () => void;
  onToggleForgotPassword: () => void;
}

export default function LoginComponent({
  onToggleSignup,
  onToggleForgotPassword,
}: LoginComponentProps) {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  // Handle login submission
  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccessMessage("");

    try {
      const response = await login({ email, password });

      if (response.success) {
        setSuccessMessage("Login successful!");
        router.push("/dashboard");
      } else {
        setError(response.message || "Login failed");
      }
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unexpected error occurred");
      }
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <FormContainer
      title="Login"
      error={error}
      successMessage={successMessage}
    >
      <form className="space-y-6" onSubmit={handleLogin}>
        <div>
          <Label
            htmlFor="email"
            className="text-[#FFFFFF] mb-2 block text-md"
          >
            Email
          </Label>
          <Input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail((e.target as HTMLInputElement).value)}
            placeholder="your@email.com"
            required
            className="w-full bg-[#0E0E0E] border border-[#FFFFFF33] text-white py-3 rounded-lg shadow-[0_1px_2px_0_rgba(18,18,23,0.05)]"
            style={{
              boxShadow: "0 1px 2px 0 rgba(18, 18, 23, 0.05)",
            }}
          />
        </div>

        <div>
          <Label
            htmlFor="password"
            className="text-[#FFFFFF] mb-2 block text-md"
          >
            Password
          </Label>
          <Input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword((e.target as HTMLInputElement).value)}
            placeholder="********"
            required
            className="w-full bg-[#0E0E0E] border border-[#FFFFFF33] text-white py-3 rounded-lg shadow-[0_1px_2px_0_rgba(18,18,23,0.05)]"
            style={{
              boxShadow: "0 1px 2px 0 rgba(18, 18, 23, 0.05)",
            }}
          />
          <div className="mt-2">
            <span className="text-[#FFFFFF80]">Forgot Password? </span>
            <Button
              type="button"
              className="text-white"
              onClick={onToggleForgotPassword}
            >
              Click here
            </Button>
            <span className="text-[#FFFFFF80]"> to reset</span>
          </div>
        </div>

        <Button
          type="submit"
          variant="primary"
          disabled={isLoading}
          className="w-full bg-[#00B24E] hover:bg-[#00A047] text-white py-3 rounded-lg"
        >
          {isLoading ? "Processing..." : "Login"}
        </Button>

        <div className="text-center mt-4">
          <span className="text-[#FFFFFF80]">Don't have an account?</span>
          <Button
            type="button"
            className="text-white ml-2"
            onClick={onToggleSignup}
          >
            Sign Up
          </Button>
        </div>

        <GoogleAuthComponent />
      </form>
    </FormContainer>
  );
} 