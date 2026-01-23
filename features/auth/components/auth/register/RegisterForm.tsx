"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { RegisterFields } from "./RegisterFields";
import { registerUser } from "./RegisterActions";
import type { RegisterFormState } from "./types";

export default function RegisterForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isRoleDropdownOpen, setIsRoleDropdownOpen] = useState(false);

  const [form, setForm] = useState<RegisterFormState>({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirm: "",
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

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);

    const { error } = await registerUser({
      name: form.name,
      email: form.email,
      phone: form.phone,
      password: form.password,
      confirmPassword: form.confirm,
      role: form.role,
    });

    if (error) {
      alert(error);
    } else {
      router.push("/auth?mode=verify");
    }

    setIsLoading(false);
  }

  return (
    <RegisterFields
      form={form}
      setForm={setForm}
      roles={roles}
      isLoading={isLoading}
      isRoleDropdownOpen={isRoleDropdownOpen}
      setIsRoleDropdownOpen={setIsRoleDropdownOpen}
      getRoleDisplayName={getRoleDisplayName}
      onSubmit={handleRegister}
    />
  );
}
