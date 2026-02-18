"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { 
  CompleteFormData, 
  defaultCompleteFormData,
  LoginFormData,
  RegisterFormData,
  VerifyFormData
} from "../types/auth.types";

export function useAuthForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  
  // ✅ Proper type - CompleteFormData use karo
  const [form, setForm] = useState<CompleteFormData>(defaultCompleteFormData);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          password: form.password,
          confirmPassword: form.confirm,
          role: form.role,
        }),
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();
      if (res.ok) {
        setUserId(data.userId);
        router.push("/auth?mode=verify");
      } else {
        alert(data.error || "Registration failed");
      }
    } catch (error) {
      alert("An error occurred during registration");
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await fetch("/api/auth/verify-otp", {
        method: "POST",
        body: JSON.stringify({
          email: form.email,
          otp: form.otp,
        }),
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();
      if (res.ok) {
        alert("Email verified successfully! You can now login.");
        router.push("/auth?mode=login");
      } else {
        alert(data.error || "Verification failed");
      }
    } catch (error) {
      alert("An error occurred during verification");
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await signIn("credentials", {
        redirect: false,
        email: form.email,
        password: form.password,
      });

      if (res?.error) {
        alert("Login failed: " + res.error);
        return;
      }

      const sessionRes = await fetch("/api/auth/session");
      const sessionData = await sessionRes.json();

      if (sessionData?.user?.role !== form.role) {
        alert(`You cannot login as ${form.role} with this account.`);
        return;
      }

      const redirectMap: Record<string, string> = {
        DOCTOR: "/doctor",
        ADMIN: "/admin/dashbaord",
        HOSPITAL: "/hospitals",
        PHARMACY: "/pharmacy/dashboard",
        INSURANCE_COMPANY: "/insurance/dashbaord",
      };
      
      router.push(redirectMap[form.role] || "/");
    } catch (error) {
      alert("An error occurred during login");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    form,
    setForm,  // ✅ ab ye (form: CompleteFormData) => void type ka hai
    isLoading,
    userId,
    handleRegister,
    handleVerifyOtp,
    handleLogin,
  };
}