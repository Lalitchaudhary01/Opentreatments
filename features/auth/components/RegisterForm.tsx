"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export function RegisterForm() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch("/api/auth/register", {
      method: "POST",
      body: JSON.stringify({
        name: form.name,
        email: form.email,
        password: form.password,
        confirmPassword: form.confirm,
      }),
      headers: { "Content-Type": "application/json" },
    });
    if (res.ok) router.push("/auth/login");
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
      <input
        type="text"
        placeholder="Name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        className="border px-2 py-1"
      />
      <input
        type="email"
        placeholder="Email"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
        className="border px-2 py-1"
      />
      <input
        type="password"
        placeholder="Password"
        value={form.password}
        onChange={(e) => setForm({ ...form, password: e.target.value })}
        className="border px-2 py-1"
      />
      <input
        type="password"
        placeholder="Confirm Password"
        value={form.confirm}
        onChange={(e) => setForm({ ...form, confirm: e.target.value })}
        className="border px-2 py-1"
      />
      <button type="submit" className="bg-green-600 text-white p-2 rounded">
        Register
      </button>
    </form>
  );
}
