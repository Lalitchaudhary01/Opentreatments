"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function RejectedView() {
  return (
    <div className="max-w-xl mx-auto text-center space-y-6 py-20">
      <h1 className="text-3xl font-bold text-red-600">
        Profile Needs Changes
      </h1>

      <p className="text-muted-foreground">
        Your hospital profile was reviewed but requires some corrections before
        approval. Please update the details and resubmit.
      </p>

      <Link href="/hospital/profile/edit">
        <Button>Edit Profile</Button>
      </Link>
    </div>
  );
}
