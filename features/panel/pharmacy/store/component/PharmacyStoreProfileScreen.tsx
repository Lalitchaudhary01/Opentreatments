import Link from "next/link";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import prisma from "@/lib/prisma";
import { authOptions } from "@/lib/auth-options";
import StoreProfileEmptyState from "./sections/StoreProfileEmptyState";
import PharmacyLogoutButton from "./PharmacyLogoutButton";

function initials(name?: string | null) {
  if (!name?.trim()) return "SP";
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

export default async function PharmacyStoreProfileScreen() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) redirect("/auth");
  if (session.user.role !== "PHARMACY") redirect("/auth");

  const profile = await prisma.pharmacy.findUnique({
    where: { userId: session.user.id },
    select: {
      name: true,
      ownerName: true,
      email: true,
      phone: true,
      address: true,
      city: true,
      state: true,
      country: true,
      licenseNumber: true,
      gstNumber: true,
      status: true,
      createdAt: true,
    },
  });

  if (!profile) return <StoreProfileEmptyState />;

  const title = profile.name || "Sunrise Pharmacy";
  const location = [profile.city, profile.state].filter(Boolean).join(", ") || "Koregaon Park, Pune";
  const fullAddress =
    [profile.address, profile.city, profile.state, profile.country].filter(Boolean).join(", ") ||
    "Shop 4, Green Avenue, Koregaon Park, Pune 411001";

  return (
    <div className="min-h-full bg-[#0B1120] p-6 md:p-8">
      <div className="grid items-start gap-[18px] xl:grid-cols-[260px_1fr]">
        <div className="flex flex-col gap-[14px]">
          <div className="rounded-[14px] border border-white/[0.07] bg-[#161f30] p-[22px] text-center">
            <div className="mx-auto mb-3 flex h-[72px] w-[72px] items-center justify-center rounded-2xl bg-gradient-to-br from-[#059669] to-[#047857] text-[26px] font-bold text-white">
              {initials(title)}
            </div>
            <div className="text-[15px] font-bold text-slate-100">{title}</div>
            <div className="mt-0.5 text-[11.5px] text-[#34d399]">{location}</div>

            <div className="mt-2 flex justify-center gap-1.5">
              <span className="rounded-full bg-[#22c55e]/15 px-2 py-0.5 text-[10px] text-[#22c55e]">Open</span>
              <span className={`rounded-full px-2 py-0.5 text-[10px] ${statusClass(profile.status)}`}>{profile.status}</span>
            </div>

            <div className="my-[14px] h-px bg-white/[0.07]" />

            <div className="flex justify-around">
              <div>
                <div className="text-[16px] font-bold text-slate-100">4.6★</div>
                <div className="text-[10px] text-[#64748B]">Rating</div>
              </div>
              <div>
                <div className="text-[16px] font-bold text-slate-100">1.8K</div>
                <div className="text-[10px] text-[#64748B]">Customers</div>
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
              <PharmacyLogoutButton />
            </div>
          </div>

          <div className="overflow-hidden rounded-[14px] border border-white/[0.07] bg-[#161f30]">
            <div className="border-b border-white/[0.07] px-4 py-3 text-[12px] font-semibold text-slate-100">Licenses</div>
            <div className="flex flex-col gap-2 p-3">
              <div className="rounded-lg border border-white/[0.07] bg-white/[0.02] p-3">
                <div className="text-[10px] uppercase tracking-[0.08em] text-[#64748B]">Drug License</div>
                <div className="mt-1 flex items-center justify-between">
                  <div className="text-[11.5px] text-slate-100">{profile.licenseNumber || "MH-DL-2018-04421"}</div>
                  <span className="rounded-full bg-[#22c55e]/15 px-2 py-0.5 text-[9.5px] text-[#22c55e]">Valid</span>
                </div>
              </div>
              <div className="rounded-lg border border-white/[0.07] bg-white/[0.02] p-3">
                <div className="text-[10px] uppercase tracking-[0.08em] text-[#64748B]">GST</div>
                <div className="mt-1 flex items-center justify-between">
                  <div className="text-[11.5px] text-slate-100">{profile.gstNumber || "27AAASR1234A1Z5"}</div>
                  <span className="rounded-full bg-[#22c55e]/15 px-2 py-0.5 text-[9.5px] text-[#22c55e]">Valid</span>
                </div>
              </div>
              <div className="rounded-lg border border-white/[0.07] bg-white/[0.02] p-3">
                <div className="text-[10px] uppercase tracking-[0.08em] text-[#64748B]">FSSAI</div>
                <div className="mt-1 flex items-center justify-between">
                  <div className="text-[11.5px] text-slate-100">11224440000892</div>
                  <span className="rounded-full bg-[#f59e0b]/15 px-2 py-0.5 text-[9.5px] text-[#f59e0b]">Renew</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-[14px]">
          <div className="overflow-hidden rounded-[14px] border border-white/[0.07] bg-[#161f30]">
            <div className="flex items-center justify-between border-b border-white/[0.07] px-5 py-4">
              <div>
                <div className="text-[13px] font-semibold text-slate-100">Store Information</div>
                <div className="mt-0.5 text-[11px] text-[#94A3B8]">Pre-filled from registration · edit anytime</div>
              </div>
              <Link
                href="/pharmacy/profile/edit"
                className="rounded-md bg-[#3B82F6] px-3 py-1.5 text-[11px] font-medium text-white hover:bg-blue-600"
              >
                Save Changes
              </Link>
            </div>

            <div className="grid gap-3 p-[18px] md:grid-cols-2">
              {[
                { label: "Store Name", value: title },
                { label: "Owner Name", value: profile.ownerName || "Ramesh Kumar" },
                { label: "Phone", value: profile.phone || "+91 98765 43210" },
                { label: "Email", value: profile.email || "sunrise.pharmacy@gmail.com" },
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
                  value={profile.city || "Pune"}
                  className="w-full rounded-lg border border-white/[0.07] bg-white/[0.04] px-3 py-2 text-[12.5px] text-slate-100 outline-none"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-[10.5px] font-semibold uppercase tracking-[0.07em] text-[#64748B]">PIN Code</label>
                <input
                  readOnly
                  value="411001"
                  className="w-full rounded-lg border border-white/[0.07] bg-white/[0.04] px-3 py-2 text-[12.5px] text-slate-100 outline-none"
                />
              </div>

              <div className="flex flex-col gap-1 md:col-span-2">
                <label className="text-[10.5px] font-semibold uppercase tracking-[0.07em] text-[#64748B]">About Store</label>
                <textarea
                  readOnly
                  value={`${title} is a trusted retail pharmacy serving nearby areas. We provide prescription medicines, OTC products, and home delivery support.`}
                  className="min-h-[70px] w-full rounded-lg border border-white/[0.07] bg-white/[0.04] px-3 py-2 text-[12.5px] text-slate-100 outline-none"
                />
              </div>
            </div>
          </div>

          <div className="overflow-hidden rounded-[14px] border border-white/[0.07] bg-[#161f30]">
            <div className="flex items-center justify-between border-b border-white/[0.07] px-5 py-4">
              <div className="text-[13px] font-semibold text-slate-100">Operating Hours</div>
              <button
                type="button"
                className="rounded-md border border-white/[0.08] bg-white/[0.04] px-3 py-1.5 text-[11px] font-medium text-[#CBD5E1] hover:bg-white/[0.08]"
              >
                Save
              </button>
            </div>
            <div className="flex flex-col gap-[10px] p-[14px_18px]">
              {[
                { day: "Mon–Fri", time: "8:00 AM – 10:00 PM", status: "Open", tone: "green" },
                { day: "Saturday", time: "9:00 AM – 8:00 PM", status: "Open", tone: "green" },
                { day: "Sunday", time: "10:00 AM – 6:00 PM", status: "Limited", tone: "amber" },
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
