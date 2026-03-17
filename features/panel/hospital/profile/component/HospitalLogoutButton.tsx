"use client";

import { signOut } from "next-auth/react";

export default function HospitalLogoutButton() {
  return (
    <button
      type="button"
      onClick={() => signOut({ callbackUrl: "/auth" })}
      className="w-full rounded-lg border border-[#ef4444]/35 bg-[#ef4444]/10 py-2 text-[11px] font-medium text-[#fca5a5] hover:bg-[#ef4444]/15"
    >
      Logout
    </button>
  );
}
