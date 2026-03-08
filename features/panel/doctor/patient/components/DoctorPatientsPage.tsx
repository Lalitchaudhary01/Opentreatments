import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import { PatientDirectoryTable } from "@/features/panel/doctor/patient";
import PatientsEmptyState from "./sections/PatientsEmptyState";
import PatientsToolbar from "./sections/PatientsToolbar";

type UiFilter = "all" | "recent" | "active" | "new";

type UiPatient = {
  id: string;
  type: "online" | "offline";
  displayName: string;
  phoneNumber?: string;
  city: string;
  lastVisit: string;
  sortTime: number;
  visits: number;
  bloodGroup: string;
  status: "Active" | "New";
  avatar: string;
  patientId: string;
  gender: "Male" | "Female";
  dob: string;
  avatarBg: string;
  avatarText: string;
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

const mockPatientProfiles = [
  { gender: "Female", dob: "12 Mar 1988", city: "Pune", blood: "B+", avatarBg: "bg-blue-500/20", avatarText: "text-blue-400" },
  { gender: "Male", dob: "04 Jul 1992", city: "Pune", blood: "O+", avatarBg: "bg-teal-500/20", avatarText: "text-teal-400" },
  { gender: "Female", dob: "29 Nov 1975", city: "Pune", blood: "A+", avatarBg: "bg-amber-500/20", avatarText: "text-amber-400" },
  { gender: "Male", dob: "17 Feb 1985", city: "Mumbai", blood: "AB-", avatarBg: "bg-violet-500/20", avatarText: "text-violet-400" },
  { gender: "Female", dob: "08 Aug 1993", city: "Pune", blood: "O-", avatarBg: "bg-pink-500/20", avatarText: "text-pink-400" },
  { gender: "Male", dob: "22 Jan 1980", city: "Nashik", blood: "A-", avatarBg: "bg-green-500/20", avatarText: "text-green-400" },
  { gender: "Female", dob: "15 Apr 1967", city: "Pune", blood: "B-", avatarBg: "bg-yellow-500/20", avatarText: "text-yellow-400" },
  { gender: "Male", dob: "30 Oct 1999", city: "Pune", blood: "O+", avatarBg: "bg-blue-500/20", avatarText: "text-blue-400" },
] as const;

function getInitials(name?: string | null): string {
  if (!name?.trim()) return "PT";
  return name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

function formatLastVisit(dateInput?: string | Date | null): string {
  if (!dateInput) return "Today";
  const date = new Date(dateInput);
  if (Number.isNaN(date.getTime())) return "Today";

  const today = new Date();
  const diffTime = today.getTime() - date.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays <= 0) return "Today";
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 7) return `${diffDays} days ago`;
  return date.toLocaleDateString("en-IN", { day: "2-digit", month: "short" });
}

function getPatientId(index: number): string {
  return patientIds[index] || `PT-${String(index + 1).padStart(4, "0")}`;
}

function hashKey(value: string): number {
  let hash = 0;
  for (let i = 0; i < value.length; i += 1) {
    hash = (hash * 31 + value.charCodeAt(i)) >>> 0;
  }
  return hash;
}

function deriveMock(patientId: string, name: string) {
  const key = hashKey(`${patientId}-${name}`);
  const idx = key % mockPatientProfiles.length;
  return mockPatientProfiles[idx];
}

function deriveVisits(key: string, min: number, max: number) {
  const hash = hashKey(key);
  return min + (hash % (max - min + 1));
}

