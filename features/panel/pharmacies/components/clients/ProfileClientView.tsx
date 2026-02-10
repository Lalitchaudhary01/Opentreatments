"use client";

import { useState } from "react";
import { usePharmacyProfile } from "@/features/panel/pharmacies/hooks";
import {
  ProfileHeader,
  PharmacyInfoSection,
  LicenseSection,
} from "@/features/panel/pharmacies/components/sections";

export function ProfileClientView({ userId }: { userId: string }) {
  const { profile, updateProfile } = usePharmacyProfile(userId);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState<any>({});

  if (!profile) return null;

  const bind = (k: string) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, [k]: e.target.value });

  const save = async () => {
    await updateProfile(form);
    setEditing(false);
    setForm({});
  };

  return (
    <>
      <ProfileHeader profile={profile} onEdit={() => setEditing((v) => !v)} />

      {editing ? (
        <div className="p-6 space-y-3">
          <input
            defaultValue={profile.name}
            onChange={bind("name")}
            placeholder="Pharmacy Name"
            className="border p-2 w-full"
          />
          <input
            defaultValue={profile.phone}
            onChange={bind("phone")}
            placeholder="Phone"
            className="border p-2 w-full"
          />
          <input
            defaultValue={profile.address || ""}
            onChange={bind("address")}
            placeholder="Address"
            className="border p-2 w-full"
          />

          <button
            onClick={save}
            className="px-4 py-2 bg-primary text-white rounded"
          >
            Save Changes
          </button>
        </div>
      ) : (
        <>
          <PharmacyInfoSection profile={profile} />
          <LicenseSection profile={profile} />
        </>
      )}
    </>
  );
}
