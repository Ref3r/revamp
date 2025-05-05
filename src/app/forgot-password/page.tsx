"use client";
import ForgotPasswordComponent from "@/components/Auth/ForgotPasswordComponent";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();
  return <ForgotPasswordComponent onBackToLogin={() => router.push("/login")} />;
}
