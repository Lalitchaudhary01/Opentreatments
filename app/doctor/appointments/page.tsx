import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import Link from "next/link";
import { updateConsultationStatus } from "@/features/panel/doctor/appointments/actions";
import { AddOfflinePatientModal } from "@/features/panel/doctor/patient/components/AddOfflinePatientModal";

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
  searchParams?:
    | Promise<{ filter?: string; new?: string } | undefined>
    | { filter?: string; new?: string }
    | undefined;
}) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) redirect("/login");

  const doctor = await prisma.independentDoctor.findUnique({
    where: { userId: session.user.id },
    select: { id: true, name: true, status: true },
  });
  if (!doctor) redirect("/doctor/profile/submit");
  if (doctor.status !== "APPROVED") redirect("/doctor/approvals");

  const resolvedSearchParams = (await Promise.resolve(searchParams)) ?? {};
  const rawFilter = (resolvedSearchParams.filter || "all").toLowerCase();
  const openNew = resolvedSearchParams.new === "1";
  const filter: ChipFilter = ["all", "confirmed", "in-progress", "waiting", "completed"].includes(rawFilter)
    ? (rawFilter as ChipFilter)
    : "all";

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

  const appointments = filteredByChip;

  if (allAppointments.length === 0) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-[#111827] px-7 py-[22px]">
        <div className="mx-auto max-w-4xl rounded-[14px] border border-slate-200 dark:border-white/[0.07] bg-white dark:bg-[#161f30] p-0 overflow-hidden">
          <div className="px-5 py-[15px] border-b border-slate-200 dark:border-white/[0.07]">
            <div className="text-[13px] font-semibold text-slate-900 dark:text-slate-100">All Appointments</div>
            <div className="mt-0.5 text-[11px] text-slate-500 dark:text-[#94A3B8]">0 total</div>
          </div>
          <div className="flex flex-col items-center justify-center px-10 py-16 text-center">
            <div className="mb-5 h-[68px] w-[68px] rounded-[18px] bg-blue-500/10 flex items-center justify-center text-blue-500">
              <svg viewBox="0 0 24 24" className="h-[30px] w-[30px]" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01"/></svg>
            </div>
            <div className="mb-2 text-[15px] font-semibold text-slate-900 dark:text-slate-100">No appointments yet</div>
            <p className="mb-5 max-w-[320px] text-[12.5px] leading-[1.7] text-slate-500 dark:text-[#94A3B8]">
            Once you book your first appointment it will appear here. You can also accept bookings from patients via your public profile link.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/doctor/appointments?new=1" className="inline-flex h-9 items-center rounded-lg bg-[#3b82f6] px-4 text-[12px] font-medium text-white hover:bg-[#2563eb]">
                + Book Appointment
              </Link>
              <Link href="/doctor/profile" className="inline-flex h-9 items-center rounded-lg border border-slate-300 dark:border-white/20 px-4 text-[12px] font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/5">
                Copy Booking Link
              </Link>
              <AddOfflinePatientModal
                doctorId={doctor.id}
                triggerLabel="Register First Walk-in"
                triggerClassName="inline-flex h-9 items-center rounded-lg border border-teal-400/50 px-4 text-[12px] font-medium text-teal-500 hover:bg-teal-500/10"
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  const counts = {
    all: allAppointments.length,
    today: allAppointments.filter((a) => {
      const d = new Date(a.sortTime);
      const n = new Date();
      return d.getDate() === n.getDate() && d.getMonth() === n.getMonth() && d.getFullYear() === n.getFullYear();
    }).length,
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
      <div className="w-full px-7 py-[22px] space-y-[18px]">
        <div className="flex items-center justify-between gap-[10px] flex-wrap">
          <div className="flex items-center gap-2 flex-wrap">
            {chips.map((chip) => {
              const isActive = chip.value === filter;
              return (
                <Link
                  key={chip.value}
                  href={`/doctor/appointments?filter=${chip.value}`}
                  className={`rounded-[20px] border px-3 py-[5px] text-[11.5px] font-medium transition-colors ${
                    isActive
                      ? "bg-blue-500/15 border-blue-500/40 text-blue-400"
                      : "bg-white dark:bg-[#161f30] border-slate-200 dark:border-white/[0.07] text-slate-500 dark:text-[#94A3B8] hover:border-slate-300 dark:hover:border-white/20 hover:text-slate-700 dark:hover:text-slate-200"
                  }`}
                >
                  {chip.name}
                </Link>
              );
            })}
          </div>

          <AddOfflinePatientModal doctorId={doctor.id} triggerLabel="New" defaultOpen={openNew} />
        </div>

        <div className="overflow-hidden rounded-[14px] border border-slate-200 dark:border-white/[0.07] bg-white dark:bg-[#161f30] transition-colors hover:border-slate-300 dark:hover:border-white/20">
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-white/[0.07] px-5 py-[15px]">
            <div>
              <h2 className="text-[13px] font-semibold text-slate-900 dark:text-slate-100">Appointments</h2>
              <p className="mt-0.5 text-[11px] text-slate-500 dark:text-[#94A3B8]">{counts.today} today</p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-slate-200 dark:border-white/[0.07] bg-slate-50 dark:bg-[#1b263b] text-left text-[10px] font-semibold uppercase tracking-[0.07em] text-slate-500 dark:text-[#94A3B8]">
                  <th className="px-[18px] py-[9px]">Patient</th>
                  <th className="px-[18px] py-[9px]">Time</th>
                  <th className="px-[18px] py-[9px]">Doctor</th>
                  <th className="px-[18px] py-[9px]">Type</th>
                  <th className="px-[18px] py-[9px]">Booking</th>
                  <th className="px-[18px] py-[9px]">Status</th>
                  <th className="px-[18px] py-[9px]" />
                </tr>
              </thead>

              <tbody>
                {appointments.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-[18px] py-14 text-center text-[12.5px] text-slate-500 dark:text-[#94A3B8]">
                      No appointments found
                    </td>
                  </tr>
                ) : (
                  appointments.map((item) => (
                    <tr key={`${item.recordType}-${item.id}`} className="border-b border-slate-200 dark:border-white/[0.07] last:border-b-0 hover:bg-slate-50/70 dark:hover:bg-white/[0.02]">
                      <td className="px-[18px] py-[11px] align-middle">
                        <div className="flex items-center gap-[10px]">
                          <div className={`h-[30px] w-[30px] rounded-full flex items-center justify-center text-[10.5px] font-bold ${item.avatarBg} ${item.avatarText}`}>
                            {item.avatar}
                          </div>
                          <div>
                            <p className="text-[12.5px] font-medium text-slate-900 dark:text-slate-100">{item.patientName}</p>
                            <p className="text-[10.5px] text-slate-500 dark:text-[#94A3B8]">#{item.patientId}</p>
                          </div>
                        </div>
                      </td>

                      <td className="px-[18px] py-[11px] align-middle text-[12.5px] text-slate-600 dark:text-slate-300">{item.time}</td>
                      <td className="px-[18px] py-[11px] align-middle text-[12.5px] text-slate-600 dark:text-slate-300">Dr. {doctor.name || "R. Iyer"}</td>
                      <td className="px-[18px] py-[11px] align-middle">
                        <span className={`inline-flex items-center gap-1 rounded-[20px] px-[9px] py-[3px] text-[11px] font-medium ${item.type === "Follow-up" ? "bg-teal-500/15 text-teal-400" : item.type === "Procedure" ? "bg-amber-500/15 text-amber-400" : "bg-blue-500/15 text-blue-400"}`}>
                          <span className="inline-block h-[5px] w-[5px] shrink-0 rounded-full bg-current opacity-70" />
                          {item.type}
                        </span>
                      </td>

                      <td className="px-[18px] py-[11px] align-middle">
                        <span className={`inline-flex items-center gap-1 rounded-[20px] px-[9px] py-[3px] text-[11px] font-medium ${bookingClasses(item.booking)}`}>
                          <span className="inline-block h-[5px] w-[5px] shrink-0 rounded-full bg-current opacity-70" />
                          {item.booking}
                        </span>
                      </td>

                      <td className="px-[18px] py-[11px] align-middle">
                        <span className={`inline-flex items-center gap-1 rounded-[20px] px-[9px] py-[3px] text-[11px] font-medium ${statusClasses(item.statusLabel)}`}>
                          <span className="inline-block h-[5px] w-[5px] shrink-0 rounded-full bg-current opacity-70" />
                          {item.statusLabel}
                        </span>
                      </td>

                      <td className="px-[18px] py-[11px] align-middle">
                        <div className="flex items-center gap-2 justify-end">
                          {item.recordType === "consultation" && item.statusLabel !== "Completed" ? (
                            <form
                              action={async () => {
                                "use server";
                                await updateConsultationStatus(item.id, "APPROVED");
                              }}
                            >
                              <button
                                type="submit"
                                className="rounded-lg border border-green-500/30 bg-green-500/12 px-[10px] py-1 text-[11px] font-medium text-green-400 hover:bg-green-500/20"
                              >
                                Done
                              </button>
                            </form>
                          ) : null}

                          <button className="rounded-lg border border-slate-200 dark:border-white/[0.07] px-[9px] py-[3px] text-[11px] text-slate-600 dark:text-[#94A3B8] hover:bg-slate-100 dark:hover:bg-white/[0.06]">
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
