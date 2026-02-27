// app/doctor/patients/page.tsx
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import Link from "next/link";
import { AddOfflinePatientModal } from "@/features/panel/doctor/consultations/components/AddOfflinePatientModal";
import { Download, Search } from "lucide-react";
import { PatientDirectoryTable } from "@/features/panel/doctor/patient";

// Helper functions
function getInitials(name: string): string {
  return name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

function getRandomBloodGroup(): string {
  const groups = ['O+', 'A+', 'B+', 'AB+', 'O-', 'A-', 'B-', 'AB-'];
  return groups[Math.floor(Math.random() * groups.length)];
}

function formatLastVisit(dateStr?: string): string {
  if (!dateStr) return "Today";
  const date = new Date(dateStr);
  const today = new Date();
  const diffTime = today.getTime() - date.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 7) return `${diffDays} days ago`;
  return date.toLocaleDateString('en-IN', { day: '2-digit', month: 'short' });
}

function getPatientId(index: number): string {
  const ids = ["PT-0041", "PT-0088", "PT-0112", "PT-0057", "PT-0203", "PT-0174", "PT-0091", "PT-0288"];
  return ids[index] || `PT-${String(index + 1).padStart(4, '0')}`;
}

// SERVER ACTION
async function getDashboardData(doctorId: string, filter: "ALL" | "ONLINE" | "OFFLINE") {
  if (filter === "ONLINE") {
    const online = await prisma.independentConsultation.findMany({
      where: { 
        doctorId, 
        status: "APPROVED" 
      },
      include: { 
        user: { 
          select: { 
            name: true, 
            phone: true, 
            email: true 
          } 
        } 
      },
      orderBy: { slot: "desc" }
    });
    
    return online.map((p, index) => ({
      ...p,
      id: p.id,
      type: "online",
      displayName: p.user.name,
      phoneNumber: p.user.phone,
      city: "Pune", // Default city since field doesn't exist
      lastVisit: formatLastVisit(p.slot),
      visits: Math.floor(Math.random() * 20) + 1,
      bloodGroup: getRandomBloodGroup(),
      status: "Active",
      avatar: getInitials(p.user.name),
      patientId: getPatientId(index)
    }));
  }
  
  if (filter === "OFFLINE") {
    const offline = await prisma.offlineConsultation.findMany({
      where: { doctorId },
      orderBy: { visitTime: "desc" }
    });
    
    return offline.map((p, index) => ({
      ...p,
      id: p.id,
      type: "offline",
      displayName: p.patientName,
      phoneNumber: p.phoneNumber,
      city: p.city || "Pune",
      lastVisit: formatLastVisit(p.visitTime),
      visits: Math.floor(Math.random() * 15) + 1,
      bloodGroup: getRandomBloodGroup(),
      status: index === 7 ? "New" : "Active",
      avatar: getInitials(p.patientName),
      patientId: getPatientId(index)
    }));
  }
  
  // ALL PATIENTS
  const [online, offline] = await Promise.all([
    prisma.independentConsultation.findMany({
      where: { doctorId, status: "APPROVED" },
      include: { 
        user: { 
          select: { 
            name: true, 
            phone: true
          } 
        } 
      },
    }),
    prisma.offlineConsultation.findMany({ 
      where: { doctorId } 
    })
  ]);
  
  const onlineFormatted = online.map((p, index) => ({
    ...p,
    id: p.id,
    type: "online",
    displayName: p.user.name,
    phoneNumber: p.user.phone,
    city: "Pune", // Default city
    lastVisit: formatLastVisit(p.slot),
    visits: Math.floor(Math.random() * 20) + 1,
    bloodGroup: getRandomBloodGroup(),
    status: "Active",
    avatar: getInitials(p.user.name),
    patientId: getPatientId(index)
  }));
  
  const offlineFormatted = offline.map((p, index) => ({
    ...p,
    id: p.id,
    type: "offline",
    displayName: p.patientName,
    phoneNumber: p.phoneNumber,
    city: p.city || "Pune",
    lastVisit: formatLastVisit(p.visitTime),
    visits: Math.floor(Math.random() * 15) + 1,
    bloodGroup: getRandomBloodGroup(),
    status: "Active",
    avatar: getInitials(p.patientName),
    patientId: getPatientId(index + online.length)
  }));
  
  return [...onlineFormatted, ...offlineFormatted]
    .sort((a, b) => new Date(b.slot || b.visitTime || "").getTime() - new Date(a.slot || a.visitTime || "").getTime())
    .slice(0, 8);
}

// MAIN PAGE COMPONENT
export default async function DashboardPage({
  searchParams
}: {
  searchParams: { filter?: "ALL" | "ONLINE" | "OFFLINE" }
}) {
  // Auth check
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) redirect("/login");
  
  // Get doctor
  const doctor = await prisma.independentDoctor.findUnique({
    where: { userId: session.user.id }
  });
  if (!doctor) redirect("/register-doctor");
  
  const filter = searchParams.filter || "ALL";
  const patients = await getDashboardData(doctor.id, filter);
  
  // Counts for badges
  const [onlineCount, offlineCount] = await Promise.all([
    prisma.independentConsultation.count({ where: { doctorId: doctor.id, status: "APPROVED" } }),
    prisma.offlineConsultation.count({ where: { doctorId: doctor.id } })
  ]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      

      {/* MAIN CONTENT */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        

        {/* FILTER CHIPS */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div className="flex flex-wrap items-center gap-2">
            {[
              { name: "All", value: "ALL", count: onlineCount + offlineCount },
              { name: "Recent", value: "RECENT", count: 4 },
              { name: "Active", value: "ACTIVE", count: onlineCount },
              { name: "New", value: "NEW", count: 1 },
            ].map((chip) => (
              <Link
                key={chip.name}
                href={`/dashboard?filter=${chip.value}`}
                className={`px-4 py-2 text-sm font-medium rounded-full transition-all ${
                  filter === chip.value
                    ? "bg-blue-600 text-white shadow-md shadow-blue-600/25"
                    : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-700"
                }`}
              >
                {chip.name}
                {chip.count > 0 && (
                  <span
                    className={`ml-2 px-1.5 py-0.5 text-xs rounded-full ${
                      filter === chip.value
                        ? "bg-white/20 text-white"
                        : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400"
                    }`}
                  >
                    {chip.count}
                  </span>
                )}
              </Link>
            ))}
          </div>

          {/* Search */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search patients..."
                className="pl-10 pr-4 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64"
              />
            </div>
            <AddOfflinePatientModal doctorId={doctor.id} />
          </div>
        </div>

        {/* PATIENT DIRECTORY HEADER */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Patient Directory
          </h2>
          <button className="inline-flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium">
            <Download className="w-4 h-4" />
            Export CSV →
          </button>
        </div>

        {/* Count */}
        <div className="mb-4 text-sm text-gray-500 dark:text-gray-400">
          {patients.length} shown
        </div>

        <PatientDirectoryTable patients={patients as any} />
      </div>
    </div>
  );
}
