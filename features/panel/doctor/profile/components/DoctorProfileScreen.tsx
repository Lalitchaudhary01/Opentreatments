"use client";

import { useMemo, useState } from "react";
import { DoctorProfile } from "@/features/panel/doctor/types/doctor";

type Props = {
  profile: DoctorProfile;
  email?: string | null;
};

export default function DoctorProfileScreen({ profile, email }: Props) {
  const [personal, setPersonal] = useState({
    firstName: profile.name?.split(" ")[0] || "",
    lastName: profile.name?.split(" ").slice(1).join(" ") || "",
    email: email || "",
    phone: "+91 98765 43210",
    dob: "1982-06-14",
    gender: profile.gender || "Male",
    bio:
      "Dr. is a dedicated physician focused on preventive care and long-term patient wellness.",
  });

  const [professional, setProfessional] = useState({
    specialization: profile.specialization || "General Physician",
    qualifications: "MBBS, MD (General Medicine)",
    council: "Maharashtra Medical Council",
    registrationNo: "MMC-2013-04821",
    languages: (profile.languages || []).join(", ") || "English, Hindi",
    experience: String(profile.experience || 0),
  });

  const initials = useMemo(() => {
    const n = profile.name?.trim() || "Doctor";
    return n
      .split(" ")
      .map((p) => p[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
  }, [profile.name]);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#111827] p-6">
      <div className="max-w-[1164px] mx-auto grid grid-cols-1 xl:grid-cols-[280px_1fr] gap-5 items-start pb-8">
        <div className="space-y-4">
          <section className="rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#161f30] px-5 py-6 text-center">
            <div className="w-20 h-20 rounded-full mx-auto mb-3 bg-gradient-to-br from-[#3b82f6] to-[#1d4ed8] text-white text-2xl font-bold flex items-center justify-center">
              {initials}
            </div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">Dr. {profile.name}</h2>
            <p className="text-xs text-blue-500 mt-1">
              {profile.specialization || "General Physician"}
            </p>

            <div className="flex items-center justify-center gap-2 mt-3">
              <span className="px-2 py-1 rounded-full text-[10px] bg-blue-500/15 text-blue-500">Admin</span>
              <span className="px-2 py-1 rounded-full text-[10px] bg-green-500/15 text-green-500">Verified</span>
            </div>

            <div className="h-px bg-slate-200 dark:bg-white/10 my-4" />

            <div className="grid grid-cols-3 gap-3 text-center">
              <div>
                <p className="text-lg font-bold text-slate-900 dark:text-slate-100">{profile.experience || 0}</p>
                <p className="text-[10px] text-slate-500 dark:text-slate-400">Yrs Exp.</p>
              </div>
              <div>
                <p className="text-lg font-bold text-slate-900 dark:text-slate-100">1,284</p>
                <p className="text-[10px] text-slate-500 dark:text-slate-400">Patients</p>
              </div>
              <div>
                <p className="text-lg font-bold text-amber-500">{profile.rating.toFixed(1)}★</p>
                <p className="text-[10px] text-slate-500 dark:text-slate-400">Rating</p>
              </div>
            </div>

            <button
              type="button"
              className="mt-4 w-full h-9 rounded-lg text-sm border border-slate-200 dark:border-white/10 hover:bg-slate-100 dark:hover:bg-white/5"
            >
              Change Photo
            </button>
          </section>

          <section className="rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#161f30] overflow-hidden">
            <div className="px-5 py-4 border-b border-slate-200 dark:border-white/10">
              <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">Clinic</h3>
            </div>
            <div className="px-5 py-4 space-y-3">
              <InfoRow label="Clinic Name" value="Sunrise Clinic" />
              <InfoRow label="Location" value={profile.city || "Koregaon Park, Pune"} />
              <InfoRow label="Registration No." value="MH-2014-GEN-00412" />
            </div>
          </section>
        </div>

        <div className="space-y-4">
          <section className="rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#161f30] overflow-hidden">
            <div className="px-5 py-4 border-b border-slate-200 dark:border-white/10 flex items-center justify-between gap-3">
              <div>
                <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">Personal Information</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Basic details visible to patients</p>
              </div>
              <button type="button" className="h-8 px-3 rounded-lg text-xs bg-blue-600 text-white hover:bg-blue-500">
                Save Changes
              </button>
            </div>

            <div className="p-5 grid grid-cols-1 md:grid-cols-2 gap-3.5">
              <InputField label="First Name" value={personal.firstName} onChange={(v) => setPersonal((p) => ({ ...p, firstName: v }))} />
              <InputField label="Last Name" value={personal.lastName} onChange={(v) => setPersonal((p) => ({ ...p, lastName: v }))} />
              <InputField label="Email" type="email" value={personal.email} onChange={(v) => setPersonal((p) => ({ ...p, email: v }))} />
              <InputField label="Phone" value={personal.phone} onChange={(v) => setPersonal((p) => ({ ...p, phone: v }))} />
              <InputField label="Date of Birth" type="date" value={personal.dob} onChange={(v) => setPersonal((p) => ({ ...p, dob: v }))} />
              <label className="space-y-1.5">
                <span className="text-xs text-slate-500 dark:text-slate-400">Gender</span>
                <select
                  value={personal.gender}
                  onChange={(e) => setPersonal((p) => ({ ...p, gender: e.target.value }))}
                  className="w-full h-10 px-3 rounded-lg text-sm bg-slate-50 dark:bg-[#111827] border border-slate-200 dark:border-white/10"
                >
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </select>
              </label>

              <label className="space-y-1.5 md:col-span-2">
                <span className="text-xs text-slate-500 dark:text-slate-400">Bio / Introduction</span>
                <textarea
                  value={personal.bio}
                  onChange={(e) => setPersonal((p) => ({ ...p, bio: e.target.value }))}
                  className="w-full min-h-[90px] px-3 py-2.5 rounded-lg text-sm bg-slate-50 dark:bg-[#111827] border border-slate-200 dark:border-white/10"
                />
              </label>
            </div>
          </section>

          <section className="rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#161f30] overflow-hidden">
            <div className="px-5 py-4 border-b border-slate-200 dark:border-white/10">
              <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">Professional Details</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Credentials and qualifications</p>
            </div>

            <div className="p-5 grid grid-cols-1 md:grid-cols-2 gap-3.5">
              <InputField label="Specialization" value={professional.specialization} onChange={(v) => setProfessional((p) => ({ ...p, specialization: v }))} />
              <InputField label="Qualifications" value={professional.qualifications} onChange={(v) => setProfessional((p) => ({ ...p, qualifications: v }))} />
              <InputField label="Medical Council" value={professional.council} onChange={(v) => setProfessional((p) => ({ ...p, council: v }))} />
              <InputField label="Registration No." value={professional.registrationNo} onChange={(v) => setProfessional((p) => ({ ...p, registrationNo: v }))} />
              <InputField label="Languages Spoken" value={professional.languages} onChange={(v) => setProfessional((p) => ({ ...p, languages: v }))} />
              <InputField label="Years of Experience" type="number" value={professional.experience} onChange={(v) => setProfessional((p) => ({ ...p, experience: v }))} />
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[10px] uppercase tracking-wide text-slate-500 dark:text-slate-400">{label}</p>
      <p className="text-sm font-medium text-slate-800 dark:text-slate-200 mt-0.5">{value}</p>
    </div>
  );
}

function InputField({
  label,
  type = "text",
  value,
  onChange,
}: {
  label: string;
  type?: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="space-y-1.5">
      <span className="text-xs text-slate-500 dark:text-slate-400">{label}</span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full h-10 px-3 rounded-lg text-sm bg-slate-50 dark:bg-[#111827] border border-slate-200 dark:border-white/10"
      />
    </label>
  );
}
