"use client";

import { useEffect, useState, useTransition } from "react";
import {
  CalendarDays,
  CheckCircle2,
  CircleAlert,
  Clock3,
  Plus,
  X,
} from "lucide-react";
import {
  createHospitalAppointment,
  getHospitalOfflinePatients,
  getHospitalOnlineConsultations,
} from "../actions";

const statCards = [
  {
    title: "Today's Total",
    value: "84",
    sub: "18 in progress",
    delta: "+12%",
    color: "text-[#14b8a6]",
    icon: CalendarDays,
  },
  {
    title: "Completed",
    value: "32",
    sub: "Avg consult: 21 min",
    delta: "+8%",
    color: "text-[#22c55e]",
    icon: CheckCircle2,
  },
  {
    title: "Waiting",
    value: "24",
    sub: "Longest wait: 26 min",
    delta: "Live",
    color: "text-[#f59e0b]",
    icon: Clock3,
  },
  {
    title: "Pending Confirmations",
    value: "8",
    sub: "2 emergency marked",
    delta: "Urgent",
    color: "text-[#ef4444]",
    icon: CircleAlert,
  },
];

type AppointmentRow = {
  id: string;
  initials: string;
  patient: string;
  patientId: string;
  dept: string;
  time: string;
  type: string;
  status: string;
  doctor?: string;
  complaint?: string;
  rowTone?: string;
};

type AppointmentDetail = {
  doctor: string;
  ageGender: string;
  phone: string;
  insurance: string;
  complaint: string;
  vitals: [string, string, string];
};

const initialRows: AppointmentRow[] = [];

const appointmentDetails: Record<string, AppointmentDetail> = {
  AM: {
    doctor: "Dr. Priya Sadiq",
    ageGender: "58M",
    phone: "+91 98211 00432",
    insurance: "Self-pay",
    complaint: "Acute chest pain with radiation to left arm. Requires immediate cardiac evaluation.",
    vitals: ["180/110", "102", "98.6°"],
  },
  EV: {
    doctor: "Dr. Kofi Osei",
    ageGender: "45F",
    phone: "+91 98812 43210",
    insurance: "Star Health",
    complaint: "Routine cardiology follow-up. Mild chest discomfort on exertion. BP monitoring required.",
    vitals: ["138/90", "88", "98.4°"],
  },
  RS: {
    doctor: "Dr. Wei Ling",
    ageGender: "32M",
    phone: "+91 99200 18734",
    insurance: "HDFC Ergo",
    complaint: "Persistent right knee pain after sports injury. X-ray advised.",
    vitals: ["118/76", "72", "98.2°"],
  },
  PN: {
    doctor: "Dr. Jin-Hee Kim",
    ageGender: "29F",
    phone: "+91 97700 55621",
    insurance: "Max Bupa",
    complaint: "Migraine follow-up and MRI report review.",
    vitals: ["110/70", "68", "98.0°"],
  },
  SO: {
    doctor: "Dr. Amara Diallo",
    ageGender: "41M",
    phone: "+91 96300 22890",
    insurance: "Self-pay",
    complaint: "Fever and fatigue for 5 days. CBC and CRP ordered.",
    vitals: ["122/80", "92", "100.2°"],
  },
  MK: {
    doctor: "Dr. Kofi Osei",
    ageGender: "62F",
    phone: "+91 94400 71230",
    insurance: "Max Bupa",
    complaint: "Post-operative review after cardiac surgery.",
    vitals: ["128/82", "76", "98.6°"],
  },
  DK: {
    doctor: "Dr. Sunita Rao",
    ageGender: "34F",
    phone: "+91 98001 34520",
    insurance: "Star Health",
    complaint: "Routine prenatal check-up and monitoring.",
    vitals: ["116/74", "80", "98.2°"],
  },
};

type AppointmentFormState = {
  patientName: string;
  patientId: string;
  patientAge: string;
  patientGender: string;
  phoneNumber: string;
  followUpDate: string;
  doctor: string;
  department: string;
  date: string;
  timeSlot: string;
  consultationType: string;
  notes: string;
};

