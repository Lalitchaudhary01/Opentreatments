"use client";

import { ReactNode, useMemo, useState } from "react";
import { Bell, Monitor, Smartphone } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  user: {
    name?: string | null;
    email?: string | null;
    role?: string | null;
  };
};

type SettingsTab = "notifications" | "security" | "payment" | "datetime";

type ToggleItem = {
  label: string;
  desc: string;
  on: boolean;
};

const tabs: { id: SettingsTab; label: string }[] = [
  { id: "notifications", label: "Notifications" },
  { id: "security", label: "Security" },
  { id: "payment", label: "Payment & Billing" },
  { id: "datetime", label: "Date & Time" },
];

const initialNotifs = {
  appts: [
    { label: "New Booking", desc: "When a patient books an appointment", on: true },
    { label: "Cancellation", desc: "When a patient cancels", on: true },
    { label: "Appointment Reminder", desc: "1 hour before each appointment", on: false },
    { label: "Reschedule Request", desc: "When a patient requests rescheduling", on: true },
  ] as ToggleItem[],
  rev: [
    { label: "Payment Received", desc: "When a payment is confirmed", on: true },
    { label: "Weekly Summary", desc: "Revenue summary every Monday", on: true },
    { label: "Payout Processed", desc: "When earnings are transferred", on: true },
  ] as ToggleItem[],
  sys: [
    { label: "Product Updates", desc: "New features and improvements", on: false },
    { label: "Security Alerts", desc: "Login from new device or location", on: true },
    { label: "Review Received", desc: "When a patient leaves a review", on: true },
  ] as ToggleItem[],
  wa: [
    { label: "New Appointment Booked", desc: "Instant alert when a patient books", on: true },
    { label: "Appointment Cancellation", desc: "Alert when a patient cancels or no-shows", on: true },
    { label: "Payment Confirmed", desc: "When a payment clears successfully", on: true },
    { label: "Daily Summary (9 AM)", desc: "Overview of the day's schedule each morning", on: false },
    { label: "New Patient Review", desc: "When a patient posts a review on the app", on: false },
    { label: "Low Slot Alert", desc: "When fewer than 2 slots remain for the day", on: true },
  ] as ToggleItem[],
};

