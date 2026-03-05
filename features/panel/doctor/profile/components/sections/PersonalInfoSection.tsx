import { Dispatch, SetStateAction } from "react";
import ProfileField from "../ui/ProfileField";

type PersonalState = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dob: string;
  gender: string;
  bio: string;
};

export default function PersonalInfoSection({
  personal,
  setPersonal,
}: {
  personal: PersonalState;
  setPersonal: Dispatch<SetStateAction<PersonalState>>;
}) {
  return (
    <div className="overflow-hidden rounded-[14px] border border-slate-200 bg-white dark:border-white/[0.07] dark:bg-[#161f30]">
      <div className="flex items-center justify-between border-b border-slate-200 px-5 py-[15px] dark:border-white/[0.07]">
        <div>
          <div className="text-[13px] font-semibold text-slate-900 dark:text-[#F1F5F9]">Personal Information</div>
          <div className="mt-[2px] text-[11px] text-slate-500 dark:text-[#94A3B8]">Basic details visible to patients</div>
        </div>
        <button
          type="button"
          className="inline-flex h-[28px] items-center rounded-lg bg-[#3b82f6] px-3 text-[11px] font-medium text-white hover:bg-[#2563eb]"
        >
          Save Changes
        </button>
      </div>

      <div className="grid grid-cols-1 gap-[14px] px-5 py-5 md:grid-cols-2">
        <ProfileField label="First Name" value={personal.firstName} onChange={(v) => setPersonal((p) => ({ ...p, firstName: v }))} />
        <ProfileField label="Last Name" value={personal.lastName} onChange={(v) => setPersonal((p) => ({ ...p, lastName: v }))} />
        <ProfileField label="Email" type="email" value={personal.email} onChange={(v) => setPersonal((p) => ({ ...p, email: v }))} />
        <ProfileField label="Phone" value={personal.phone} onChange={(v) => setPersonal((p) => ({ ...p, phone: v }))} />
        <ProfileField label="Date of Birth" type="date" value={personal.dob} onChange={(v) => setPersonal((p) => ({ ...p, dob: v }))} />

        <label className="space-y-[6px]">
          <span className="text-[11px] text-slate-500 dark:text-[#94A3B8]">Gender</span>
          <select
            value={personal.gender}
            onChange={(e) => setPersonal((p) => ({ ...p, gender: e.target.value }))}
            className="h-[36px] w-full rounded-lg border border-slate-200 bg-slate-100 px-[11px] text-[12.5px] text-slate-900 outline-none dark:border-white/[0.07] dark:bg-[#1c2840] dark:text-[#F1F5F9]"
          >
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>
        </label>

        <label className="space-y-[6px] md:col-span-2">
          <span className="text-[11px] text-slate-500 dark:text-[#94A3B8]">Bio / Introduction</span>
          <textarea
            value={personal.bio}
            onChange={(e) => setPersonal((p) => ({ ...p, bio: e.target.value }))}
            className="min-h-[80px] w-full rounded-lg border border-slate-200 bg-slate-100 px-[11px] py-2 text-[12.5px] text-slate-900 outline-none dark:border-white/[0.07] dark:bg-[#1c2840] dark:text-[#F1F5F9]"
          />
        </label>
      </div>
    </div>
  );
}
