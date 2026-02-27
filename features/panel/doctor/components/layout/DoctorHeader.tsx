"use client";

import { useMemo } from "react";
import { Bell, Search, Plus } from "lucide-react";
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

  // Figma se colors:
  // Background: rgba(17, 24, 39, 1) = #111827 (gray-900)
  // Border: rgba(255, 255, 255, 0.07)
  // Text muted: #94a3b8 (gray-400)
  // Blue: #3b82f6 (blue-500)
  // Input bg: rgba(255, 255, 255, 0.05)

  return (
    <header className="flex items-center justify-between px-7 py-3.5 bg-[#111827] border-b border-white/[0.07]">
      {/* LEFT SIDE */}
      <div className="flex flex-col gap-0.5">
        <h1 className="text-[17px] font-semibold tracking-tight text-white">
          {greeting}
          {profile?.name ? `, Dr. ${profile.name}` : ""} 👋
        </h1>

        <p className="text-sm text-[#94a3b8]">
          {new Date().toLocaleDateString("en-IN", {
            weekday: "long",
            day: "numeric",
            month: "short",
            year: "numeric",
          })}
          <span className="mx-1">·</span>
          <span className="text-[#3b82f6]">12 appointments today</span>
        </p>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex items-center gap-3">
        {/* Search Input - Figma: width 200px, height 33px */}
        <div className="flex items-center w-[200px] h-[33px] rounded-lg bg-white/5 border border-white/[0.07] focus-within:border-white/20 transition-colors">
          <div className="pl-3 text-[#475569]">
            <Search className="w-3.5 h-3.5" />
          </div>
          <input
            className="flex-1 h-full px-3 text-sm bg-transparent outline-none text-white placeholder:text-[#475569]"
            placeholder="Search patients..."
          />
        </div>

        {/* Bell Button - Figma: 41px x 29px */}
        <Button 
          variant="ghost" 
          size="icon"
          className="w-[41px] h-[29px] rounded-lg hover:bg-white/5 text-white"
        >
          <Bell className="w-4 h-4" />
        </Button>

        {/* New Appointment Button - Figma: 157.3px x 29px */}
        <Button 
          className="h-[29px] px-3 rounded-lg bg-[#3b82f6] hover:bg-blue-600 text-white text-sm font-normal gap-2"
        >
          <Plus className="w-3.5 h-3.5" />
          New Appointment
        </Button>
      </div>
    </header>
  );
}