export default function DoctorSettingsScreen({ user }: Props) {
  const [tab, setTab] = useState<SettingsTab>("notifications");
  const [waEnabled, setWaEnabled] = useState(true);
  const [waPhone, setWaPhone] = useState("+91 98765 43210");
  const [twoFactor, setTwoFactor] = useState(false);
  const [timeFormat, setTimeFormat] = useState<"12h" | "24h">("12h");
  const [weekStart, setWeekStart] = useState<"Sunday" | "Monday">("Sunday");
  const [notif, setNotif] = useState(initialNotifs);

  const initials = useMemo(
    () => (user.name || "Dr").split(" ").map((x) => x[0]).join("").slice(0, 2).toUpperCase(),
    [user.name]
  );

  const toggleNotif = (group: keyof typeof notif, idx: number) => {
    setNotif((prev) => ({
      ...prev,
      [group]: prev[group].map((n, i) => (i === idx ? { ...n, on: !n.on } : n)),
    }));
  };

  return (
    <div className="min-h-screen bg-[#111827] px-7 py-[22px]">
      <div className="w-full space-y-5 pb-8">
        <div className="mb-5 flex gap-0 border-b border-white/[0.07]" id="stg-tabs">
          {tabs.map((t) => {
            const active = tab === t.id;
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => setTab(t.id)}
                className={cn(
                  "border-b-2 px-4 py-[10px] text-[12.5px] font-medium transition-colors",
                  active ? "border-blue-500 text-blue-400" : "border-transparent text-[#94A3B8]"
                )}
              >
                {t.label}
              </button>
            );
          })}
        </div>

        {tab === "notifications" ? (
          <div className="flex flex-col gap-[14px]" id="stg-notifications">
            <section className="overflow-hidden rounded-[14px] border border-[#25d366]/25 bg-[#161f30]">
              <div className="flex items-center justify-between gap-3 border-b border-white/[0.07] bg-[#25d366]/10 px-5 py-[15px]">
                <div className="flex items-center gap-[10px]">
                  <div className="flex h-[34px] w-[34px] items-center justify-center rounded-[9px] bg-[#25d366] text-white">
                    <Bell className="h-[18px] w-[18px]" />
                  </div>
                  <div>
                    <div className="text-[13px] font-semibold text-[#F1F5F9]">WhatsApp Notifications</div>
                    <div className="mt-[2px] text-[11px] text-[#94A3B8]">Send real-time alerts to your WhatsApp number</div>
                  </div>
                </div>
                <Switch checked={waEnabled} onToggle={() => setWaEnabled((v) => !v)} color="#25d366" />
              </div>

              <div style={{ opacity: waEnabled ? 1 : 0.45, pointerEvents: waEnabled ? "auto" : "none" }}>
                <div className="flex items-center gap-[10px] border-b border-white/[0.07] px-5 py-[14px]">
                  <div className="flex h-[34px] w-[34px] shrink-0 items-center justify-center rounded-lg bg-[#25d366]/10 text-[#25d366]">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3-8.59A2 2 0 0 1 3.62 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.29 6.29l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <div className="mb-[5px] text-[12px] font-medium text-[#F1F5F9]">WhatsApp Number</div>
                    <div className="flex gap-2">
                      <input
                        value={waPhone}
                        onChange={(e) => setWaPhone(e.target.value)}
                        className="h-[34px] flex-1 rounded-lg border border-white/[0.07] bg-white/5 px-[11px] text-[12.5px] text-[#F1F5F9] outline-none"
                      />
                      <button
                        type="button"
                        className="h-[34px] whitespace-nowrap rounded-lg border border-[#25d366]/30 bg-white/[0.06] px-[13px] text-[11.5px] font-medium text-[#25d366]"
                      >
                        Verify →
                      </button>
                    </div>
                  </div>
                  <span className="whitespace-nowrap rounded-[10px] bg-[#25d366]/15 px-[9px] py-[3px] text-[10px] font-semibold text-[#25d366]">
                    ✓ Verified
                  </span>
                </div>

                <div className="py-1" id="notif-wa">
                  {notif.wa.map((n, i) => (
                    <NotifRow key={n.label} item={n} onToggle={() => toggleNotif("wa", i)} color="#25d366" />
                  ))}
                </div>

                <div className="flex items-center gap-[7px] border-t border-white/[0.07] px-5 py-3 text-[11px] text-[#475569]">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="8" x2="12" y2="12" />
                    <line x1="12" y1="16" x2="12.01" y2="16" />
                  </svg>
                  Messages sent via WhatsApp Business API. Standard data rates may apply. You can opt out anytime.
                </div>
              </div>
            </section>

            <SettingsCard title="Appointment Alerts" subtitle="Notify when bookings change">
              <div className="py-1" id="notif-appts">
                {notif.appts.map((n, i) => (
                  <NotifRow key={n.label} item={n} onToggle={() => toggleNotif("appts", i)} />
                ))}
              </div>
            </SettingsCard>

            <SettingsCard title="Revenue & Payments" subtitle="Payment confirmations and summaries">
              <div className="py-1" id="notif-rev">
                {notif.rev.map((n, i) => (
                  <NotifRow key={n.label} item={n} onToggle={() => toggleNotif("rev", i)} />
                ))}
              </div>
            </SettingsCard>

            <SettingsCard title="System & Marketing">
              <div className="py-1" id="notif-sys">
                {notif.sys.map((n, i) => (
                  <NotifRow key={n.label} item={n} onToggle={() => toggleNotif("sys", i)} />
                ))}
              </div>
            </SettingsCard>
          </div>
        ) : null}

        {tab === "security" ? (
          <div className="flex flex-col gap-[14px]" id="stg-security">
            <SettingsCard title="Change Password" subtitle="Last changed 3 months ago">
              <div className="flex max-w-[440px] flex-col gap-3 px-5 py-5">
                <Field label="Current Password" type="password" placeholder="••••••••" />
                <Field label="New Password" type="password" placeholder="Min 8 characters" />
                <Field label="Confirm Password" type="password" placeholder="Repeat new password" />
                <button type="button" className="inline-flex h-[34px] w-fit items-center rounded-lg bg-[#3b82f6] px-[13px] text-[12px] font-medium text-white hover:bg-[#2563eb]">Update Password</button>
              </div>
            </SettingsCard>

            <SettingsCard title="Two-Factor Authentication" subtitle="Extra layer of security for your account">
              <div className="flex items-center justify-between px-5 py-4">
                <div className="max-w-[320px] text-[12.5px] text-[#94A3B8]">
                  Use Google Authenticator or Authy to generate time-based login codes.
                </div>
                <Switch checked={twoFactor} onToggle={() => setTwoFactor((v) => !v)} />
              </div>
            </SettingsCard>

            <SettingsCard title="Active Sessions" subtitle="Devices currently logged in">
              <div>
                <div className="flex items-center justify-between border-b border-white/[0.07] px-5 py-[13px]">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-[9px] bg-blue-500/15 text-blue-400"><Monitor className="h-4 w-4" /></div>
                    <div>
                      <div className="text-[12.5px] font-medium text-[#F1F5F9]">Chrome · MacOS</div>
                      <div className="text-[10.5px] text-[#475569]">Pune · Active now</div>
                    </div>
                  </div>
                  <span className="rounded-[10px] bg-green-500/15 px-[9px] py-[2px] text-[10px] text-green-400">This Device</span>
                </div>

                <div className="flex items-center justify-between px-5 py-[13px]">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-[9px] bg-violet-500/15 text-violet-300"><Smartphone className="h-4 w-4" /></div>
                    <div>
                      <div className="text-[12.5px] font-medium text-[#F1F5F9]">Safari · iPhone</div>
                      <div className="text-[10.5px] text-[#475569]">Pune · 2 hours ago</div>
                    </div>
                  </div>
                  <button type="button" className="rounded-lg border border-red-500/20 bg-white/[0.06] px-[10px] py-1 text-[11px] text-red-400">Revoke</button>
                </div>
              </div>
            </SettingsCard>
          </div>
        ) : null}

        {tab === "payment" ? (
          <div className="flex flex-col gap-[14px]" id="stg-payment">
            <SettingsCard title="Payout Account" subtitle="Where your earnings are transferred">
              <div className="flex max-w-[480px] flex-col gap-3 px-5 py-5">
                <Field label="Account Holder Name" defaultValue={user.name || "Dr. Ramesh Iyer"} />
                <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                  <Field label="Bank Name" defaultValue="HDFC Bank" />
                  <Field label="Account Number" type="password" defaultValue="••••••••4821" />
                </div>
                <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                  <Field label="IFSC Code" defaultValue="HDFC0001234" />
                  <SelectField label="Account Type" options={["Savings", "Current"]} />
                </div>
                <button type="button" className="inline-flex h-[34px] w-fit items-center rounded-lg bg-[#3b82f6] px-[13px] text-[12px] font-medium text-white hover:bg-[#2563eb]">Save Details</button>
              </div>
            </SettingsCard>

            <SettingsCard title="Platform Plan" subtitle="OpenTreatment pricing">
              <div className="flex flex-col gap-3 px-5 py-5">
                <div className="flex items-center justify-between rounded-[11px] border border-blue-500/20 bg-blue-500/10 px-[18px] py-4">
                  <div>
                    <div className="text-[14px] font-bold text-[#F1F5F9]">Pro Plan</div>
                    <div className="mt-[3px] text-[11.5px] text-[#94A3B8]">Unlimited appointments · Analytics · Priority support</div>
                  </div>
                  <div className="text-right">
                    <div className="text-[18px] font-bold text-blue-400">10%</div>
                    <div className="text-[10px] text-[#475569]">Commission</div>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-[10px] md:grid-cols-2">
                  <StatBox label="Processing Fee" value="2.9% + ₹3" />
                  <StatBox label="Payout Cycle" value="Every Monday" />
                </div>
              </div>
            </SettingsCard>

            <SettingsCard title="GST Details" subtitle="For tax invoices and compliance">
              <div className="grid max-w-[520px] grid-cols-1 gap-[14px] px-5 py-5 md:grid-cols-2">
                <Field label="GST Number" defaultValue="27AAAAI1234Q1Z5" />
                <SelectField label="Business Type" options={["Individual / Proprietor", "Partnership", "Private Limited"]} />
                <div className="md:col-span-2">
                  <Field label="Business Address" defaultValue="Sunrise Clinic, Koregaon Park, Pune, MH 411001" />
                </div>
                <button type="button" className="inline-flex h-[34px] w-fit items-center rounded-lg bg-[#3b82f6] px-[13px] text-[12px] font-medium text-white hover:bg-[#2563eb]">Save</button>
              </div>
            </SettingsCard>
          </div>
        ) : null}

        {tab === "datetime" ? (
          <div className="flex flex-col gap-[14px]" id="stg-datetime">
            <SettingsCard title="Date & Time Preferences">
              <div className="flex max-w-[520px] flex-col gap-[18px] px-5 py-5">
                <PrefRow
                  title="Timezone"
                  sub="All times displayed in this zone"
                  control={
                    <select className="h-[34px] rounded-lg border border-white/[0.07] bg-[#1c2840] px-[10px] text-[12px] text-[#F1F5F9] outline-none">
                      <option>Asia/Kolkata (IST +5:30)</option>
                      <option>UTC</option>
                      <option>Asia/Dubai (+4:00)</option>
                    </select>
                  }
                />

                <PrefRow
                  title="Date Format"
                  control={
                    <select className="h-[34px] rounded-lg border border-white/[0.07] bg-[#1c2840] px-[10px] text-[12px] text-[#F1F5F9] outline-none">
                      <option>DD/MM/YYYY</option>
                      <option>MM/DD/YYYY</option>
                      <option>YYYY-MM-DD</option>
                    </select>
                  }
                />

                <PrefRow
                  title="Time Format"
                  control={
                    <div className="flex gap-[6px]">
                      <ToggleChip active={timeFormat === "12h"} onClick={() => setTimeFormat("12h")} label="12h" />
                      <ToggleChip active={timeFormat === "24h"} onClick={() => setTimeFormat("24h")} label="24h" />
                    </div>
                  }
                />

                <PrefRow
                  title="Week Starts On"
                  control={
                    <div className="flex gap-[6px]">
                      <ToggleChip active={weekStart === "Sunday"} onClick={() => setWeekStart("Sunday")} label="Sunday" compact />
                      <ToggleChip active={weekStart === "Monday"} onClick={() => setWeekStart("Monday")} label="Monday" compact />
                    </div>
                  }
                />

                <PrefRow
                  title="Language"
                  control={
                    <select className="h-[34px] rounded-lg border border-white/[0.07] bg-[#1c2840] px-[10px] text-[12px] text-[#F1F5F9] outline-none">
                      <option>English (India)</option>
                      <option>हिन्दी</option>
                      <option>मराठी</option>
                    </select>
                  }
                />

                <button type="button" className="inline-flex h-[34px] w-fit items-center rounded-lg bg-[#3b82f6] px-[13px] text-[12px] font-medium text-white hover:bg-[#2563eb]">Save Preferences</button>
              </div>
            </SettingsCard>
          </div>
        ) : null}

        <div className="text-[11px] text-[#475569]">
          {user.email || "doctor@opentreatment.in"} · {user.role || "DOCTOR"} · {initials}
        </div>
      </div>
    </div>
  );
}

