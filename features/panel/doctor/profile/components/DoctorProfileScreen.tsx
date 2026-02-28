"use client";

import { useMemo, useState } from "react";
import { DoctorProfile } from "@/features/panel/doctor/types/doctor";

type Props = {
  profile: DoctorProfile;
  email?: string | null;
};

export default function DoctorProfileScreen({ profile, email }: Props) {
  const [personal, setPersonal] = useState({
    firstName: profile.name?.split(" ")[0] || "Ramesh",
    lastName: profile.name?.split(" ").slice(1).join(" ") || "Iyer",
    email: email || "dr.ramesh@sunriseclinic.in",
    phone: "+91 98765 43210",
    dob: "1982-06-14",
    gender: profile.gender || "Male",
    bio: "Dr. Ramesh Iyer is a General Physician with 12 years of experience in primary care, preventive medicine, and chronic disease management. Practicing at Sunrise Clinic, Pune.",
  });

  const [professional, setProfessional] = useState({
    specialization: profile.specialization || "General Physician",
    qualifications: "MBBS, MD (General Medicine)",
    council: "Maharashtra Medical Council",
    registrationNo: "MMC-2013-04821",
    languages: (profile.languages || []).join(", ") || "English, Hindi, Marathi",
    experience: String(profile.experience || 12),
  });

  const initials = useMemo(() => {
    const n = profile.name?.trim() || "Ramesh Iyer";
    return n
      .split(" ")
      .map((p) => p[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
  }, [profile.name]);

  return (
    <div className="min-h-screen bg-[#111827] px-7 py-[22px]">
      <div className="grid grid-cols-1 items-start gap-[18px] xl:grid-cols-[280px_1fr]">
        <div className="flex flex-col gap-[14px]">
          <div className="rounded-[14px] border border-white/[0.07] bg-[#161f30] px-5 py-7 text-center">
            <div className="mx-auto mb-3 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-[#3b82f6] to-[#1d4ed8] text-[28px] font-bold text-white">
              {initials}
            </div>
            <div className="mb-[2px] text-[16px] font-bold text-[#F1F5F9]">Dr. {profile.name || "Ramesh Iyer"}</div>
            <div className="mb-[10px] text-[11.5px] text-blue-400">General Physician · MBBS, MD</div>

            <div className="flex justify-center gap-[6px]">
              <span className="rounded-[10px] bg-blue-500/15 px-2 py-[2px] text-[10px] text-blue-400">Admin</span>
              <span className="rounded-[10px] bg-green-500/15 px-2 py-[2px] text-[10px] text-green-400">Verified</span>
            </div>

            <div className="my-4 h-px bg-white/[0.07]" />

            <div className="flex justify-around text-center">
              <div>
                <div className="text-[17px] font-bold text-[#F1F5F9]">{profile.experience || 12}</div>
                <div className="text-[10px] text-[#475569]">Yrs Exp.</div>
              </div>
              <div>
                <div className="text-[17px] font-bold text-[#F1F5F9]">1,284</div>
                <div className="text-[10px] text-[#475569]">Patients</div>
              </div>
              <div>
                <div className="text-[17px] font-bold text-amber-400">{(profile.rating ?? 4.8).toFixed(1)}★</div>
                <div className="text-[10px] text-[#475569]">Rating</div>
              </div>
            </div>

            <button
              type="button"
              className="mt-[14px] inline-flex h-[34px] w-full items-center justify-center rounded-lg border border-white/[0.07] bg-white/[0.06] text-[12px] font-medium text-[#94A3B8] hover:bg-white/[0.1] hover:text-[#F1F5F9]"
            >
              Change Photo
            </button>
          </div>

          <div className="overflow-hidden rounded-[14px] border border-white/[0.07] bg-[#161f30]">
            <div className="border-b border-white/[0.07] px-5 py-[15px]">
              <div className="text-[13px] font-semibold text-[#F1F5F9]">Clinic</div>
            </div>
            <div className="flex flex-col gap-[10px] px-[18px] py-[14px]">
              <InfoRow label="Clinic Name" value="Sunrise Clinic" />
              <InfoRow label="Location" value={profile.city || "Koregaon Park, Pune"} />
              <InfoRow label="Registration No." value="MH-2014-GEN-00412" />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-[14px]">
          <div className="overflow-hidden rounded-[14px] border border-white/[0.07] bg-[#161f30]">
            <div className="flex items-center justify-between border-b border-white/[0.07] px-5 py-[15px]">
              <div>
                <div className="text-[13px] font-semibold text-[#F1F5F9]">Personal Information</div>
                <div className="mt-[2px] text-[11px] text-[#94A3B8]">Basic details visible to patients</div>
              </div>
              <button
                type="button"
                className="inline-flex h-[28px] items-center rounded-lg bg-[#3b82f6] px-3 text-[11px] font-medium text-white hover:bg-[#2563eb]"
              >
                Save Changes
              </button>
            </div>

            <div className="grid grid-cols-1 gap-[14px] px-5 py-5 md:grid-cols-2">
              <Field label="First Name" value={personal.firstName} onChange={(v) => setPersonal((p) => ({ ...p, firstName: v }))} />
              <Field label="Last Name" value={personal.lastName} onChange={(v) => setPersonal((p) => ({ ...p, lastName: v }))} />
              <Field label="Email" type="email" value={personal.email} onChange={(v) => setPersonal((p) => ({ ...p, email: v }))} />
              <Field label="Phone" value={personal.phone} onChange={(v) => setPersonal((p) => ({ ...p, phone: v }))} />
              <Field label="Date of Birth" type="date" value={personal.dob} onChange={(v) => setPersonal((p) => ({ ...p, dob: v }))} />

              <label className="space-y-[6px]">
                <span className="text-[11px] text-[#94A3B8]">Gender</span>
                <select
                  value={personal.gender}
                  onChange={(e) => setPersonal((p) => ({ ...p, gender: e.target.value }))}
                  className="h-[36px] w-full rounded-lg border border-white/[0.07] bg-[#1c2840] px-[11px] text-[12.5px] text-[#F1F5F9] outline-none"
                >
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </select>
              </label>

              <label className="space-y-[6px] md:col-span-2">
                <span className="text-[11px] text-[#94A3B8]">Bio / Introduction</span>
                <textarea
                  value={personal.bio}
                  onChange={(e) => setPersonal((p) => ({ ...p, bio: e.target.value }))}
                  className="min-h-[80px] w-full rounded-lg border border-white/[0.07] bg-[#1c2840] px-[11px] py-2 text-[12.5px] text-[#F1F5F9] outline-none"
                />
              </label>
            </div>
          </div>

          <div className="overflow-hidden rounded-[14px] border border-white/[0.07] bg-[#161f30]">
            <div className="border-b border-white/[0.07] px-5 py-[15px]">
              <div className="text-[13px] font-semibold text-[#F1F5F9]">Professional Details</div>
              <div className="mt-[2px] text-[11px] text-[#94A3B8]">Credentials and qualifications</div>
            </div>

            <div className="grid grid-cols-1 gap-[14px] px-5 py-5 md:grid-cols-2">
              <Field label="Specialization" value={professional.specialization} onChange={(v) => setProfessional((p) => ({ ...p, specialization: v }))} />
              <Field label="Qualifications" value={professional.qualifications} onChange={(v) => setProfessional((p) => ({ ...p, qualifications: v }))} />
              <Field label="Medical Council" value={professional.council} onChange={(v) => setProfessional((p) => ({ ...p, council: v }))} />
              <Field label="Registration No." value={professional.registrationNo} onChange={(v) => setProfessional((p) => ({ ...p, registrationNo: v }))} />
              <Field label="Languages Spoken" value={professional.languages} onChange={(v) => setProfessional((p) => ({ ...p, languages: v }))} />
              <Field label="Years of Experience" type="number" value={professional.experience} onChange={(v) => setProfessional((p) => ({ ...p, experience: v }))} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-[10px] text-[#475569]">{label}</div>
      <div className="mt-[2px] text-[12.5px] font-medium text-[#F1F5F9]">{value}</div>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
}) {
  return (
    <label className="space-y-[6px]">
      <span className="text-[11px] text-[#94A3B8]">{label}</span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-[36px] w-full rounded-lg border border-white/[0.07] bg-[#1c2840] px-[11px] text-[12.5px] text-[#F1F5F9] outline-none"
      />
    </label>
  );
}