async function getPatientsData(doctorId: string): Promise<UiPatient[]> {
  const [online, offline] = await Promise.all([
    prisma.independentConsultation.findMany({
      where: { doctorId, status: "APPROVED" },
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
      where: { doctorId },
      orderBy: { visitTime: "desc" },
    }),
  ]);

  const onlineFormatted: UiPatient[] = online.map((p, index) => {
    const displayName = p.user.name || "Unknown Patient";
    const patientId = getPatientId(index);
    const mock = deriveMock(patientId, displayName);
    const visits = deriveVisits(p.id, 2, 21);

    return {
      id: p.id,
      type: "online",
      displayName,
      phoneNumber: p.user.phone || "+91 98765 43210",
      city: mock.city,
      lastVisit: formatLastVisit(p.slot),
      sortTime: new Date(p.slot).getTime(),
      visits,
      bloodGroup: mock.blood,
      status: visits <= 1 ? "New" : "Active",
      avatar: getInitials(displayName),
      patientId,
      gender: mock.gender,
      dob: mock.dob,
      avatarBg: mock.avatarBg,
      avatarText: mock.avatarText,
    };
  });

  const offlineFormatted: UiPatient[] = offline.map((p, index) => {
    const displayName = p.patientName;
    const patientId = getPatientId(index + online.length);
    const mock = deriveMock(patientId, displayName);
    const visits = deriveVisits(p.id, 1, 24);

    return {
      id: p.id,
      type: "offline",
      displayName,
      phoneNumber: p.phoneNumber || "+91 98765 43210",
      city: mock.city,
      lastVisit: formatLastVisit(p.visitTime),
      sortTime: new Date(p.visitTime).getTime(),
      visits,
      bloodGroup: mock.blood,
      status: visits === 1 ? "New" : "Active",
      avatar: getInitials(displayName),
      patientId,
      gender: mock.gender,
      dob: mock.dob,
      avatarBg: mock.avatarBg,
      avatarText: mock.avatarText,
    };
  });

  return [...onlineFormatted, ...offlineFormatted].sort((a, b) => b.sortTime - a.sortTime);
}

export default async function DoctorPatientsPage({
  searchParams,
}: {
  searchParams?:
    | Promise<{ filter?: string; q?: string; new?: string } | undefined>
    | { filter?: string; q?: string; new?: string }
    | undefined;
}) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) redirect("/login");

  const doctor = await prisma.independentDoctor.findUnique({
    where: { userId: session.user.id },
    select: { id: true, status: true },
  });
  if (!doctor) redirect("/doctor/profile/submit");

  const resolvedSearchParams = (await Promise.resolve(searchParams)) ?? {};
  const rawFilter = (resolvedSearchParams.filter || "all").toLowerCase();
  const openNew = resolvedSearchParams.new === "1";
  const filter: UiFilter = ["all", "recent", "active", "new"].includes(rawFilter)
    ? (rawFilter as UiFilter)
    : "all";
  const query = (resolvedSearchParams.q || "").trim().toLowerCase();

  const allPatients = await getPatientsData(doctor.id);

  if (allPatients.length === 0) {
    return <PatientsEmptyState doctorId={doctor.id} />;
  }

  const filteredByChip =
    filter === "recent"
      ? allPatients.slice(0, 4)
      : filter === "new"
      ? allPatients.filter((p) => p.status === "New")
      : filter === "active"
      ? allPatients.filter((p) => p.status === "Active")
      : allPatients;

  const patients = query
    ? filteredByChip.filter(
        (p) =>
          p.displayName.toLowerCase().includes(query) ||
          p.patientId.toLowerCase().includes(query) ||
          p.phoneNumber?.toLowerCase().includes(query)
      )
    : filteredByChip;

  const stats = {
    all: allPatients.length,
    recent: Math.min(4, allPatients.length),
    active: allPatients.filter((p) => p.status === "Active").length,
    new: allPatients.filter((p) => p.status === "New").length,
  };

  const chips: { name: string; value: UiFilter; count: number }[] = [
    { name: "All", value: "all", count: stats.all },
    { name: "Recent", value: "recent", count: stats.recent },
    { name: "Active", value: "active", count: stats.active },
    { name: "New", value: "new", count: stats.new },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#111827]">
      <div className="w-full px-7 py-[22px] space-y-[18px]">
        <PatientsToolbar chips={chips} filter={filter} query={query} doctorId={doctor.id} openNew={openNew} />

        <PatientDirectoryTable patients={patients} registeredCount={stats.all} />
      </div>
    </div>
  );
}
