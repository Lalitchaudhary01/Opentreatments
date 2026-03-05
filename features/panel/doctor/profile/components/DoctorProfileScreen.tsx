"use client";

import { useMemo, useState } from "react";
import { DoctorProfile } from "@/features/panel/doctor/types/doctor";
import ProfileSidebar from "./sections/ProfileSidebar";
import PersonalInfoSection from "./sections/PersonalInfoSection";
import ProfessionalDetailsSection from "./sections/ProfessionalDetailsSection";

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
    <div className="min-h-screen bg-slate-50 dark:bg-[#111827] px-7 py-[22px]">
      <div className="grid grid-cols-1 items-start gap-[18px] xl:grid-cols-[280px_1fr]">
        <ProfileSidebar profile={profile} initials={initials} />

        <div className="flex flex-col gap-[14px]">
          <PersonalInfoSection personal={personal} setPersonal={setPersonal} />
          <ProfessionalDetailsSection professional={professional} setProfessional={setProfessional} />
        </div>
      </div>
    </div>
  );
}
