"use client";

import { ReactNode, useMemo, useState } from "react";
import {
  CalendarDays,
  Clock3,
  Plus,
  Save,
  Timer,
  Trash2,
  Users,
} from "lucide-react";
import { cn } from "@/lib/utils";
import HolidayModal from "./HolidayModal";
import { BreakSlot, HolidayBlock, SlotConfig, WeeklyHour } from "../types";

const weeklySeed: WeeklyHour[] = [
  { day: "Monday", enabled: true, open: "09:00", close: "17:00" },
  { day: "Tuesday", enabled: true, open: "09:00", close: "17:00" },
  { day: "Wednesday", enabled: true, open: "09:00", close: "17:00" },
  { day: "Thursday", enabled: true, open: "09:00", close: "17:00" },
  { day: "Friday", enabled: true, open: "09:00", close: "16:00" },
  { day: "Saturday", enabled: true, open: "10:00", close: "14:00" },
  { day: "Sunday", enabled: false, open: "", close: "" },
];

const breakSeed: BreakSlot[] = [
  { id: "B1", label: "Lunch", from: "13:00", to: "13:30" },
  { id: "B2", label: "Tea Break", from: "16:00", to: "16:15" },
];

const holidaySeed: HolidayBlock[] = [
  {
    id: "H1",
    label: "Republic Day",
    from: "2026-01-26",
    to: "2026-01-26",
    type: "Public Holiday",
  },
  {
    id: "H2",
    label: "Medical Conference",
    from: "2026-03-14",
    to: "2026-03-16",
    type: "Conference / Training",
  },
];

const slotSeed: SlotConfig = {
  duration: 20,
  buffer: 5,
  maxAppt: 28,
  leadTime: "2h",
};