const initialForm: AppointmentFormState = {
  patientName: "",
  patientId: "",
  patientAge: "",
  patientGender: "Female",
  phoneNumber: "",
  followUpDate: "",
  doctor: "Dr. Kofi Osei",
  department: "Cardiology",
  date: "2026-03-10",
  timeSlot: "09:00 AM",
  consultationType: "New Visit",
  notes: "",
};

const doctors = ["Dr. Kofi Osei", "Dr. Wei Ling", "Dr. Priya Sadiq", "Dr. Jin-Hee Kim", "Dr. Amara Diallo"];
const departments = ["Cardiology", "Orthopedics", "Neurology", "Pediatrics", "General"];
const slots = ["09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM", "11:00 AM"];
const consultationTypes = ["New Visit", "Follow-up", "Emergency", "Video Consult"];
const patientGenders = ["Female", "Male", "Other"];

function deptPill(dept: string) {
  if (dept === "Emergency") return "bg-[rgba(239,68,68,.12)] text-[#f87171]";
  if (dept === "Cardiology") return "bg-[rgba(59,130,246,.12)] text-[#60a5fa]";
  if (dept === "Orthopedics") return "bg-[rgba(245,158,11,.12)] text-[#fbbf24]";
  if (dept === "Neurology") return "bg-[rgba(167,139,250,.12)] text-[#c4b5fd]";
  return "bg-[rgba(20,184,166,.12)] text-[#2dd4bf]";
}

function statusPill(status: string) {
  if (status === "Urgent") return "bg-[rgba(239,68,68,.12)] text-[#f87171]";
  if (status === "In Progress") return "bg-[rgba(20,184,166,.12)] text-[#2dd4bf]";
  if (status === "Waiting") return "bg-[rgba(245,158,11,.12)] text-[#fbbf24]";
  if (status === "Completed") return "bg-[rgba(34,197,94,.12)] text-[#4ade80]";
  return "bg-[rgba(148,163,184,.1)] text-slate-500 dark:text-[#94a3b8]";
}

function inputClassName() {
  return "h-9 w-full rounded-lg border border-slate-200 dark:border-white/[0.08] bg-slate-50 dark:bg-white/[0.04] px-3 text-[12px] text-slate-700 dark:text-[#cbd5e1] outline-none focus:border-[#3b82f6]/40";
}

function toInitials(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "PT";
  if (parts.length === 1) return `${parts[0][0] ?? "P"}T`.toUpperCase();
  return `${parts[0][0] ?? "P"}${parts[1][0] ?? "T"}`.toUpperCase();
}

function formatTime(value: string | Date) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "--:--";
  return date.toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
}

function consultationStatusLabel(status: string) {
  if (status === "APPROVED") return "In Progress";
  if (status === "COMPLETED") return "Completed";
  if (status === "REJECTED" || status === "CANCELLED") return "Cancelled";
  return "Scheduled";
}

