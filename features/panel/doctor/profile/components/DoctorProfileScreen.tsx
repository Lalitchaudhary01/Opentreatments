"use client";

import { useMemo, useState } from "react";
import { DoctorProfileViewData } from "../actions/getDoctorProfileView";
import ProfileSidebar from "./sections/ProfileSidebar";
import PersonalInfoSection from "./sections/PersonalInfoSection";
import ProfessionalDetailsSection from "./sections/ProfessionalDetailsSection";

type Props = {
  profile: DoctorProfileViewData;
};

export default function DoctorProfileScreen({ profile }: Props) {
  const [firstName, ...rest] = profile.name.trim().split(" ");
  const lastName = rest.join(" ");

  const [personal, setPersonal] = useState({
    firstName: firstName || "",
    lastName: lastName || "",
    email: profile.email || "",
    phone: profile.phone || "",
    gender: profile.gender || "",
  });

  const [professional, setProfessional] = useState({
    specialization: profile.specialization || "",
    qualifications: profile.qualification || "",
    registrationNo: profile.medicalRegistrationNumber || "",
    languages: (profile.languages || []).join(", "),
    experience: profile.experienceLabel || "",
  });

  const initials = useMemo(() => {
    const n = profile.name?.trim() || "DR";
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
