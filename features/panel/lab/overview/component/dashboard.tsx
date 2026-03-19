import Link from "next/link";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { Plus } from "lucide-react";

import { authOptions } from "@/lib/auth-options";
import prisma from "@/lib/prisma";

const recentOrders = [
  { patient: "Sunita Kapoor", test: "CBC", time: "08:40", collection: "Home", status: "Pending" },
  { patient: "Rakesh Verma", test: "Lipid Profile", time: "09:05", collection: "Walk-in", status: "Sample Collected" },
  { patient: "Anjali Shah", test: "HbA1c", time: "09:30", collection: "Home", status: "Processing" },
  { patient: "Mohit Arora", test: "LFT", time: "10:12", collection: "Walk-in", status: "Report Ready" },
  { patient: "Leela Krishnan", test: "Thyroid Panel", time: "10:42", collection: "Home", status: "Completed" },
];

function statusPill(status: string) {
  if (status === "Completed" || status === "Sample Collected") return "bg-[#22c55e]/15 text-[#22c55e]";
  if (status === "Pending") return "bg-[#f59e0b]/15 text-[#f59e0b]";
  if (status === "Processing") return "bg-[#a78bfa]/20 text-[#a78bfa]";
  if (status === "Report Ready") return "bg-[#3b82f6]/15 text-[#60a5fa]";
  return "bg-slate-200/70 text-slate-600 dark:bg-white/[0.08] dark:text-[#94A3B8]";
}

