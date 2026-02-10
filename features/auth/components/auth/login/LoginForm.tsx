"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LoginFields } from "./LoginFields";
import { loginUser } from "./LoginActions";
import type { AuthFormState } from "./types";

export default function LoginForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isRoleDropdownOpen, setIsRoleDropdownOpen] = useState(false);

  const [form, setForm] = useState<AuthFormState>({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirm: "",
    otp: "",
    role: "",
  });

  const roles = [
    "USER",
    "DOCTOR",
    "ADMIN",
    "HOSPITAL",
    "PHARMACY",
    "INSURANCE_COMPANY",
  ];

  const getRoleDisplayName = (role: string) => role.replace("_", " ");

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);

    const { session, error } = await loginUser({
      email: form.email,
      password: form.password,
    });

    if (error) {
      alert(error);
      setIsLoading(false);
      return;
    }

    if (session?.user?.role !== form.role) {
      alert(`You cannot login as ${form.role} with this account.`);
      setIsLoading(false);
      return;
    }

    if (form.role === "DOCTOR") router.push("/doctor");
    else if (form.role === "ADMIN") router.push("/admin/dashbaord");
    else if (form.role === "HOSPITAL") router.push("/hospitals");
    else if (form.role === "PHARMACY") router.push("/pharmacy/dashboard");
    else if (form.role === "INSURANCE_COMPANY")
      router.push("/insurance/dashbaord");
    else router.push("/");

    setIsLoading(false);
  }

  return (
    <LoginFields
      form={form}
      setForm={setForm}
      roles={roles}
      isLoading={isLoading}
      isRoleDropdownOpen={isRoleDropdownOpen}
      setIsRoleDropdownOpen={setIsRoleDropdownOpen}
      getRoleDisplayName={getRoleDisplayName}
      onSubmit={handleLogin}
    />
  );
}
