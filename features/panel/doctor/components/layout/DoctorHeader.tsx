"use client";

import { useMemo } from "react";
import { Bell, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DoctorProfile } from "@/features/panel/doctor/types/doctor";

type Props = {
  profile: DoctorProfile | null;
};

export default function DoctorHeader({ profile }: Props) {
  const greeting = useMemo(() => {
    const hour = new Date().getHours();

    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  }, []);

  return (
    <header className="flex items-center justify-between p-6 pb-4">
      
      {/* LEFT SIDE */}
      <div>
        <h1 className="text-3xl font-bold">
          {greeting}
          {profile?.name ? `, Dr. ${profile.name}` : ""} 👋
        </h1>

        <p className="text-muted-foreground text-sm mt-1">
          {new Date().toLocaleDateString("en-IN", {
            weekday: "long",
            day: "numeric",
            month: "short",
            year: "numeric",
          })}
        </p>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex items-center gap-6">
        <div className="flex w-[420px] items-center rounded-2xl h-12 border bg-muted/40 focus-within:ring-2 focus-within:ring-primary transition">
          <div className="pl-4 text-muted-foreground">
            <Search className="w-5 h-5" />
          </div>
          <input
            className="flex-1 h-full px-4 outline-none bg-transparent"
            placeholder="Search patients..."
          />
        </div>

        <Button variant="ghost" className="w-12 h-12 rounded-full">
          <Bell className="w-6 h-6" />
        </Button>
      </div>
    </header>
  );
}