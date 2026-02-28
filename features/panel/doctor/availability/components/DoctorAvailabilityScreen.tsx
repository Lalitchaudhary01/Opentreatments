"use client";

import { useMemo, useState } from "react";
import { Calendar, ChevronLeft, ChevronRight, Clock3, Info, Minus, Plus, Trash2 } from "lucide-react";
import HolidayModal from "./HolidayModal";
import { BreakSlot, HolidayBlock, SlotConfig, WeeklyHour } from "../types";

const weeklySeed: WeeklyHour[] = [
  { day: "Monday", enabled: true, open: "09:00", close: "17:00" },
  { day: "Tuesday", enabled: true, open: "09:00", close: "17:00" },
  { day: "Wednesday", enabled: true, open: "09:00", close: "17:00" },
  { day: "Thursday", enabled: true, open: "09:00", close: "17:00" },
  { day: "Friday", enabled: true, open: "09:00", close: "16:00" },
  { day: "Saturday", enabled: false, open: "", close: "" },
  { day: "Sunday", enabled: false, open: "", close: "" },
];

const breakSeed: BreakSlot[] = [
  { id: "B1", label: "Lunch", from: "13:00", to: "13:30" },
  { id: "B2", label: "Tea", from: "16:00", to: "16:15" },
];

const holidaySeed: HolidayBlock[] = [
  { id: "H1", label: "Republic Day", from: "2026-01-26", to: "2026-01-26", type: "Public Holiday" },
  { id: "H2", label: "Medical Conference", from: "2026-03-14", to: "2026-03-16", type: "Conference / Training" },
];

const slotSeed: SlotConfig = {
  duration: 20,
  buffer: 10,
  maxAppt: 20,
  leadTime: "1 hour",
};

const durationOptions = [10, 15, 20, 30, 45, 60];

function fmtDate(date: Date) {
  return date.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
}

