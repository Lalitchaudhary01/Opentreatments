import Link from "next/link";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import { authOptions } from "@/lib/auth-options";
import prisma from "@/lib/prisma";
import LabProfileLogoutButton from "./LabProfileLogoutButton";

function initials(name?: string | null) {
  if (!name?.trim()) return "LB";
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function statusClass(status: string) {
  if (status === "APPROVED") return "bg-[#14b8a6]/15 text-[#14b8a6]";
  if (status === "PENDING") return "bg-[#f59e0b]/15 text-[#f59e0b]";
  return "bg-[#ef4444]/15 text-[#ef4444]";
}

export default async function LabProfileScreen() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) redirect("/auth");
  if (session.user.role !== "LABORATORY") redirect("/auth");

  const profile = await prisma.labCompany.findUnique({
    where: { userId: session.user.id },
    select: {
      name: true,
      email: true,
      phone: true,
      registrationNumber: true,
      licenseNumber: true,
      address: true,
      city: true,
      state: true,
      country: true,
      pincode: true,
      website: true,
      description: true,
      status: true,
      homeCollection: true,
      totalBookings: true,
      totalReviews: true,
      rating: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  if (!profile) {
    return (
      <div className="rounded-[14px] border border-slate-200 bg-white p-6 dark:border-white/[0.07] dark:bg-[#161f30]">
        <p className="text-[11px] uppercase tracking-[0.1em] text-[#64748B]">Lab Profile</p>
        <h2 className="mt-2 text-xl font-semibold text-slate-900 dark:text-slate-100">Profile not submitted yet</h2>
        <p className="mt-2 text-sm text-slate-500 dark:text-[#94A3B8]">
          Complete lab onboarding to appear in admin approval queue and unlock full lab operations.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <Link
            href="/auth?mode=lab-details&role=LABORATORY"
            className="rounded-lg bg-[#3B82F6] px-4 py-2 text-sm font-medium text-white hover:bg-blue-600"
          >
            Complete Onboarding
          </Link>
          <Link
            href="/lab/overview"
            className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 dark:border-white/[0.12] dark:text-[#CBD5E1] dark:hover:bg-white/[0.05]"
          >
            Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  const title = profile.name || "Sunrise Diagnostics";
  const location = [profile.city, profile.state].filter(Boolean).join(", ") || "Mumbai, Maharashtra";
  const fullAddress =
    [profile.address, profile.city, profile.state, profile.country, profile.pincode].filter(Boolean).join(", ") ||
    "Andheri East, Mumbai, Maharashtra, India";

  return (
    <div className="min-h-full bg-slate-50 p-6 dark:bg-[#0B1120] md:p-8">
      <div className="grid items-start gap-[18px] xl:grid-cols-[260px_1fr]">
        <div className="flex flex-col gap-[14px]">
          <div className="rounded-[14px] border border-slate-200 bg-white p-[22px] text-center dark:border-white/[0.07] dark:bg-[#161f30]">
            <div className="mx-auto mb-3 flex h-[72px] w-[72px] items-center justify-center rounded-2xl bg-gradient-to-br from-[#0ea5e9] to-[#0369a1] text-[26px] font-bold text-white">
              {initials(title)}
            </div>
            <div className="text-[15px] font-bold text-slate-900 dark:text-slate-100">{title}</div>
            <div className="mt-0.5 text-[11.5px] text-[#38bdf8]">{location}</div>

            <div className="mt-2 flex justify-center gap-1.5">
              <span className="rounded-full bg-[#22c55e]/15 px-2 py-0.5 text-[10px] text-[#22c55e]">
                {profile.homeCollection ? "Home Collection" : "In-Center"}
              </span>
              <span className={`rounded-full px-2 py-0.5 text-[10px] ${statusClass(profile.status)}`}>
                {profile.status}
              </span>
            </div>

            <div className="my-[14px] h-px bg-slate-200 dark:bg-white/[0.07]" />

            <div className="flex justify-around">
              <div>
                <div className="text-[16px] font-bold text-slate-900 dark:text-slate-100">
                  {profile.rating.toFixed(1)}★
                </div>
                <div className="text-[10px] text-[#64748B]">Rating</div>
              </div>
              <div>
                <div className="text-[16px] font-bold text-slate-900 dark:text-slate-100">{profile.totalBookings}</div>
                <div className="text-[10px] text-[#64748B]">Bookings</div>
              </div>
              <div>
                <div className="text-[16px] font-bold text-slate-900 dark:text-slate-100">{profile.totalReviews}</div>
                <div className="text-[10px] text-[#64748B]">Reviews</div>
              </div>
            </div>

            <button
              type="button"
              className="mt-[14px] w-full rounded-lg border border-slate-200 bg-slate-100 py-2 text-[11px] text-slate-700 hover:bg-slate-200 dark:border-white/[0.08] dark:bg-white/[0.04] dark:text-[#CBD5E1] dark:hover:bg-white/[0.08]"
            >
              Change Logo
            </button>
            <div className="mt-2">
              <LabProfileLogoutButton />
            </div>
          </div>

          <div className="overflow-hidden rounded-[14px] border border-slate-200 bg-white dark:border-white/[0.07] dark:bg-[#161f30]">
            <div className="border-b border-slate-200 px-4 py-3 text-[12px] font-semibold text-slate-900 dark:border-white/[0.07] dark:text-slate-100">
              Compliance
            </div>
            <div className="flex flex-col gap-2 p-3">
              <div className="rounded-lg border border-slate-200 bg-slate-50 p-3 dark:border-white/[0.07] dark:bg-white/[0.02]">
                <div className="text-[10px] uppercase tracking-[0.08em] text-[#64748B]">Lab Registration</div>
                <div className="mt-1 flex items-center justify-between">
                  <div className="text-[11.5px] text-slate-900 dark:text-slate-100">
                    {profile.registrationNumber || "Not added"}
                  </div>
                  <span className="rounded-full bg-[#22c55e]/15 px-2 py-0.5 text-[9.5px] text-[#22c55e]">Valid</span>
                </div>
              </div>
              <div className="rounded-lg border border-slate-200 bg-slate-50 p-3 dark:border-white/[0.07] dark:bg-white/[0.02]">
                <div className="text-[10px] uppercase tracking-[0.08em] text-[#64748B]">License Number</div>
                <div className="mt-1 flex items-center justify-between">
                  <div className="text-[11.5px] text-slate-900 dark:text-slate-100">
                    {profile.licenseNumber || "Not added"}
                  </div>
                  <span className="rounded-full bg-[#f59e0b]/15 px-2 py-0.5 text-[9.5px] text-[#f59e0b]">Review</span>
                </div>
              </div>
              <div className="rounded-lg border border-slate-200 bg-slate-50 p-3 dark:border-white/[0.07] dark:bg-white/[0.02]">
                <div className="text-[10px] uppercase tracking-[0.08em] text-[#64748B]">Last Update</div>
                <div className="mt-1 flex items-center justify-between">
                  <div className="text-[11.5px] text-slate-900 dark:text-slate-100">
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
          <div className="overflow-hidden rounded-[14px] border border-slate-200 bg-white dark:border-white/[0.07] dark:bg-[#161f30]">
            <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4 dark:border-white/[0.07]">
              <div>
                <div className="text-[13px] font-semibold text-slate-900 dark:text-slate-100">Laboratory Information</div>
                <div className="mt-0.5 text-[11px] text-slate-500 dark:text-[#94A3B8]">
                  Pre-filled from onboarding details
                </div>
              </div>
              <button
                type="button"
                className="rounded-md bg-[#3B82F6] px-3 py-1.5 text-[11px] font-medium text-white hover:bg-blue-600"
              >
                Save Changes
              </button>
            </div>

            <div className="grid gap-3 p-[18px] md:grid-cols-2">
              {[
                { label: "Lab Name", value: title },
                { label: "Status", value: profile.status },
                { label: "Phone", value: profile.phone || "Not added" },
                { label: "Email", value: profile.email || "Not added" },
                { label: "Registration Number", value: profile.registrationNumber || "Not added" },
                { label: "PIN Code", value: profile.pincode || "Not added" },
              ].map((field) => (
                <div key={field.label} className="flex flex-col gap-1">
                  <label className="text-[10.5px] font-semibold uppercase tracking-[0.07em] text-[#64748B]">
                    {field.label}
                  </label>
                  <input
                    readOnly
                    value={field.value}
                    className="w-full rounded-lg border border-slate-200 bg-slate-100 px-3 py-2 text-[12.5px] text-slate-900 outline-none dark:border-white/[0.07] dark:bg-white/[0.04] dark:text-slate-100"
                  />
                </div>
              ))}

              <div className="flex flex-col gap-1 md:col-span-2">
                <label className="text-[10.5px] font-semibold uppercase tracking-[0.07em] text-[#64748B]">Address</label>
                <input
                  readOnly
                  value={fullAddress}
                  className="w-full rounded-lg border border-slate-200 bg-slate-100 px-3 py-2 text-[12.5px] text-slate-900 outline-none dark:border-white/[0.07] dark:bg-white/[0.04] dark:text-slate-100"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[10.5px] font-semibold uppercase tracking-[0.07em] text-[#64748B]">City</label>
                <input
                  readOnly
                  value={profile.city || "Not added"}
                  className="w-full rounded-lg border border-slate-200 bg-slate-100 px-3 py-2 text-[12.5px] text-slate-900 outline-none dark:border-white/[0.07] dark:bg-white/[0.04] dark:text-slate-100"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-[10.5px] font-semibold uppercase tracking-[0.07em] text-[#64748B]">Website</label>
                <input
                  readOnly
                  value={profile.website || "Not added"}
                  className="w-full rounded-lg border border-slate-200 bg-slate-100 px-3 py-2 text-[12.5px] text-slate-900 outline-none dark:border-white/[0.07] dark:bg-white/[0.04] dark:text-slate-100"
                />
              </div>

              <div className="flex flex-col gap-1 md:col-span-2">
                <label className="text-[10.5px] font-semibold uppercase tracking-[0.07em] text-[#64748B]">About Lab</label>
                <textarea
                  readOnly
                  value={
                    profile.description ||
                    `${title} handles pathology and diagnostic workflows with secure sample processing and report delivery.`
                  }
                  className="min-h-[70px] w-full rounded-lg border border-slate-200 bg-slate-100 px-3 py-2 text-[12.5px] text-slate-900 outline-none dark:border-white/[0.07] dark:bg-white/[0.04] dark:text-slate-100"
                />
              </div>
            </div>
          </div>

          <div className="overflow-hidden rounded-[14px] border border-slate-200 bg-white dark:border-white/[0.07] dark:bg-[#161f30]">
            <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4 dark:border-white/[0.07]">
              <div className="text-[13px] font-semibold text-slate-900 dark:text-slate-100">Operational Timings</div>
              <button
                type="button"
                className="rounded-md border border-slate-200 bg-slate-100 px-3 py-1.5 text-[11px] font-medium text-slate-700 hover:bg-slate-200 dark:border-white/[0.08] dark:bg-white/[0.04] dark:text-[#CBD5E1] dark:hover:bg-white/[0.08]"
              >
                Save
              </button>
            </div>
            <div className="flex flex-col gap-[10px] p-[14px_18px]">
              {[
                { day: "Mon–Sat", time: "7:00 AM – 9:00 PM", status: "Open", tone: "green" },
                { day: "Sunday", time: "8:00 AM – 2:00 PM", status: "Limited", tone: "amber" },
                { day: "Home Collection", time: profile.homeCollection ? "Enabled" : "Disabled", status: profile.homeCollection ? "On" : "Off", tone: profile.homeCollection ? "green" : "amber" },
              ].map((slot, idx) => (
                <div key={slot.day}>
                  <div className="flex items-center justify-between">
                    <span className="text-[12.5px] font-medium text-slate-900 dark:text-slate-100">{slot.day}</span>
                    <div className="flex items-center gap-[10px]">
                      <span className="text-[12px] text-slate-500 dark:text-[#94A3B8]">{slot.time}</span>
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
                  {idx < 2 ? <div className="mt-[10px] h-px bg-slate-200 dark:bg-white/[0.07]" /> : null}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
