"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function PendingView() {
  return (
    <div className="max-w-xl mx-auto text-center space-y-6 py-20">
      <h1 className="text-3xl font-bold">Profile Under Review</h1>

      <p className="text-muted-foreground">
        Your hospital profile has been submitted successfully and is currently
        under admin review. This usually takes 24–48 hours.
      </p>

      <div className="flex justify-center gap-4">
        <Link href="/hospital/profile/edit">
          <Button variant="outline">Edit Profile</Button>
        </Link>

        <Link href="/">
          <Button>Go Home</Button>
        </Link>
      </div>
    </div>
  );
}
