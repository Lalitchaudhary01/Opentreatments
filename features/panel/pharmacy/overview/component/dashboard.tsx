import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Link from "next/link";

import prisma from "@/lib/prisma";
import { authOptions } from "@/lib/auth-options";
import PharmacyOverviewEmptyState from "./sections/PharmacyOverviewEmptyState";

function formatAmount(amount: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount || 0);
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

  const [catalogCount, lowStockCount, expiringCount, todayOrders, pendingOrders, recentOrders] = await Promise.all([
    prisma.medicine.count({ where: { pharmacyId: pharmacy.id } }),
    prisma.stockEntry.count({
      where: {
        pharmacyId: pharmacy.id,
        quantity: { lte: 20 },
      },
    }),
    prisma.stockEntry.count({
      where: {
        pharmacyId: pharmacy.id,
        expiryDate: { lte: expiryLimit },
        quantity: { gt: 0 },
      },
    }),
    prisma.order.findMany({
      where: {
        pharmacyId: pharmacy.id,
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
        pharmacyId: pharmacy.id,
        status: { in: ["PENDING", "CONFIRMED", "PACKED"] },
      },
    }),
    prisma.order.findMany({
      where: { pharmacyId: pharmacy.id },
      include: { items: { select: { quantity: true, price: true } } },
      orderBy: { createdAt: "desc" },
      take: 20,
    }),
  ]);

  const todaySales = todayOrders.reduce((sum, order) => {
    const orderTotal = order.items.reduce((acc, item) => acc + item.price * item.quantity, 0);
    return sum + orderTotal;
  }, 0);

  const firstTime = catalogCount === 0 && todayOrders.length === 0 && recentOrders.length === 0;
  if (firstTime) {
    return <PharmacyOverviewEmptyState pharmacyFirstName={pharmacy.name.split(" ")[0] || "Pharmacy"} />;
  }

  return (
    <div className="min-h-full bg-[#0B1120] px-7 py-[22px]">
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-[14px]">
          {[
            { label: "Prescriptions Queue", value: String(pendingOrders), tone: "text-[#f59e0b]" },
            { label: "Low Stock Alerts", value: String(lowStockCount), tone: "text-[#ef4444]" },
            { label: "Orders Today", value: String(todayOrders.length), tone: "text-[#14b8a6]" },
            { label: "Daily Sales", value: formatAmount(todaySales), tone: "text-[#3b82f6]" },
          ].map((card) => (
            <div key={card.label} className="rounded-[13px] border border-white/[0.07] bg-[#161f30] p-[18px]">
              <p className="text-[11px] text-[#94A3B8]">{card.label}</p>
              <p className={`mt-[6px] text-[24px] font-bold leading-none tracking-[-0.03em] ${card.tone}`}>
                {card.value}
              </p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-[1fr_320px] gap-4">
          <div className="rounded-[14px] border border-white/[0.07] bg-[#161f30] overflow-hidden">
            <div className="px-5 py-[15px] border-b border-white/[0.07] flex items-center justify-between">
              <div>
                <h2 className="text-[13px] font-semibold text-slate-100">Today&apos;s Orders</h2>
                <p className="mt-0.5 text-[11px] text-[#94A3B8]">
                  {now.toLocaleDateString("en-IN", { day: "numeric", month: "short" })} · {todayOrders.length} orders
                </p>
              </div>
              <Link href="/pharmacy/orders" className="text-[12px] font-medium text-[#3B82F6] hover:text-blue-300">
                Manage all →
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
                      const statusTone =
                        order.status === "DELIVERED"
                          ? "bg-[#14b8a6]/15 text-[#14b8a6]"
                          : order.status === "CANCELLED"
                            ? "bg-[#ef4444]/15 text-[#ef4444]"
                            : "bg-[#3b82f6]/15 text-[#3b82f6]";

                      return (
                        <tr key={order.id} className="border-b border-white/[0.07] last:border-b-0 hover:bg-white/[0.02]">
                          <td className="px-[18px] py-[11px] align-middle text-[12px] text-slate-100">#{order.id.slice(-6).toUpperCase()}</td>
                          <td className="px-[18px] py-[11px] align-middle text-[12px] text-slate-200">{order.user.name || "Customer"}</td>
                          <td className="px-[18px] py-[11px] align-middle text-[12px] text-[#94A3B8]">{totalItems}</td>
                          <td className="px-[18px] py-[11px] align-middle text-[12px] text-slate-100">{formatAmount(totalAmount)}</td>
                          <td className="px-[18px] py-[11px] align-middle">
                            <span className={`rounded-full px-2 py-1 text-[10px] font-medium ${statusTone}`}>{order.status}</span>
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
            <div className="rounded-[14px] border border-white/[0.07] bg-[#161f30] p-5">
              <div className="text-[13px] font-semibold text-slate-100">Inventory Alerts</div>
              <div className="mt-3 space-y-2">
                <div className="rounded-lg border border-[#ef4444]/30 bg-[#ef4444]/10 px-3 py-2 text-[12px] text-[#fca5a5]">
                  Low stock items: <strong>{lowStockCount}</strong>
                </div>
                <div className="rounded-lg border border-[#f59e0b]/30 bg-[#f59e0b]/10 px-3 py-2 text-[12px] text-[#fcd34d]">
                  Expiring batches (45 days): <strong>{expiringCount}</strong>
                </div>
                <div className="rounded-lg border border-[#3b82f6]/30 bg-[#3b82f6]/10 px-3 py-2 text-[12px] text-[#93c5fd]">
                  Catalog medicines: <strong>{catalogCount}</strong>
                </div>
              </div>
            </div>

            <div className="rounded-[14px] border border-white/[0.07] bg-[#161f30] p-5">
              <div className="text-[13px] font-semibold text-slate-100">Quick Actions</div>
              <div className="mt-3 grid gap-2">
                <Link href="/pharmacy/medicines/add" className="rounded-lg border border-white/[0.1] px-3 py-2 text-[12px] text-[#CBD5E1] hover:bg-white/[0.05]">
                  + Add Medicine
                </Link>
                <Link href="/pharmacy/inventory" className="rounded-lg border border-white/[0.1] px-3 py-2 text-[12px] text-[#CBD5E1] hover:bg-white/[0.05]">
                  + Add Stock Entry
                </Link>
                <Link href="/pharmacy/orders" className="rounded-lg border border-white/[0.1] px-3 py-2 text-[12px] text-[#CBD5E1] hover:bg-white/[0.05]">
                  Open Orders Board
                </Link>
                <Link href="/pharmacy/profile/view" className="rounded-lg border border-white/[0.1] px-3 py-2 text-[12px] text-[#CBD5E1] hover:bg-white/[0.05]">
                  View Store Profile
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