function SettingsCard({ title, subtitle, children }: { title: string; subtitle?: string; children: ReactNode }) {
  return (
    <section className="overflow-hidden rounded-[14px] border border-white/[0.07] bg-[#161f30]">
      <div className="flex items-center justify-between border-b border-white/[0.07] px-5 py-[15px]">
        <div>
          <div className="text-[13px] font-semibold text-[#F1F5F9]">{title}</div>
          {subtitle ? <div className="mt-[2px] text-[11px] text-[#94A3B8]">{subtitle}</div> : null}
        </div>
      </div>
      {children}
    </section>
  );
}

function NotifRow({
  item,
  onToggle,
  color = "#3b82f6",
}: {
  item: ToggleItem;
  onToggle: () => void;
  color?: string;
}) {
  return (
    <div className="flex items-center justify-between gap-3 border-b border-white/[0.07] px-5 py-[10px] last:border-b-0">
      <div>
        <div className="text-[12.5px] font-medium text-[#F1F5F9]">{item.label}</div>
        <div className="mt-[2px] text-[11px] text-[#475569]">{item.desc}</div>
      </div>
      <Switch checked={item.on} onToggle={onToggle} color={color} />
    </div>
  );
}

function Switch({ checked, onToggle, color = "#3b82f6" }: { checked: boolean; onToggle: () => void; color?: string }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className="relative h-[23px] w-[42px] rounded-[12px] transition-colors"
      style={{ background: checked ? color : "rgba(255,255,255,0.1)" }}
    >
      <span
        className="absolute top-[3px] h-[17px] w-[17px] rounded-full bg-white shadow"
        style={{ left: checked ? "22px" : "3px", transition: "left .2s" }}
      />
    </button>
  );
}

