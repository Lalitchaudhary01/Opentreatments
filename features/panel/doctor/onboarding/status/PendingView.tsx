"use client";

import { Clock } from "lucide-react";

export default function PendingView() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center space-y-4">
        <Clock className="w-16 h-16 text-orange-500 mx-auto" />
        <h2 className="text-2xl font-bold">Profile Under Review</h2>
        <p className="text-muted-foreground max-w-md">
          Your profile is currently being reviewed by our admin team. You’ll be
          notified once it’s approved.
        </p>
      </div>
    </div>
  );
}
