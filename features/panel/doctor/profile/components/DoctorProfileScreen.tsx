"use client";

import { useMemo, useState } from "react";
import { DoctorProfileViewData } from "../actions/getDoctorProfileView";
import { updateDoctorProfileView } from "../actions/updateDoctorProfileView";
import ProfileSidebar from "./sections/ProfileSidebar";
import PersonalInfoSection from "./sections/PersonalInfoSection";
import ProfessionalDetailsSection from "./sections/ProfessionalDetailsSection";

type Props = {
  profile: DoctorProfileViewData;
};

export default function DoctorProfileScreen({ profile }: Props) {
  const [firstName, ...rest] = profile.name.trim().split(" ");
  const lastName = rest.join(" ");
  const [savingPersonal, setSavingPersonal] = useState(false);
  const [savingProfessional, setSavingProfessional] = useState(false);

  const [personal, setPersonal] = useState({
    firstName: firstName || "",
    lastName: lastName || "",
    email: profile.email || "",
    phone: profile.phone || "",
    gender: profile.gender || "",
    dob: profile.dob || "",
    bio: profile.bio || "",
  });

  const [professional, setProfessional] = useState({
    specialization: profile.specialization || "",
    qualifications: profile.qualification || "",
    council: profile.medicalCouncil || "",
    registrationNo: profile.medicalRegistrationNumber || "",
    languages: (profile.languages || []).join(", "),
    experience: profile.experienceLabel || "",
  });

  async function savePersonalSection() {
    setSavingPersonal(true);
    try {
      const name = `${personal.firstName} ${personal.lastName}`.trim();
      const result = await updateDoctorProfileView({
        name,
        phone: personal.phone,
        gender: personal.gender,
        dob: personal.dob,
        bio: personal.bio,
      });
      if (!result.ok) {
        alert(result.error || "Unable to save personal details");
        return;
      }
      alert("Personal details updated");
    } finally {
      setSavingPersonal(false);
    }
  }

  async function saveProfessionalSection() {
    setSavingProfessional(true);
    try {
      const languages = professional.languages
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean);
      const result = await updateDoctorProfileView({
        specialization: professional.specialization,
        qualification: professional.qualifications,
        medicalCouncil: professional.council,
        medicalRegistrationNumber: professional.registrationNo,
        languages,
        experienceLabel: professional.experience,
      });
      if (!result.ok) {
        alert(result.error || "Unable to save professional details");
        return;
      }
      alert("Professional details updated");
    } finally {
      setSavingProfessional(false);
    }
  }

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
          <PersonalInfoSection
            personal={personal}
            setPersonal={setPersonal}
            onSave={savePersonalSection}
            saving={savingPersonal}
          />
          <ProfessionalDetailsSection
            professional={professional}
            setProfessional={setProfessional}
            onSave={saveProfessionalSection}
            saving={savingProfessional}
          />
        </div>
      </div>
    </div>
  );
}