function Field({
  label,
  type = "text",
  placeholder,
  defaultValue,
}: {
  label: string;
  type?: string;
  placeholder?: string;
  defaultValue?: string;
}) {
  return (
    <label className="space-y-[6px]">
      <span className="text-[11px] text-[#94A3B8]">{label}</span>
      <input
        type={type}
        placeholder={placeholder}
        defaultValue={defaultValue}
        className="h-[36px] w-full rounded-lg border border-white/[0.07] bg-[#1c2840] px-[11px] text-[12.5px] text-[#F1F5F9] outline-none"
      />
    </label>
  );
}

function SelectField({ label, options }: { label: string; options: string[] }) {
  return (
    <label className="space-y-[6px]">
      <span className="text-[11px] text-[#94A3B8]">{label}</span>
      <select className="h-[36px] w-full rounded-lg border border-white/[0.07] bg-[#1c2840] px-[11px] text-[12.5px] text-[#F1F5F9] outline-none">
        {options.map((o) => (
          <option key={o}>{o}</option>
        ))}
      </select>
    </label>
  );
}

function StatBox({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[9px] border border-white/[0.07] bg-white/[0.03] px-[14px] py-3">
      <div className="text-[11px] text-[#475569]">{label}</div>
      <div className="mt-[3px] text-[14px] font-semibold text-[#F1F5F9]">{value}</div>
    </div>
  );
}

function PrefRow({ title, sub, control }: { title: string; sub?: string; control: ReactNode }) {
  return (
    <div className="flex items-center justify-between border-b border-white/[0.07] pb-[18px] last:border-b-0 last:pb-0">
      <div>
        <div className="text-[12.5px] font-medium text-[#F1F5F9]">{title}</div>
        {sub ? <div className="mt-[2px] text-[11px] text-[#475569]">{sub}</div> : null}
      </div>
      <div>{control}</div>
    </div>
  );
}

function ToggleChip({
  label,
  active,
  onClick,
  compact,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
  compact?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "rounded-lg border px-[14px] py-[6px] text-[12px] font-medium",
        compact && "px-3",
        active
          ? "border-blue-500/30 bg-blue-500/15 text-blue-400"
          : "border-white/[0.07] bg-transparent text-[#94A3B8]"
      )}
    >
      {label}
    </button>
  );
}
