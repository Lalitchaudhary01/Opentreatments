import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import Link from "next/link";
import { CalendarDays, IndianRupee, Receipt, Users } from "lucide-react";

function initials(name?: string | null) {
  if (!name?.trim()) return "PT";
  return name
    .split(" ")
    .map((p) => p[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

function formatTime(slot: Date) {
  return slot.toLocaleTimeString("en-IN", { hour: "numeric", minute: "2-digit" });
}

function mapStatus(status: string) {
  if (status === "APPROVED") return { label: "Confirmed", cls: "bg-teal-500/15 text-teal-400" };
  if (status === "PENDING") return { label: "Waiting", cls: "bg-amber-500/15 text-amber-400" };
  if (status === "IN_PROGRESS") return { label: "In Progress", cls: "bg-blue-500/15 text-blue-400" };
  if (status === "COMPLETED") return { label: "Completed", cls: "bg-violet-500/15 text-violet-400" };
  return { label: "Cancelled", cls: "bg-red-500/15 text-red-400" };
}

function deriveType(mode: string, notes?: string | null, index = 0) {
  const lower = `${notes || ""}`.toLowerCase();
  if (lower.includes("follow")) return "Follow-up";
  if (lower.includes("procedure")) return "Procedure";
  if (mode?.toLowerCase() === "offline") return "Consultation";
  const fallback = ["Consultation", "Follow-up", "Procedure"];
  return fallback[index % fallback.length];
}

function typePillClass(type: string) {
  if (type === "Follow-up") return "bg-teal-500/15 text-teal-400";
  if (type === "Procedure") return "bg-amber-500/15 text-amber-400";
  return "bg-blue-500/15 text-blue-400";
}

function cardIconTone(kind: "blue" | "teal" | "amber" | "green") {
  if (kind === "blue") return "bg-blue-500/15 text-blue-400";
  if (kind === "teal") return "bg-teal-500/15 text-teal-400";
  if (kind === "amber") return "bg-amber-500/15 text-amber-400";
  return "bg-green-500/15 text-green-400";
}

const weekBars = [55, 80, 65, 90, 72, 28, 12];

const staticRevenue = [
  { label: "Consultations", value: "Rs 54,200", width: 78, color: "bg-blue-500" },
  { label: "Procedures", value: "Rs 21,600", width: 45, color: "bg-teal-500" },
  { label: "Follow-ups", value: "Rs 16,300", width: 24, color: "bg-amber-500" },
];

export default async function DoctorOverviewPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) redirect("/login");

  const doctor = await prisma.independentDoctor.findUnique({
    where: { userId: session.user.id },
    select: { id: true, name: true },
  });
  if (!doctor) redirect("/register-doctor");

  const now = new Date();
  const startOfDay = new Date(now);
  startOfDay.setHours(0, 0, 0, 0);
  const endOfDay = new Date(now);
  endOfDay.setHours(23, 59, 59, 999);

  const [todayAppointmentsCount, onlinePatients, offlinePatients, todayRows] = await Promise.all([
    prisma.independentConsultation.count({
      where: {
        doctorId: doctor.id,
        slot: { gte: startOfDay, lte: endOfDay },
      },
    }),
    prisma.independentConsultation.count({
      where: { doctorId: doctor.id, status: "APPROVED" },
    }),
    prisma.offlineConsultation.count({
      where: { doctorId: doctor.id },
    }),
    prisma.independentConsultation.findMany({
      where: {
        doctorId: doctor.id,
        slot: { gte: startOfDay, lte: endOfDay },
      },
      include: {
        user: {
          select: { name: true },
        },
      },
      orderBy: { slot: "asc" },
      take: 12,
    }),
  ]);

  const totalPatients = onlinePatients + offlinePatients;

  const stats = [
    {
      title: "Today's Appointments",
      value: String(todayAppointmentsCount),
      delta: `+${Math.max(todayAppointmentsCount - 1, 0)}`,
      tone: "blue" as const,
      icon: CalendarDays,
    },
    {
      title: "Total Patients",
      value: totalPatients.toLocaleString("en-IN"),
      delta: `+${Math.max(totalPatients - 1, 0)}`,
      tone: "teal" as const,
      icon: Users,
    },
    {
      title: "Revenue This Month",
      value: "Rs 92,100",
      delta: "+12%",
      tone: "amber" as const,
      icon: IndianRupee,
    },
    {
      title: "Pending Invoices",
      value: "3",
      delta: "3",
      tone: "green" as const,
      icon: Receipt,
    },
  ];

  const activity = todayRows.slice(0, 5).map((row, idx) => ({
    id: row.id,
    text: `${row.user.name || "Patient"} ${row.status === "COMPLETED" ? "appointment completed" : "checked in"}`,
    time: idx === 0 ? "2 min ago" : `${idx * 15} min ago`,
    dot: idx % 2 === 0 ? "bg-green-400" : "bg-blue-400",
  }));

  const upcoming = todayRows
    .filter((row) => row.slot.getTime() >= now.getTime())
    .slice(0, 4)
    .map((row) => ({
      id: row.id,
      name: row.user.name || "Patient",
      type: deriveType(row.mode, row.notes),
      time: row.slot,
    }));

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#111827] px-7 py-[22px]">
      <div className="w-full space-y-[18px]">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-[14px]">
          {stats.map((card) => {
            const Icon = card.icon;
            return (
              <div key={card.title} className="rounded-[13px] border border-slate-200 dark:border-white/[0.07] bg-white dark:bg-[#161f30] p-[18px] transition-colors hover:border-slate-300 dark:hover:border-white/20">
                <div className="mb-3 flex items-start justify-between">
                  <div className={`h-[34px] w-[34px] rounded-[9px] flex items-center justify-center ${cardIconTone(card.tone)}`}>
                    <Icon className="h-[17px] w-[17px]" />
                  </div>
                  <span className="inline-flex items-center rounded-full bg-green-500/15 px-[7px] py-[2px] text-[10px] font-medium text-green-400">
                    {card.delta}
                  </span>
                </div>
                <p className="mb-[3px] text-[24px] font-bold leading-none tracking-[-0.03em] text-slate-900 dark:text-slate-100">{card.value}</p>
                <p className="text-[11px] text-slate-500 dark:text-[#94A3B8]">{card.title}</p>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-[1fr_300px] gap-4 items-start">
          <div className="rounded-[14px] border border-slate-200 dark:border-white/[0.07] bg-white dark:bg-[#161f30] overflow-hidden transition-colors hover:border-slate-300 dark:hover:border-white/20">
            <div className="px-5 py-[15px] border-b border-slate-200 dark:border-white/[0.07] flex items-center justify-between">
              <div>
                <h2 className="text-[13px] font-semibold text-slate-900 dark:text-slate-100">Today's Appointments</h2>
                <p className="mt-0.5 text-[11px] text-slate-500 dark:text-[#94A3B8]">
                  {now.toLocaleDateString("en-IN", { month: "short", day: "numeric" })} · {todayAppointmentsCount} scheduled
                </p>
              </div>
              <Link href="/doctor/appointments" className="text-[12px] font-medium text-blue-400 hover:text-blue-300">
                View all →
              </Link>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-white/[0.07] bg-slate-50 dark:bg-[#1b263b] text-left text-[10px] font-semibold uppercase tracking-[0.07em] text-slate-500 dark:text-[#94A3B8]">
                    <th className="px-[18px] py-[9px]">Patient</th>
                    <th className="px-[18px] py-[9px]">Time</th>
                    <th className="px-[18px] py-[9px]">Type</th>
                    <th className="px-[18px] py-[9px]">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {todayRows.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="px-[18px] py-14 text-center text-[12.5px] text-slate-500 dark:text-[#94A3B8]">
                        No appointments for today
                      </td>
                    </tr>
                  ) : (
                    todayRows.map((row, idx) => {
                      const status = mapStatus(row.status);
                      const apptType = deriveType(row.mode, row.notes, idx);
                      return (
                        <tr key={row.id} className="border-b border-slate-200 dark:border-white/[0.07] last:border-b-0 hover:bg-slate-50/70 dark:hover:bg-white/[0.02]">
                          <td className="px-[18px] py-[11px] align-middle">
                            <div className="flex items-center gap-[10px]">
                              <div className="h-[30px] w-[30px] rounded-full bg-blue-500/20 text-[10.5px] font-bold text-blue-400 flex items-center justify-center">
                                {initials(row.user.name)}
                              </div>
                              <span className="text-[12.5px] font-medium text-slate-900 dark:text-slate-100">{row.user.name || "Patient"}</span>
                            </div>
                          </td>
                          <td className="px-[18px] py-[11px] align-middle text-[12.5px] text-slate-600 dark:text-slate-300">{formatTime(row.slot)}</td>
                          <td className="px-[18px] py-[11px] align-middle">
                            <span className={`inline-flex items-center gap-1 rounded-[20px] px-[9px] py-[3px] text-[11px] font-medium ${typePillClass(apptType)}`}>
                              <span className="inline-block h-[5px] w-[5px] shrink-0 rounded-full bg-current opacity-70" />
                              {apptType}
                            </span>
                          </td>
                          <td className="px-[18px] py-[11px] align-middle">
                            <span className={`inline-flex items-center gap-1 rounded-[20px] px-[9px] py-[3px] text-[11px] font-medium ${status.cls}`}>
                              <span className="inline-block h-[5px] w-[5px] shrink-0 rounded-full bg-current opacity-70" />
                              {status.label}
                            </span>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>

          <div className="space-y-[14px]">
            <div className="rounded-[14px] border border-slate-200 dark:border-white/[0.07] bg-white dark:bg-[#161f30] px-[18px] py-4 transition-colors hover:border-slate-300 dark:hover:border-white/20">
              <h3 className="mb-1 text-[13px] font-semibold text-slate-900 dark:text-slate-100">This Week</h3>
              <p className="mb-3 text-[11px] text-slate-500 dark:text-[#94A3B8]">Appointments Mon–Sun</p>
              <div className="flex items-end gap-2 h-24">
                {weekBars.map((height, idx) => (
                  <div key={idx} className="flex-1 flex flex-col items-center gap-1.5">
                    <div className={`w-full rounded-t-md ${idx === 4 ? "bg-blue-500" : "bg-blue-500/35"}`} style={{ height: `${height}%` }} />
                    <span className={`text-[10px] ${idx === 4 ? "text-blue-400 font-semibold" : "text-slate-500 dark:text-[#94A3B8]"}`}>
                      {idx === 0 ? "M" : idx === 1 ? "T" : idx === 2 ? "W" : idx === 3 ? "T" : idx === 4 ? "F" : "S"}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[14px] border border-slate-200 dark:border-white/[0.07] bg-white dark:bg-[#161f30] overflow-hidden transition-colors hover:border-slate-300 dark:hover:border-white/20">
              <div className="px-5 py-[15px] border-b border-slate-200 dark:border-white/[0.07]">
                <h3 className="text-[13px] font-semibold text-slate-900 dark:text-slate-100">Activity</h3>
              </div>
              <div>
                {activity.length === 0 ? (
                  <div className="px-5 py-6 text-[12px] text-slate-500 dark:text-[#94A3B8]">No activity yet</div>
                ) : (
                  activity.map((item) => (
                    <div key={item.id} className="px-[18px] py-[11px] border-b border-slate-200 dark:border-white/[0.07] last:border-b-0">
                      <div className="flex items-start gap-[11px]">
                        <span className={`mt-1 h-[7px] w-[7px] rounded-full ${item.dot}`} />
                        <p className="text-[12px] leading-[1.5] text-slate-700 dark:text-slate-200">{item.text}</p>
                      </div>
                      <p className="ml-[18px] mt-0.5 text-[10.5px] text-slate-500 dark:text-[#94A3B8]">{item.time}</p>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
          <div className="rounded-[14px] border border-slate-200 dark:border-white/[0.07] bg-white dark:bg-[#161f30] overflow-hidden transition-colors hover:border-slate-300 dark:hover:border-white/20">
            <div className="px-5 py-[15px] border-b border-slate-200 dark:border-white/[0.07]">
              <h3 className="text-[13px] font-semibold text-slate-900 dark:text-slate-100">Revenue Breakdown</h3>
              <p className="mt-0.5 text-[11px] text-slate-500 dark:text-[#94A3B8]">February 2026</p>
            </div>
            <div>
              {staticRevenue.map((row) => (
                <div key={row.label} className="px-5 py-3 border-b border-slate-200 dark:border-white/[0.07] last:border-b-0 flex items-center">
                  <span className="w-[110px] shrink-0 text-[12.5px] text-slate-600 dark:text-slate-300">{row.label}</span>
                  <div className="mx-[14px] h-[5px] flex-1 overflow-hidden rounded-full bg-slate-200 dark:bg-white/10">
                    <div className={`h-full ${row.color}`} style={{ width: `${row.width}%` }} />
                  </div>
                  <span className="min-w-[65px] text-right text-[12.5px] font-semibold text-slate-900 dark:text-slate-100">{row.value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[14px] border border-slate-200 dark:border-white/[0.07] bg-white dark:bg-[#161f30] overflow-hidden transition-colors hover:border-slate-300 dark:hover:border-white/20">
            <div className="px-5 py-[15px] border-b border-slate-200 dark:border-white/[0.07]">
              <h3 className="text-[13px] font-semibold text-slate-900 dark:text-slate-100">Upcoming Today</h3>
            </div>

            <div>
              {(upcoming.length > 0 ? upcoming : [
                { id: "s1", name: "Ravi Pillai", type: "Consultation", time: new Date(now.getFullYear(), now.getMonth(), now.getDate(), 11, 30) },
                { id: "s2", name: "Meena Joshi", type: "Follow-up", time: new Date(now.getFullYear(), now.getMonth(), now.getDate(), 12, 0) },
              ]).map((item) => (
                <div key={item.id} className="flex items-center gap-3 border-b border-slate-200 dark:border-white/[0.07] px-[18px] py-[10px] last:border-b-0">
                  <div className="min-w-[48px] rounded-lg bg-blue-500/15 px-2 py-[5px] text-center text-blue-400">
                    <div className="text-[11.5px] font-semibold">{item.time.toLocaleTimeString("en-IN", { hour: "numeric", minute: "2-digit" })}</div>
                  </div>
                  <div>
                    <p className="text-[12.5px] font-medium text-slate-900 dark:text-slate-100">{item.name}</p>
                    <p className="text-[10.5px] text-slate-500 dark:text-[#94A3B8]">{item.type}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
