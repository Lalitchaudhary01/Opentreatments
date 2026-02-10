"use client";

import { CheckCircle2 } from "lucide-react";

export default function ApprovedView() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center space-y-4">
        <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto" />
        <h2 className="text-2xl font-bold">Profile Approved</h2>
        <p className="text-muted-foreground max-w-md">
          Congratulations! Your profile is live and visible to patients. You can
          now start receiving appointments.
        </p>
      </div>
    </div>
  );
}
