"use client";

import { useState } from "react";
import {
  PharmacyStoreProfileView,
} from "../../actions/getPharmacyStoreProfileView";
import { updatePharmacyStoreProfileView } from "../../actions/updatePharmacyStoreProfileView";

export default function StoreProfileEditor({
  profile,
}: {
  profile: PharmacyStoreProfileView;
}) {
  const [form, setForm] = useState({
    name: profile.name,
    ownerName: profile.ownerName,
    phone: profile.phone,
    address: profile.address,
    city: profile.city,
    pinCode: profile.pinCode,
    state: profile.state,
    country: profile.country,
    gstNumber: profile.gstNumber,
    bio: profile.bio,
  });
  const [saving, setSaving] = useState(false);

  async function onSave() {
    setSaving(true);
    try {
      const result = await updatePharmacyStoreProfileView(form);
      if (!result.ok) {
        alert(result.error || "Unable to save profile");
        return;
      }
      alert("Profile updated");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="overflow-hidden rounded-[14px] border border-white/[0.07] bg-[#161f30]">
      <div className="flex items-center justify-between border-b border-white/[0.07] px-5 py-4">
        <div>
          <div className="text-[13px] font-semibold text-slate-100">Store Information</div>
          <div className="mt-0.5 text-[11px] text-[#94A3B8]">Editable profile fields synced to DB</div>
        </div>
        <button
          type="button"
          onClick={onSave}
          disabled={saving}
          className="rounded-md bg-[#3B82F6] px-3 py-1.5 text-[11px] font-medium text-white hover:bg-blue-600 disabled:opacity-60"
        >
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </div>

      <div className="grid gap-3 p-[18px] md:grid-cols-2">
        {[
          { key: "name", label: "Store Name" },
          { key: "ownerName", label: "Owner Name" },
          { key: "phone", label: "Phone" },
          { key: "city", label: "City" },
          { key: "pinCode", label: "PIN Code" },
          { key: "state", label: "State" },
          { key: "country", label: "Country" },
          { key: "gstNumber", label: "GST Number" },
        ].map((field) => (
          <div key={field.key} className="flex flex-col gap-1">
            <label className="text-[10.5px] font-semibold uppercase tracking-[0.07em] text-[#64748B]">{field.label}</label>
            <input
              value={form[field.key as keyof typeof form] as string}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, [field.key]: e.target.value }))
              }
              className="w-full rounded-lg border border-white/[0.07] bg-white/[0.04] px-3 py-2 text-[12.5px] text-slate-100 outline-none"
            />
          </div>
        ))}

        <div className="flex flex-col gap-1 md:col-span-2">
          <label className="text-[10.5px] font-semibold uppercase tracking-[0.07em] text-[#64748B]">Address</label>
          <input
            value={form.address}
            onChange={(e) => setForm((prev) => ({ ...prev, address: e.target.value }))}
            className="w-full rounded-lg border border-white/[0.07] bg-white/[0.04] px-3 py-2 text-[12.5px] text-slate-100 outline-none"
          />
        </div>

        <div className="flex flex-col gap-1 md:col-span-2">
          <label className="text-[10.5px] font-semibold uppercase tracking-[0.07em] text-[#64748B]">About Store (Bio)</label>
          <textarea
            value={form.bio}
            onChange={(e) => setForm((prev) => ({ ...prev, bio: e.target.value }))}
            className="min-h-[90px] w-full rounded-lg border border-white/[0.07] bg-white/[0.04] px-3 py-2 text-[12.5px] text-slate-100 outline-none"
          />
        </div>
      </div>
    </div>
  );
}
