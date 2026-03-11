import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { unstable_cache } from "next/cache";

import prisma from "@/lib/prisma";
import { authOptions } from "@/lib/auth-options";
import PharmacyOverviewEmptyState from "./sections/PharmacyOverviewEmptyState";
import { pharmacyOverviewTag, pharmacyPanelTag } from "../../cache";

function formatAmount(amount: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount || 0);
}

function orderStatusTone(status: string) {
  if (status === "DELIVERED") return "bg-[#22c55e]/15 text-[#22c55e]";
  if (status === "CANCELLED") return "bg-[#ef4444]/15 text-[#ef4444]";
  if (status === "PACKED") return "bg-[#14b8a6]/15 text-[#14b8a6]";
  if (status === "CONFIRMED") return "bg-[#3b82f6]/15 text-[#3b82f6]";
  return "bg-[#f59e0b]/15 text-[#f59e0b]";
}

async function getPharmacyOverviewData(params: {
  pharmacyId: string;
  dayStartIso: string;
  dayEndIso: string;
  expiryLimitIso: string;
}) {
  const dayKey = params.dayStartIso.slice(0, 10);

  return unstable_cache(
    async () => {
      const dayStart = new Date(params.dayStartIso);
      const dayEnd = new Date(params.dayEndIso);
      const expiryLimit = new Date(params.expiryLimitIso);

      const [catalogCount, lowStockCount, expiringCount, todayOrders, pendingOrders, recentOrders] = await Promise.all([
        prisma.medicine.count({ where: { pharmacyId: params.pharmacyId } }),
        prisma.stockEntry.count({
          where: {
            pharmacyId: params.pharmacyId,
            quantity: { lte: 20 },
          },
        }),
        prisma.stockEntry.count({
          where: {
            pharmacyId: params.pharmacyId,
            expiryDate: { lte: expiryLimit },
            quantity: { gt: 0 },
          },
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
          take: 20,
        }),
      ]);

      return {
        catalogCount,
        lowStockCount,
        expiringCount,
        todayOrders,
        pendingOrders,
        recentOrders,
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
    select: { id: true, name: true, status: true },
  });

  if (!pharmacy) redirect("/auth?mode=pharmacy-details");

  const now = new Date();
  const dayStart = new Date(now);
  dayStart.setHours(0, 0, 0, 0);
  const dayEnd = new Date(now);
  dayEnd.setHours(23, 59, 59, 999);
  const expiryLimit = new Date(now);
  expiryLimit.setDate(expiryLimit.getDate() + 45);

  const { catalogCount, lowStockCount, expiringCount, todayOrders, pendingOrders, recentOrders } =
    await getPharmacyOverviewData({
      pharmacyId: pharmacy.id,
      dayStartIso: dayStart.toISOString(),
      dayEndIso: dayEnd.toISOString(),
      expiryLimitIso: expiryLimit.toISOString(),
    });

  const todaySales = todayOrders.reduce((sum, order) => {
    const orderTotal = order.items.reduce((acc, item) => acc + item.price * item.quantity, 0);
    return sum + orderTotal;
  }, 0);

  const deliveredToday = todayOrders.filter((order) => order.status === "DELIVERED").length;
  const cancelledToday = todayOrders.filter((order) => order.status === "CANCELLED").length;

  const firstTime = catalogCount === 0 && todayOrders.length === 0 && recentOrders.length === 0;
  if (firstTime) {
    return <PharmacyOverviewEmptyState pharmacyFirstName={pharmacy.name.split(" ")[0] || "Pharmacy"} />;
  }

  const weekRevenue = recentOrders.slice(0, 7).reduce((sum, order) => {
    const total = order.items.reduce((acc, item) => acc + item.price * item.quantity, 0);
    return sum + total;
  }, 0);

  return (
    <div className="min-h-full bg-[#0B1120] p-6 md:p-8">
      <div className="space-y-4">
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-5">
          {[
            ["Orders Today", String(todayOrders.length), "text-slate-100", "Live order volume"],
            ["Pending Queue", String(pendingOrders), "text-[#f59e0b]", "Needs action"],
            ["Delivered Today", String(deliveredToday), "text-[#22c55e]", "Successfully fulfilled"],
            ["Daily Sales", formatAmount(todaySales), "text-[#3b82f6]", "Gross billed today"],
            ["Low Stock", String(lowStockCount), "text-[#ef4444]", "Batches <= 20 units"],
          ].map(([label, value, tone, sub]) => (
            <div key={label} className="rounded-[13px] border border-white/[0.07] bg-[#161f30] p-4">
              <div className="text-[11px] text-[#94A3B8]">{label}</div>
              <div className={`mt-1 text-[22px] font-bold ${tone}`}>{value}</div>
              <div className="text-[10px] text-[#64748B]">{sub}</div>
            </div>
          ))}
        </div>

        <div className="grid gap-4 xl:grid-cols-[1.25fr_0.75fr]">
          <div className="overflow-hidden rounded-[14px] border border-white/[0.07] bg-[#161f30]">
            <div className="flex items-center justify-between border-b border-white/[0.07] px-5 py-[15px]">
              <div>
                <h2 className="text-[13px] font-semibold text-slate-100">Today&apos;s Orders</h2>
                <p className="mt-0.5 text-[11px] text-[#94A3B8]">
                  {now.toLocaleDateString("en-IN", { day: "numeric", month: "short" })} · {todayOrders.length} orders
                </p>
              </div>
              <Link href="/pharmacy/orders" className="text-[12px] font-medium text-[#3B82F6] hover:text-blue-300">
                Open board →
              </Link>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-white/[0.07] bg-[#1b263b] text-left text-[10px] font-semibold uppercase tracking-[0.07em] text-[#94A3B8]">
                    <th className="px-[18px] py-[9px]">Order</th>
                    <th className="px-[18px] py-[9px]">Customer</th>
                    <th className="px-[18px] py-[9px]">Items</th>
                    <th className="px-[18px] py-[9px]">Amount</th>
                    <th className="px-[18px] py-[9px]">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {todayOrders.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="px-[18px] py-14 text-center text-[12.5px] text-[#94A3B8]">
                        No orders today
                      </td>
                    </tr>
                  ) : (
                    todayOrders.map((order) => {
                      const totalItems = order.items.reduce((sum, item) => sum + item.quantity, 0);
                      const totalAmount = order.items.reduce((sum, item) => sum + item.price * item.quantity, 0);

                      return (
                        <tr key={order.id} className="border-b border-white/[0.07] last:border-b-0 hover:bg-white/[0.02]">
                          <td className="px-[18px] py-[11px] text-[12px] text-slate-100">#{order.id.slice(-6).toUpperCase()}</td>
                          <td className="px-[18px] py-[11px] text-[12px] text-slate-200">{order.user.name || "Customer"}</td>
                          <td className="px-[18px] py-[11px] text-[12px] text-[#94A3B8]">{totalItems}</td>
                          <td className="px-[18px] py-[11px] text-[12px] text-slate-100">{formatAmount(totalAmount)}</td>
                          <td className="px-[18px] py-[11px]">
                            <span className={`rounded-full px-2 py-1 text-[10px] font-medium ${orderStatusTone(order.status)}`}>
                              {order.status}
                            </span>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>

          <div className="space-y-4">
            <div className="overflow-hidden rounded-[14px] border border-white/[0.07] bg-[#161f30]">
              <div className="border-b border-white/[0.07] px-4 py-3 text-[12px] font-semibold text-slate-100">Operations Snapshot</div>
              <div className="space-y-3 p-4 text-xs">
                {[
                  ["Order fulfilment", todayOrders.length === 0 ? 0 : Math.round((deliveredToday / todayOrders.length) * 100), "#14b8a6"],
                  ["Cancellation risk", todayOrders.length === 0 ? 0 : Math.round((cancelledToday / todayOrders.length) * 100), "#ef4444"],
                  ["Inventory health", Math.max(0, 100 - lowStockCount * 7), "#3b82f6"],
                ].map(([label, value, color]) => (
                  <div key={label as string}>
                    <div className="mb-1 flex items-center justify-between text-[#CBD5E1]">
                      <span>{label as string}</span>
                      <span>{value as number}%</span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-white/[0.08]">
                      <div className="h-full rounded-full" style={{ width: `${value as number}%`, background: color as string }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="overflow-hidden rounded-[14px] border border-white/[0.07] bg-[#161f30]">
              <div className="border-b border-white/[0.07] px-4 py-3 text-[12px] font-semibold text-slate-100">Inventory Alerts</div>
              <div className="space-y-2 p-4 text-xs">
                <div className="rounded-lg border border-[#ef4444]/30 bg-[#ef4444]/10 px-3 py-2 text-[#fca5a5]">
                  Low stock items: <strong>{lowStockCount}</strong>
                </div>
                <div className="rounded-lg border border-[#f59e0b]/30 bg-[#f59e0b]/10 px-3 py-2 text-[#fcd34d]">
                  Expiring in 45 days: <strong>{expiringCount}</strong>
                </div>
                <div className="rounded-lg border border-[#3b82f6]/30 bg-[#3b82f6]/10 px-3 py-2 text-[#93c5fd]">
                  Active catalog: <strong>{catalogCount}</strong>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-4 xl:grid-cols-[1fr_340px]">
          <div className="overflow-hidden rounded-[14px] border border-white/[0.07] bg-[#161f30]">
            <div className="flex items-center justify-between border-b border-white/[0.07] px-5 py-[15px]">
              <div>
                <h2 className="text-[13px] font-semibold text-slate-100">Weekly Revenue Snapshot</h2>
                <p className="mt-0.5 text-[11px] text-[#94A3B8]">Based on latest 7 orders</p>
              </div>
              <div className="text-[12px] font-semibold text-[#14b8a6]">{formatAmount(weekRevenue)}</div>
            </div>
            <div className="grid grid-cols-1 gap-3 p-4 md:grid-cols-3">
              <div className="rounded-lg border border-white/[0.07] bg-white/[0.02] p-3">
                <div className="text-[10px] uppercase tracking-[0.07em] text-[#64748B]">Avg Order Value</div>
                <div className="mt-1 text-lg font-semibold text-slate-100">
                  {formatAmount(todayOrders.length ? Math.round(todaySales / todayOrders.length) : 0)}
                </div>
              </div>
              <div className="rounded-lg border border-white/[0.07] bg-white/[0.02] p-3">
                <div className="text-[10px] uppercase tracking-[0.07em] text-[#64748B]">Pending to Process</div>
                <div className="mt-1 text-lg font-semibold text-[#f59e0b]">{pendingOrders}</div>
              </div>
              <div className="rounded-lg border border-white/[0.07] bg-white/[0.02] p-3">
                <div className="text-[10px] uppercase tracking-[0.07em] text-[#64748B]">Store Status</div>
                <div className="mt-1 text-lg font-semibold text-slate-100">{pharmacy.status}</div>
              </div>
            </div>
          </div>

          <div className="overflow-hidden rounded-[14px] border border-white/[0.07] bg-[#161f30]">
            <div className="border-b border-white/[0.07] px-4 py-3 text-[12px] font-semibold text-slate-100">Quick Actions</div>
            <div className="grid gap-2 p-4">
              <Link href="/pharmacy/orders" className="rounded-lg border border-white/[0.1] bg-white/[0.04] px-3 py-2 text-[12px] text-[#CBD5E1] hover:bg-white/[0.06]">
                Open orders board
              </Link>
              <Link href="/pharmacy/inventory" className="rounded-lg border border-white/[0.1] bg-white/[0.04] px-3 py-2 text-[12px] text-[#CBD5E1] hover:bg-white/[0.06]">
                Add stock entry
              </Link>
              <Link href="/pharmacy/catalog" className="rounded-lg border border-white/[0.1] bg-white/[0.04] px-3 py-2 text-[12px] text-[#CBD5E1] hover:bg-white/[0.06]">
                Manage catalog
              </Link>
              <Link href="/pharmacy/settings" className="rounded-lg border border-white/[0.1] bg-white/[0.04] px-3 py-2 text-[12px] text-[#CBD5E1] hover:bg-white/[0.06]">
                Configure payouts
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
