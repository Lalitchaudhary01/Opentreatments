import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import { ChipFilter, UiAppointment } from "../types";
import AppointmentsFilterBar from "./sections/AppointmentsFilterBar";
import AppointmentsTable from "./sections/AppointmentsTable";

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
  searchParams: Promise<{ filter?: string; new?: string }> | { filter?: string; new?: string };
}) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) redirect("/login");

  const doctor = await prisma.independentDoctor.findUnique({
    where: { userId: session.user.id },
    select: { id: true, name: true },
  });
  if (!doctor) redirect("/register-doctor");

  const resolvedSearchParams = await Promise.resolve(searchParams);
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
        <AppointmentsFilterBar chips={chips} activeFilter={filter} doctorId={doctor.id} openNew={openNew} />
        <AppointmentsTable appointments={appointments} todayCount={counts.today} doctorName={doctor.name} />
      </div>
    </div>
  );
}
