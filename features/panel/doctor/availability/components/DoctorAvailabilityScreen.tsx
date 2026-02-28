"use client";

import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, Clock3, Info, Minus, Plus, Trash2, X } from "lucide-react";
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
const holidayTypeColors: Record<string, { chip: string; text: string }> = {
  "Public Holiday": { chip: "bg-red-500/15", text: "text-red-400" },
  "Personal Leave": { chip: "bg-blue-500/15", text: "text-blue-400" },
  "Medical Leave": { chip: "bg-amber-500/15", text: "text-amber-400" },
  "Conference / Training": { chip: "bg-violet-500/15", text: "text-violet-300" },
  Other: { chip: "bg-white/10", text: "text-slate-300" },
};

function fmtDate(date: Date) {
  return date.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
}

function fmtTime(t: string) {
  const [h, m] = t.split(":").map(Number);
  const ampm = h >= 12 ? "PM" : "AM";
  const h12 = h % 12 || 12;
  return `${h12}:${String(m).padStart(2, "0")} ${ampm}`;
}

function hoursLabel(open: string, close: string) {
  const [oh, om] = open.split(":").map(Number);
  const [ch, cm] = close.split(":").map(Number);
  const mins = ch * 60 + cm - (oh * 60 + om);
  if (mins <= 0) return "—";
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  return h && m ? `${h}h ${m}m` : h ? `${h}h` : `${m}m`;
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
    const ref = weeklyHours.find((d) => d.enabled) || { open: "09:00", close: "18:00" };
    const [oh, om] = ref.open.split(":").map(Number);
    const [ch, cm] = ref.close.split(":").map(Number);
    const totalMins = ch * 60 + cm - (oh * 60 + om);
    const slotLen = slotConfig.duration + slotConfig.buffer;
    const slotsTotal = Math.max(0, Math.floor(totalMins / Math.max(slotLen, 1)));
    const previewCount = Math.min(slotsTotal, 6);

    const slots: string[] = [];
    let cur = oh * 60 + om;
    for (let i = 0; i < previewCount; i += 1) {
      const hh = Math.floor(cur / 60);
      const mm = cur % 60;
      const ampm = hh >= 12 ? "PM" : "AM";
      const h12 = hh % 12 || 12;
      slots.push(`${h12}:${String(mm).padStart(2, "0")} ${ampm}`);
      cur += slotLen;
    }

    return { slots, slotsTotal };
  }, [slotConfig.buffer, slotConfig.duration, weeklyHours]);

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

  const upcoming = useMemo(
    () =>
      [...holidays]
        .sort((a, b) => new Date(a.from).getTime() - new Date(b.from).getTime())
        .slice(0, 4),
    [holidays]
  );

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
              <span className="text-[11px] text-slate-500 dark:text-[#94A3B8]">
                {openCount} day{openCount !== 1 ? "s" : ""} open
              </span>
            </div>

            <div className="px-0 py-[6px]">
              {weeklyHours.map((row) => (
                <div
                  key={row.day}
                  className="flex items-center gap-[10px] border-b border-slate-200 px-5 py-[11px] dark:border-white/[0.07]"
                  style={{ opacity: row.enabled ? 1 : 0.5 }}
                >
                  <div className="flex items-center gap-3">
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
                        className={`relative h-[19px] w-[34px] rounded-[10px] transition-colors ${
                          row.enabled ? "bg-blue-500" : "bg-slate-200 dark:bg-white/10"
                        }`}
                      >
                        <span
                          className={`absolute h-[14px] w-[14px] rounded-full bg-white transition-all ${
                            row.enabled ? "left-[17px] top-[2.5px]" : "left-[2.5px] top-[2.5px]"
                          }`}
                        />
                      </button>
                      <div
                        className={`w-[88px] shrink-0 text-[12.5px] ${row.enabled ? "font-medium text-slate-900 dark:text-slate-100" : "font-normal text-slate-500 dark:text-[#94A3B8]"}`}
                      >
                        {row.day}
                      </div>
                    </div>

                    {row.enabled ? (
                      <>
                        <input
                          type="time"
                          value={row.open}
                          onChange={(e) =>
                            setWeeklyHours((prev) => prev.map((d) => (d.day === row.day ? { ...d, open: e.target.value } : d)))
                          }
                          className="h-[33px] w-[96px] cursor-pointer rounded-lg border border-slate-200 bg-white px-[9px] text-[12px] text-slate-800 dark:border-white/[0.07] dark:bg-white/5 dark:text-slate-200"
                        />
                        <div className="text-[11px] text-slate-500 dark:text-[#94A3B8]">to</div>
                        <input
                          type="time"
                          value={row.close}
                          onChange={(e) =>
                            setWeeklyHours((prev) => prev.map((d) => (d.day === row.day ? { ...d, close: e.target.value } : d)))
                          }
                          className="h-[33px] w-[96px] cursor-pointer rounded-lg border border-slate-200 bg-white px-[9px] text-[12px] text-slate-800 dark:border-white/[0.07] dark:bg-white/5 dark:text-slate-200"
                        />
                        <div className="ml-auto text-[10.5px] text-slate-500 dark:text-[#94A3B8]">{hoursLabel(row.open, row.close)}</div>
                      </>
                    ) : (
                      <div className="ml-1 text-[11.5px] text-slate-500 dark:text-[#94A3B8]">Day off</div>
                    )}
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
                  setBreaks((prev) => [...prev, { id: `B-${Date.now()}`, label: "New Break", from: "12:00", to: "12:30" }])
                }
                className="rounded-[7px] bg-blue-500/15 px-[11px] py-[5px] text-[11.5px] font-semibold text-blue-400"
              >
                + Add
              </button>
            </div>

            <div className="py-[6px]">
              {breaks.length === 0 ? (
                <div className="px-5 py-[30px] text-center text-[12px] text-slate-500 dark:text-[#94A3B8]">
                  No breaks configured. Click <strong className="text-blue-400">+ Add</strong> to set one.
                </div>
              ) : (
                breaks.map((b) => (
                  <div key={b.id} className="flex items-center gap-[10px] border-b border-slate-200 px-5 py-[11px] dark:border-white/[0.07]">
                    <div className="h-2 w-2 shrink-0 rounded-full bg-amber-400" />
                    <div className="flex-1">
                      <div className="text-[12.5px] font-medium text-slate-800 dark:text-slate-100">{b.label}</div>
                      <div className="mt-[1px] text-[10.5px] text-slate-500 dark:text-[#94A3B8]">
                        {fmtTime(b.from)} — {fmtTime(b.to)} · {hoursLabel(b.from, b.to)}
                      </div>
                    </div>
                    <input
                      type="time"
                      value={b.from}
                      onChange={(e) =>
                        setBreaks((prev) => prev.map((x) => (x.id === b.id ? { ...x, from: e.target.value } : x)))
                      }
                      className="h-[30px] w-[86px] rounded-[7px] border border-slate-200 bg-slate-50 px-2 text-[11.5px] text-slate-800 dark:border-white/[0.07] dark:bg-white/5 dark:text-slate-100"
                    />
                    <div className="text-[11px] text-slate-500 dark:text-[#94A3B8]">—</div>
                    <input
                      type="time"
                      value={b.to}
                      onChange={(e) =>
                        setBreaks((prev) => prev.map((x) => (x.id === b.id ? { ...x, to: e.target.value } : x)))
                      }
                      className="h-[30px] w-[86px] rounded-[7px] border border-slate-200 bg-slate-50 px-2 text-[11.5px] text-slate-800 dark:border-white/[0.07] dark:bg-white/5 dark:text-slate-100"
                    />
                    <button
                      type="button"
                      onClick={() => setBreaks((prev) => prev.filter((x) => x.id !== b.id))}
                      className="flex h-[26px] w-[26px] items-center justify-center rounded-[6px] bg-red-500/10"
                    >
                      <Trash2 className="h-3 w-3 text-red-400" />
                    </button>
                  </div>
                ))
              )}
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
                            ? "rounded-lg border border-blue-500/40 bg-blue-500/15 px-[14px] py-[6px] text-[12px] font-medium text-blue-400"
                            : "rounded-lg border border-slate-200 bg-transparent px-[14px] py-[6px] text-[12px] font-medium text-slate-600 dark:border-white/[0.07] dark:text-[#94A3B8]"
                        }
                      >
                        {opt} min
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
                  {slotPreview.slots.map((s) => (
                    <span key={s} className="rounded-md border border-blue-500/30 bg-blue-500/10 px-[10px] py-1 text-[11px] font-medium text-[#60a5fa]">
                      {s}
                    </span>
                  ))}
                  {slotPreview.slotsTotal > 6 ? (
                    <span className="px-[10px] py-1 text-[11px] text-slate-500 dark:text-[#94A3B8]">+{slotPreview.slotsTotal - 6} more</span>
                  ) : null}
                </div>
                <div className="mt-2 text-[10.5px] text-slate-500 dark:text-[#94A3B8]">
                  {slotPreview.slotsTotal} slots · {slotConfig.duration} min each · {slotConfig.buffer} min buffer
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
                    return <div key={c.key} className="aspect-square rounded" />;
                  }
                  const dateKey = toDateString(calMonth.getFullYear(), calMonth.getMonth(), c.d);
                  const blocked = holidayMap.has(dateKey);
                  const dow = new Date(calMonth.getFullYear(), calMonth.getMonth(), c.d).getDay();
                  const weekIdx = dow === 0 ? 6 : dow - 1;
                  const dayCfg = weeklyHours[weekIdx];
                  const dayOff = dayCfg ? !dayCfg.enabled : false;
                  const today = new Date();
                  const isToday =
                    today.getFullYear() === calMonth.getFullYear() &&
                    today.getMonth() === calMonth.getMonth() &&
                    today.getDate() === c.d;
                  return (
                    <div
                      key={c.key}
                      className={`flex aspect-square items-center justify-center rounded-[6px] border text-[11.5px] transition-colors ${
                        isToday
                          ? "border-blue-500 bg-blue-500 text-white font-bold"
                          : blocked
                          ? "border-red-500/40 bg-red-500/15 text-red-400"
                          : dayOff
                          ? "border-transparent text-slate-400 dark:text-[#64748b]"
                          : "border-transparent text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-white/5"
                      }`}
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
                  <div className="px-5 py-[18px] text-[12px] text-slate-500 dark:text-[#94A3B8]">
                    No upcoming holidays or time offs.
                  </div>
                ) : (
                  upcoming.map((h) => (
                    <div key={h.id} className="flex items-center gap-[10px] border-b border-slate-200 px-5 py-[10px] dark:border-white/[0.07]">
                      <div className="flex h-9 w-9 shrink-0 flex-col items-center justify-center rounded-[9px] bg-blue-500/15 text-blue-400">
                        <div className="text-[14px] font-bold leading-none">{new Date(h.from).getDate()}</div>
                        <div className="text-[8.5px] leading-none opacity-80">
                          {new Date(h.from).toLocaleDateString("en-IN", { month: "short" }).toUpperCase()}
                        </div>
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="truncate text-[12.5px] font-medium text-slate-800 dark:text-slate-100">{h.label}</div>
                        <div className="mt-[1px] text-[10.5px] text-slate-500 dark:text-[#94A3B8]">
                          {h.from === h.to
                            ? fmtDate(new Date(h.from))
                            : `${new Date(h.from).toLocaleDateString("en-IN", {
                                day: "numeric",
                                month: "short",
                              })} – ${fmtDate(new Date(h.to))}`}{" "}
                          ·{" "}
                          {Math.round(
                            (new Date(`${h.to}T00:00:00`).getTime() -
                              new Date(`${h.from}T00:00:00`).getTime()) /
                              86400000
                          ) + 1}{" "}
                          day
                          {Math.round(
                            (new Date(`${h.to}T00:00:00`).getTime() -
                              new Date(`${h.from}T00:00:00`).getTime()) /
                              86400000
                          ) + 1 >
                          1
                            ? "s"
                            : ""}
                        </div>
                      </div>
                      <div className="flex items-center gap-[5px]">
                        <span
                          className={`whitespace-nowrap rounded-[10px] px-[7px] py-[2px] text-[10px] font-medium ${
                            (holidayTypeColors[h.type] || holidayTypeColors.Other).chip
                          } ${(holidayTypeColors[h.type] || holidayTypeColors.Other).text}`}
                        >
                          {h.type.replace("Conference / ", "")}
                        </span>
                        <button
                          type="button"
                          onClick={() => setHolidays((prev) => prev.filter((x) => x.id !== h.id))}
                          className="flex h-[22px] w-[22px] items-center justify-center rounded-[5px] bg-red-500/10"
                        >
                          <X className="h-[10px] w-[10px] text-red-400" />
                        </button>
                      </div>
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
