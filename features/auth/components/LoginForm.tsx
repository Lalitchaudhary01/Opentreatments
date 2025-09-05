"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

export default function AuthForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [mode, setMode] = useState<"login" | "register" | "verify">("login");
  const [userId, setUserId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const m = searchParams.get("mode");
    if (m === "register") setMode("register");
    else if (m === "verify") setMode("verify");
    else setMode("login");
  }, [searchParams]);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirm: "",
    otp: "",
  });

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);

    if (form.password !== form.confirm) {
      alert("Passwords don't match");
      setIsLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          password: form.password,
          confirmPassword: form.confirm,
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
  }

  async function handleVerifyOtp(e: React.FormEvent) {
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
  }

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await signIn("credentials", {
        redirect: false,
        email: form.email,
        password: form.password,
      });

      if (!res?.error) {
        router.push("/");
      } else {
        alert("Login failed: " + res.error);
      }
    } catch (error) {
      alert("An error occurred during login");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4 py-8">
      <Card className="w-full max-w-md mx-auto">
        <CardHeader className="space-y-3 pb-4 pt-0">
          <div className="flex flex-col items-center gap-1">
            <Image
              src="/logo.png"
              alt="Logo"
              width={140}
              height={140}
              className="mb-0"
            />
            <div className="text-center mt-0">
              <CardTitle className="text-xl">
                {mode === "login" && "Login"}
                {mode === "register" && "Register"}
                {mode === "verify" && "Verify Your Email"}
              </CardTitle>
              <CardDescription className="mt-1 text-xs">
                {mode === "verify"
                  ? "Enter the OTP sent to your email"
                  : "Enter your details to continue"}
              </CardDescription>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-3">
          {/* Google Button only for login */}
          {mode === "login" && (
            <>
              <Button
                variant="outline"
                className="w-full h-9"
                onClick={() => signIn("google", { callbackUrl: "/" })}
                disabled={isLoading}
              >
                <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Sign in with Google
              </Button>
              <div className="relative my-2">
                <div className="absolute inset-0 flex items-center">
                  <Separator />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground text-xs">
                    Or continue with
                  </span>
                </div>
              </div>
            </>
          )}

          {/* Forms */}
          {mode === "verify" ? (
            <form onSubmit={handleVerifyOtp} className="space-y-3">
              <p className="text-sm text-muted-foreground text-center">
                We've sent an OTP to your email. Please enter it below to verify
                your account.
              </p>
              <div className="space-y-1">
                <Label htmlFor="otp" className="text-xs">
                  OTP
                </Label>
                <Input
                  id="otp"
                  type="text"
                  placeholder="Enter OTP"
                  value={form.otp}
                  onChange={(e) => setForm({ ...form, otp: e.target.value })}
                  required
                  disabled={isLoading}
                  className="h-9"
                />
              </div>
              <Button type="submit" className="w-full h-9" disabled={isLoading}>
                {isLoading ? "Verifying..." : "Verify OTP"}
              </Button>
            </form>
          ) : (
            <form
              onSubmit={mode === "login" ? handleLogin : handleRegister}
              className="space-y-3"
            >
              {mode === "register" && (
                <div className="space-y-1">
                  <Label htmlFor="name" className="text-xs">
                    Full Name
                  </Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Full Name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    required
                    disabled={isLoading}
                    className="h-9"
                  />
                </div>
              )}

              {mode === "register" ? (
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <Label htmlFor="email" className="text-xs">
                      Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Email"
                      value={form.email}
                      onChange={(e) =>
                        setForm({ ...form, email: e.target.value })
                      }
                      required
                      disabled={isLoading}
                      className="h-9"
                    />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="phone" className="text-xs">
                      Phone
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="Phone Number"
                      value={form.phone}
                      onChange={(e) =>
                        setForm({ ...form, phone: e.target.value })
                      }
                      required
                      disabled={isLoading}
                      className="h-9"
                    />
                  </div>
                </div>
              ) : (
                // Modified login form layout
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <Label htmlFor="email" className="text-xs">
                      Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Email"
                      value={form.email}
                      onChange={(e) =>
                        setForm({ ...form, email: e.target.value })
                      }
                      required
                      disabled={isLoading}
                      className="h-9"
                    />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="password" className="text-xs">
                      Password
                    </Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="Password"
                      value={form.password}
                      onChange={(e) =>
                        setForm({ ...form, password: e.target.value })
                      }
                      required
                      disabled={isLoading}
                      className="h-9"
                    />
                  </div>
                </div>
              )}

              {mode === "register" ? (
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <Label htmlFor="password" className="text-xs">
                      Password
                    </Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="Password"
                      value={form.password}
                      onChange={(e) =>
                        setForm({ ...form, password: e.target.value })
                      }
                      required
                      disabled={isLoading}
                      className="h-9"
                    />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="confirm" className="text-xs">
                      Confirm
                    </Label>
                    <Input
                      id="confirm"
                      type="password"
                      placeholder="Confirm Password"
                      value={form.confirm}
                      onChange={(e) =>
                        setForm({ ...form, confirm: e.target.value })
                      }
                      required
                      disabled={isLoading}
                      className="h-9"
                    />
                  </div>
                </div>
              ) : null}

              <Button type="submit" className="w-full h-9" disabled={isLoading}>
                {isLoading
                  ? "Processing..."
                  : mode === "login"
                  ? "Login"
                  : "Register"}
              </Button>
            </form>
          )}

          {/* Toggle Links */}
          <div className="text-center text-xs pt-2">
            {mode === "login" ? (
              <>
                Don&apos;t have an account?{" "}
                <Button
                  variant="link"
                  className="p-0 h-auto text-xs"
                  onClick={() => router.push("/auth?mode=register")}
                  disabled={isLoading}
                >
                  Register
                </Button>
              </>
            ) : mode === "register" ? (
              <>
                Already have an account?{" "}
                <Button
                  variant="link"
                  className="p-0 h-auto text-xs"
                  onClick={() => router.push("/auth?mode=login")}
                  disabled={isLoading}
                >
                  Login
                </Button>
              </>
            ) : (
              <>
                Didn't receive OTP?{" "}
                <Button
                  variant="link"
                  className="p-0 h-auto text-xs"
                  onClick={() => router.push("/auth?mode=register")}
                  disabled={isLoading}
                >
                  Try again
                </Button>
              </>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
