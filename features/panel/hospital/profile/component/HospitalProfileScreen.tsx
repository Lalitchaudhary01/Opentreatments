import Link from "next/link";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import prisma from "@/lib/prisma";
import { authOptions } from "@/lib/auth-options";
import HospitalLogoutButton from "./HospitalLogoutButton";

function initials(name?: string | null) {
  if (!name?.trim()) return "HC";
  return name
    .split(" ")
    .map((p) => p[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

function statusClass(status: string) {
  if (status === "APPROVED") return "bg-[#14b8a6]/15 text-[#14b8a6]";
  if (status === "PENDING") return "bg-[#f59e0b]/15 text-[#f59e0b]";
  return "bg-[#ef4444]/15 text-[#ef4444]";
}

export default async function HospitalProfileScreen() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) redirect("/auth");
  if (session.user.role !== "HOSPITAL") redirect("/auth");

  const profile = await prisma.hospital.findUnique({
    where: { userId: session.user.id },
    select: {
      name: true,
      email: true,
      phone: true,
      address: true,
      city: true,
      state: true,
      country: true,
      website: true,
      status: true,
      verified: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  if (!profile) {
    return (
      <div className="rounded-[14px] border border-white/[0.07] bg-[#161f30] p-6">
        <p className="text-[11px] uppercase tracking-[0.1em] text-[#64748B]">Hospital Profile</p>
        <h2 className="mt-2 text-xl font-semibold text-slate-100">Profile not submitted yet</h2>
        <p className="mt-2 text-sm text-[#94A3B8]">
          Complete hospital profile to appear in admin approval queue and unlock full dashboard access.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <Link
            href="/hospital/profile/submit"
            className="rounded-lg bg-[#3B82F6] px-4 py-2 text-sm font-medium text-white hover:bg-blue-600"
          >
            Submit Profile
          </Link>
          <Link
            href="/hospital/dashboard"
            className="rounded-lg border border-white/[0.12] px-4 py-2 text-sm font-medium text-[#CBD5E1] hover:bg-white/[0.05]"
          >
            Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  const title = profile.name || "Sunrise Hospital";
  const location = [profile.city, profile.state].filter(Boolean).join(", ") || "Mumbai, Maharashtra";
  const fullAddress =
    [profile.address, profile.city, profile.state, profile.country].filter(Boolean).join(", ") ||
    "Bandra West, Mumbai, Maharashtra, India";

  return (
    <div className="min-h-full bg-[#0B1120] p-6 md:p-8">
      <div className="grid items-start gap-[18px] xl:grid-cols-[260px_1fr]">
        <div className="flex flex-col gap-[14px]">
          <div className="rounded-[14px] border border-white/[0.07] bg-[#161f30] p-[22px] text-center">
            <div className="mx-auto mb-3 flex h-[72px] w-[72px] items-center justify-center rounded-2xl bg-gradient-to-br from-[#0284c7] to-[#0369a1] text-[26px] font-bold text-white">
              {initials(title)}
            </div>
            <div className="text-[15px] font-bold text-slate-100">{title}</div>
            <div className="mt-0.5 text-[11.5px] text-[#38bdf8]">{location}</div>

            <div className="mt-2 flex justify-center gap-1.5">
              <span className="rounded-full bg-[#22c55e]/15 px-2 py-0.5 text-[10px] text-[#22c55e]">
                {profile.verified ? "Verified" : "Unverified"}
              </span>
              <span className={`rounded-full px-2 py-0.5 text-[10px] ${statusClass(profile.status)}`}>{profile.status}</span>
            </div>

            <div className="my-[14px] h-px bg-white/[0.07]" />

            <div className="flex justify-around">
              <div>
                <div className="text-[16px] font-bold text-slate-100">4.7★</div>
                <div className="text-[10px] text-[#64748B]">Rating</div>
              </div>
              <div>
                <div className="text-[16px] font-bold text-slate-100">24/7</div>
                <div className="text-[10px] text-[#64748B]">Support</div>
              </div>
              <div>
                <div className="text-[16px] font-bold text-slate-100">
                  {Math.max(1, new Date().getFullYear() - new Date(profile.createdAt).getFullYear())}yr
                </div>
                <div className="text-[10px] text-[#64748B]">Est.</div>
              </div>
            </div>

            <button
              type="button"
              className="mt-[14px] w-full rounded-lg border border-white/[0.08] bg-white/[0.04] py-2 text-[11px] text-[#CBD5E1] hover:bg-white/[0.08]"
            >
              Change Logo
            </button>
            <div className="mt-2">
              <HospitalLogoutButton />
            </div>
          </div>

          <div className="overflow-hidden rounded-[14px] border border-white/[0.07] bg-[#161f30]">
            <div className="border-b border-white/[0.07] px-4 py-3 text-[12px] font-semibold text-slate-100">Verification & Compliance</div>
            <div className="flex flex-col gap-2 p-3">
              <div className="rounded-lg border border-white/[0.07] bg-white/[0.02] p-3">
                <div className="text-[10px] uppercase tracking-[0.08em] text-[#64748B]">Hospital License</div>
                <div className="mt-1 flex items-center justify-between">
                  <div className="text-[11.5px] text-slate-100">MH-HSP-2026-00091</div>
                  <span className="rounded-full bg-[#22c55e]/15 px-2 py-0.5 text-[9.5px] text-[#22c55e]">Valid</span>
                </div>
              </div>
              <div className="rounded-lg border border-white/[0.07] bg-white/[0.02] p-3">
                <div className="text-[10px] uppercase tracking-[0.08em] text-[#64748B]">NABH Status</div>
                <div className="mt-1 flex items-center justify-between">
                  <div className="text-[11.5px] text-slate-100">Accredited</div>
                  <span className="rounded-full bg-[#22c55e]/15 px-2 py-0.5 text-[9.5px] text-[#22c55e]">Active</span>
                </div>
              </div>
              <div className="rounded-lg border border-white/[0.07] bg-white/[0.02] p-3">
                <div className="text-[10px] uppercase tracking-[0.08em] text-[#64748B]">Last Update</div>
                <div className="mt-1 flex items-center justify-between">
                  <div className="text-[11.5px] text-slate-100">
                    {new Date(profile.updatedAt).toLocaleDateString("en-IN", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </div>
                  <span className="rounded-full bg-[#3b82f6]/15 px-2 py-0.5 text-[9.5px] text-[#60a5fa]">Synced</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-[14px]">
          <div className="overflow-hidden rounded-[14px] border border-white/[0.07] bg-[#161f30]">
            <div className="flex items-center justify-between border-b border-white/[0.07] px-5 py-4">
              <div>
                <div className="text-[13px] font-semibold text-slate-100">Hospital Information</div>
                <div className="mt-0.5 text-[11px] text-[#94A3B8]">Pre-filled from registration · edit anytime</div>
              </div>
              <Link
                href="/hospital/profile/edit"
                className="rounded-md bg-[#3B82F6] px-3 py-1.5 text-[11px] font-medium text-white hover:bg-blue-600"
              >
                Save Changes
              </Link>
            </div>

            <div className="grid gap-3 p-[18px] md:grid-cols-2">
              {[
                { label: "Hospital Name", value: title },
                { label: "Status", value: profile.status },
                { label: "Phone", value: profile.phone || "+91 98765 43210" },
                { label: "Email", value: profile.email || "admin@hospital.in" },
              ].map((field) => (
                <div key={field.label} className="flex flex-col gap-1">
                  <label className="text-[10.5px] font-semibold uppercase tracking-[0.07em] text-[#64748B]">{field.label}</label>
                  <input
                    readOnly
                    value={field.value}
                    className="w-full rounded-lg border border-white/[0.07] bg-white/[0.04] px-3 py-2 text-[12.5px] text-slate-100 outline-none"
                  />
                </div>
              ))}

              <div className="flex flex-col gap-1 md:col-span-2">
                <label className="text-[10.5px] font-semibold uppercase tracking-[0.07em] text-[#64748B]">Address</label>
                <input
                  readOnly
                  value={fullAddress}
                  className="w-full rounded-lg border border-white/[0.07] bg-white/[0.04] px-3 py-2 text-[12.5px] text-slate-100 outline-none"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[10.5px] font-semibold uppercase tracking-[0.07em] text-[#64748B]">City</label>
                <input
                  readOnly
                  value={profile.city || "Mumbai"}
                  className="w-full rounded-lg border border-white/[0.07] bg-white/[0.04] px-3 py-2 text-[12.5px] text-slate-100 outline-none"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-[10.5px] font-semibold uppercase tracking-[0.07em] text-[#64748B]">Website</label>
                <input
                  readOnly
                  value={profile.website || "https://hospital.example"}
                  className="w-full rounded-lg border border-white/[0.07] bg-white/[0.04] px-3 py-2 text-[12.5px] text-slate-100 outline-none"
                />
              </div>

              <div className="flex flex-col gap-1 md:col-span-2">
                <label className="text-[10.5px] font-semibold uppercase tracking-[0.07em] text-[#64748B]">About Hospital</label>
                <textarea
                  readOnly
                  value={`${title} provides outpatient and inpatient care with modern diagnostics, specialist consultations, and emergency support.`}
                  className="min-h-[70px] w-full rounded-lg border border-white/[0.07] bg-white/[0.04] px-3 py-2 text-[12.5px] text-slate-100 outline-none"
                />
              </div>
            </div>
          </div>

          <div className="overflow-hidden rounded-[14px] border border-white/[0.07] bg-[#161f30]">
            <div className="flex items-center justify-between border-b border-white/[0.07] px-5 py-4">
              <div className="text-[13px] font-semibold text-slate-100">Department Timing</div>
              <button
                type="button"
                className="rounded-md border border-white/[0.08] bg-white/[0.04] px-3 py-1.5 text-[11px] font-medium text-[#CBD5E1] hover:bg-white/[0.08]"
              >
                Save
              </button>
            </div>
            <div className="flex flex-col gap-[10px] p-[14px_18px]">
              {[
                { day: "OPD (Mon–Sat)", time: "9:00 AM – 8:00 PM", status: "Open", tone: "green" },
                { day: "Emergency", time: "24 x 7", status: "Active", tone: "green" },
                { day: "Diagnostics", time: "7:00 AM – 10:00 PM", status: "Open", tone: "green" },
              ].map((slot, idx) => (
                <div key={slot.day}>
                  <div className="flex items-center justify-between">
                    <span className="text-[12.5px] font-medium text-slate-100">{slot.day}</span>
                    <div className="flex items-center gap-[10px]">
                      <span className="text-[12px] text-[#94A3B8]">{slot.time}</span>
                      <span
                        className={`rounded-full px-2 py-0.5 text-[10px] ${
                          slot.tone === "green"
                            ? "bg-[#22c55e]/15 text-[#22c55e]"
                            : "bg-[#f59e0b]/15 text-[#f59e0b]"
                        }`}
                      >
                        {slot.status}
                      </span>
                    </div>
                  </div>
                  {idx < 2 ? <div className="mt-[10px] h-px bg-white/[0.07]" /> : null}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
