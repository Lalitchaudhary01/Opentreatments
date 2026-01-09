"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Stethoscope } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Doctors page error:", error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-slate-50 via-green to-green-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <div className="text-center space-y-6 max-w-md px-6">
        <Stethoscope className="h-20 w-20 mx-auto text-muted-foreground/50" />
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100">
            Something went wrong!
          </h2>
          <p className="text-muted-foreground">
            We encountered an error while loading the doctors page. Please try again.
          </p>
        </div>
        <div className="flex gap-4 justify-center">
          <Button
            onClick={() => reset()}
            className="bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600"
          >
            Try again
          </Button>
          <Button
            variant="outline"
            onClick={() => (window.location.href = "/")}
          >
            Go home
          </Button>
        </div>
      </div>
    </div>
  );
}

