"use client";

import { signOut } from "next-auth/react";
import { Button } from "../ui/button";

export default function DoctorLogoutButton() {
  return (
    <Button
      onClick={() => signOut({ callbackUrl: "/auth" })} // logout ke baad redirect
      className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
    >
      Logout
    </Button>
  );
}
