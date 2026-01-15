"use client";

import { XCircle } from "lucide-react";

export default function RejectedView() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center space-y-4">
        <XCircle className="w-16 h-16 text-red-500 mx-auto" />
        <h2 className="text-2xl font-bold">Profile Rejected</h2>
        <p className="text-muted-foreground max-w-md">
          Your profile was rejected. Please update the required information and
          resubmit for review.
        </p>
      </div>
    </div>
  );
}
