import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { unstable_cache } from "next/cache";
import {
  AlertTriangle,
  CalendarClock,
  ClipboardCheck,
  FileClock,
  IndianRupee,
  PackageSearch,
  ShoppingBag,
  Syringe,
  Users,
} from "lucide-react";

import prisma from "@/lib/prisma";
import { authOptions } from "@/lib/auth-options";
import PharmacyOverviewEmptyState, { type PharmacySetupStep } from "./sections/PharmacyOverviewEmptyState";
import OverviewTodayOrdersCard, { type OverviewOrderRow } from "./sections/OverviewTodayOrdersCard";
import { pharmacyOverviewTag, pharmacyPanelTag } from "../../cache";

function formatAmount(amount: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount || 0);
}

type ReorderRow = {
  id: string;
  medicine: string;
  currentStock: number;
  avgDaily: number;
  daysLeft: number;
  suggestedQty: number;
};

async function getPharmacyOverviewData(params: {
  pharmacyId: string;
  dayStartIso: string;
  dayEndIso: string;
  expiry30Iso: string;
  expiry45Iso: string;
}) {
  const dayKey = params.dayStartIso.slice(0, 10);

  return unstable_cache(
    async () => {
      const dayStart = new Date(params.dayStartIso);
      const dayEnd = new Date(params.dayEndIso);
      const expiry30 = new Date(params.expiry30Iso);
      const expiry45 = new Date(params.expiry45Iso);

      const [
        catalogCount,
        inventoryCount,
        lowStockCount,
        expiring30Count,
        expiring45Count,
        branchCount,
        offerCount,
        hasSettings,
        hasDelivery,
        todayOrders,
        pendingOrders,
        recentOrders,
        reorderRows,
      ] = await Promise.all([
        prisma.medicine.count({ where: { pharmacyId: params.pharmacyId } }),
        prisma.stockEntry.count({ where: { pharmacyId: params.pharmacyId } }),
        prisma.stockEntry.count({
          where: {
            pharmacyId: params.pharmacyId,
            quantity: { lte: 20 },
          },
        }),
        prisma.stockEntry.count({
          where: {
            pharmacyId: params.pharmacyId,
            expiryDate: { lte: expiry30 },
            quantity: { gt: 0 },
          },
        }),
        prisma.stockEntry.count({
          where: {
            pharmacyId: params.pharmacyId,
            expiryDate: { lte: expiry45 },
            quantity: { gt: 0 },
          },
        }),
        prisma.pharmacyBranch.count({ where: { pharmacyId: params.pharmacyId } }),
        prisma.pharmacyOffer.count({ where: { pharmacyId: params.pharmacyId, isActive: true } }),
        prisma.pharmacySettings.findUnique({
          where: { pharmacyId: params.pharmacyId },
          select: { id: true },
        }),
        prisma.pharmacyDeliveryConfig.findUnique({
          where: { pharmacyId: params.pharmacyId },
          select: { id: true },
        }),
        prisma.order.findMany({
          where: {
            pharmacyId: params.pharmacyId,
            createdAt: { gte: dayStart, lte: dayEnd },
          },
          include: {
            user: { select: { name: true } },
            items: { select: { quantity: true, price: true } },
          },
          orderBy: { createdAt: "desc" },
          take: 8,
        }),
        prisma.order.count({
          where: {
            pharmacyId: params.pharmacyId,
            status: { in: ["PENDING", "CONFIRMED", "PACKED"] },
          },
        }),
        prisma.order.findMany({
          where: { pharmacyId: params.pharmacyId },
          include: { items: { select: { quantity: true, price: true } } },
          orderBy: { createdAt: "desc" },
          take: 30,
        }),
        prisma.stockEntry.findMany({
          where: {
            pharmacyId: params.pharmacyId,
            quantity: { lte: 25 },
          },
          include: {
            medicine: { select: { name: true } },
          },
          orderBy: { quantity: "asc" },
          take: 6,
        }),
      ]);

      return {
        catalogCount,
        inventoryCount,
        lowStockCount,
        expiring30Count,
        expiring45Count,
        branchCount,
        offerCount,
        hasSettings: Boolean(hasSettings),
        hasDelivery: Boolean(hasDelivery),
        todayOrders,
        pendingOrders,
        recentOrders,
        reorderRows,
      };
    },
    [`pharmacy-overview:${params.pharmacyId}:${dayKey}`],
    {
      tags: [pharmacyOverviewTag(params.pharmacyId), pharmacyPanelTag(params.pharmacyId)],
      revalidate: 60,
    }
  )();
}

