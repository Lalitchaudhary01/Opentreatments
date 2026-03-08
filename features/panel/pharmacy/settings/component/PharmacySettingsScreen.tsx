"use client";

import { useMemo, useState } from "react";
import {
  BellRing,
  Building2,
  CreditCard,
  Link2,
  Lock,
  Printer,
  Users,
} from "lucide-react";

type PanelKey = "store" | "staff" | "billing" | "alerts" | "licenses" | "integrations" | "printer";

const navItems: Array<{ key: PanelKey; label: string; icon: React.ComponentType<{ className?: string }> }> = [
  { key: "store", label: "Store Info", icon: Building2 },
  { key: "staff", label: "Staff & Roles", icon: Users },
  { key: "billing", label: "Billing & GST", icon: CreditCard },
  { key: "alerts", label: "Alerts", icon: BellRing },
  { key: "licenses", label: "Licenses", icon: Lock },
  { key: "integrations", label: "Integrations", icon: Link2 },
  { key: "printer", label: "Printer", icon: Printer },
];

function SectionRow({
  label,
  desc,
  control,
}: {
  label: string;
  desc: string;
  control: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-white/[0.07] px-5 py-4 last:border-b-0">
      <div>
        <div className="text-[12px] font-medium text-slate-100">{label}</div>
        <div className="mt-0.5 text-[11px] text-[#94A3B8]">{desc}</div>
      </div>
      <div className="shrink-0">{control}</div>
    </div>
  );
}

function Toggle({ enabled = false }: { enabled?: boolean }) {
  return (
    <button
      type="button"
      className={`relative h-6 w-11 rounded-full border transition ${
        enabled ? "border-[#14b8a6]/40 bg-[#14b8a6]/20" : "border-white/[0.12] bg-white/[0.05]"
      }`}
    >
      <span
        className={`absolute top-0.5 h-4.5 w-4.5 rounded-full bg-white transition ${
          enabled ? "left-[22px]" : "left-0.5"
        }`}
      />
    </button>
  );
}

