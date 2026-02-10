"use client";

import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const DAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

export default function StepAvailability({
  data,
  setData,
}: {
  data: any;
  setData: (d: any) => void;
}) {
  const availability: Record<string, string> = data.availability || {};

  const toggleDay = (day: string, enabled: boolean) => {
    const key = day.toLowerCase();
    setData((prev: any) => {
      const next = { ...(prev.availability || {}) };
      if (enabled) {
        next[key] = next[key] || "9:00 AM - 5:00 PM";
      } else {
        delete next[key];
      }
      return { ...prev, availability: next };
    });
  };

  const updateTime = (day: string, value: string) => {
    const key = day.toLowerCase();
    setData((prev: any) => ({
      ...prev,
      availability: {
        ...(prev.availability || {}),
        [key]: value,
      },
    }));
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Weekly Availability</h2>
      <p className="text-muted-foreground">
        Select the days you are available and set time slots.
      </p>

      <div className="space-y-3">
        {DAYS.map((day) => {
          const key = day.toLowerCase();
          const value = availability[key];
          const active = Boolean(value);

          return (
            <div key={day} className="border rounded-lg p-4 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Input
                    type="checkbox"
                    checked={active}
                    onChange={(e) => toggleDay(day, e.target.checked)}
                  />
                  <Label className={active ? "" : "text-muted-foreground"}>
                    {day}
                  </Label>
                </div>

                {active && (
                  <span className="text-sm text-[#00C6D2] font-semibold">
                    Available
                  </span>
                )}
              </div>

              {active && (
                <input
                  className="w-full border rounded px-3 py-2"
                  placeholder="9:00 AM - 5:00 PM"
                  value={value}
                  onChange={(e) => updateTime(day, e.target.value)}
                />
              )}
            </div>
          );
        })}
      </div>

      {/* Quick actions */}
      <div className="flex flex-wrap gap-2 pt-2">
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => {
            const all: Record<string, string> = {};
            DAYS.forEach((d) => (all[d.toLowerCase()] = "9:00 AM - 5:00 PM"));
            setData((p: any) => ({ ...p, availability: all }));
          }}
        >
          All Days 9–5
        </Button>

        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => {
            const wk: Record<string, string> = {};
            ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"].forEach(
              (d) => (wk[d.toLowerCase()] = "9:00 AM - 6:00 PM")
            );
            setData((p: any) => ({ ...p, availability: wk }));
          }}
        >
          Weekdays Only
        </Button>

        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => setData((p: any) => ({ ...p, availability: {} }))}
        >
          Clear All
        </Button>
      </div>
    </div>
  );
}
