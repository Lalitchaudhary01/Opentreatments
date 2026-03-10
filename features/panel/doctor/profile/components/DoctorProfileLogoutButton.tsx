"use client";

import { signOut } from "next-auth/react";

export default function DoctorProfileLogoutButton() {
  return (
    <button
      type="button"
      onClick={() => signOut({ callbackUrl: "/auth" })}
      className="mt-2 w-full rounded-lg border border-[#ef4444]/35 bg-[#ef4444]/10 py-2 text-[11px] font-medium text-[#ef4444] hover:bg-[#ef4444]/15"
    >
      Logout
    </button>
  );
}
