import { Dispatch, SetStateAction } from "react";
import ProfileField from "../ui/ProfileField";

type ProfessionalState = {
  specialization: string;
  qualifications: string;
  registrationNo: string;
  languages: string;
  experience: string;
};

export default function ProfessionalDetailsSection({
  professional,
  setProfessional,
}: {
  professional: ProfessionalState;
  setProfessional: Dispatch<SetStateAction<ProfessionalState>>;
}) {
  return (
    <div className="overflow-hidden rounded-[14px] border border-slate-200 bg-white dark:border-white/[0.07] dark:bg-[#161f30]">
      <div className="border-b border-slate-200 px-5 py-[15px] dark:border-white/[0.07]">
        <div className="text-[13px] font-semibold text-slate-900 dark:text-[#F1F5F9]">Professional Details</div>
        <div className="mt-[2px] text-[11px] text-slate-500 dark:text-[#94A3B8]">Credentials and qualifications</div>
      </div>

      <div className="grid grid-cols-1 gap-[14px] px-5 py-5 md:grid-cols-2">
        <ProfileField label="Specialization" value={professional.specialization} onChange={(v) => setProfessional((p) => ({ ...p, specialization: v }))} />
        <ProfileField label="Qualifications" value={professional.qualifications} onChange={(v) => setProfessional((p) => ({ ...p, qualifications: v }))} />
        <ProfileField label="Registration No." value={professional.registrationNo} onChange={(v) => setProfessional((p) => ({ ...p, registrationNo: v }))} />
        <ProfileField label="Languages Spoken" value={professional.languages} onChange={(v) => setProfessional((p) => ({ ...p, languages: v }))} />
        <ProfileField label="Years of Experience" value={professional.experience} onChange={(v) => setProfessional((p) => ({ ...p, experience: v }))} />
      </div>
    </div>
  );
}
