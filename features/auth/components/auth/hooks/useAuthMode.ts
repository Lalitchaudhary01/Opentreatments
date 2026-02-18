"use client";  // ✅ Ye bhi add karo

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { AuthMode } from "../types/auth.types";

export function useAuthMode() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [mode, setMode] = useState<AuthMode>("login");
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const m = searchParams.get("mode");
    if (m === "register") {
      setMode("register");
      setIsActive(true);
    } else if (m === "verify") {
      setMode("verify");
    } else {
      setMode("login");
      setIsActive(false);
    }
  }, [searchParams]);

  const toggleMode = () => {
    setIsActive(!isActive);
    if (!isActive) {
      router.push("/auth?mode=register");
    } else {
      router.push("/auth?mode=login");
    }
  };

  return { mode, isActive, toggleMode };
}