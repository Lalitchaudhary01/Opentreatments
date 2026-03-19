import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import { authOptions } from "@/lib/auth-options";
import prisma from "@/lib/prisma";

export default async function LabOverviewPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) redirect("/auth");
  if (session.user.role !== "LABORATORY") redirect("/auth");

  const lab = await prisma.labCompany.findUnique({
    where: { userId: session.user.id },
    select: {
      id: true,
      name: true,
      status: true,
      city: true,
      totalBookings: true,
      totalReviews: true,
      rating: true,
      tests: { select: { id: true } },
      bookings: { select: { id: true } },
      reports: { select: { id: true } },
    },
  });

  if (!lab) {
    return (
      <div className="p-6 md:p-8">
        <div className="max-w-4xl rounded-2xl border border-white/[0.08] bg-[#111827] p-7">
          <p className="text-[11px] uppercase tracking-[0.12em] text-[#64748B]">Laboratory Onboarding</p>
          <h2 className="mt-2 text-2xl font-semibold text-white">Complete your profile</h2>
          <p className="mt-2 text-sm text-[#94A3B8]">
            We could not find your lab profile yet. Please complete onboarding to access all modules.
          </p>
        </div>
      </div>
    );
  }

  const cards = [
    { label: "Status", value: lab.status },
    { label: "Tests", value: String(lab.tests.length) },
    { label: "Bookings", value: String(lab.bookings.length) },
    { label: "Reports", value: String(lab.reports.length) },
    { label: "Rating", value: `${lab.rating.toFixed(1)} (${lab.totalReviews})` },
    { label: "City", value: lab.city || "Not set" },
  ];

  return (
    <div className="min-h-full bg-[#0B1120] p-[22px_28px]">
      <div className="flex flex-col gap-4">
        <div className="rounded-[14px] border border-white/[0.07] bg-[#161f30] p-6">
          <h2 className="text-[24px] font-semibold tracking-[-.02em] text-slate-100">
            Welcome, {lab.name}
          </h2>
          <p className="mt-2 text-[13px] text-[#94A3B8]">
            Your laboratory panel is ready. Track bookings, tests and reports from one place.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
          {cards.map((item) => (
            <div key={item.label} className="rounded-[12px] border border-white/[0.07] bg-[#161f30] p-4">
              <div className="text-[11px] uppercase tracking-[0.08em] text-[#64748B]">{item.label}</div>
              <div className="mt-1 text-[20px] font-semibold text-slate-100">{item.value}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
