// app/dashboard/page.tsx
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import Link from "next/link";
import { AddOfflinePatientModal } from "@/features/panel/doctor/consultations/components/AddOfflinePatientModal";

 // 👈 Import modal

// 🔥 SERVER ACTION - Same file mein hi
async function getDashboardData(doctorId: string, filter: "ALL" | "ONLINE" | "OFFLINE") {
  const today = new Date();
  
  if (filter === "ONLINE") {
    const online = await prisma.independentConsultation.findMany({
      where: { 
        doctorId, 
        status: "APPROVED" 
      },
      include: { user: { select: { name: true, phone: true, email: true } } },
      orderBy: { slot: "desc" }
    });
    return online.map(p => ({ ...p, type: "online", displayName: p.user.name }));
  }
  
  if (filter === "OFFLINE") {
    const offline = await prisma.offlineConsultation.findMany({
      where: { doctorId },
      orderBy: { visitTime: "desc" }
    });
    return offline.map(p => ({ ...p, type: "offline", displayName: p.patientName }));
  }
  
  // ALL PATIENTS
  const [online, offline] = await Promise.all([
    prisma.independentConsultation.findMany({
      where: { doctorId, status: "APPROVED" },
      include: { user: { select: { name: true } } },
    }),
    prisma.offlineConsultation.findMany({ where: { doctorId } })
  ]);
  
  return [
    ...online.map(p => ({ ...p, type: "online", displayName: p.user.name })),
    ...offline.map(p => ({ ...p, type: "offline", displayName: p.patientName }))
  ].sort((a, b) => 
    new Date(b.slot || b.visitTime).getTime() - new Date(a.slot || a.visitTime).getTime()
  );
}

// 🎯 MAIN PAGE COMPONENT
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
    <div className="min-h-screen bg-gray-50">
      {/* HEADER */}
      <div className="bg-white border-b shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">👨‍⚕️ Dr. {doctor.name}</h1>
          {/* 👇 Add Modal component here */}
          <AddOfflinePatientModal doctorId={doctor.id} />
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="max-w-6xl mx-auto px-4 py-6">
        {/* STATS CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-xl border p-6 shadow-sm">
            <p className="text-sm text-gray-500">Total Patients</p>
            <p className="text-3xl font-bold text-gray-900">{onlineCount + offlineCount}</p>
          </div>
          <div className="bg-white rounded-xl border p-6 shadow-sm">
            <p className="text-sm text-gray-500">Online Consultations</p>
            <p className="text-3xl font-bold text-blue-600">{onlineCount}</p>
          </div>
          <div className="bg-white rounded-xl border p-6 shadow-sm">
            <p className="text-sm text-gray-500">Walk-in Patients</p>
            <p className="text-3xl font-bold text-green-600">{offlineCount}</p>
          </div>
        </div>

        {/* FILTER TABS */}
        <div className="border-b border-gray-200 mb-6">
          <nav className="flex gap-6">
            {[
              { name: "All Patients", value: "ALL", count: onlineCount + offlineCount },
              { name: "Online", value: "ONLINE", count: onlineCount },
              { name: "Offline", value: "OFFLINE", count: offlineCount },
            ].map((tab) => (
              <Link
                key={tab.value}
                href={`/dashboard?filter=${tab.value}`}
                className={`pb-3 px-1 text-sm font-medium border-b-2 transition ${
                  filter === tab.value
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                {tab.name} ({tab.count})
              </Link>
            ))}
          </nav>
        </div>

        {/* PATIENTS LIST */}
        <div className="space-y-3">
          {patients.length === 0 ? (
            <div className="bg-white rounded-xl border p-12 text-center">
              <p className="text-gray-500">No patients found</p>
            </div>
          ) : (
            patients.map((p: any) => (
              <div key={p.id} className="bg-white rounded-xl border p-4 shadow-sm hover:shadow-md transition">
                <div className="flex items-center gap-4">
                  {/* Avatar/Icon */}
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white ${
                    p.type === "online" ? "bg-blue-500" : "bg-green-500"
                  }`}>
                    {p.type === "online" ? "📱" : "🏥"}
                  </div>
                  
                  {/* Patient Info */}
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-gray-900">{p.displayName}</h3>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        p.type === "online" 
                          ? "bg-blue-100 text-blue-700" 
                          : "bg-green-100 text-green-700"
                      }`}>
                        {p.type === "online" ? "Online" : "Walk-in"}
                      </span>
                    </div>
                    
                    <div className="flex flex-wrap gap-4 mt-1 text-sm text-gray-600">
                      <span>🕐 {new Date(p.slot || p.visitTime).toLocaleDateString('en-IN')}</span>
                      <span>⏰ {new Date(p.slot || p.visitTime).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}</span>
                      <span>📋 {p.complaint || p.notes || "General Consultation"}</span>
                      {p.phoneNumber && <span>📞 {p.phoneNumber}</span>}
                    </div>
                    
                    {/* Prescription/Notes */}
                    {(p.prescription || p.notes) && (
                      <p className="mt-2 text-sm text-gray-500 bg-gray-50 p-2 rounded">
                        💊 {p.prescription || p.notes}
                      </p>
                    )}
                  </div>
                  
                  {/* Actions */}
                  <button className="text-gray-400 hover:text-gray-600">
                    ⋮
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}