export default function PharmacySettingsScreen() {
  const [active, setActive] = useState<PanelKey>("store");

  const panel = useMemo(() => {
    if (active === "store") {
      return (
        <div className="overflow-hidden rounded-[14px] border border-white/[0.07] bg-[#161f30]">
          <div className="border-b border-white/[0.07] px-5 py-4 text-[13px] font-semibold text-slate-100">Store Information</div>
          <SectionRow label="Store Name" desc="Displayed in invoices and reports" control={<input className="w-[260px] rounded-md border border-white/[0.1] bg-white/[0.04] px-3 py-2 text-xs text-slate-100" defaultValue="Sunrise Pharmacy" />} />
          <SectionRow label="Address" desc="Full store address for invoices" control={<input className="w-[260px] rounded-md border border-white/[0.1] bg-white/[0.04] px-3 py-2 text-xs text-slate-100" defaultValue="123, Koregaon Park, Pune 411001" />} />
          <SectionRow label="GST Number" desc="27AAAAA0000A1Z5" control={<input className="w-[260px] rounded-md border border-white/[0.1] bg-white/[0.04] px-3 py-2 text-xs text-slate-100" defaultValue="27AAACS1234A1Z5" />} />
          <SectionRow label="Drug License No." desc="State licensing authority number" control={<input className="w-[260px] rounded-md border border-white/[0.1] bg-white/[0.04] px-3 py-2 text-xs text-slate-100" defaultValue="MH/DL/2022/44" />} />
          <SectionRow label="Contact Phone" desc="For customer-facing communications" control={<input className="w-[260px] rounded-md border border-white/[0.1] bg-white/[0.04] px-3 py-2 text-xs text-slate-100" defaultValue="+91 20 2612 0000" />} />
          <SectionRow label="Opening Hours" desc="Used for delivery scheduling" control={<input className="w-[260px] rounded-md border border-white/[0.1] bg-white/[0.04] px-3 py-2 text-xs text-slate-100" defaultValue="08:00 – 22:00" />} />
          <div className="flex justify-end gap-2 border-t border-white/[0.07] px-5 py-4">
            <button type="button" className="rounded-md border border-white/[0.1] bg-white/[0.04] px-3 py-2 text-xs text-[#CBD5E1]">Discard</button>
            <button type="button" className="rounded-md bg-[#3B82F6] px-3 py-2 text-xs font-medium text-white">Save Changes</button>
          </div>
        </div>
      );
    }

    if (active === "staff") {
      return (
        <div className="overflow-hidden rounded-[14px] border border-white/[0.07] bg-[#161f30]">
          <div className="border-b border-white/[0.07] px-5 py-4 text-[13px] font-semibold text-slate-100">Staff & Role Management</div>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-white/[0.07] bg-[#1b263b] text-left text-[10px] font-semibold uppercase tracking-[0.07em] text-[#94A3B8]">
                  <th className="px-5 py-3">Name</th>
                  <th className="px-5 py-3">Email / Phone</th>
                  <th className="px-5 py-3">Role</th>
                  <th className="px-5 py-3">Status</th>
                  <th className="px-5 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { name: "Rahul Mehta", sub: "Owner", contact: "rahul@example.com", role: "Owner" },
                  { name: "Dr. Priya Sharma", sub: "Pharmacist", contact: "+91 98765 00001", role: "Pharmacist" },
                  { name: "Riya Kulkarni", sub: "Billing Staff", contact: "+91 98765 00002", role: "Billing" },
                ].map((row) => (
                  <tr key={row.name} className="border-b border-white/[0.07] last:border-b-0">
                    <td className="px-5 py-3">
                      <div className="text-[12px] font-medium text-slate-100">{row.name}</div>
                      <div className="text-[10px] text-[#64748B]">{row.sub}</div>
                    </td>
                    <td className="px-5 py-3 text-[12px] text-[#94A3B8]">{row.contact}</td>
                    <td className="px-5 py-3">
                      <select className="rounded-md border border-white/[0.1] bg-white/[0.04] px-2 py-1 text-[11px] text-slate-100">
                        <option>Owner</option>
                        <option>Pharmacist</option>
                        <option>Billing</option>
                      </select>
                    </td>
                    <td className="px-5 py-3"><span className="rounded-full bg-[#14b8a6]/15 px-2 py-1 text-[10px] text-[#14b8a6]">Active</span></td>
                    <td className="px-5 py-3"><button type="button" className="rounded-md border border-white/[0.1] bg-white/[0.04] px-2 py-1 text-[10px] text-[#CBD5E1]">Edit</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="border-t border-white/[0.07] px-5 py-4">
            <button type="button" className="rounded-md bg-[#3B82F6] px-3 py-2 text-xs font-medium text-white">+ Invite Staff Member</button>
          </div>
        </div>
      );
    }

    if (active === "billing") {
      return (
        <div className="overflow-hidden rounded-[14px] border border-white/[0.07] bg-[#161f30]">
          <div className="border-b border-white/[0.07] px-5 py-4 text-[13px] font-semibold text-slate-100">Billing & GST</div>
          <SectionRow label="Invoice Prefix" desc="e.g. INV- will generate INV-8823" control={<input className="w-[180px] rounded-md border border-white/[0.1] bg-white/[0.04] px-3 py-2 text-xs text-slate-100" defaultValue="INV-" />} />
          <SectionRow label="Default GST Rate" desc="Applied to medicines unless overridden" control={<select className="w-[180px] rounded-md border border-white/[0.1] bg-white/[0.04] px-3 py-2 text-xs text-slate-100"><option>5% (Standard)</option><option>12%</option><option>18%</option></select>} />
          <SectionRow label="Print Invoice on Sale" desc="Auto-print when sale is completed" control={<Toggle enabled />} />
          <SectionRow label="Credit Limit per Customer" desc="Maximum outstanding credit allowed" control={<input className="w-[180px] rounded-md border border-white/[0.1] bg-white/[0.04] px-3 py-2 text-xs text-slate-100" defaultValue="₹5,000" />} />
          <SectionRow label="Enable UPI Payments" desc="Accept UPI via payment gateway" control={<Toggle enabled />} />
          <SectionRow label="Round Off Bills" desc="Round to nearest ₹1 on invoices" control={<Toggle />} />
          <div className="flex justify-end border-t border-white/[0.07] px-5 py-4">
            <button type="button" className="rounded-md bg-[#3B82F6] px-3 py-2 text-xs font-medium text-white">Save Changes</button>
          </div>
        </div>
      );
    }

    if (active === "alerts") {
      return (
        <div className="overflow-hidden rounded-[14px] border border-white/[0.07] bg-[#161f30]">
          <div className="border-b border-white/[0.07] px-5 py-4 text-[13px] font-semibold text-slate-100">Alert Configuration</div>
          <SectionRow label="Drug Interaction Check" desc="Flag contraindications before dispensing" control={<Toggle enabled />} />
          <SectionRow label="Expiry Alert — Days Before" desc="Warn this many days before expiry date" control={<input className="w-[80px] rounded-md border border-white/[0.1] bg-white/[0.04] px-3 py-2 text-xs text-slate-100" defaultValue="30" />} />
          <SectionRow label="Low Stock Threshold" desc="Alert when stock falls below % of par level" control={<input className="w-[80px] rounded-md border border-white/[0.1] bg-white/[0.04] px-3 py-2 text-xs text-slate-100" defaultValue="25" />} />
          <SectionRow label="Cold Chain Temp Alert" desc="Alert if temperature goes outside 2–8°C" control={<Toggle enabled />} />
          <SectionRow label="Schedule H1 Compliance Alerts" desc="Block dispensing if license is expired" control={<Toggle enabled />} />
          <SectionRow label="Push Notifications" desc="Send P0 alerts to registered devices" control={<Toggle enabled />} />
          <div className="flex justify-end border-t border-white/[0.07] px-5 py-4">
            <button type="button" className="rounded-md bg-[#3B82F6] px-3 py-2 text-xs font-medium text-white">Save Changes</button>
          </div>
        </div>
      );
    }

    if (active === "licenses") {
      return (
        <div className="overflow-hidden rounded-[14px] border border-white/[0.07] bg-[#161f30]">
          <div className="border-b border-white/[0.07] px-5 py-4 text-[13px] font-semibold text-slate-100">License Management</div>
          <SectionRow label="Drug License" desc="MH/DL/2022/44 · Expires Dec 31, 2026" control={<span className="rounded-full bg-[#22c55e]/15 px-2 py-1 text-[10px] text-[#22c55e]">Valid</span>} />
          <SectionRow label="Schedule H1 License" desc="MH/DL/2022/44 · EXPIRED Mar 1, 2026 · Tramadol locked" control={<span className="rounded-full bg-[#ef4444]/15 px-2 py-1 text-[10px] text-[#ef4444]">Expired</span>} />
          <SectionRow label="Cold Chain Certification" desc="MH/CC/2023/18 · Expires Jun 30, 2026" control={<span className="rounded-full bg-[#22c55e]/15 px-2 py-1 text-[10px] text-[#22c55e]">Valid</span>} />
          <SectionRow label="GST Registration" desc="27AAACS1234A1Z5 · Annual return filed Feb 2026" control={<span className="rounded-full bg-[#22c55e]/15 px-2 py-1 text-[10px] text-[#22c55e]">Active</span>} />
          <SectionRow label="Narcotics License" desc="Not applied · Required for Schedule X medicines" control={<span className="rounded-full bg-[#f59e0b]/15 px-2 py-1 text-[10px] text-[#f59e0b]">Not Applied</span>} />
          <div className="flex gap-2 border-t border-white/[0.07] px-5 py-4">
            <button type="button" className="rounded-md border border-white/[0.1] bg-white/[0.04] px-3 py-2 text-xs text-[#CBD5E1]">+ Upload License</button>
            <button type="button" className="rounded-md bg-[#3B82F6] px-3 py-2 text-xs font-medium text-white">Renew H1 License →</button>
          </div>
        </div>
      );
    }

    if (active === "integrations") {
      return (
        <div className="overflow-hidden rounded-[14px] border border-white/[0.07] bg-[#161f30]">
          <div className="border-b border-white/[0.07] px-5 py-4 text-[13px] font-semibold text-slate-100">Integrations & Connections</div>
          <SectionRow label="Tally ERP" desc="Auto-sync bills and purchase entries" control={<span className="rounded-full bg-[#22c55e]/15 px-2 py-1 text-[10px] text-[#22c55e]">Connected</span>} />
          <SectionRow label="PharmEasy Ordering" desc="Place reorders directly via PharmEasy" control={<button type="button" className="rounded-md bg-[#3B82F6] px-3 py-1.5 text-[10px] font-medium text-white">Connect</button>} />
          <SectionRow label="Razorpay (UPI / Cards)" desc="Merchant ID: rzp_live_xxxx · ₹8.4L processed" control={<span className="rounded-full bg-[#22c55e]/15 px-2 py-1 text-[10px] text-[#22c55e]">Active</span>} />
          <SectionRow label="GST e-Filing (ClearTax)" desc="Auto-upload GSTR-1 and GSTR-3B" control={<span className="rounded-full bg-[#22c55e]/15 px-2 py-1 text-[10px] text-[#22c55e]">Connected</span>} />
          <SectionRow label="ABDM / Ayushman Bharat" desc="Health ID verification for Rx" control={<button type="button" className="rounded-md bg-[#3B82F6] px-3 py-1.5 text-[10px] font-medium text-white">Complete KYC</button>} />
        </div>
      );
    }

    return (
      <div className="overflow-hidden rounded-[14px] border border-white/[0.07] bg-[#161f30]">
        <div className="border-b border-white/[0.07] px-5 py-4 text-[13px] font-semibold text-slate-100">Printer Configuration</div>
        <SectionRow label="Invoice Printer" desc="Default printer for bill generation" control={<select className="w-[220px] rounded-md border border-white/[0.1] bg-white/[0.04] px-3 py-2 text-xs text-slate-100"><option>Epson TM-T82 (USB)</option><option>PDF Export</option></select>} />
        <SectionRow label="Paper Size" desc="Standard pharmacy bill format" control={<select className="w-[220px] rounded-md border border-white/[0.1] bg-white/[0.04] px-3 py-2 text-xs text-slate-100"><option>A4</option><option>80mm Thermal</option></select>} />
        <SectionRow label="Print Store Logo" desc="Include store logo on invoices" control={<Toggle enabled />} />
        <SectionRow label="Print Batch / Expiry on Bill" desc="Include batch number and expiry date" control={<Toggle enabled />} />
        <SectionRow label="Printer Status" desc="Epson TM-T82 · Port: USB001" control={<span className="rounded-full bg-[#22c55e]/15 px-2 py-1 text-[10px] text-[#22c55e]">Online</span>} />
        <div className="flex gap-2 border-t border-white/[0.07] px-5 py-4">
          <button type="button" className="rounded-md border border-white/[0.1] bg-white/[0.04] px-3 py-2 text-xs text-[#CBD5E1]">Test Print</button>
          <button type="button" className="rounded-md bg-[#3B82F6] px-3 py-2 text-xs font-medium text-white">Save Changes</button>
        </div>
      </div>
    );
  }, [active]);

  return (
    <div className="min-h-full bg-[#0B1120] p-6 md:p-8">
      <div className="grid items-start gap-4 xl:grid-cols-[280px_1fr]">
        <div className="sticky top-4 overflow-hidden rounded-[14px] border border-white/[0.07] bg-[#161f30]">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = item.key === active;
            return (
              <button
                key={item.key}
                type="button"
                onClick={() => setActive(item.key)}
                className={`flex w-full items-center gap-2 border-b border-white/[0.07] px-4 py-3 text-left text-[12px] transition last:border-b-0 ${
                  isActive ? "bg-[#3b82f6]/10 text-[#3b82f6] font-medium" : "text-[#94A3B8] hover:bg-white/[0.03] hover:text-slate-100"
                }`}
              >
                <Icon className="h-3.5 w-3.5" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>

        {panel}
      </div>
    </div>
  );
}
