"use client";

import { Bell, BookOpenText, Building2, CreditCard, ShieldCheck, Clock3 } from "lucide-react";
import { useMemo, useState, type ComponentType } from "react";

type PanelKey = "profile" | "certs" | "hours" | "cats" | "payment" | "notifpref";

const panelItems: { key: PanelKey; label: string; icon: ComponentType<{ className?: string }> }[] = [
  { key: "profile", label: "Lab Profile", icon: Building2 },
  { key: "certs", label: "Certifications", icon: ShieldCheck },
  { key: "hours", label: "Working Hours", icon: Clock3 },
  { key: "cats", label: "Test Categories", icon: BookOpenText },
  { key: "payment", label: "Payment Settings", icon: CreditCard },
  { key: "notifpref", label: "Notifications", icon: Bell },
];

export default function LabSettingsPage() {
  const [active, setActive] = useState<PanelKey>("profile");

  const panel = useMemo(() => {
    if (active === "profile") {
      return (
        <div className="grid gap-3 md:grid-cols-2">
          <Field label="Lab Name" value="Sharma Diagnostics" />
          <Field label="Owner Name" value="Lalit Chaudhary" />
          <Field label="Phone" value="+91 98765 43210" />
          <Field label="Email" value="opentreatment@gmail.com" />
          <Field label="City" value="Mumbai" />
          <Field label="PIN Code" value="400050" />
          <Field label="Address" value="Bandra West, Mumbai" full />
          <Field label="Website" value="https://www.opentreatment.in" full />
        </div>
      );
    }

    if (active === "certs") {
      return (
        <div className="space-y-3">
          <DocRow title="NABL Accreditation" status="Verified" tone="green" />
          <DocRow title="Lab License" status="Under Review" tone="amber" />
          <DocRow title="Registration Certificate" status="Verified" tone="green" />
        </div>
      );
    }

    if (active === "hours") {
      return (
        <div className="space-y-2.5">
          {[
            ["Mon - Sat", "7:00 AM - 9:00 PM", "Open"],
            ["Sunday", "8:00 AM - 2:00 PM", "Limited"],
            ["Home Collection", "6:30 AM - 8:30 PM", "Enabled"],
          ].map((row) => (
            <div key={row[0]} className="flex items-center justify-between rounded-lg border border-slate-200 bg-slate-100 px-3 py-2 dark:border-white/[0.07] dark:bg-white/[0.03]">
              <div>
                <div className="text-[12.5px] font-medium text-slate-900 dark:text-slate-100">{row[0]}</div>
                <div className="text-[11px] text-slate-500 dark:text-[#94A3B8]">{row[1]}</div>
              </div>
              <span className="rounded-full bg-[#22c55e]/15 px-2 py-0.5 text-[10px] text-[#22c55e]">{row[2]}</span>
            </div>
          ))}
        </div>
      );
    }

    if (active === "cats") {
      return (
        <div className="grid gap-2 md:grid-cols-2">
          {["Biochemistry", "Hematology", "Hormone", "Microbiology", "Histopathology", "Molecular"].map((cat) => (
            <div key={cat} className="rounded-lg border border-slate-200 bg-slate-100 px-3 py-2 text-[12px] text-slate-700 dark:border-white/[0.07] dark:bg-white/[0.03] dark:text-[#CBD5E1]">
              {cat}
            </div>
          ))}
        </div>
      );
    }

    if (active === "payment") {
      return (
        <div className="grid gap-3 md:grid-cols-2">
          <Field label="UPI ID" value="lab@okhdfcbank" />
          <Field label="GST Number" value="27AAASR1234A1Z5" />
          <Field label="Bank Account" value="XXXXXX2841" />
          <Field label="IFSC" value="HDFC0004123" />
        </div>
      );
    }

    return (
      <div className="space-y-2.5">
        <ToggleRow label="SMS Alerts" enabled />
        <ToggleRow label="WhatsApp Alerts" enabled />
        <ToggleRow label="Email Reports" enabled />
        <ToggleRow label="Daily Ops Summary" />
      </div>
    );
  }, [active]);

  return (
    <div className="min-h-full bg-slate-50 p-[22px_28px] dark:bg-[#0B1120]">
      <div className="mb-4">
        <h1 className="text-[16px] font-semibold tracking-[-0.02em] text-slate-900 dark:text-slate-100">Settings</h1>
        <p className="mt-1 text-[11.5px] text-slate-500 dark:text-[#94A3B8]">Lab profile and configuration</p>
      </div>

      <div className="grid gap-4 xl:grid-cols-[280px_1fr]">
        <div className="overflow-hidden rounded-[14px] border border-slate-200 bg-white dark:border-white/[0.07] dark:bg-[#161f30]">
          {panelItems.map((item) => {
            const Icon = item.icon;
            const isActive = active === item.key;
            return (
              <button
                key={item.key}
                type="button"
                onClick={() => setActive(item.key)}
                className={`flex w-full items-center gap-2.5 border-b border-slate-200 px-4 py-3 text-left text-[12.5px] transition last:border-b-0 dark:border-white/[0.07] ${
                  isActive
                    ? "bg-[#3b82f6]/10 font-medium text-[#3b82f6]"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-[#94A3B8] dark:hover:bg-white/[0.04] dark:hover:text-slate-100"
                }`}
              >
                <Icon className="h-3.5 w-3.5" />
                {item.label}
              </button>
            );
          })}
        </div>

        <div className="rounded-[14px] border border-slate-200 bg-white dark:border-white/[0.07] dark:bg-[#161f30]">
          <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3 dark:border-white/[0.07]">
            <div className="text-[12px] font-semibold text-slate-900 dark:text-slate-100">
              {panelItems.find((item) => item.key === active)?.label}
            </div>
            <div className="flex items-center gap-2">
              <button className="h-[30px] rounded-[7px] border border-slate-200 bg-slate-100 px-3 text-[11px] text-slate-700 dark:border-white/[0.08] dark:bg-white/[0.04] dark:text-[#CBD5E1]">
                Cancel
              </button>
              <button className="h-[30px] rounded-[7px] bg-[#3b82f6] px-3 text-[11px] font-medium text-white hover:bg-[#1d4ed8]">
                Save Changes
              </button>
            </div>
          </div>
          <div className="p-4">{panel}</div>
        </div>
      </div>
    </div>
  );
}

