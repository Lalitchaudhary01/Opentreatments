"use client";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function LoginForm() {
  const [form, setForm] = useState({ email: "", password: "" });
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const res = await signIn("credentials", {
      redirect: false,
      email: form.email,
      password: form.password,
    });
    if (!res?.error) router.push("/");
  }

  return (
    <div className="flex flex-col gap-3">
      <button
        onClick={() => signIn("google", { callbackUrl: "/" })}
        className="bg-red-500 text-white p-2 rounded"
      >
        Sign in with Google
      </button>

      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
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
        <button type="submit" className="bg-blue-600 text-white p-2 rounded">
          Login
        </button>
      </form>
    </div>
  );
}