export default async function LabOverviewPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) redirect("/auth");
  if (session.user.role !== "LABORATORY") redirect("/auth");

  const lab = await prisma.labCompany.findUnique({
    where: { userId: session.user.id },
    select: {
      id: true,
      name: true,
      city: true,
      status: true,
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

  const totalOrders = Math.max(lab.totalBookings, 38);

  const kpis = [
    { label: "Tests Booked Today", value: String(totalOrders), delta: "↑12% vs yesterday", tone: "text-[#60a5fa]" },
    { label: "Samples Pending", value: "12", delta: "Awaiting collection", tone: "text-[#f59e0b]" },
    { label: "Processing", value: "18", delta: "On machines now", tone: "text-[#a78bfa]" },
    { label: "Reports Ready", value: String(Math.max(lab.reports.length, 7)), delta: "Pending delivery", tone: "text-[#22c55e]" },
    { label: "Home Collections", value: "9", delta: "Scheduled today", tone: "text-[#14b8a6]" },
    { label: "Revenue Today", value: "₹18.4k", delta: "↑8% vs yesterday", tone: "text-[#14b8a6]" },
  ];

  return (
    <div className="min-h-full bg-slate-50 p-[22px_28px] dark:bg-[#0B1120]">
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between gap-3">
          <div>
            <div className="mb-1 text-[10px] font-semibold uppercase tracking-[0.08em] text-slate-500 dark:text-[#64748B]">Dashboard Overview</div>
            <h1 className="text-[16px] font-semibold tracking-[-0.02em] text-slate-900 dark:text-slate-100">
              {lab.name} {lab.city ? `· ${lab.city}` : ""}
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <div className="rounded-[8px] border border-[#f59e0b]/30 bg-[#f59e0b]/10 px-3 py-1.5 text-[11.5px] text-[#f59e0b]">
              <strong>3 reagents</strong> critically low
            </div>
            <button className="inline-flex h-[34px] items-center gap-1 rounded-[8px] bg-[#3b82f6] px-3 text-[12px] font-medium text-white hover:bg-[#1d4ed8]">
              <Plus className="h-3.5 w-3.5" />
              New Order
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
          {kpis.map((card) => (
            <div key={card.label} className="rounded-[12px] border border-slate-200 bg-white p-4 dark:border-white/[0.07] dark:bg-[#161f30]">
              <div className="text-[11px] uppercase tracking-[0.08em] text-slate-500 dark:text-[#64748B]">{card.label}</div>
              <div className={`mt-1 text-[24px] font-semibold ${card.tone}`}>{card.value}</div>
              <div className="text-[11px] text-slate-500 dark:text-[#94A3B8]">{card.delta}</div>
            </div>
          ))}
        </div>

        <div className="grid gap-4 xl:grid-cols-[8fr_4fr]">
          <div className="overflow-hidden rounded-[14px] border border-slate-200 bg-white dark:border-white/[0.07] dark:bg-[#161f30]">
            <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3 dark:border-white/[0.07]">
              <div>
                <div className="text-[12px] font-semibold text-slate-900 dark:text-slate-100">Recent Test Orders</div>
                <div className="text-[11px] text-slate-500 dark:text-[#94A3B8]">Last 24 hours</div>
              </div>
              <Link href="/lab/orders" className="text-[11.5px] font-medium text-[#3b82f6]">View All -&gt;</Link>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[760px] text-left">
                <thead className="border-b border-slate-200 text-[10.5px] uppercase tracking-[0.08em] text-slate-500 dark:border-white/[0.07] dark:text-[#64748B]">
                  <tr>
                    <th className="px-4 py-3 font-semibold">Patient</th>
                    <th className="px-4 py-3 font-semibold">Test</th>
                    <th className="px-4 py-3 font-semibold">Time</th>
                    <th className="px-4 py-3 font-semibold">Collection</th>
                    <th className="px-4 py-3 font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map((row) => (
                    <tr key={`${row.patient}-${row.time}`} className="border-b border-slate-200/80 text-[12.5px] dark:border-white/[0.06]">
                      <td className="px-4 py-3 font-medium text-slate-900 dark:text-slate-100">{row.patient}</td>
                      <td className="px-4 py-3 text-slate-700 dark:text-[#CBD5E1]">{row.test}</td>
                      <td className="px-4 py-3 font-mono text-[11.5px] text-slate-700 dark:text-[#CBD5E1]">{row.time}</td>
                      <td className="px-4 py-3 text-slate-700 dark:text-[#CBD5E1]">{row.collection}</td>
                      <td className="px-4 py-3">
                        <span className={`rounded-full px-2 py-0.5 text-[10px] ${statusPill(row.status)}`}>{row.status}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <div className="rounded-[14px] border border-slate-200 bg-white dark:border-white/[0.07] dark:bg-[#161f30]">
              <div className="border-b border-slate-200 px-4 py-3 dark:border-white/[0.07]">
                <div className="text-[12px] font-semibold text-slate-900 dark:text-slate-100">Today&apos;s Route</div>
                <div className="text-[11px] text-slate-500 dark:text-[#94A3B8]">Priya Nair · 6 stops</div>
              </div>
              <div className="space-y-2 px-4 py-3 text-[11.5px]">
                {[
                  ["08:30", "Sunita Kapoor · Bandra", "done"],
                  ["09:00", "Rakesh Verma · Bandra E", "done"],
                  ["09:30", "Anjali Shah · Khar", "now"],
                  ["10:15", "Mohammed R. · Khar W", "todo"],
                ].map(([time, name, state]) => (
                  <div key={`${time}-${name}`} className="flex items-center gap-2">
                    <span className={`inline-flex h-5 w-5 items-center justify-center rounded-full text-[10px] ${state === "done" ? "bg-[#14b8a6]/15 text-[#14b8a6]" : state === "now" ? "bg-[#3b82f6]/15 text-[#60a5fa]" : "bg-slate-200/70 text-slate-500 dark:bg-white/[0.08] dark:text-[#64748B]"}`}>{state === "done" ? "✓" : state === "now" ? "▶" : "○"}</span>
                    <span className="font-mono text-[10.5px] text-slate-500 dark:text-[#64748B]">{time}</span>
                    <span className="text-slate-700 dark:text-[#CBD5E1]">{name}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[14px] border border-slate-200 bg-white dark:border-white/[0.07] dark:bg-[#161f30]">
              <div className="border-b border-slate-200 px-4 py-3 dark:border-white/[0.07]">
                <div className="text-[12px] font-semibold text-slate-900 dark:text-slate-100">Lab Pipeline</div>
              </div>
              <div className="space-y-2.5 px-4 py-3">
                {[
                  ["Sample Collection", 12, 38, "bg-[#f59e0b]"],
                  ["Under Testing", 18, 38, "bg-[#a78bfa]"],
                  ["Quality Check", 5, 38, "bg-[#3b82f6]"],
                  ["Reports Ready", 7, 38, "bg-[#22c55e]"],
                ].map(([label, value, total, color]) => (
                  <div key={label as string}>
                    <div className="mb-1 flex items-center justify-between text-[11px]">
                      <span className="text-slate-500 dark:text-[#94A3B8]">{label as string}</span>
                      <span className="font-semibold text-slate-900 dark:text-slate-100">{value as number}</span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-slate-200 dark:bg-white/[0.08]">
                      <div className={`${color as string} h-full`} style={{ width: `${Math.round(((value as number) / (total as number)) * 100)}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
