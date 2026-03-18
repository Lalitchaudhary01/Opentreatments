"use client";

import { useState } from "react";
import { AlertTriangle, Plus, UserPlus, Users, UserRoundCheck, X } from "lucide-react";

const stats = [
  { label: "Currently Admitted", value: "218", sub: "14 discharged today", delta: "+3", icon: Users, color: "text-[#3b82f6]" },
  { label: "Discharged Today", value: "14", sub: "Avg stay: 4.2 days", delta: "+14", icon: UserRoundCheck, color: "text-[#22c55e]" },
  { label: "New Registrations", value: "6", sub: "Today", delta: "+6", icon: UserPlus, color: "text-[#14b8a6]" },
  { label: "ICU Patients", value: "8", sub: "2 critical, 6 stable", delta: "2 critical", icon: AlertTriangle, color: "text-[#ef4444]" },
];

type PatientRow = {
  initials: string;
  name: string;
  patientNo: string;
  ageGender: string;
  department: string;
  status: string;
};

const initialRows: PatientRow[] = [
  { initials: "EV", name: "Elena Vasquez", patientNo: "PT-00421", ageGender: "45F", department: "Cardiology", status: "Under Observation" },
  { initials: "RS", name: "Rohan Sharma", patientNo: "PT-00418", ageGender: "32M", department: "Orthopedics", status: "Stable" },
  { initials: "AM", name: "Arjun Mehta", patientNo: "PT-00430", ageGender: "58M", department: "Emergency / Cardiology", status: "Critical" },
  { initials: "PN", name: "Priya Nair", patientNo: "PT-00415", ageGender: "29F", department: "Neurology", status: "Stable" },
  { initials: "SO", name: "Samuel Okafor", patientNo: "PT-00428", ageGender: "41M", department: "General Medicine", status: "Recovering" },
  { initials: "MK", name: "Meera Krishnan", patientNo: "PT-00412", ageGender: "62F", department: "Cardiology", status: "Post-Op" },
];

const bloodGroups = ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"];
const genders = ["Female", "Male", "Other"];
const departments = ["General Medicine", "Cardiology", "Orthopedics", "Neurology", "OB-GYN", "Pediatrics", "Emergency"];

type PatientFormState = {
  firstName: string;
  lastName: string;
  dob: string;
  gender: string;
  phone: string;
  email: string;
  address: string;
  bloodGroup: string;
  allergies: string;
  department: string;
  insurance: string;
  emergencyContact: string;
  complaint: string;
};

const initialForm: PatientFormState = {
  firstName: "",
  lastName: "",
  dob: "",
  gender: "Female",
  phone: "",
  email: "",
  address: "",
  bloodGroup: "A+",
  allergies: "",
  department: "General Medicine",
  insurance: "",
  emergencyContact: "",
  complaint: "",
};

function deptPill(dept: string) {
  if (dept.includes("Emergency")) return "bg-[rgba(239,68,68,.12)] text-[#f87171]";
  if (dept.includes("Cardiology")) return "bg-[rgba(59,130,246,.12)] text-[#60a5fa]";
  if (dept.includes("Orthopedics")) return "bg-[rgba(245,158,11,.12)] text-[#fbbf24]";
  if (dept.includes("Neurology")) return "bg-[rgba(167,139,250,.12)] text-[#c4b5fd]";
  return "bg-[rgba(20,184,166,.12)] text-[#2dd4bf]";
}

function statusPill(status: string) {
  if (status === "Critical") return "bg-[rgba(239,68,68,.12)] text-[#f87171]";
  if (status === "Stable") return "bg-[rgba(20,184,166,.12)] text-[#2dd4bf]";
  if (status === "Recovering") return "bg-[rgba(34,197,94,.12)] text-[#4ade80]";
  if (status === "Post-Op") return "bg-[rgba(245,158,11,.12)] text-[#fbbf24]";
  return "bg-[rgba(148,163,184,.1)] text-slate-500 dark:text-[#94a3b8]";
}

function inputClassName() {
  return "h-9 w-full rounded-lg border border-slate-200 dark:border-white/[0.08] bg-slate-50 dark:bg-white/[0.04] px-3 text-[12px] text-slate-700 dark:text-[#cbd5e1] outline-none focus:border-[#3b82f6]/40";
}

