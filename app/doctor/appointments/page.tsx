import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import Link from "next/link";
import { Plus, Search } from "lucide-react";
import { updateConsultationStatus } from "@/features/panel/doctor/consultations/actions";

type ChipFilter = "all" | "confirmed" | "in-progress" | "waiting" | "completed";

type UiAppointment = {
  id: string;
  recordType: "consultation" | "walkin";
  patientName: string;
  patientId: string;
  phoneNumber?: string;
  avatar: string;
  avatarBg: string;
  avatarText: string;
  time: string;
  type: string;
  booking: "Online Booked" | "Offline Booked" | "Walk-in";
  statusLabel: "Confirmed" | "In Progress" | "Waiting" | "Completed" | "Cancelled";
  sortTime: number;
};

const patientIds = [
  "PT-0041",
  "PT-0088",
  "PT-0112",
  "PT-0057",
  "PT-0203",
  "PT-0174",
  "PT-0091",
  "PT-0288",
];

const avatarPalette = [
  { bg: "bg-blue-500/20", text: "text-blue-400" },
  { bg: "bg-teal-500/20", text: "text-teal-400" },
  { bg: "bg-violet-500/20", text: "text-violet-400" },
  { bg: "bg-amber-500/20", text: "text-amber-400" },
  { bg: "bg-green-500/20", text: "text-green-400" },
  { bg: "bg-pink-500/20", text: "text-pink-400" },
] as const;

