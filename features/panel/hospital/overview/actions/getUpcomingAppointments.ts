"use server";

import {
  getHospitalOfflinePatients,
  getHospitalOnlineConsultations,
} from "@/features/panel/hospital/appointments/actions";

export type HospitalOverviewUpcomingAppointment = {
  id: string;
  initials: string;
  name: string;
  patientNo: string;
  dept: string;
  deptTone: "blue" | "amber" | "red" | "purple" | "slate";
  time: string;
  type: string;
  status: string;
  statusTone: "teal" | "amber" | "red" | "slate";
  avatarTone: string;
  emergency?: boolean;
  sortMs: number;
};

function toInitials(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "PT";
  if (parts.length === 1) return `${parts[0][0] ?? "P"}T`.toUpperCase();
  return `${parts[0][0] ?? "P"}${parts[1][0] ?? "T"}`.toUpperCase();
}

function toneFromDepartment(dept: string): HospitalOverviewUpcomingAppointment["deptTone"] {
  const normalized = dept.toLowerCase();
  if (normalized.includes("cardio")) return "blue";
  if (normalized.includes("ortho")) return "amber";
  if (normalized.includes("emerg")) return "red";
  if (normalized.includes("neuro")) return "purple";
  return "slate";
}

function toneFromStatus(status: string): HospitalOverviewUpcomingAppointment["statusTone"] {
  const normalized = status.toLowerCase();
  if (normalized.includes("progress")) return "teal";
  if (normalized.includes("waiting")) return "amber";
  if (normalized.includes("urgent")) return "red";
  return "slate";
}

function avatarToneFromDept(deptTone: HospitalOverviewUpcomingAppointment["deptTone"]) {
  if (deptTone === "blue") return "from-blue-500 to-blue-700";
  if (deptTone === "amber") return "from-amber-500 to-amber-700";
  if (deptTone === "red") return "from-red-500 to-red-700";
  if (deptTone === "purple") return "from-violet-500 to-violet-700";
  return "from-slate-500 to-slate-700";
}

function formatSlot(date: Date) {
  return date.toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: "Asia/Kolkata",
  });
}

function consultationStatusLabel(status: string) {
  if (status === "APPROVED") return "In Progress";
  if (status === "COMPLETED") return "Completed";
  if (status === "REJECTED" || status === "CANCELLED") return "Cancelled";
  return "Scheduled";
}

export async function getHospitalOverviewUpcomingAppointments(): Promise<{
  rows: HospitalOverviewUpcomingAppointment[];
  total: number;
}> {
  const nowMs = Date.now();

  const [offline, online] = await Promise.all([
    getHospitalOfflinePatients(),
    getHospitalOnlineConsultations(),
  ]);

  const offlineRows: HospitalOverviewUpcomingAppointment[] = offline
    .map((item) => {
      const slot = new Date(item.visitTime);
      const sortMs = slot.getTime();
      const dept = item.department || "General";
      const type = item.consultationType || "New Visit";
      const isEmergency = type.toLowerCase().includes("emerg") || dept.toLowerCase().includes("emerg");
      const status = isEmergency ? "Urgent" : "Waiting";
      const deptTone = toneFromDepartment(dept);

      return {
        id: item.id,
        initials: toInitials(item.patientName),
        name: item.patientName,
        patientNo: item.patientId || `PT-${item.id.slice(-5).toUpperCase()}`,
        dept,
        deptTone,
        time: formatSlot(slot),
        type: isEmergency ? "EMER" : type,
        status,
        statusTone: toneFromStatus(status),
        avatarTone: avatarToneFromDept(deptTone),
        emergency: isEmergency,
        sortMs,
      };
    });

  const onlineRows: HospitalOverviewUpcomingAppointment[] = online
    .map((item) => {
      const slot = new Date(item.slot);
      const sortMs = slot.getTime();
      const dept = item.department || "General";
      const status = consultationStatusLabel(item.status);
      const deptTone = toneFromDepartment(dept);

      return {
        id: item.id,
        initials: toInitials(item.userName),
        name: item.userName,
        patientNo: `PT-${item.userId.slice(-5).toUpperCase()}`,
        dept,
        deptTone,
        time: formatSlot(slot),
        type: item.mode?.toLowerCase() === "offline" ? "Offline" : "Video Consult",
        status,
        statusTone: toneFromStatus(status),
        avatarTone: avatarToneFromDept(deptTone),
        sortMs,
      };
    });

  const allMerged = [...offlineRows, ...onlineRows];
  const futureMerged = allMerged
    .filter((row) => row.sortMs >= nowMs)
    .sort((a, b) => a.sortMs - b.sortMs);

  return {
    rows:
      futureMerged.length > 0
        ? futureMerged.slice(0, 5)
        : allMerged
            .sort((a, b) => b.sortMs - a.sortMs)
            .slice(0, 5),
    total: futureMerged.length > 0 ? futureMerged.length : allMerged.length,
  };
}
