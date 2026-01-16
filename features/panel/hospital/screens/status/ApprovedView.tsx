"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function ApprovedView() {
  return (
    <div className="max-w-xl mx-auto text-center space-y-6 py-20">
      <h1 className="text-3xl font-bold text-green-700">
        Hospital Approved 🎉
      </h1>

      <p className="text-muted-foreground">
        Congratulations! Your hospital has been approved and is now live on the
        platform.
      </p>

      <Link href="/hospital">
        <Button>Go to Dashboard</Button>
      </Link>
    </div>
  );
}