function formatDate(value: string) {
  if (!value) return "-";
  return new Date(value).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function StatCard({
  label,
  value,
  helper,
  icon,
}: {
  label: string;
  value: string;
  helper: string;
  icon: ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#161f30] px-4 py-3.5">
      <div className="flex items-center justify-between gap-2">
        <p className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">
          {label}
        </p>
        <div className="w-8 h-8 rounded-lg bg-blue-500/15 text-blue-400 flex items-center justify-center">
          {icon}
        </div>
      </div>
      <p className="text-xl font-semibold text-slate-900 dark:text-slate-100 mt-2">
        {value}
      </p>
      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{helper}</p>
    </div>
  );
}

export default function DoctorAvailabilityScreen() {
  const [weeklyHours, setWeeklyHours] = useState<WeeklyHour[]>(weeklySeed);
  const [breaks, setBreaks] = useState<BreakSlot[]>(breakSeed);
  const [holidays, setHolidays] = useState<HolidayBlock[]>(holidaySeed);
  const [slotConfig, setSlotConfig] = useState<SlotConfig>(slotSeed);
  const [openHolidayModal, setOpenHolidayModal] = useState(false);

  const [draftBreak, setDraftBreak] = useState({
    label: "",
    from: "",
    to: "",
  });

  const hasUnsavedChanges = useMemo(() => {
    return (
      JSON.stringify(weeklyHours) !== JSON.stringify(weeklySeed) ||
      JSON.stringify(breaks) !== JSON.stringify(breakSeed) ||
      JSON.stringify(holidays) !== JSON.stringify(holidaySeed) ||
      JSON.stringify(slotConfig) !== JSON.stringify(slotSeed)
    );
  }, [breaks, holidays, slotConfig, weeklyHours]);

  const stats = useMemo(() => {
    const activeDays = weeklyHours.filter((day) => day.enabled).length;
    const totalBreakMins = breaks.reduce((sum, item) => {
      if (!item.from || !item.to) return sum;
      const [fh, fm] = item.from.split(":").map(Number);
      const [th, tm] = item.to.split(":").map(Number);
      const mins = th * 60 + tm - (fh * 60 + fm);
      return sum + Math.max(mins, 0);
    }, 0);

    return {
      activeDays,
      totalBreakMins,
      holidays: holidays.length,
      dailyCapacity: slotConfig.maxAppt,
    };
  }, [breaks, holidays.length, slotConfig.maxAppt, weeklyHours]);

  const updateDay = (day: string, patch: Partial<WeeklyHour>) => {
    setWeeklyHours((prev) => prev.map((row) => (row.day === day ? { ...row, ...patch } : row)));
  };

  const addBreak = () => {
    if (!draftBreak.from || !draftBreak.to) return;
    const next: BreakSlot = {
      id: `B-${Date.now()}`,
      label: draftBreak.label.trim() || "Break",
      from: draftBreak.from,
      to: draftBreak.to,
    };
    setBreaks((prev) => [...prev, next]);
    setDraftBreak({ label: "", from: "", to: "" });
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#111827] p-6">
      <div className="max-w-[1164px] mx-auto space-y-5 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
          <StatCard
            label="Clinic Days"
            value={`${stats.activeDays}/7`}
            helper="Weekly working days"
            icon={<CalendarDays className="w-4 h-4" />}
          />
          <StatCard
            label="Slot Duration"
            value={`${slotConfig.duration} min`}
            helper={`Buffer ${slotConfig.buffer} min`}
            icon={<Clock3 className="w-4 h-4" />}
          />
          <StatCard
            label="Break Time"
            value={`${stats.totalBreakMins} min`}
            helper={`${breaks.length} breaks configured`}
            icon={<Timer className="w-4 h-4" />}
          />
          <StatCard
            label="Max Patients"
            value={`${stats.dailyCapacity}/day`}
            helper={`${stats.holidays} dates blocked`}
            icon={<Users className="w-4 h-4" />}
          />
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-[1.3fr_0.9fr] gap-5 items-start">
          <section className="rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#161f30]">
            <div className="px-5 py-4 border-b border-slate-200 dark:border-white/10 flex items-center justify-between">
              <div>
                <h2 className="text-base font-semibold text-slate-900 dark:text-slate-100">
                  Weekly Availability
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Control days and clinic timings.
                </p>
              </div>
            </div>

            <div className="p-4 space-y-2.5">
              {weeklyHours.map((row) => (
                <div
                  key={row.day}
                  className="grid grid-cols-[1fr_auto_auto_auto] gap-3 items-center rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50/70 dark:bg-[#1b263b] px-3 py-2.5"
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={row.enabled}
                      onChange={(e) =>
                        updateDay(row.day, {
                          enabled: e.target.checked,
                          open: e.target.checked ? row.open || "09:00" : "",
                          close: e.target.checked ? row.close || "17:00" : "",
                        })
                      }
                      className="h-4 w-4 rounded border-slate-300 text-blue-600"
                    />
                    <p className="text-sm font-medium text-slate-800 dark:text-slate-200">
                      {row.day}
                    </p>
                  </div>

                  <input
                    type="time"
                    value={row.open}
                    onChange={(e) => updateDay(row.day, { open: e.target.value })}
                    disabled={!row.enabled}
                    className={cn(
                      "h-9 px-2.5 rounded-lg border text-sm",
                      "border-slate-200 dark:border-white/10 bg-white dark:bg-[#111827] text-slate-800 dark:text-slate-200",
                      !row.enabled && "opacity-50 cursor-not-allowed"
                    )}
                  />
                  <span className="text-xs text-slate-500 dark:text-slate-400">to</span>
                  <input
                    type="time"
                    value={row.close}
                    onChange={(e) => updateDay(row.day, { close: e.target.value })}
                    disabled={!row.enabled}
                    className={cn(
                      "h-9 px-2.5 rounded-lg border text-sm",
                      "border-slate-200 dark:border-white/10 bg-white dark:bg-[#111827] text-slate-800 dark:text-slate-200",
                      !row.enabled && "opacity-50 cursor-not-allowed"
                    )}
                  />
                </div>
              ))}
            </div>
          </section>

          <div className="space-y-5">
            <section className="rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#161f30] p-4">
              <div className="mb-3">
                <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                  Appointment Slot Settings
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Define slot size and limits.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2.5 text-sm">
                <label className="space-y-1">
                  <span className="text-xs text-slate-500 dark:text-slate-400">Duration</span>
                  <input
                    type="number"
                    min={5}
                    value={slotConfig.duration}
                    onChange={(e) =>
                      setSlotConfig((prev) => ({ ...prev, duration: Number(e.target.value) || 5 }))
                    }
                    className="w-full h-9 px-2.5 rounded-lg border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-[#111827]"
                  />
                </label>

                <label className="space-y-1">
                  <span className="text-xs text-slate-500 dark:text-slate-400">Buffer</span>
                  <input
                    type="number"
                    min={0}
                    value={slotConfig.buffer}
                    onChange={(e) =>
                      setSlotConfig((prev) => ({ ...prev, buffer: Number(e.target.value) || 0 }))
                    }
                    className="w-full h-9 px-2.5 rounded-lg border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-[#111827]"
                  />
                </label>

                <label className="space-y-1">
                  <span className="text-xs text-slate-500 dark:text-slate-400">Max Appointments</span>
                  <input
                    type="number"
                    min={1}
                    value={slotConfig.maxAppt}
                    onChange={(e) =>
                      setSlotConfig((prev) => ({ ...prev, maxAppt: Number(e.target.value) || 1 }))
                    }
                    className="w-full h-9 px-2.5 rounded-lg border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-[#111827]"
                  />
                </label>

                <label className="space-y-1">
                  <span className="text-xs text-slate-500 dark:text-slate-400">Lead Time</span>
                  <select
                    value={slotConfig.leadTime}
                    onChange={(e) =>
                      setSlotConfig((prev) => ({ ...prev, leadTime: e.target.value }))
                    }
                    className="w-full h-9 px-2.5 rounded-lg border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-[#111827]"
                  >
                    <option value="1h">1 hour</option>
                    <option value="2h">2 hours</option>
                    <option value="6h">6 hours</option>
                    <option value="12h">12 hours</option>
                    <option value="24h">24 hours</option>
                  </select>
                </label>
              </div>
            </section>

            <section className="rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#161f30] p-4">
              <div className="mb-3 flex items-center justify-between gap-2">
                <div>
                  <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                    Break Slots
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    Exclude non-consultation windows.
                  </p>
                </div>
              </div>

              <div className="space-y-2.5 mb-3">
                {breaks.map((item) => (
                  <div
                    key={item.id}
                    className="rounded-lg border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-[#1b263b] px-2.5 py-2 flex items-center justify-between gap-2"
                  >
                    <p className="text-xs text-slate-700 dark:text-slate-300">
                      <span className="font-medium">{item.label}</span> · {item.from} - {item.to}
                    </p>
                    <button
                      type="button"
                      onClick={() => setBreaks((prev) => prev.filter((row) => row.id !== item.id))}
                      className="p-1.5 rounded-md text-slate-500 hover:text-red-400 hover:bg-red-500/10"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-4 gap-2.5">
                <input
                  value={draftBreak.label}
                  onChange={(e) =>
                    setDraftBreak((prev) => ({ ...prev, label: e.target.value }))
                  }
                  placeholder="Break name"
                  className="col-span-2 h-9 px-2.5 rounded-lg border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-[#111827] text-sm"
                />
                <input
                  type="time"
                  value={draftBreak.from}
                  onChange={(e) =>
                    setDraftBreak((prev) => ({ ...prev, from: e.target.value }))
                  }
                  className="h-9 px-2.5 rounded-lg border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-[#111827] text-sm"
                />
                <input
                  type="time"
                  value={draftBreak.to}
                  onChange={(e) =>
                    setDraftBreak((prev) => ({ ...prev, to: e.target.value }))
                  }
                  className="h-9 px-2.5 rounded-lg border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-[#111827] text-sm"
                />
              </div>

              <button
                type="button"
                onClick={addBreak}
                className="mt-2.5 h-9 px-3 rounded-lg text-sm inline-flex items-center gap-1.5 bg-blue-600 text-white hover:bg-blue-500"
              >
                <Plus className="w-4 h-4" />
                Add Break
              </button>
            </section>
          </div>
        </div>

        <section className="rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#161f30] p-4">
          <div className="flex items-center justify-between flex-wrap gap-2 mb-3.5">
            <div>
              <h2 className="text-base font-semibold text-slate-900 dark:text-slate-100">
                Holidays & Time Off
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                These dates will be blocked for new bookings.
              </p>
            </div>

            <button
              type="button"
              onClick={() => setOpenHolidayModal(true)}
              className="h-9 px-3 rounded-lg text-sm inline-flex items-center gap-1.5 bg-blue-600 text-white hover:bg-blue-500"
            >
              <Plus className="w-4 h-4" />
              Add Blocked Dates
            </button>
          </div>

          {holidays.length === 0 ? (
            <div className="rounded-lg border border-dashed border-slate-300 dark:border-white/15 py-8 text-center text-sm text-slate-500 dark:text-slate-400">
              No holiday blocks added.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
              {holidays.map((item) => (
                <div
                  key={item.id}
                  className="rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-[#1b263b] px-3 py-2.5"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="text-sm font-medium text-slate-800 dark:text-slate-200">
                        {item.label}
                      </p>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                        {item.type}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() =>
                        setHolidays((prev) => prev.filter((row) => row.id !== item.id))
                      }
                      className="p-1.5 rounded-md text-slate-500 hover:text-red-400 hover:bg-red-500/10"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 mt-2">
                    {formatDate(item.from)} to {formatDate(item.to)}
                  </p>
                </div>
              ))}
            </div>
          )}
        </section>

        {hasUnsavedChanges && (
          <div className="fixed bottom-4 right-4 z-20 rounded-xl border border-blue-500/30 bg-[#102245] text-slate-100 px-4 py-3 shadow-lg">
            <div className="flex items-center gap-3">
              <p className="text-xs">Unsaved changes in availability settings.</p>
              <button
                type="button"
                onClick={() => {
                  setWeeklyHours(weeklySeed);
                  setBreaks(breakSeed);
                  setHolidays(holidaySeed);
                  setSlotConfig(slotSeed);
                }}
                className="text-xs px-2.5 py-1.5 rounded-md bg-white/10 hover:bg-white/20"
              >
                Reset
              </button>
              <button
                type="button"
                className="text-xs px-2.5 py-1.5 rounded-md bg-blue-600 hover:bg-blue-500 inline-flex items-center gap-1"
              >
                <Save className="w-3.5 h-3.5" />
                Save
              </button>
            </div>
          </div>
        )}
      </div>

      <HolidayModal
        open={openHolidayModal}
        onClose={() => setOpenHolidayModal(false)}
        onSave={(data) => {
          const next: HolidayBlock = {
            id: `H-${Date.now()}`,
            ...data,
          };
          setHolidays((prev) => [...prev, next]);
          setOpenHolidayModal(false);
        }}
      />
    </div>
  );
}