function toDateString(y: number, m: number, d: number) {
  return `${y}-${String(m + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
}

export default function DoctorAvailabilityScreen() {
  const [weeklyHours, setWeeklyHours] = useState<WeeklyHour[]>(weeklySeed);
  const [breaks, setBreaks] = useState<BreakSlot[]>(breakSeed);
  const [holidays, setHolidays] = useState<HolidayBlock[]>(holidaySeed);
  const [slotConfig, setSlotConfig] = useState<SlotConfig>(slotSeed);
  const [openHolidayModal, setOpenHolidayModal] = useState(false);
  const [calMonth, setCalMonth] = useState(() => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), 1);
  });

  const [savedSnapshot, setSavedSnapshot] = useState(() => ({
    weeklyHours: weeklySeed,
    breaks: breakSeed,
    holidays: holidaySeed,
    slotConfig: slotSeed,
  }));

  const hasUnsaved =
    JSON.stringify(weeklyHours) !== JSON.stringify(savedSnapshot.weeklyHours) ||
    JSON.stringify(breaks) !== JSON.stringify(savedSnapshot.breaks) ||
    JSON.stringify(holidays) !== JSON.stringify(savedSnapshot.holidays) ||
    JSON.stringify(slotConfig) !== JSON.stringify(savedSnapshot.slotConfig);

  const openCount = useMemo(() => weeklyHours.filter((w) => w.enabled).length, [weeklyHours]);

  const slotPreview = useMemo(() => {
    const base = 9 * 60;
    const step = slotConfig.duration + slotConfig.buffer;
    return Array.from({ length: 8 }).map((_, idx) => {
      const mins = base + idx * step;
      const hh = Math.floor(mins / 60);
      const mm = mins % 60;
      const d = new Date();
      d.setHours(hh, mm, 0, 0);
      return d.toLocaleTimeString("en-IN", { hour: "numeric", minute: "2-digit" });
    });
  }, [slotConfig.duration, slotConfig.buffer]);

  const calendarCells = useMemo(() => {
    const y = calMonth.getFullYear();
    const m = calMonth.getMonth();
    const firstDay = new Date(y, m, 1).getDay();
    const daysInMonth = new Date(y, m + 1, 0).getDate();

    const cells: Array<{ d: number; inMonth: boolean; key: string }> = [];
    for (let i = 0; i < firstDay; i += 1) cells.push({ d: 0, inMonth: false, key: `p-${i}` });
    for (let d = 1; d <= daysInMonth; d += 1) cells.push({ d, inMonth: true, key: `d-${d}` });
    while (cells.length % 7 !== 0) cells.push({ d: 0, inMonth: false, key: `n-${cells.length}` });

    return cells;
  }, [calMonth]);

  const holidayMap = useMemo(() => {
    const map = new Set<string>();
    holidays.forEach((h) => {
      const start = new Date(h.from);
      const end = new Date(h.to);
      if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) return;
      const c = new Date(start);
      while (c.getTime() <= end.getTime()) {
        map.add(toDateString(c.getFullYear(), c.getMonth(), c.getDate()));
        c.setDate(c.getDate() + 1);
      }
    });
    return map;
  }, [holidays]);

  const upcoming = useMemo(() => {
    const now = new Date();
    return [...holidays]
      .filter((h) => new Date(h.to).getTime() >= now.getTime())
      .sort((a, b) => new Date(a.from).getTime() - new Date(b.from).getTime())
      .slice(0, 4);
  }, [holidays]);

  const discard = () => {
    setWeeklyHours(savedSnapshot.weeklyHours);
    setBreaks(savedSnapshot.breaks);
    setHolidays(savedSnapshot.holidays);
    setSlotConfig(savedSnapshot.slotConfig);
  };

  const save = () => {
    setSavedSnapshot({ weeklyHours, breaks, holidays, slotConfig });
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#111827] px-7 py-[22px]">
      <div className="w-full">
        {hasUnsaved ? (
          <div className="mb-1 sticky top-0 z-10 flex items-center justify-between rounded-[11px] border border-blue-500/30 bg-slate-900/90 px-[18px] py-[11px] backdrop-blur-md">
            <div className="flex items-center gap-2 text-[12.5px] text-slate-300">
              <span className="h-[7px] w-[7px] animate-pulse rounded-full bg-amber-400" />
              Unsaved changes
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={discard}
                className="rounded-lg border border-slate-200 dark:border-white/[0.07] bg-slate-100 px-3 py-[5px] text-[11.5px] font-medium text-slate-700 hover:bg-slate-200 dark:bg-white/5 dark:text-[#94A3B8] dark:hover:bg-white/10"
              >
                Discard
              </button>
              <button
                type="button"
                onClick={save}
                className="rounded-lg bg-[#3b82f6] px-[14px] py-[5px] text-[11.5px] font-medium text-white hover:bg-[#2563eb]"
              >
                Save Changes
              </button>
            </div>
          </div>
        ) : null}

        <div className="grid grid-cols-1 gap-[18px] xl:grid-cols-2">
          <section className="overflow-hidden rounded-[14px] border border-slate-200 bg-white dark:border-white/[0.07] dark:bg-[#161f30]">
            <div className="flex items-center justify-between border-b border-slate-200 px-5 py-[15px] dark:border-white/[0.07]">
              <div>
                <div className="text-[13px] font-semibold text-slate-900 dark:text-slate-100">Weekly Working Hours</div>
                <div className="mt-0.5 text-[11px] text-slate-500 dark:text-[#94A3B8]">Set your clinic hours for each day</div>
              </div>
              <span className="text-[11px] text-slate-500 dark:text-[#94A3B8]">{openCount} days open</span>
            </div>

            <div className="px-0 py-[6px]">
              {weeklyHours.map((row) => (
                <div key={row.day} className="border-b border-slate-200 px-5 py-[10px] dark:border-white/[0.07] last:border-b-0">
                  <div className="grid grid-cols-[1fr_auto_auto_auto] items-center gap-3">
                    <div className="flex items-center gap-3 text-[12.5px] font-medium text-slate-700 dark:text-slate-200">
                      <button
                        type="button"
                        aria-label={`Toggle ${row.day}`}
                        aria-pressed={row.enabled}
                        onClick={() =>
                          setWeeklyHours((prev) =>
                            prev.map((d) =>
                              d.day === row.day
                                ? {
                                    ...d,
                                    enabled: !d.enabled,
                                    open: !d.enabled ? d.open || "09:00" : "",
                                    close: !d.enabled ? d.close || "17:00" : "",
                                  }
                                : d
                            )
                          )
                        }
                        className={`relative h-5 w-9 rounded-[10px] transition-colors ${
                          row.enabled ? "bg-green-500" : "bg-slate-300 dark:bg-white/15"
                        }`}
                      >
                        <span
                          className={`absolute top-[3px] h-[14px] w-[14px] rounded-full bg-white transition-all ${
                            row.enabled ? "left-[19px]" : "left-[3px]"
                          }`}
                        />
                      </button>
                      {row.day}
                    </div>

                    <input
                      type="time"
                      disabled={!row.enabled}
                      value={row.open}
                      onChange={(e) =>
                        setWeeklyHours((prev) => prev.map((d) => (d.day === row.day ? { ...d, open: e.target.value } : d)))
                      }
                      className="h-[33px] rounded-lg border border-slate-200 bg-slate-50 px-2 text-[12px] text-slate-800 dark:border-white/[0.07] dark:bg-white/5 dark:text-slate-200"
                    />
                    <span className="text-[11px] text-slate-500 dark:text-[#94A3B8]">to</span>
                    <input
                      type="time"
                      disabled={!row.enabled}
                      value={row.close}
                      onChange={(e) =>
                        setWeeklyHours((prev) => prev.map((d) => (d.day === row.day ? { ...d, close: e.target.value } : d)))
                      }
                      className="h-[33px] rounded-lg border border-slate-200 bg-slate-50 px-2 text-[12px] text-slate-800 dark:border-white/[0.07] dark:bg-white/5 dark:text-slate-200"
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="overflow-hidden rounded-[14px] border border-slate-200 bg-white dark:border-white/[0.07] dark:bg-[#161f30]">
            <div className="flex items-center justify-between border-b border-slate-200 px-5 py-[15px] dark:border-white/[0.07]">
              <div>
                <div className="text-[13px] font-semibold text-slate-900 dark:text-slate-100">Break Times</div>
                <div className="mt-0.5 text-[11px] text-slate-500 dark:text-[#94A3B8]">Lunch, prayer, or personal breaks</div>
              </div>
              <button
                type="button"
                onClick={() =>
                  setBreaks((prev) => [...prev, { id: `B-${Date.now()}`, label: "Break", from: "13:00", to: "13:30" }])
                }
                className="rounded-[7px] bg-blue-500/15 px-[11px] py-[5px] text-[11.5px] font-semibold text-blue-400"
              >
                + Add
              </button>
            </div>

            <div className="py-[6px]">
              {breaks.map((b) => (
                <div key={b.id} className="flex items-center justify-between border-b border-slate-200 px-5 py-[10px] dark:border-white/[0.07] last:border-b-0">
                  <div className="text-[12px] text-slate-700 dark:text-slate-200">
                    <span className="font-medium">{b.label}</span> · {b.from} - {b.to}
                  </div>
                  <button
                    type="button"
                    onClick={() => setBreaks((prev) => prev.filter((x) => x.id !== b.id))}
                    className="rounded-md p-1.5 text-slate-500 hover:bg-red-500/10 hover:text-red-400"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              ))}
            </div>

            <div className="border-t border-slate-200 px-5 py-[14px] dark:border-white/[0.07]">
              <div className="flex items-center gap-[6px] text-[11px] text-slate-500 dark:text-[#94A3B8]">
                <Info className="h-3 w-3" />
                Breaks apply to all days the clinic is open unless individually configured.
              </div>
            </div>
          </section>

          <section className="overflow-hidden rounded-[14px] border border-slate-200 bg-white dark:border-white/[0.07] dark:bg-[#161f30]">
            <div className="border-b border-slate-200 px-5 py-[15px] dark:border-white/[0.07]">
              <div className="text-[13px] font-semibold text-slate-900 dark:text-slate-100">Slot Configuration</div>
              <div className="mt-0.5 text-[11px] text-slate-500 dark:text-[#94A3B8]">How appointments are scheduled</div>
            </div>

            <div className="flex flex-col gap-[18px] px-5 py-5">
              <div>
                <div className="mb-[10px] text-[12px] font-medium text-slate-600 dark:text-[#94A3B8]">Default Session Duration</div>
                <div className="flex flex-wrap gap-2">
                  {durationOptions.map((opt) => {
                    const active = slotConfig.duration === opt;
                    return (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => setSlotConfig((s) => ({ ...s, duration: opt }))}
                        className={
                          active
                            ? "rounded-lg border border-blue-500/40 bg-blue-500/15 px-3 py-[5px] text-[11.5px] font-medium text-blue-400"
                            : "rounded-lg border border-slate-200 bg-slate-50 px-3 py-[5px] text-[11.5px] font-medium text-slate-600 dark:border-white/[0.07] dark:bg-white/5 dark:text-[#94A3B8]"
                        }
                      >
                        {opt}m
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="h-px bg-slate-200 dark:bg-white/[0.07]" />

              <ConfigCounter
                title="Buffer Between Slots"
                sub="Gap time added after each appointment"
                value={`${slotConfig.buffer} min`}
                onDec={() => setSlotConfig((s) => ({ ...s, buffer: Math.max(0, s.buffer - 5) }))}
                onInc={() => setSlotConfig((s) => ({ ...s, buffer: s.buffer + 5 }))}
              />

              <div className="h-px bg-slate-200 dark:bg-white/[0.07]" />

              <ConfigCounter
                title="Max Appointments / Day"
                sub="Cap the number of bookings per day"
                value={`${slotConfig.maxAppt}`}
                onDec={() => setSlotConfig((s) => ({ ...s, maxAppt: Math.max(1, s.maxAppt - 1) }))}
                onInc={() => setSlotConfig((s) => ({ ...s, maxAppt: s.maxAppt + 1 }))}
              />

              <div className="h-px bg-slate-200 dark:bg-white/[0.07]" />

              <div className="flex items-center justify-between">
                <div>
                  <div className="text-[12.5px] font-medium text-slate-800 dark:text-slate-100">Booking Lead Time</div>
                  <div className="mt-[2px] text-[11px] text-slate-500 dark:text-[#94A3B8]">Minimum notice before an appointment</div>
                </div>
                <select
                  value={slotConfig.leadTime}
                  onChange={(e) => setSlotConfig((s) => ({ ...s, leadTime: e.target.value }))}
                  className="cursor-pointer rounded-lg border border-slate-200 bg-slate-50 px-[10px] py-[6px] text-[12px] text-slate-800 outline-none dark:border-white/[0.07] dark:bg-white/5 dark:text-slate-100"
                >
                  <option>30 minutes</option>
                  <option>1 hour</option>
                  <option>2 hours</option>
                  <option>4 hours</option>
                  <option>1 day</option>
                </select>
              </div>

              <div className="rounded-[10px] border border-blue-500/20 bg-blue-500/10 px-4 py-[13px]">
                <div className="mb-2 text-[10.5px] font-semibold uppercase tracking-[.05em] text-blue-400">Live Preview</div>
                <div className="flex flex-wrap gap-[6px]">
                  {slotPreview.map((s) => (
                    <span key={s} className="rounded-md border border-blue-500/30 bg-blue-500/10 px-2 py-1 text-[10.5px] text-blue-300">
                      {s}
                    </span>
                  ))}
                </div>
                <div className="mt-2 text-[10.5px] text-slate-500 dark:text-[#94A3B8]">
                  {slotConfig.duration}m slot + {slotConfig.buffer}m buffer with {slotConfig.leadTime} lead time.
                </div>
              </div>
            </div>
          </section>

          <section className="overflow-hidden rounded-[14px] border border-slate-200 bg-white dark:border-white/[0.07] dark:bg-[#161f30]">
            <div className="flex items-center justify-between border-b border-slate-200 px-5 py-[15px] dark:border-white/[0.07]">
              <div>
                <div className="text-[13px] font-semibold text-slate-900 dark:text-slate-100">Holidays & Time Offs</div>
                <div className="mt-0.5 text-[11px] text-slate-500 dark:text-[#94A3B8]">Block dates on the calendar</div>
              </div>
              <button
                type="button"
                onClick={() => setOpenHolidayModal(true)}
                className="rounded-[7px] bg-blue-500/15 px-[11px] py-[5px] text-[11.5px] font-semibold text-blue-400"
              >
                + Add
              </button>
            </div>

            <div className="flex items-center justify-between border-b border-slate-200 px-5 py-3 dark:border-white/[0.07]">
              <button
                type="button"
                onClick={() => setCalMonth((m) => new Date(m.getFullYear(), m.getMonth() - 1, 1))}
                className="flex h-7 w-7 items-center justify-center rounded-[7px] bg-slate-100 text-slate-600 dark:bg-white/10 dark:text-[#94A3B8]"
              >
                <ChevronLeft className="h-[13px] w-[13px]" />
              </button>
              <div className="text-[13px] font-semibold text-slate-900 dark:text-slate-100">
                {calMonth.toLocaleDateString("en-IN", { month: "long", year: "numeric" })}
              </div>
              <button
                type="button"
                onClick={() => setCalMonth((m) => new Date(m.getFullYear(), m.getMonth() + 1, 1))}
                className="flex h-7 w-7 items-center justify-center rounded-[7px] bg-slate-100 text-slate-600 dark:bg-white/10 dark:text-[#94A3B8]"
              >
                <ChevronRight className="h-[13px] w-[13px]" />
              </button>
            </div>

            <div className="px-5 pt-3">
              <div className="mb-[6px] grid grid-cols-7 gap-[2px]">
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
                  <div key={d} className="py-[3px] text-center text-[9.5px] font-semibold text-slate-500 dark:text-[#94A3B8]">
                    {d}
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-7 gap-[2px]" id="cal-grid">
                {calendarCells.map((c) => {
                  if (!c.inMonth) {
                    return <div key={c.key} className="h-8 rounded" />;
                  }
                  const dateKey = toDateString(calMonth.getFullYear(), calMonth.getMonth(), c.d);
                  const blocked = holidayMap.has(dateKey);
                  return (
                    <div
                      key={c.key}
                      className={`flex h-8 items-center justify-center rounded text-[11px] ${blocked ? "bg-red-500/15 text-red-400" : "text-slate-700 dark:text-slate-200"}`}
                    >
                      {c.d}
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="pt-3">
              <div className="px-5 pb-2 text-[10px] font-semibold uppercase tracking-[.07em] text-slate-500 dark:text-[#94A3B8]">Upcoming</div>
              <div>
                {upcoming.length === 0 ? (
                  <div className="px-5 py-3 text-[11px] text-slate-500 dark:text-[#94A3B8]">No upcoming blocks</div>
                ) : (
                  upcoming.map((h) => (
                    <div key={h.id} className="flex items-center justify-between border-b border-slate-200 px-5 py-[10px] text-[11.5px] dark:border-white/[0.07] last:border-b-0">
                      <div>
                        <div className="font-medium text-slate-800 dark:text-slate-100">{h.label}</div>
                        <div className="mt-0.5 text-slate-500 dark:text-[#94A3B8]">{fmtDate(new Date(h.from))}</div>
                      </div>
                      <button
                        type="button"
                        onClick={() => setHolidays((prev) => prev.filter((x) => x.id !== h.id))}
                        className="rounded-md p-1.5 text-slate-500 hover:bg-red-500/10 hover:text-red-400"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  ))
                )}
              </div>

              <div className="mt-1 border-t border-slate-200 px-5 py-[10px] dark:border-white/[0.07]">
                <div className="flex items-center gap-[6px] text-[11px] text-slate-500 dark:text-[#94A3B8]">
                  <Info className="h-3 w-3" />
                  Existing appointments on blocked dates will need manual rescheduling.
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>

      <HolidayModal
        open={openHolidayModal}
        onClose={() => setOpenHolidayModal(false)}
        onSave={(next) =>
          setHolidays((prev) => [...prev, { id: `H-${Date.now()}`, ...next }])
        }
      />
    </div>
  );
}

function ConfigCounter({
  title,
  sub,
  value,
  onDec,
  onInc,
}: {
  title: string;
  sub: string;
  value: string;
  onDec: () => void;
  onInc: () => void;
}) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <div className="text-[12.5px] font-medium text-slate-800 dark:text-slate-100">{title}</div>
        <div className="mt-[2px] text-[11px] text-slate-500 dark:text-[#94A3B8]">{sub}</div>
      </div>
      <div className="flex items-center gap-[6px]">
        <button
          type="button"
          onClick={onDec}
          className="flex h-7 w-7 items-center justify-center rounded-[7px] bg-slate-100 text-slate-600 dark:bg-white/10 dark:text-[#94A3B8]"
        >
          <Minus className="h-4 w-4" />
        </button>
        <div className="min-w-[52px] text-center text-[14px] font-bold text-slate-900 dark:text-slate-100">{value}</div>
        <button
          type="button"
          onClick={onInc}
          className="flex h-7 w-7 items-center justify-center rounded-[7px] bg-slate-100 text-slate-600 dark:bg-white/10 dark:text-[#94A3B8]"
        >
          <Plus className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