function getInitials(name?: string | null) {
  if (!name?.trim()) return "PT";
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

function getPatientId(index: number) {
  return patientIds[index] || `PT-${String(index + 1).padStart(4, "0")}`;
}

function hashKey(value: string) {
  let hash = 0;
  for (let i = 0; i < value.length; i += 1) {
    hash = (hash * 31 + value.charCodeAt(i)) >>> 0;
  }
  return hash;
}

function formatTime(slot: Date | string) {
  const date = new Date(slot);
  if (Number.isNaN(date.getTime())) return "9:00 AM";
  return date.toLocaleTimeString("en-IN", {
    hour: "numeric",
    minute: "2-digit",
  });
}

function mapStatus(status: string): UiAppointment["statusLabel"] {
  if (status === "APPROVED") return "Confirmed";
  if (status === "PENDING") return "Waiting";
  if (status === "IN_PROGRESS") return "In Progress";
  if (status === "COMPLETED") return "Completed";
  return "Cancelled";
}

function statusClasses(status: UiAppointment["statusLabel"]) {
  if (status === "Confirmed") return "bg-teal-500/15 text-teal-400";
  if (status === "In Progress") return "bg-blue-500/15 text-blue-400";
  if (status === "Waiting") return "bg-amber-500/15 text-amber-400";
  if (status === "Completed") return "bg-violet-500/15 text-violet-400";
  return "bg-red-500/15 text-red-400";
}

function bookingClasses(booking: UiAppointment["booking"]) {
  if (booking === "Online Booked") return "bg-blue-500/15 text-blue-400";
  if (booking === "Offline Booked") return "bg-teal-500/15 text-teal-400";
  return "bg-purple-500/15 text-purple-400";
}

function deriveType(mode: string, notes?: string | null) {
  const lower = `${notes || ""}`.toLowerCase();
  if (lower.includes("follow")) return "Follow-up";
  if (lower.includes("procedure")) return "Procedure";
  if (mode?.toLowerCase() === "offline") return "Consultation";
  return "Consultation";
}

function deriveWalkinType(complaint?: string | null) {
  const lower = `${complaint || ""}`.toLowerCase();
  if (lower.includes("follow")) return "Follow-up";
  if (lower.includes("procedure")) return "Procedure";
  return "Consultation";
}

export default async function DoctorAppointmentsPage({
  searchParams,
}: {
  searchParams: { filter?: string; q?: string };
}) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) redirect("/login");

  const doctor = await prisma.independentDoctor.findUnique({
    where: { userId: session.user.id },
    select: { id: true, name: true },
  });
  if (!doctor) redirect("/register-doctor");

  const filter = (searchParams.filter || "all").toLowerCase() as ChipFilter;
  const query = (searchParams.q || "").trim().toLowerCase();

  const [consultations, walkins] = await Promise.all([
    prisma.independentConsultation.findMany({
      where: { doctorId: doctor.id },
      include: {
        user: {
          select: {
            name: true,
            phone: true,
          },
        },
      },
      orderBy: { slot: "desc" },
    }),
    prisma.offlineConsultation.findMany({
      where: { doctorId: doctor.id },
      orderBy: { visitTime: "desc" },
    }),
  ]);

  const consultationAppointments: UiAppointment[] = consultations.map((item, index) => {
    const patientName = item.user.name || "Unknown Patient";
    const patientId = getPatientId(index);
    const palette = avatarPalette[hashKey(patientId + patientName) % avatarPalette.length];

    return {
      id: item.id,
      recordType: "consultation",
      patientName,
      patientId,
      phoneNumber: item.user.phone || undefined,
      avatar: getInitials(patientName),
      avatarBg: palette.bg,
      avatarText: palette.text,
      time: formatTime(item.slot),
      type: deriveType(item.mode, item.notes),
      booking: item.mode?.toLowerCase() === "offline" ? "Offline Booked" : "Online Booked",
      statusLabel: mapStatus(item.status),
      sortTime: new Date(item.slot).getTime(),
    };
  });

  const walkinAppointments: UiAppointment[] = walkins.map((item, index) => {
    const patientName = item.patientName || "Walk-in Patient";
    const patientId = getPatientId(index + consultations.length);
    const palette = avatarPalette[hashKey(patientId + patientName) % avatarPalette.length];
    const visitTime = new Date(item.visitTime).getTime();

    return {
      id: item.id,
      recordType: "walkin",
      patientName,
      patientId,
      phoneNumber: item.phoneNumber || undefined,
      avatar: getInitials(patientName),
      avatarBg: palette.bg,
      avatarText: palette.text,
      time: formatTime(item.visitTime),
      type: deriveWalkinType(item.complaint),
      booking: "Walk-in",
      statusLabel: visitTime <= Date.now() ? "Completed" : "Confirmed",
      sortTime: visitTime,
    };
  });

  const allAppointments = [...consultationAppointments, ...walkinAppointments].sort(
    (a, b) => b.sortTime - a.sortTime
  );

  const filteredByChip =
    filter === "confirmed"
      ? allAppointments.filter((a) => a.statusLabel === "Confirmed")
      : filter === "in-progress"
      ? allAppointments.filter((a) => a.statusLabel === "In Progress")
      : filter === "waiting"
      ? allAppointments.filter((a) => a.statusLabel === "Waiting")
      : filter === "completed"
      ? allAppointments.filter((a) => a.statusLabel === "Completed")
      : allAppointments;

  const appointments = query
    ? filteredByChip.filter(
        (a) =>
          a.patientName.toLowerCase().includes(query) ||
          a.patientId.toLowerCase().includes(query) ||
          (a.phoneNumber || "").toLowerCase().includes(query)
      )
    : filteredByChip;

  const counts = {
    all: allAppointments.length,
    confirmed: allAppointments.filter((a) => a.statusLabel === "Confirmed").length,
    inProgress: allAppointments.filter((a) => a.statusLabel === "In Progress").length,
    waiting: allAppointments.filter((a) => a.statusLabel === "Waiting").length,
    completed: allAppointments.filter((a) => a.statusLabel === "Completed").length,
  };

  const chips: { name: string; value: ChipFilter; count: number }[] = [
    { name: "All", value: "all", count: counts.all },
    { name: "Confirmed", value: "confirmed", count: counts.confirmed },
    { name: "In Progress", value: "in-progress", count: counts.inProgress },
    { name: "Waiting", value: "waiting", count: counts.waiting },
    { name: "Completed", value: "completed", count: counts.completed },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#111827]">
      <div className="max-w-[1164px] mx-auto px-6 py-6 space-y-4">
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <div className="flex items-center gap-2 flex-wrap">
            {chips.map((chip) => {
              const isActive = chip.value === filter;
              return (
                <Link
                  key={chip.value}
                  href={`/doctor/appointments?filter=${chip.value}${query ? `&q=${encodeURIComponent(query)}` : ""}`}
                  className={`px-4 py-1.5 rounded-full text-sm border transition-colors ${
                    isActive
                      ? "bg-blue-500/15 border-blue-500/40 text-blue-400"
                      : "bg-white dark:bg-[#161f30] border-slate-200 dark:border-white/10 text-slate-500 dark:text-slate-300"
                  }`}
                >
                  {chip.name}
                  {chip.count > 0 ? <span className="ml-1.5">{chip.count}</span> : null}
                </Link>
              );
            })}
          </div>

          <div className="flex items-center gap-2.5">
            <form method="GET" action="/doctor/appointments" className="relative">
              <input type="hidden" name="filter" value={filter} />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                name="q"
                defaultValue={query}
                placeholder="Search appointments..."
                className="pl-9 pr-3 h-9 text-sm border border-slate-200 dark:border-white/10 rounded-lg bg-white dark:bg-[#161f30] text-slate-900 dark:text-slate-100 w-60"
              />
            </form>

            <button className="h-9 px-3 rounded-lg bg-blue-600 text-white hover:bg-blue-500 inline-flex items-center gap-1.5 text-sm">
              <Plus className="w-4 h-4" />
              New
            </button>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#161f30] overflow-hidden">
          <div className="px-5 py-4 border-b border-slate-200 dark:border-white/10 flex items-center justify-between">
            <div>
              <h2 className="text-base font-semibold text-slate-900 dark:text-slate-100">Appointments</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{counts.all} total</p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200 dark:border-white/10 text-left text-[11px] uppercase tracking-wide text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-[#1b263b]">
                  <th className="px-4 py-3 font-semibold">Patient</th>
                  <th className="px-4 py-3 font-semibold">Time</th>
                  <th className="px-4 py-3 font-semibold">Doctor</th>
                  <th className="px-4 py-3 font-semibold">Type</th>
                  <th className="px-4 py-3 font-semibold">Booking</th>
                  <th className="px-4 py-3 font-semibold">Status</th>
                  <th className="px-4 py-3 font-semibold" />
                </tr>
              </thead>

              <tbody>
                {appointments.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-4 py-14 text-center text-slate-500 dark:text-slate-400">
                      No appointments found
                    </td>
                  </tr>
                ) : (
                  appointments.map((item) => (
                    <tr key={`${item.recordType}-${item.id}`} className="border-b border-slate-200 dark:border-white/10 last:border-b-0 hover:bg-slate-50 dark:hover:bg-white/5">
                      <td className="px-4 py-3.5">
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-semibold ${item.avatarBg} ${item.avatarText}`}>
                            {item.avatar}
                          </div>
                          <div>
                            <p className="font-semibold text-slate-900 dark:text-slate-100">{item.patientName}</p>
                            <p className="text-xs text-slate-500 dark:text-slate-400">#{item.patientId}</p>
                          </div>
                        </div>
                      </td>

                      <td className="px-4 py-3.5 text-slate-600 dark:text-slate-300">{item.time}</td>
                      <td className="px-4 py-3.5 text-slate-600 dark:text-slate-300">Dr. {doctor.name || "R. Iyer"}</td>
                      <td className="px-4 py-3.5 text-slate-600 dark:text-slate-300">{item.type}</td>

                      <td className="px-4 py-3.5">
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${bookingClasses(item.booking)}`}>
                          {item.booking}
                        </span>
                      </td>

                      <td className="px-4 py-3.5">
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${statusClasses(item.statusLabel)}`}>
                          {item.statusLabel}
                        </span>
                      </td>

                      <td className="px-4 py-3.5">
                        <div className="flex items-center gap-2 justify-end">
                          {item.recordType === "consultation" && (item.statusLabel === "Waiting" || item.statusLabel === "In Progress") ? (
                            <form
                              action={async () => {
                                "use server";
                                await updateConsultationStatus(item.id, "APPROVED");
                              }}
                            >
                              <button
                                type="submit"
                                className="h-7 px-3 rounded-lg text-xs bg-green-500/15 text-green-400 hover:bg-green-500/25"
                              >
                                Done
                              </button>
                            </form>
                          ) : null}

                          <button className="h-7 px-3 rounded-lg text-xs border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/10">
                            View
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