export default function HospitalAppointmentsScreen() {
  const [rows, setRows] = useState<AppointmentRow[]>(initialRows);
  const [isBookOpen, setIsBookOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState<AppointmentRow | null>(null);
  const [form, setForm] = useState<AppointmentFormState>(initialForm);
  const [isSaving, startSaving] = useTransition();
  const [isLoadingRows, startLoadingRows] = useTransition();

  const loadRows = () => {
    startLoadingRows(async () => {
      try {
        const [offline, online] = await Promise.all([
          getHospitalOfflinePatients(),
          getHospitalOnlineConsultations(),
        ]);

        const offlineRows: AppointmentRow[] = offline.map((item) => {
          const type = item.consultationType || "New Visit";
          return {
            id: item.id,
            initials: toInitials(item.patientName),
            patient: item.patientName,
            patientId: item.patientId || `PT-${item.id.slice(-5).toUpperCase()}`,
            dept: item.department || "General",
            time: formatTime(item.visitTime),
            type,
            status: type === "Emergency" ? "Urgent" : "Scheduled",
            doctor: item.doctorName,
            complaint: item.complaint,
            rowTone: type === "Emergency" ? "bg-[rgba(239,68,68,.03)]" : undefined,
          };
        });

        const onlineRows: AppointmentRow[] = online.map((item) => ({
          id: item.id,
          initials: toInitials(item.userName),
          patient: item.userName,
          patientId: `PT-${item.userId.slice(-5).toUpperCase()}`,
          dept: item.department || "General",
          time: formatTime(item.slot),
          type: item.mode?.toLowerCase() === "offline" ? "Offline" : "Video Consult",
          status: consultationStatusLabel(item.status),
          doctor: item.doctorName,
          complaint: item.notes,
        }));

        setRows([...offlineRows, ...onlineRows]);
      } catch (error) {
        const err = error as { message?: string };
        alert(err?.message || "Failed to load appointments");
      }
    });
  };

  useEffect(() => {
    loadRows();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const closeModal = () => {
    setIsBookOpen(false);
    setForm(initialForm);
  };

  const openModal = () => {
    setIsBookOpen(true);
  };

  const openDrawer = (row: AppointmentRow) => {
    setSelectedAppointment(row);
  };

  const closeDrawer = () => {
    setSelectedAppointment(null);
  };

  const handleBookAppointment = () => {
    if (!form.patientName.trim() || !form.patientId.trim()) {
      alert("Patient Name and Patient ID are required");
      return;
    }

    startSaving(async () => {
      const age = form.patientAge.trim() ? Number(form.patientAge.trim()) : null;
      if (age !== null && Number.isNaN(age)) {
        alert("Patient age must be a valid number");
        return;
      }

      const result = await createHospitalAppointment({
        patientName: form.patientName,
        patientId: form.patientId,
        patientAge: age,
        patientGender: form.patientGender,
        phoneNumber: form.phoneNumber,
        followUpDate: form.followUpDate || null,
        doctor: form.doctor,
        department: form.department,
        date: form.date,
        timeSlot: form.timeSlot,
        consultationType: form.consultationType,
        notes: form.notes,
      });

      if (!result.success) {
        alert(result.error || "Failed to book appointment");
        return;
      }

      closeModal();
      loadRows();
    });
  };

  return (
    <div className="px-6 py-5">
      <section className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        {statCards.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.title}
              className="rounded-[13px] border border-slate-200 dark:border-white/[0.07] bg-white dark:bg-[#161f30] p-5"
            >
              <div className="mb-3 flex items-start justify-between">
                <div className={`flex h-[34px] w-[34px] items-center justify-center rounded-[9px] bg-slate-100 dark:bg-white/[0.06] ${card.color}`}>
                  <Icon className="h-4 w-4" />
                </div>
                <span className="rounded-full bg-slate-100 dark:bg-white/[0.06] px-2 py-0.5 text-[10px] font-medium text-slate-500 dark:text-[#94a3b8]">
                  {card.delta}
                </span>
              </div>
              <div className="text-[28px] font-bold leading-none tracking-[-0.03em] text-slate-900 dark:text-[#f1f5f9]">{card.value}</div>
              <p className="mt-1 text-[11px] text-slate-500 dark:text-[#94a3b8]">{card.title}</p>
              <p className="mt-1 text-[10.5px] text-[#475569]">{card.sub}</p>
            </div>
          );
        })}
      </section>

      <section className="mt-4 overflow-hidden rounded-[14px] border border-slate-200 dark:border-white/[0.07] bg-white dark:bg-[#161f30]">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 dark:border-white/[0.07] px-5 py-4">
          <div>
            <h2 className="text-[13px] font-semibold text-slate-900 dark:text-[#f1f5f9]">All Appointments</h2>
            <p className="mt-0.5 text-[11px] text-slate-500 dark:text-[#94a3b8]">10 March 2026</p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {["All", "Today", "In Progress", "Waiting", "Completed", "Emergency"].map((filter, idx) => (
              <button
                key={filter}
                className={`rounded-full border px-3 py-1 text-[11px] transition ${
                  idx === 0
                    ? "border-[#3b82f6]/40 bg-[rgba(59,130,246,.14)] text-[#60a5fa]"
                    : "border-slate-200 dark:border-white/[0.08] text-slate-500 dark:text-[#94a3b8] hover:border-white/[0.14] hover:text-slate-900 dark:hover:text-[#e2e8f0]"
                }`}
              >
                {filter}
              </button>
            ))}

            <select className="h-8 rounded-lg border border-slate-200 dark:border-white/[0.08] bg-slate-100 dark:bg-white/[0.04] px-2.5 text-[11px] text-slate-700 dark:text-[#cbd5e1] outline-none">
              <option>All Departments</option>
              <option>Cardiology</option>
              <option>Orthopedics</option>
              <option>Neurology</option>
              <option>General</option>
            </select>

            <button
              onClick={openModal}
              className="inline-flex h-8 items-center gap-1 rounded-lg bg-[#3b82f6] px-3 text-[11.5px] font-medium text-white hover:bg-[#1d4ed8]"
            >
              <Plus className="h-3.5 w-3.5" />
              Book Appointment
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="text-left text-[10px] uppercase tracking-[.07em] text-[#475569]">
                <th className="px-5 py-3">Patient</th>
                <th className="px-5 py-3">PT #</th>
                <th className="px-5 py-3">Department</th>
                <th className="px-5 py-3">Slot</th>
                <th className="px-5 py-3">Type</th>
                <th className="px-5 py-3">Status</th>
                <th className="px-5 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.id} className={`border-t border-slate-200 dark:border-white/[0.07] text-[12.5px] text-slate-500 dark:text-[#94a3b8] ${row.rowTone ?? "hover:bg-slate-100 dark:hover:bg-white/[0.04] dark:bg-white/[0.02]"}`}>
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-2.5">
                      <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-[#3b82f6] to-[#1d4ed8] text-[10px] font-bold text-white">
                        {row.initials}
                      </div>
                      <span className="font-medium text-slate-900 dark:text-[#e2e8f0]">{row.patient}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3 font-mono text-[11px] text-[#60a5fa]">{row.patientId}</td>
                  <td className="px-5 py-3">
                    <span className={`inline-flex rounded-full px-2.5 py-1 text-[11px] font-medium ${deptPill(row.dept)}`}>
                      {row.dept}
                    </span>
                  </td>
                  <td className="px-5 py-3 font-mono text-[11px] text-slate-700 dark:text-[#cbd5e1]">{row.time}</td>
                  <td className="px-5 py-3">
                    {row.type === "EMERGENCY" ? (
                      <span className="rounded px-2 py-1 text-[9.5px] font-bold text-[#f87171] bg-[rgba(239,68,68,.15)]">EMERGENCY</span>
                    ) : (
                      row.type
                    )}
                  </td>
                  <td className="px-5 py-3">
                    <span className={`inline-flex rounded-full px-2.5 py-1 text-[11px] font-medium ${statusPill(row.status)}`}>
                      {row.status}
                    </span>
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => openDrawer(row)}
                        className="rounded border border-slate-200 dark:border-white/[0.08] bg-slate-100 dark:bg-white/[0.04] px-2.5 py-1 text-[11px] text-slate-500 dark:text-[#94a3b8] hover:bg-slate-200 dark:hover:bg-white/[0.08]"
                      >
                        View
                      </button>
                      <button className="rounded border border-slate-200 dark:border-white/[0.08] bg-slate-100 dark:bg-white/[0.04] px-2.5 py-1 text-[11px] text-slate-500 dark:text-[#94a3b8] hover:bg-slate-200 dark:hover:bg-white/[0.08]">
                        Reschedule
                      </button>
                      <button className="rounded border border-[#14b8a6]/25 bg-[rgba(20,184,166,.12)] px-2.5 py-1 text-[11px] text-[#2dd4bf] hover:bg-[rgba(20,184,166,.2)]">
                        {row.status === "Urgent" ? "Attend" : "Start"}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-2 border-t border-slate-200 dark:border-white/[0.07] px-5 py-3">
          <span className="text-[11.5px] text-[#475569]">
            {isLoadingRows ? "Loading appointments..." : `Showing ${rows.length} appointments`}
          </span>
          <div className="flex items-center gap-1.5">
            <button className="rounded border border-slate-200 dark:border-white/[0.08] bg-slate-100 dark:bg-white/[0.04] px-2.5 py-1 text-[11px] text-slate-500 dark:text-[#94a3b8]">← Prev</button>
            <button className="rounded border border-[#3b82f6]/35 bg-[rgba(59,130,246,.14)] px-2.5 py-1 text-[11px] text-[#60a5fa]">1</button>
            <button className="rounded border border-slate-200 dark:border-white/[0.08] bg-slate-100 dark:bg-white/[0.04] px-2.5 py-1 text-[11px] text-slate-500 dark:text-[#94a3b8]">2</button>
            <button className="rounded border border-slate-200 dark:border-white/[0.08] bg-slate-100 dark:bg-white/[0.04] px-2.5 py-1 text-[11px] text-slate-500 dark:text-[#94a3b8]">3</button>
            <button className="rounded border border-slate-200 dark:border-white/[0.08] bg-slate-100 dark:bg-white/[0.04] px-2.5 py-1 text-[11px] text-slate-500 dark:text-[#94a3b8]">Next →</button>
          </div>
        </div>
      </section>

      {isBookOpen ? (
        <div
          className="fixed inset-0 z-[80] flex items-center justify-center bg-slate-950/60 p-4"
          onClick={(e) => {
            if (e.target === e.currentTarget) closeModal();
          }}
        >
          <div className="w-full max-w-[720px] overflow-hidden rounded-2xl border border-slate-200 dark:border-white/[0.08] bg-white dark:bg-[#161f30] shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-white/[0.08] px-5 py-4">
              <h3 className="text-[14px] font-semibold text-slate-900 dark:text-slate-100">Book Appointment</h3>
              <button
                type="button"
                onClick={closeModal}
                className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-slate-200 bg-slate-50 text-slate-500 hover:bg-slate-100 dark:border-white/[0.08] dark:bg-white/[0.04] dark:text-[#94a3b8] dark:hover:bg-white/[0.08]"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="max-h-[70vh] overflow-y-auto p-5">
              <div className="grid gap-3 md:grid-cols-2">
                <div>
                  <label className="mb-1 block text-[11px] text-slate-500 dark:text-[#94a3b8]">Patient Name</label>
                  <input className={inputClassName()} placeholder="Search patient..." value={form.patientName} onChange={(e) => setForm((p) => ({ ...p, patientName: e.target.value }))} />
                </div>
                <div>
                  <label className="mb-1 block text-[11px] text-slate-500 dark:text-[#94a3b8]">Patient ID</label>
                  <input className={inputClassName()} placeholder="PT-XXXXX" value={form.patientId} onChange={(e) => setForm((p) => ({ ...p, patientId: e.target.value }))} />
                </div>
                <div>
                  <label className="mb-1 block text-[11px] text-slate-500 dark:text-[#94a3b8]">Patient Age</label>
                  <input
                    type="number"
                    min={0}
                    max={150}
                    className={inputClassName()}
                    placeholder="e.g. 32"
                    value={form.patientAge}
                    onChange={(e) => setForm((p) => ({ ...p, patientAge: e.target.value }))}
                  />
                </div>
                <div>
                  <label className="mb-1 block text-[11px] text-slate-500 dark:text-[#94a3b8]">Patient Gender</label>
                  <select className={inputClassName()} value={form.patientGender} onChange={(e) => setForm((p) => ({ ...p, patientGender: e.target.value }))}>
                    {patientGenders.map((gender) => (
                      <option key={gender}>{gender}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="mb-1 block text-[11px] text-slate-500 dark:text-[#94a3b8]">Phone Number</label>
                  <input
                    className={inputClassName()}
                    placeholder="+91 9876543210"
                    value={form.phoneNumber}
                    onChange={(e) => setForm((p) => ({ ...p, phoneNumber: e.target.value }))}
                  />
                </div>
                <div>
                  <label className="mb-1 block text-[11px] text-slate-500 dark:text-[#94a3b8]">Follow-up Date</label>
                  <input
                    type="date"
                    className={inputClassName()}
                    value={form.followUpDate}
                    onChange={(e) => setForm((p) => ({ ...p, followUpDate: e.target.value }))}
                  />
                </div>

                <div>
                  <label className="mb-1 block text-[11px] text-slate-500 dark:text-[#94a3b8]">Doctor</label>
                  <select className={inputClassName()} value={form.doctor} onChange={(e) => setForm((p) => ({ ...p, doctor: e.target.value }))}>
                    {doctors.map((doctor) => (
                      <option key={doctor}>{doctor}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="mb-1 block text-[11px] text-slate-500 dark:text-[#94a3b8]">Department</label>
                  <select className={inputClassName()} value={form.department} onChange={(e) => setForm((p) => ({ ...p, department: e.target.value }))}>
                    {departments.map((department) => (
                      <option key={department}>{department}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="mb-1 block text-[11px] text-slate-500 dark:text-[#94a3b8]">Date</label>
                  <input type="date" className={inputClassName()} value={form.date} onChange={(e) => setForm((p) => ({ ...p, date: e.target.value }))} />
                </div>
                <div>
                  <label className="mb-1 block text-[11px] text-slate-500 dark:text-[#94a3b8]">Time Slot</label>
                  <select className={inputClassName()} value={form.timeSlot} onChange={(e) => setForm((p) => ({ ...p, timeSlot: e.target.value }))}>
                    {slots.map((slot) => (
                      <option key={slot}>{slot}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="mt-3">
                <label className="mb-1 block text-[11px] text-slate-500 dark:text-[#94a3b8]">Consultation Type</label>
                <select className={inputClassName()} value={form.consultationType} onChange={(e) => setForm((p) => ({ ...p, consultationType: e.target.value }))}>
                  {consultationTypes.map((type) => (
                    <option key={type}>{type}</option>
                  ))}
                </select>
              </div>

              <div className="mt-3">
                <label className="mb-1 block text-[11px] text-slate-500 dark:text-[#94a3b8]">Notes</label>
                <textarea
                  rows={3}
                  className="w-full rounded-lg border border-slate-200 dark:border-white/[0.08] bg-slate-50 dark:bg-white/[0.04] px-3 py-2 text-[12px] text-slate-700 dark:text-[#cbd5e1] outline-none focus:border-[#3b82f6]/40"
                  placeholder="Chief complaint, special instructions..."
                  value={form.notes}
                  onChange={(e) => setForm((p) => ({ ...p, notes: e.target.value }))}
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 border-t border-slate-200 dark:border-white/[0.08] px-5 py-3">
              <button
                onClick={closeModal}
                className="rounded border border-slate-200 dark:border-white/[0.08] bg-slate-50 dark:bg-white/[0.04] px-3 py-1.5 text-[11px] text-slate-500 dark:text-[#94a3b8] hover:bg-slate-100 dark:hover:bg-white/[0.08]"
              >
                Cancel
              </button>
              <button
                onClick={handleBookAppointment}
                disabled={isSaving}
                className="rounded bg-[#3b82f6] px-3 py-1.5 text-[11px] font-medium text-white hover:bg-[#1d4ed8]"
              >
                {isSaving ? "Booking..." : "Book Appointment"}
              </button>
            </div>
          </div>
        </div>
      ) : null}

      {selectedAppointment ? (
        <div
          className="fixed inset-0 z-[85] bg-slate-950/45"
          onClick={(e) => {
            if (e.target === e.currentTarget) closeDrawer();
          }}
        >
          <div className="absolute right-0 top-0 h-full w-full max-w-[430px] border-l border-slate-200 dark:border-white/[0.08] bg-white dark:bg-[#111827] shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-white/[0.08] px-4 py-4">
              <div className="flex items-center gap-2.5">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[#3b82f6] to-[#1d4ed8] text-[12px] font-bold text-white">
                  {selectedAppointment.initials}
                </div>
                <div>
                  <div className="text-[14px] font-semibold text-slate-900 dark:text-slate-100">{selectedAppointment.patient}</div>
                  <div className="text-[11px] text-slate-500 dark:text-[#94a3b8]">
                    {selectedAppointment.patientId} · {selectedAppointment.type} · {selectedAppointment.dept}
                  </div>
                </div>
              </div>
              <button
                type="button"
                onClick={closeDrawer}
                className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-slate-200 bg-slate-50 text-slate-500 hover:bg-slate-100 dark:border-white/[0.08] dark:bg-white/[0.04] dark:text-[#94a3b8] dark:hover:bg-white/[0.08]"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="h-[calc(100%-70px)] overflow-y-auto p-4">
              <div className="mb-3 rounded-lg border border-slate-200 dark:border-white/[0.08] bg-slate-50 dark:bg-white/[0.02] p-3">
                <div className="mb-2 text-[11px] font-medium text-slate-500 dark:text-[#94a3b8]">Appointment Details</div>
                <div className="grid grid-cols-2 gap-2 text-[12px]">
                  <div>
                    <div className="text-[10px] text-slate-500 dark:text-[#64748b]">Appointment ID</div>
                    <div className="font-mono text-[#3b82f6]">APT-{selectedAppointment.patientId.slice(3)}</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-500 dark:text-[#64748b]">Date & Time</div>
                    <div className="text-slate-800 dark:text-slate-200">Mar 10 · {selectedAppointment.time}</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-500 dark:text-[#64748b]">Department</div>
                    <div className="text-slate-800 dark:text-slate-200">{selectedAppointment.dept}</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-500 dark:text-[#64748b]">Status</div>
                    <span className={`mt-1 inline-flex rounded-full px-2 py-0.5 text-[10px] font-medium ${statusPill(selectedAppointment.status)}`}>
                      {selectedAppointment.status}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mb-3 rounded-lg border border-slate-200 dark:border-white/[0.08] bg-slate-50 dark:bg-white/[0.02] p-3">
                <div className="mb-2 text-[11px] font-medium text-slate-500 dark:text-[#94a3b8]">Patient Information</div>
                <div className="grid grid-cols-2 gap-2 text-[12px]">
                  <div>
                    <div className="text-[10px] text-slate-500 dark:text-[#64748b]">Age / Gender</div>
                    <div className="text-slate-800 dark:text-slate-200">{appointmentDetails[selectedAppointment.initials]?.ageGender ?? "N/A"}</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-500 dark:text-[#64748b]">Doctor</div>
                    <div className="text-slate-800 dark:text-slate-200">
                      {selectedAppointment.doctor || appointmentDetails[selectedAppointment.initials]?.doctor || "N/A"}
                    </div>
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-500 dark:text-[#64748b]">Phone</div>
                    <div className="text-slate-800 dark:text-slate-200">{appointmentDetails[selectedAppointment.initials]?.phone ?? "N/A"}</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-500 dark:text-[#64748b]">Insurance</div>
                    <div className="text-slate-800 dark:text-slate-200">{appointmentDetails[selectedAppointment.initials]?.insurance ?? "N/A"}</div>
                  </div>
                </div>
              </div>

              <div className="mb-3">
                <div className="mb-1 text-[11px] font-medium text-slate-500 dark:text-[#94a3b8]">Chief Complaint</div>
                <div className="rounded-lg border border-slate-200 dark:border-white/[0.08] bg-slate-50 dark:bg-white/[0.02] p-3 text-[12px] leading-5 text-slate-700 dark:text-[#cbd5e1]">
                  {selectedAppointment.complaint || appointmentDetails[selectedAppointment.initials]?.complaint || "No complaint notes available."}
                </div>
              </div>

              <div className="mb-4">
                <div className="mb-1 text-[11px] font-medium text-slate-500 dark:text-[#94a3b8]">Last Recorded Vitals</div>
                <div className="grid grid-cols-3 gap-2 rounded-lg border border-slate-200 dark:border-white/[0.08] bg-slate-50 dark:bg-white/[0.02] p-3">
                  {(appointmentDetails[selectedAppointment.initials]?.vitals ?? ["--", "--", "--"]).map((v, idx) => (
                    <div key={idx} className="text-center">
                      <div className="text-[16px] font-bold text-slate-900 dark:text-white">{v}</div>
                      <div className="mt-0.5 text-[9.5px] text-slate-500 dark:text-[#94a3b8]">
                        {idx === 0 ? "Blood Pressure" : idx === 1 ? "Heart Rate" : "Temperature"}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-2">
                <button className="flex-1 rounded bg-[#3b82f6] px-3 py-2 text-[11px] font-medium text-white hover:bg-[#1d4ed8]">
                  Patient Record
                </button>
                <button className="flex-1 rounded bg-[#14b8a6] px-3 py-2 text-[11px] font-medium text-white hover:bg-[#0d9488]">
                  Start Consultation
                </button>
              </div>
              <button className="mt-2 w-full rounded border border-slate-200 dark:border-white/[0.08] bg-slate-50 dark:bg-white/[0.04] px-3 py-2 text-[11px] text-slate-500 dark:text-[#94a3b8] hover:bg-slate-100 dark:hover:bg-white/[0.08]">
                Reschedule Appointment
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