export default function HospitalPatientsScreen() {
  const [rows, setRows] = useState<PatientRow[]>(initialRows);
  const [isAddPatientOpen, setIsAddPatientOpen] = useState(false);
  const [form, setForm] = useState<PatientFormState>(initialForm);

  const closeModal = () => {
    setIsAddPatientOpen(false);
    setForm(initialForm);
  };

  const openModal = () => {
    setIsAddPatientOpen(true);
  };

  const handleRegisterPatient = () => {
    if (!form.firstName.trim() || !form.lastName.trim()) {
      alert("First name and last name are required");
      return;
    }

    const patientNo = `PT-${String(4000 + rows.length + 1)}`;
    const initials = `${form.firstName[0] || ""}${form.lastName[0] || ""}`.toUpperCase();
    const ageGender = form.dob
      ? `${Math.max(0, new Date().getFullYear() - new Date(form.dob).getFullYear())}${form.gender[0] || ""}`
      : `--${form.gender[0] || ""}`;

    setRows((prev) => [
      {
        initials,
        name: `${form.firstName} ${form.lastName}`.trim(),
        patientNo,
        ageGender,
        department: form.department,
        status: "Under Observation",
      },
      ...prev,
    ]);

    closeModal();
  };

  return (
    <div className="px-6 py-5">
      <section className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((s) => {
          const Icon = s.icon;
          return (
            <div key={s.label} className="rounded-[13px] border border-slate-200 dark:border-white/[0.07] bg-white dark:bg-[#161f30] p-5">
              <div className="mb-3 flex items-start justify-between">
                <div className={`flex h-[34px] w-[34px] items-center justify-center rounded-[9px] bg-slate-100 dark:bg-white/[0.06] ${s.color}`}><Icon className="h-4 w-4" /></div>
                <span className="rounded-full bg-slate-100 dark:bg-white/[0.06] px-2 py-0.5 text-[10px] font-medium text-slate-500 dark:text-[#94a3b8]">{s.delta}</span>
              </div>
              <div className="text-[28px] font-bold leading-none tracking-[-0.03em] text-slate-900 dark:text-[#f1f5f9]">{s.value}</div>
              <p className="mt-1 text-[11px] text-slate-500 dark:text-[#94a3b8]">{s.label}</p>
              <p className="mt-1 text-[10.5px] text-[#475569]">{s.sub}</p>
            </div>
          );
        })}
      </section>

      <section className="mt-4 overflow-hidden rounded-[14px] border border-slate-200 dark:border-white/[0.07] bg-white dark:bg-[#161f30]">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 dark:border-white/[0.07] px-5 py-4">
          <div>
            <h2 className="text-[13px] font-semibold text-slate-900 dark:text-[#f1f5f9]">Patient Registry</h2>
            <p className="mt-0.5 text-[11px] text-slate-500 dark:text-[#94a3b8]">218 admitted · sorted by last activity</p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {["All", "Admitted", "Discharged", "New"].map((f, i) => (
              <button key={f} className={`rounded-full border px-3 py-1 text-[11px] transition ${i === 0 ? "border-[#3b82f6]/40 bg-[rgba(59,130,246,.14)] text-[#60a5fa]" : "border-slate-200 dark:border-white/[0.08] text-slate-500 dark:text-[#94a3b8] hover:border-white/[0.14] hover:text-slate-900 dark:hover:text-[#e2e8f0]"}`}>
                {f}
              </button>
            ))}
            <select className="h-8 rounded-lg border border-slate-200 dark:border-white/[0.08] bg-slate-100 dark:bg-white/[0.04] px-2.5 text-[11px] text-slate-700 dark:text-[#cbd5e1] outline-none">
              <option>All Departments</option>
              <option>Cardiology</option>
              <option>Orthopedics</option>
              <option>ICU</option>
              <option>Emergency</option>
            </select>
            <button
              onClick={openModal}
              className="inline-flex h-8 items-center gap-1 rounded-lg bg-[#3b82f6] px-3 text-[11.5px] font-medium text-white hover:bg-[#1d4ed8]"
            >
              <Plus className="h-3.5 w-3.5" />
              Add Patient
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="text-left text-[10px] uppercase tracking-[.07em] text-[#475569]">
                <th className="px-5 py-3">Patient</th>
                <th className="px-5 py-3">PT #</th>
                <th className="px-5 py-3">Age / Gender</th>
                <th className="px-5 py-3">Department</th>
                <th className="px-5 py-3">Status</th>
                <th className="px-5 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.patientNo} className="border-t border-slate-200 dark:border-white/[0.07] text-[12.5px] text-slate-500 dark:text-[#94a3b8] hover:bg-slate-100 dark:hover:bg-white/[0.04] dark:bg-white/[0.02]">
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-2.5">
                      <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-[#3b82f6] to-[#1d4ed8] text-[10px] font-bold text-white">{r.initials}</div>
                      <span className="font-medium text-slate-900 dark:text-[#e2e8f0]">{r.name}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3 font-mono text-[11px] text-[#60a5fa]">{r.patientNo}</td>
                  <td className="px-5 py-3">{r.ageGender}</td>
                  <td className="px-5 py-3"><span className={`inline-flex rounded-full px-2.5 py-1 text-[11px] font-medium ${deptPill(r.department)}`}>{r.department}</span></td>
                  <td className="px-5 py-3"><span className={`inline-flex rounded-full px-2.5 py-1 text-[11px] font-medium ${statusPill(r.status)}`}>{r.status}</span></td>
                  <td className="px-5 py-3 text-right">
                    <div className="inline-flex items-center gap-1.5">
                      <button className="rounded border border-slate-200 dark:border-white/[0.08] bg-slate-100 dark:bg-white/[0.04] px-2.5 py-1 text-[11px] text-slate-500 dark:text-[#94a3b8] hover:bg-slate-200 dark:hover:bg-white/[0.08]">View Record</button>
                      <button className="rounded border border-slate-200 dark:border-white/[0.08] bg-slate-100 dark:bg-white/[0.04] px-2.5 py-1 text-[11px] text-slate-500 dark:text-[#94a3b8] hover:bg-slate-200 dark:hover:bg-white/[0.08]">Discharge</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between border-t border-slate-200 dark:border-white/[0.07] px-5 py-3">
          <span className="text-[11.5px] text-[#475569]">Showing {rows.length} of 218 · Page 1 of 37</span>
          <div className="flex items-center gap-1.5">
            <button className="rounded border border-slate-200 dark:border-white/[0.08] bg-slate-100 dark:bg-white/[0.04] px-2.5 py-1 text-[11px] text-slate-500 dark:text-[#94a3b8]">← Prev</button>
            <button className="rounded border border-[#3b82f6]/35 bg-[rgba(59,130,246,.14)] px-2.5 py-1 text-[11px] text-[#60a5fa]">1</button>
            <button className="rounded border border-slate-200 dark:border-white/[0.08] bg-slate-100 dark:bg-white/[0.04] px-2.5 py-1 text-[11px] text-slate-500 dark:text-[#94a3b8]">2</button>
            <button className="rounded border border-slate-200 dark:border-white/[0.08] bg-slate-100 dark:bg-white/[0.04] px-2.5 py-1 text-[11px] text-slate-500 dark:text-[#94a3b8]">Next →</button>
          </div>
        </div>
      </section>

      {isAddPatientOpen ? (
        <div
          className="fixed inset-0 z-[80] flex items-center justify-center bg-slate-950/60 p-4"
          onClick={(e) => {
            if (e.target === e.currentTarget) closeModal();
          }}
        >
          <div className="w-full max-w-[720px] overflow-hidden rounded-2xl border border-slate-200 dark:border-white/[0.08] bg-white dark:bg-[#161f30] shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-white/[0.08] px-5 py-4">
              <h3 className="text-[14px] font-semibold text-slate-900 dark:text-slate-100">Add New Patient</h3>
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
                  <label className="mb-1 block text-[11px] text-slate-500 dark:text-[#94a3b8]">First Name</label>
                  <input className={inputClassName()} placeholder="e.g. Priya" value={form.firstName} onChange={(e) => setForm((p) => ({ ...p, firstName: e.target.value }))} />
                </div>
                <div>
                  <label className="mb-1 block text-[11px] text-slate-500 dark:text-[#94a3b8]">Last Name</label>
                  <input className={inputClassName()} placeholder="e.g. Sharma" value={form.lastName} onChange={(e) => setForm((p) => ({ ...p, lastName: e.target.value }))} />
                </div>

                <div>
                  <label className="mb-1 block text-[11px] text-slate-500 dark:text-[#94a3b8]">Date of Birth</label>
                  <input type="date" className={inputClassName()} value={form.dob} onChange={(e) => setForm((p) => ({ ...p, dob: e.target.value }))} />
                </div>
                <div>
                  <label className="mb-1 block text-[11px] text-slate-500 dark:text-[#94a3b8]">Gender</label>
                  <select className={inputClassName()} value={form.gender} onChange={(e) => setForm((p) => ({ ...p, gender: e.target.value }))}>
                    {genders.map((g) => (
                      <option key={g}>{g}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="mb-1 block text-[11px] text-slate-500 dark:text-[#94a3b8]">Phone Number</label>
                  <input className={inputClassName()} placeholder="+91 98765 43210" value={form.phone} onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))} />
                </div>
                <div>
                  <label className="mb-1 block text-[11px] text-slate-500 dark:text-[#94a3b8]">Email</label>
                  <input type="email" className={inputClassName()} placeholder="patient@email.com" value={form.email} onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))} />
                </div>
              </div>

              <div className="mt-3">
                <label className="mb-1 block text-[11px] text-slate-500 dark:text-[#94a3b8]">Address</label>
                <input className={inputClassName()} placeholder="Street, City, State" value={form.address} onChange={(e) => setForm((p) => ({ ...p, address: e.target.value }))} />
              </div>

              <div className="mt-3 grid gap-3 md:grid-cols-2">
                <div>
                  <label className="mb-1 block text-[11px] text-slate-500 dark:text-[#94a3b8]">Blood Group</label>
                  <select className={inputClassName()} value={form.bloodGroup} onChange={(e) => setForm((p) => ({ ...p, bloodGroup: e.target.value }))}>
                    {bloodGroups.map((g) => (
                      <option key={g}>{g}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="mb-1 block text-[11px] text-slate-500 dark:text-[#94a3b8]">Allergies</label>
                  <input className={inputClassName()} placeholder="e.g. Penicillin, Sulfa (or None)" value={form.allergies} onChange={(e) => setForm((p) => ({ ...p, allergies: e.target.value }))} />
                </div>
              </div>

              <div className="mt-3 grid gap-3 md:grid-cols-2">
                <div>
                  <label className="mb-1 block text-[11px] text-slate-500 dark:text-[#94a3b8]">Department</label>
                  <select className={inputClassName()} value={form.department} onChange={(e) => setForm((p) => ({ ...p, department: e.target.value }))}>
                    {departments.map((d) => (
                      <option key={d}>{d}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="mb-1 block text-[11px] text-slate-500 dark:text-[#94a3b8]">Insurance Provider</label>
                  <input className={inputClassName()} placeholder="e.g. Star Health (or Self-pay)" value={form.insurance} onChange={(e) => setForm((p) => ({ ...p, insurance: e.target.value }))} />
                </div>
              </div>

              <div className="mt-3">
                <label className="mb-1 block text-[11px] text-slate-500 dark:text-[#94a3b8]">Emergency Contact</label>
                <input className={inputClassName()} placeholder="Name · Relationship · Phone" value={form.emergencyContact} onChange={(e) => setForm((p) => ({ ...p, emergencyContact: e.target.value }))} />
              </div>

              <div className="mt-3">
                <label className="mb-1 block text-[11px] text-slate-500 dark:text-[#94a3b8]">Chief Complaint / Reason for Visit</label>
                <textarea
                  rows={2}
                  className="w-full rounded-lg border border-slate-200 dark:border-white/[0.08] bg-slate-50 dark:bg-white/[0.04] px-3 py-2 text-[12px] text-slate-700 dark:text-[#cbd5e1] outline-none focus:border-[#3b82f6]/40"
                  placeholder="Brief description of symptoms or reason..."
                  value={form.complaint}
                  onChange={(e) => setForm((p) => ({ ...p, complaint: e.target.value }))}
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
                onClick={handleRegisterPatient}
                className="rounded bg-[#3b82f6] px-3 py-1.5 text-[11px] font-medium text-white hover:bg-[#1d4ed8]"
              >
                Register Patient
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
