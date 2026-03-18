import { BellRing, Building2, ShieldCheck, SlidersHorizontal, UserRoundCog } from "lucide-react";

const nav = [
  ["General", Building2],
  ["Notifications", BellRing],
  ["Team & Roles", UserRoundCog],
  ["Security", ShieldCheck],
  ["Billing Preferences", SlidersHorizontal],
] as const;

const rows = [
  ["Hospital Name", "Manage display and legal name", "St. Mary's General Hospital"],
  ["Support Email", "Primary contact for communication", "admin@stmarys.com"],
  ["Appointment Alerts", "Get instant alert on emergency bookings", "enabled"],
  ["Insurance Claim Alerts", "Notify when claim is pending > 48h", "enabled"],
  ["Two-factor Auth", "Required for admin actions", "enabled"],
] as const;

export default function HospitalSettingsScreen() {
  return (
    <div className="px-6 py-5">
      <div className="grid gap-4 xl:grid-cols-[200px_1fr]">
        <aside className="sticky top-0 h-fit overflow-hidden rounded-[14px] border border-slate-200 dark:border-white/[0.07] bg-white dark:bg-[#161f30]">
          {nav.map(([label, Icon], idx) => (
            <button
              key={label}
              className={`flex w-full items-center gap-2 border-b border-slate-200 dark:border-white/[0.07] px-4 py-3 text-left text-[12.5px] transition last:border-b-0 ${
                idx === 0
                  ? 'bg-[rgba(59,130,246,.1)] text-[#60a5fa] font-medium'
                  : 'text-slate-500 dark:text-[#94a3b8] hover:bg-white/[0.03] hover:text-slate-900 dark:hover:text-[#e2e8f0]'
              }`}
            >
              <Icon className="h-3.5 w-3.5" />
              {label}
            </button>
          ))}
        </aside>

        <section className="overflow-hidden rounded-[14px] border border-slate-200 dark:border-white/[0.07] bg-white dark:bg-[#161f30]">
          <div className="border-b border-slate-200 dark:border-white/[0.07] px-5 py-4">
            <h2 className="text-[13px] font-semibold text-slate-900 dark:text-[#f1f5f9]">General Settings</h2>
            <p className="mt-0.5 text-[11px] text-slate-500 dark:text-[#94a3b8]">Control hospital preferences and operational defaults</p>
          </div>

          <div>
            {rows.map(([title, sub, value], idx) => (
              <div key={title} className={`flex flex-wrap items-center justify-between gap-3 px-5 py-4 ${idx !== rows.length - 1 ? 'border-b border-slate-200 dark:border-white/[0.07]' : ''}`}>
                <div>
                  <h3 className="text-[13px] font-medium text-slate-900 dark:text-[#f1f5f9]">{title}</h3>
                  <p className="mt-1 text-[11.5px] text-[#475569]">{sub}</p>
                </div>

                {value === "enabled" ? (
                  <span className="rounded-full bg-[rgba(20,184,166,.12)] px-3 py-1 text-[11px] font-medium text-[#2dd4bf]">Enabled</span>
                ) : (
                  <input
                    defaultValue={value}
                    className="h-8 min-w-[220px] rounded-lg border border-slate-200 dark:border-white/[0.08] bg-slate-100 dark:bg-white/[0.04] px-3 text-[12px] text-slate-900 dark:text-[#e2e8f0] outline-none focus:border-[#3b82f6]/40"
                  />
                )}
              </div>
            ))}
          </div>

          <div className="flex items-center justify-end gap-2 border-t border-slate-200 dark:border-white/[0.07] px-5 py-3">
            <button className="rounded border border-slate-200 dark:border-white/[0.08] bg-slate-100 dark:bg-white/[0.04] px-3 py-1.5 text-[11px] text-slate-500 dark:text-[#94a3b8] hover:bg-slate-200 dark:hover:bg-white/[0.08]">Cancel</button>
            <button className="rounded bg-[#3b82f6] px-3 py-1.5 text-[11px] font-medium text-white hover:bg-[#1d4ed8]">Save Changes</button>
          </div>
        </section>
      </div>
    </div>
  );
}