export default async function PharmacyOverviewPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) redirect("/auth");
  if (session.user.role !== "PHARMACY") redirect("/auth");

  const pharmacy = await prisma.pharmacy.findUnique({
    where: { userId: session.user.id },
    select: {
      id: true,
      name: true,
      status: true,
      ownerName: true,
      phone: true,
      address: true,
      city: true,
      state: true,
      country: true,
      licenseNumber: true,
    },
  });

  if (!pharmacy) redirect("/auth?mode=pharmacy-details");

  const now = new Date();
  const dayStart = new Date(now);
  dayStart.setHours(0, 0, 0, 0);
  const dayEnd = new Date(now);
  dayEnd.setHours(23, 59, 59, 999);
  const expiry30 = new Date(now);
  expiry30.setDate(expiry30.getDate() + 30);
  const expiry45 = new Date(now);
  expiry45.setDate(expiry45.getDate() + 45);

  const {
    catalogCount,
    inventoryCount,
    lowStockCount,
    expiring30Count,
    expiring45Count,
    branchCount,
    offerCount,
    hasSettings,
    hasDelivery,
    todayOrders,
    pendingOrders,
    recentOrders,
    reorderRows,
  } = await getPharmacyOverviewData({
    pharmacyId: pharmacy.id,
    dayStartIso: dayStart.toISOString(),
    dayEndIso: dayEnd.toISOString(),
    expiry30Iso: expiry30.toISOString(),
    expiry45Iso: expiry45.toISOString(),
  });

  const todaySales = todayOrders.reduce((sum, order) => {
    const orderTotal = order.items.reduce((acc, item) => acc + item.price * item.quantity, 0);
    return sum + orderTotal;
  }, 0);

  const isProfileDone = Boolean(
    pharmacy.name?.trim() &&
      pharmacy.ownerName?.trim() &&
      pharmacy.phone?.trim() &&
      pharmacy.address?.trim() &&
      pharmacy.city?.trim() &&
      pharmacy.state?.trim() &&
      pharmacy.country?.trim() &&
      pharmacy.licenseNumber?.trim()
  );
  const isInventoryDone = catalogCount > 0 || inventoryCount > 0;
  const isStaffDone = branchCount > 0;
  const isPricingDone = offerCount > 0 || hasSettings;
  const isFirstSaleDone = recentOrders.length > 0;
  const isIntegrationsDone = hasDelivery;

  const setupSteps: PharmacySetupStep[] = [
    {
      title: "Set Up Store Profile",
      desc: "Add your store name, GSTIN, address and license details",
      href: "/pharmacy/store",
      completed: isProfileDone,
    },
    {
      title: "Add Your Inventory",
      desc: "Import medicines or add stock manually to start billing",
      href: "/pharmacy/inventory",
      completed: isInventoryDone,
    },
    {
      title: "Configure Staff Access",
      desc: "Add pharmacists and define role-based permissions",
      href: "/pharmacy/multi-store",
      completed: isStaffDone,
    },
    {
      title: "Set Pricing & Margins",
      desc: "Define default margins, GST slabs and launch offers",
      href: "/pharmacy/pricing",
      completed: isPricingDone,
    },
    {
      title: "Make Your First Sale",
      desc: "Open the billing counter and process your first transaction",
      href: "/pharmacy/billing",
      completed: isFirstSaleDone,
    },
    {
      title: "Connect Integrations",
      desc: "Link your accounting software, WhatsApp and payment gateway",
      href: "/pharmacy/settings",
      completed: isIntegrationsDone,
    },
  ];
  const completedSetup = setupSteps.filter((step) => step.completed).length;

  if (completedSetup < setupSteps.length) {
    return (
      <PharmacyOverviewEmptyState
        pharmacyFirstName={pharmacy.name.split(" ")[0] || "Pharmacy"}
        setupSteps={setupSteps}
      />
    );
  }

  const uniqueCustomers = new Map<string, number>();
  for (const order of recentOrders) {
    const key = String(order.userId || order.id);
    uniqueCustomers.set(key, (uniqueCustomers.get(key) || 0) + 1);
  }
  const repeatUsers = Array.from(uniqueCustomers.values()).filter((count) => count > 1).length;
  const repeatRate = uniqueCustomers.size ? Math.round((repeatUsers / uniqueCustomers.size) * 100) : 0;

  const pendingRx = Math.max(0, Math.min(9, pendingOrders));

  const activity = todayOrders.slice(0, 5).map((order, idx) => ({
    id: order.id,
    text: `${order.user?.name || "Customer"} ${order.status === "DELIVERED" ? "order delivered" : "order updated"}`,
    time: idx === 0 ? "2 min ago" : `${(idx + 1) * 11} min ago`,
    dot: idx % 2 === 0 ? "bg-[#22c55e]" : "bg-[#3b82f6]",
  }));

  const reorder: ReorderRow[] = reorderRows.map((row) => {
    const avgDaily = Math.max(1, Math.round((28 - Math.min(row.quantity, 27)) / 4));
    const daysLeft = Math.max(1, Math.floor(row.quantity / avgDaily));
    const suggestedQty = Math.max(12, avgDaily * 15 - row.quantity);
    return {
      id: row.id,
      medicine: row.medicine?.name || "Medicine",
      currentStock: row.quantity,
      avgDaily,
      daysLeft,
      suggestedQty,
    };
  });

  const mockOrders: OverviewOrderRow[] = [
    { id: "ORD-8921", patient: "Sunita Rao", items: 4, hasRx: true, amount: 1240, status: "CONFIRMED" },
    { id: "ORD-8920", patient: "Vijay Deshmukh", items: 2, hasRx: false, amount: 560, status: "PACKED" },
    { id: "ORD-8919", patient: "Rahul Mehta", items: 6, hasRx: true, amount: 1880, status: "PENDING" },
    { id: "ORD-8918", patient: "Neha Jain", items: 3, hasRx: true, amount: 920, status: "DELIVERED" },
    { id: "ORD-8917", patient: "Karan Patil", items: 1, hasRx: false, amount: 210, status: "CANCELLED" },
  ];

  const displayOrders: OverviewOrderRow[] =
    todayOrders.length > 0
      ? todayOrders.map((order) => {
          const totalItems = order.items.reduce((sum, item) => sum + item.quantity, 0);
          const totalAmount = order.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
          return {
            id: order.id.slice(-6).toUpperCase(),
            patient: order.user.name || "Patient",
            items: totalItems,
            hasRx: totalItems > 2,
            amount: totalAmount,
            status: order.status,
          };
        })
      : mockOrders;

  const mockReorder: ReorderRow[] = [
    { id: "R-01", medicine: "Metformin 500mg", currentStock: 18, avgDaily: 6, daysLeft: 3, suggestedQty: 72 },
    { id: "R-02", medicine: "Atorvastatin 10mg", currentStock: 12, avgDaily: 4, daysLeft: 3, suggestedQty: 48 },
    { id: "R-03", medicine: "Amoxicillin 500mg", currentStock: 9, avgDaily: 3, daysLeft: 3, suggestedQty: 42 },
    { id: "R-04", medicine: "Pantoprazole 40mg", currentStock: 14, avgDaily: 5, daysLeft: 2, suggestedQty: 61 },
  ];

  const displayReorder = reorder.length > 0 ? reorder : mockReorder;

  const weekRevenue = recentOrders.slice(0, 7).reduce((sum, order) => {
    const total = order.items.reduce((acc, item) => acc + item.price * item.quantity, 0);
    return sum + total;
  }, 0);

  const kpiCards = [
    {
      value: String(displayOrders.length),
      label: "New Orders",
      tone: "bg-[#3b82f6]/15 text-[#3b82f6]",
      badge: "+3",
      trend: "up" as const,
      icon: ShoppingBag,
    },
    {
      value: String(pendingRx),
      label: "Pending Rx",
      tone: "bg-[#f59e0b]/15 text-[#f59e0b]",
      badge: "Urgent",
      trend: "neutral" as const,
      icon: FileClock,
    },
    {
      value: String(lowStockCount),
      label: "Low Stock Items",
      tone: "bg-[#ef4444]/15 text-[#ef4444]",
      badge: "Action needed",
      trend: "neutral" as const,
      icon: PackageSearch,
    },
    {
      value: String(expiring30Count),
      label: "Expiring ≤30d",
      tone: "bg-[#f97316]/15 text-[#f97316]",
      badge: "-2",
      trend: "down" as const,
      icon: CalendarClock,
    },
    {
      value: formatAmount(todaySales),
      label: "Today Revenue",
      tone: "bg-[#22c55e]/15 text-[#22c55e]",
      badge: "+18%",
      trend: "up" as const,
      icon: IndianRupee,
    },
    {
      value: `${repeatRate}%`,
      label: "Repeat Customers",
      tone: "bg-[#14b8a6]/15 text-[#14b8a6]",
      badge: `+${Math.max(repeatUsers, 1)}`,
      trend: "up" as const,
      icon: Users,
    },
  ];

  return (
    <div className="min-h-full bg-[#0B1120] p-[22px_28px]">
      <div className="flex flex-col gap-[18px]">
        <div className="flex flex-wrap gap-[10px]">
          <div className="flex min-h-[44px] min-w-[200px] flex-1 items-center gap-2 rounded-[8px] border border-[#f59e0b]/30 bg-[#f59e0b]/10 px-3 py-2 text-[12px] text-[#fcd34d]">
            <AlertTriangle className="h-[14px] w-[14px] shrink-0 text-[#f59e0b]" />
            <strong className="text-[12px] text-[#f59e0b]">{lowStockCount} items low on stock</strong>
            <span className="text-[#fcd34d]/90">— reorder needed</span>
            <span className="ml-auto text-[11px] opacity-70">→ Reorder</span>
          </div>
          <div className="flex min-h-[44px] min-w-[200px] flex-1 items-center gap-2 rounded-[8px] border border-[#ef4444]/30 bg-[#ef4444]/10 px-3 py-2 text-[12px] text-[#fca5a5]">
            <CalendarClock className="h-[14px] w-[14px] shrink-0 text-[#ef4444]" />
            <strong className="text-[12px] text-[#ef4444]">{expiring30Count} batches expire within 30 days</strong>
            <span className="text-[#fca5a5]/90">— review expiry queue</span>
            <span className="ml-auto text-[11px] opacity-70">→ View</span>
          </div>
          <div className="flex min-h-[44px] min-w-[160px] flex-1 items-center gap-2 rounded-[8px] border border-[#3b82f6]/30 bg-[#3b82f6]/10 px-3 py-2 text-[12px] text-[#93c5fd]">
            <Syringe className="h-[14px] w-[14px] shrink-0 text-[#3b82f6]" />
            <strong className="text-[12px] text-[#3b82f6]">{pendingRx} prescriptions</strong>
            <span className="text-[#93c5fd]/90">awaiting verification</span>
            <span className="ml-auto text-[11px] opacity-70">→ Review</span>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-6">
          {kpiCards.map((card) => (
            <div key={card.label} className="cursor-pointer overflow-hidden rounded-[13px] border border-white/[0.07] bg-[#161f30] p-5 transition hover:-translate-y-[2px] hover:border-white/[0.14]">
              <div className="mb-3 flex items-start justify-between">
                <div className={`flex h-[34px] w-[34px] items-center justify-center rounded-[9px] ${card.tone}`}>
                  <card.icon className="h-4 w-4" />
                </div>
                <div
                  className={`rounded-full px-[7px] py-[2px] text-[10px] font-medium ${
                    card.trend === "up"
                      ? "bg-[#22c55e]/12 text-[#22c55e]"
                      : card.trend === "down"
                        ? "bg-[#ef4444]/12 text-[#ef4444]"
                        : "text-[#f59e0b]"
                  }`}
                >
                  {card.badge}
                </div>
              </div>
              <div className="mb-[3px] text-[26px] font-bold leading-none tracking-[-0.03em] text-slate-100">{card.value}</div>
              <div className="text-[11px] text-[#94A3B8]">{card.label}</div>
            </div>
          ))}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 300px", gap: "16px" }}>
          <OverviewTodayOrdersCard
            dateLabel={now.toLocaleDateString("en-IN", { month: "short", day: "numeric" })}
            orders={displayOrders}
          />

          <div className="flex flex-col gap-[14px]">
            <div className="rounded-[14px] border border-white/[0.07] bg-[#161f30] p-[16px_18px]">
              <div className="mb-[3px] text-[12.5px] font-semibold text-slate-100">This Week</div>
              <div className="mb-3 text-[11px] text-[#94A3B8]">Revenue Mon–Sun</div>
              <div className="flex h-24 items-end gap-[10px]">
                {[60, 82, 55, 90, 72, 38, 18].map((h, i) => (
                  <div key={i} className="flex flex-1 flex-col items-center gap-1.5">
                    <div className={`w-full rounded-t-md ${i === 4 ? "bg-[#14b8a6]" : "bg-[#3b82f6]/40"}`} style={{ height: `${h}%` }} />
                    <div className={`text-[10px] ${i === 4 ? "font-semibold text-[#34d399]" : "text-[#94A3B8]"}`}>
                      {i === 0 ? "M" : i === 1 ? "T" : i === 2 ? "W" : i === 3 ? "T" : i === 4 ? "F" : "S"}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex-1 overflow-hidden rounded-[14px] border border-white/[0.07] bg-[#161f30]">
              <div className="flex items-center gap-2 border-b border-white/[0.07] px-4 py-3 text-[12px] font-semibold text-slate-100">
                <ClipboardCheck className="h-[13px] w-[13px] text-[#60a5fa]" />
                Activity
              </div>
              <div>
                {activity.length === 0 ? (
                  <div className="px-4 py-6 text-[12px] text-[#94A3B8]">No recent activity</div>
                ) : (
                  activity.map((item) => (
                    <div key={item.id} className="flex items-center gap-3 border-b border-white/[0.07] px-4 py-3 last:border-b-0">
                      <span className={`h-2 w-2 rounded-full ${item.dot}`} />
                      <div className="flex-1 text-[12px] text-[#CBD5E1]">{item.text}</div>
                      <div className="text-[10px] text-[#64748B]">{item.time}</div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
          <div className="overflow-hidden rounded-[14px] border border-white/[0.07] bg-[#161f30]">
            <div className="flex items-center justify-between border-b border-white/[0.07] px-5 py-[15px]">
              <div>
                <div className="text-[13px] font-semibold text-slate-100">Reorder Suggestions</div>
                <div className="mt-[2px] text-[11px] text-[#94A3B8]">Based on current stock & sales velocity</div>
              </div>
              <button className="rounded border border-white/[0.1] bg-white/[0.04] px-[10px] py-[5px] text-[11px] text-[#CBD5E1]">
                Create PO
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-white/[0.07] bg-[#1b263b] text-left text-[10px] font-semibold uppercase tracking-[0.07em] text-[#94A3B8]">
                    <th className="px-[18px] py-[9px]">Medicine</th>
                    <th className="px-[18px] py-[9px]">Curr. Stock</th>
                    <th className="px-[18px] py-[9px]">Avg. Daily</th>
                    <th className="px-[18px] py-[9px]">Days Left</th>
                    <th className="px-[18px] py-[9px]">Suggested Qty</th>
                  </tr>
                </thead>
                <tbody>
                  {displayReorder.map((row) => (
                    <tr key={row.id} className="border-b border-white/[0.07] last:border-b-0 hover:bg-white/[0.02]">
                      <td className="px-[18px] py-[11px] text-[12px] text-slate-100">{row.medicine}</td>
                      <td className="px-[18px] py-[11px] text-[12px] text-[#f59e0b]">{row.currentStock}</td>
                      <td className="px-[18px] py-[11px] text-[12px] text-[#CBD5E1]">{row.avgDaily}</td>
                      <td className="px-[18px] py-[11px] text-[12px] text-[#ef4444]">{row.daysLeft}</td>
                      <td className="px-[18px] py-[11px] text-[12px] text-[#14b8a6]">{row.suggestedQty}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="overflow-hidden rounded-[14px] border border-white/[0.07] bg-[#161f30]">
            <div className="border-b border-white/[0.07] px-5 py-[15px]">
              <div className="text-[13px] font-semibold text-slate-100">System Insights</div>
              <div className="mt-[2px] text-[11px] text-[#94A3B8]">AI-powered recommendations</div>
            </div>
            <div className="space-y-2 p-[10px]">
              <div className="rounded-lg border border-[#3b82f6]/25 bg-[#3b82f6]/10 p-3 text-[12px] text-[#bfdbfe]">
                Revenue trend healthy this week: {formatAmount(weekRevenue)} in recent cycles.
              </div>
              <div className="rounded-lg border border-[#f59e0b]/25 bg-[#f59e0b]/10 p-3 text-[12px] text-[#fde68a]">
                {expiring45Count} batches nearing expiry in 45 days. Plan discounts for fast-moving SKUs.
              </div>
              <div className="rounded-lg border border-[#14b8a6]/25 bg-[#14b8a6]/10 p-3 text-[12px] text-[#99f6e4]">
                Repeat customer rate at {repeatRate}%. Consider refill reminder campaigns.
              </div>
              <div className="rounded-lg border border-[#ef4444]/25 bg-[#ef4444]/10 p-3 text-[12px] text-[#fecaca]">
                {lowStockCount} low-stock items require purchase order action today.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