function Field({ label, value, full = false }: { label: string; value: string; full?: boolean }) {
  return (
    <div className={full ? "md:col-span-2" : ""}>
      <label className="mb-1 block text-[10.5px] font-semibold uppercase tracking-[0.08em] text-slate-500 dark:text-[#64748B]">{label}</label>
      <input
        defaultValue={value}
        className="h-[36px] w-full rounded-[8px] border border-slate-200 bg-slate-100 px-3 text-[12px] text-slate-700 outline-none dark:border-white/[0.08] dark:bg-white/[0.03] dark:text-slate-100"
      />
    </div>
  );
}

function ToggleRow({ label, enabled = false }: { label: string; enabled?: boolean }) {
  return (
    <div className="flex items-center justify-between rounded-lg border border-slate-200 bg-slate-100 px-3 py-2 dark:border-white/[0.07] dark:bg-white/[0.03]">
      <span className="text-[12.5px] text-slate-700 dark:text-[#CBD5E1]">{label}</span>
      <span className={`inline-flex h-5 w-10 items-center rounded-full px-1 transition ${enabled ? "bg-[#3b82f6]/25" : "bg-slate-300/60 dark:bg-white/[0.15]"}`}>
        <span className={`h-3.5 w-3.5 rounded-full transition ${enabled ? "translate-x-5 bg-[#3b82f6]" : "translate-x-0 bg-white"}`} />
      </span>
    </div>
  );
}

function DocRow({ title, status, tone }: { title: string; status: string; tone: "green" | "amber" }) {
  return (
    <div className="flex items-center justify-between rounded-lg border border-slate-200 bg-slate-100 px-3 py-2 dark:border-white/[0.07] dark:bg-white/[0.03]">
      <span className="text-[12.5px] text-slate-700 dark:text-[#CBD5E1]">{title}</span>
      <span className={`rounded-full px-2 py-0.5 text-[10px] ${tone === "green" ? "bg-[#22c55e]/15 text-[#22c55e]" : "bg-[#f59e0b]/15 text-[#f59e0b]"}`}>
        {status}
      </span>
    </div>
  );
}
