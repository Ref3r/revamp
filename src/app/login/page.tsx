"use client";

import LoginComponent from "@/components/Auth/LoginComponent";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();
  return <LoginComponent onToggleForgotPassword={() => {
    router.push("/forgot-password");
  }} onToggleSignup={() => router.push("/sign-up")} />;
}
