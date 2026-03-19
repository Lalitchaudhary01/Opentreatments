import { DoctorProfileViewData } from "../../actions/getDoctorProfileView";
import InfoRow from "../ui/InfoRow";
import DoctorProfileLogoutButton from "../DoctorProfileLogoutButton";

export default function ProfileSidebar({
  profile,
  initials,
}: {
  profile: DoctorProfileViewData;
  initials: string;
}) {
  const statusLabel =
    profile.status === "APPROVED"
      ? "Verified"
      : profile.status === "REJECTED"
        ? "Rejected"
        : "Pending";

  return (
    <div className="flex flex-col gap-[14px]">
      <div className="rounded-[14px] border border-slate-200 bg-white px-5 py-7 text-center dark:border-white/[0.07] dark:bg-[#161f30]">
        <div className="mx-auto mb-3 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-[#3b82f6] to-[#1d4ed8] text-[28px] font-bold text-white">
          {initials}
        </div>
        <div className="mb-[2px] text-[16px] font-bold text-slate-900 dark:text-[#F1F5F9]">Dr. {profile.name}</div>
        <div className="mb-[10px] text-[11.5px] text-blue-400">{profile.specialization || "-"}</div>

        <div className="flex justify-center gap-[6px]">
          <span className="rounded-[10px] bg-blue-500/15 px-2 py-[2px] text-[10px] text-blue-400">Doctor</span>
          <span className="rounded-[10px] bg-green-500/15 px-2 py-[2px] text-[10px] text-green-400">{statusLabel}</span>
        </div>

        <div className="my-4 h-px bg-white/[0.07]" />

        <div className="flex justify-around text-center">
          <div>
            <div className="text-[17px] font-bold text-slate-900 dark:text-[#F1F5F9]">{profile.experienceLabel || "-"}</div>
            <div className="text-[10px] text-slate-500 dark:text-[#475569]">Experience</div>
          </div>
          <div>
            <div className="text-[17px] font-bold text-slate-900 dark:text-[#F1F5F9]">{profile.languages.length}</div>
            <div className="text-[10px] text-slate-500 dark:text-[#475569]">Languages</div>
          </div>
        </div>

        <button
          type="button"
          className="mt-[14px] inline-flex h-[34px] w-full items-center justify-center rounded-lg border border-slate-200 bg-slate-100 text-[12px] font-medium text-slate-500 hover:bg-white/[0.1] hover:text-slate-900 dark:border-white/[0.07] dark:bg-white/[0.06] dark:text-[#94A3B8] dark:hover:text-[#F1F5F9]"
        >
          Change Photo
        </button>
        <DoctorProfileLogoutButton />
      </div>

      <div className="overflow-hidden rounded-[14px] border border-slate-200 bg-white dark:border-white/[0.07] dark:bg-[#161f30]">
        <div className="border-b border-slate-200 px-5 py-[15px] dark:border-white/[0.07]">
          <div className="text-[13px] font-semibold text-slate-900 dark:text-[#F1F5F9]">Clinic</div>
        </div>
        <div className="flex flex-col gap-[10px] px-[18px] py-[14px]">
          <InfoRow label="Clinic Name" value={profile.clinicName || "-"} />
          <InfoRow label="Location" value={[profile.city, profile.pinCode].filter(Boolean).join(" - ") || "-"} />
          <InfoRow label="Registration No." value={profile.medicalRegistrationNumber || "-"} />
          <InfoRow label="Address" value={profile.address || "-"} />
        </div>
      </div>
    </div>
  );
}
