"use client";

import { DoctorProfile } from "@/features/panel/doctor/types";
import { Calendar } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import DayAvailability from "./DayAvailability";

const DAYS = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
];

export default function AvailabilitySection({
  profile,
}: {
  profile: DoctorProfile;
}) {
  const availability =
    (profile.availability as Record<string, string> | null) || {};

  if (!availability || Object.keys(availability).length === 0) {
    return null;
  }

  return (
    <Card className="p-6 rounded-2xl shadow-sm backdrop-blur-md bg-white/60 dark:bg-[#102224]/60 border border-white/80 dark:border-[#193436]/80">
      <CardHeader className="p-0 mb-4">
        <CardTitle className="text-xl font-bold flex items-center gap-2">
          <Calendar className="w-5 h-5 text-[#00C6D2]" />
          Weekly Availability
        </CardTitle>
        <p className="text-xs text-muted-foreground mt-1">
          Working hours for consultation
        </p>
      </CardHeader>

      <CardContent className="p-0 space-y-3">
        {DAYS.map((day) => (
          <DayAvailability key={day} day={day} time={availability?.[day]} />
        ))}
      </CardContent>
    </Card>
  );
}
