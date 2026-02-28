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
  id: string;
  label: string;
  desc: string;
  on: boolean;
};

const tabList: { id: SettingsTab; label: string }[] = [
  { id: "notifications", label: "Notifications" },
  { id: "security", label: "Security" },
  { id: "payment", label: "Payment & Billing" },
  { id: "datetime", label: "Date & Time" },
];

const initialNotif = {
  wa: [
    { id: "wa_booking", label: "New Booking", desc: "Instant alert for each confirmed appointment", on: true },
    { id: "wa_cancel", label: "Cancellation", desc: "Patient cancel or doctor-side cancellation", on: true },
    { id: "wa_reminder", label: "Daily Summary", desc: "Morning overview of your schedule", on: true },
  ] as ToggleItem[],
  appts: [
    { id: "appt_new", label: "New Appointments", desc: "When a slot is booked", on: true },
    { id: "appt_res", label: "Rescheduled", desc: "When date/time is changed", on: true },
    { id: "appt_no_show", label: "No-show Alert", desc: "Patient did not arrive", on: false },
  ] as ToggleItem[],
  rev: [
    { id: "rev_paid", label: "Payment Received", desc: "Instant payment confirmation", on: true },
    { id: "rev_payout", label: "Payout Completed", desc: "Settlement transferred", on: true },
  ] as ToggleItem[],
  sys: [
    { id: "sys_alert", label: "System Alerts", desc: "Critical account and access alerts", on: true },
    { id: "sys_marketing", label: "Marketing Updates", desc: "Feature launches and offers", on: false },
  ] as ToggleItem[],
};

function NotificationRow({
  item,
  onToggle,
}: {
  item: ToggleItem;
  onToggle: () => void;
}) {
  return (
    <div className="flex items-center justify-between gap-3 px-4 py-3 border-b border-slate-200 dark:border-white/10 last:border-b-0">
      <div>
        <p className="text-sm font-medium text-slate-800 dark:text-slate-200">{item.label}</p>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{item.desc}</p>
      </div>
      <Toggle checked={item.on} onToggle={onToggle} />
    </div>
  );
}

function Toggle({ checked, onToggle }: { checked: boolean; onToggle: () => void }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className={cn(
        "relative h-6 w-11 rounded-full transition-colors",
        checked ? "bg-blue-600" : "bg-slate-300 dark:bg-slate-600"
      )}
    >
      <span
        className={cn(
          "absolute top-1/2 -translate-y-1/2 h-4 w-4 rounded-full bg-white transition-transform",
          checked ? "translate-x-6" : "translate-x-1"
        )}
      />
    </button>
  );
}

function Card({ title, subtitle, children }: { title: string; subtitle?: string; children: ReactNode }) {
  return (
    <section className="rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#161f30] overflow-hidden">
      <div className="px-5 py-4 border-b border-slate-200 dark:border-white/10">
        <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">{title}</h3>
        {subtitle ? <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{subtitle}</p> : null}
      </div>
      {children}
    </section>
  );
}

export default function DoctorSettingsScreen({ user }: Props) {
  const [tab, setTab] = useState<SettingsTab>("notifications");
  const [waMaster, setWaMaster] = useState(true);
  const [waPhone, setWaPhone] = useState("+91 98765 43210");
  const [timeFormat, setTimeFormat] = useState<"12h" | "24h">("12h");
  const [weekStart, setWeekStart] = useState<"Sunday" | "Monday">("Sunday");
  const [notif, setNotif] = useState(initialNotif);
  const [twoFactor, setTwoFactor] = useState(false);

  const initials = useMemo(() => (user.name || "Doctor").slice(0, 1).toUpperCase(), [user.name]);

  const toggleInGroup = (group: keyof typeof notif, id: string) => {
    setNotif((prev) => ({
      ...prev,
      [group]: prev[group].map((item) =>
        item.id === id ? { ...item, on: !item.on } : item
      ),
    }));
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#111827] p-6">
      <div className="max-w-[1164px] mx-auto space-y-5 pb-8">
        <section className="rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#161f30] px-5 py-4 flex items-center justify-between gap-3 flex-wrap">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center font-semibold">
              {initials}
            </div>
            <div>
              <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Settings</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Preferences and account configuration
              </p>
            </div>
          </div>

          <div className="text-xs text-slate-500 dark:text-slate-400">
            {user.name || "Doctor"} · {user.email || "No email"} · {user.role || "DOCTOR"}
          </div>
        </section>

        <div className="border-b border-slate-200 dark:border-white/10 flex items-center overflow-x-auto">
          {tabList.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setTab(item.id)}
              className={cn(
                "px-4 py-2.5 text-sm whitespace-nowrap border-b-2 -mb-px transition-colors",
                tab === item.id
                  ? "border-blue-500 text-blue-500"
                  : "border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200"
              )}
            >
              {item.label}
            </button>
          ))}
        </div>

        {tab === "notifications" ? (
          <div className="space-y-4">
            <section className="rounded-2xl border border-green-500/25 bg-white dark:bg-[#161f30] overflow-hidden">
              <div className="px-5 py-4 border-b border-slate-200 dark:border-white/10 bg-green-500/10 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-[#25d366] text-white flex items-center justify-center">
                    <Bell className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">WhatsApp Notifications</h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Send real-time alerts to your WhatsApp number</p>
                  </div>
                </div>
                <Toggle checked={waMaster} onToggle={() => setWaMaster((v) => !v)} />
              </div>

              <div className="px-5 py-3 border-b border-slate-200 dark:border-white/10 flex items-center gap-2.5">
                <input
                  value={waPhone}
                  onChange={(e) => setWaPhone(e.target.value)}
                  className="flex-1 h-9 px-3 rounded-lg text-sm bg-slate-50 dark:bg-[#111827] border border-slate-200 dark:border-white/10"
                />
                <button type="button" className="h-9 px-3 rounded-lg border border-green-500/30 text-green-500 text-xs">
                  Verify
                </button>
                <span className="px-2 py-1 rounded-full text-[10px] bg-green-500/15 text-green-500">Verified</span>
              </div>

              <div className={cn(!waMaster && "opacity-60 pointer-events-none") }>
                {notif.wa.map((item) => (
                  <NotificationRow
                    key={item.id}
                    item={item}
                    onToggle={() => toggleInGroup("wa", item.id)}
                  />
                ))}
              </div>
            </section>

            <Card title="Appointment Alerts" subtitle="Notify when bookings change">
              {notif.appts.map((item) => (
                <NotificationRow
                  key={item.id}
                  item={item}
                  onToggle={() => toggleInGroup("appts", item.id)}
                />
              ))}
            </Card>

            <Card title="Revenue & Payments" subtitle="Payment confirmations and summaries">
              {notif.rev.map((item) => (
                <NotificationRow
                  key={item.id}
                  item={item}
                  onToggle={() => toggleInGroup("rev", item.id)}
                />
              ))}
            </Card>

            <Card title="System & Marketing">
              {notif.sys.map((item) => (
                <NotificationRow
                  key={item.id}
                  item={item}
                  onToggle={() => toggleInGroup("sys", item.id)}
                />
              ))}
            </Card>
          </div>
        ) : null}

        {tab === "security" ? (
          <div className="space-y-4">
            <Card title="Change Password" subtitle="Last changed 3 months ago">
              <div className="p-5 max-w-[460px] space-y-3">
                <InputField label="Current Password" type="password" placeholder="••••••••" />
                <InputField label="New Password" type="password" placeholder="Min 8 characters" />
                <InputField label="Confirm Password" type="password" placeholder="Repeat new password" />
                <button type="button" className="h-9 px-4 rounded-lg text-sm bg-blue-600 text-white hover:bg-blue-500">
                  Update Password
                </button>
              </div>
            </Card>

            <Card title="Two-Factor Authentication" subtitle="Extra layer of security for your account">
              <div className="p-5 flex items-center justify-between gap-3">
                <p className="text-sm text-slate-500 dark:text-slate-400 max-w-[520px]">
                  Use Google Authenticator or Authy to generate time-based login codes.
                </p>
                <Toggle checked={twoFactor} onToggle={() => setTwoFactor((v) => !v)} />
              </div>
            </Card>

            <Card title="Active Sessions" subtitle="Devices currently logged in">
              <div className="p-4 space-y-2.5">
                <SessionRow
                  icon={<Monitor className="w-4 h-4" />}
                  title="Chrome · MacOS"
                  subtitle="Pune · Active now"
                  right={<span className="px-2 py-1 rounded-full text-[10px] bg-green-500/15 text-green-500">This Device</span>}
                />
                <SessionRow
                  icon={<Smartphone className="w-4 h-4" />}
                  title="Safari · iPhone"
                  subtitle="Pune · 2 hours ago"
                  right={<button type="button" className="h-7 px-2.5 rounded-md text-xs border border-red-500/20 text-red-500">Revoke</button>}
                />
              </div>
            </Card>
          </div>
        ) : null}

        {tab === "payment" ? (
          <div className="space-y-4">
            <Card title="Payout Account" subtitle="Where your earnings are transferred">
              <div className="p-5 max-w-[560px] space-y-3">
                <InputField label="Account Holder Name" defaultValue={user.name || "Doctor"} />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <InputField label="Bank Name" defaultValue="HDFC Bank" />
                  <InputField label="Account Number" type="password" defaultValue="••••••••4821" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <InputField label="IFSC Code" defaultValue="HDFC0001234" />
                  <SelectField label="Account Type" options={["Savings", "Current"]} />
                </div>
                <button type="button" className="h-9 px-4 rounded-lg text-sm bg-blue-600 text-white hover:bg-blue-500">
                  Save Details
                </button>
              </div>
            </Card>

            <Card title="Platform Plan" subtitle="OpenTreatment pricing">
              <div className="p-5 space-y-3">
                <div className="rounded-xl border border-blue-500/30 bg-blue-500/10 px-4 py-3 flex items-center justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">Pro Plan</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Unlimited appointments · Analytics · Priority support</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-bold text-blue-500">10%</p>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400">Commission</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <InfoStat label="Processing Fee" value="2.9% + Rs 3" />
                  <InfoStat label="Payout Cycle" value="Every Monday" />
                </div>
              </div>
            </Card>

            <Card title="GST Details" subtitle="For tax invoices and compliance">
              <div className="p-5 max-w-[580px] space-y-3">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <InputField label="GST Number" defaultValue="27AAAAI1234Q1Z5" />
                  <SelectField label="Business Type" options={["Individual / Proprietor", "Partnership", "Private Limited"]} />
                </div>
                <InputField label="Business Address" defaultValue="Sunrise Clinic, Koregaon Park, Pune, MH 411001" />
                <button type="button" className="h-9 px-4 rounded-lg text-sm bg-blue-600 text-white hover:bg-blue-500">
                  Save
                </button>
              </div>
            </Card>
          </div>
        ) : null}

        {tab === "datetime" ? (
          <Card title="Date & Time Preferences">
            <div className="p-5 max-w-[620px] space-y-4">
              <PreferenceRow label="Timezone" hint="All times displayed in this zone">
                <select className="h-9 px-3 rounded-lg text-sm bg-slate-50 dark:bg-[#111827] border border-slate-200 dark:border-white/10">
                  <option>Asia/Kolkata (IST +5:30)</option>
                  <option>UTC</option>
                  <option>Asia/Dubai (+4:00)</option>
                </select>
              </PreferenceRow>

              <PreferenceRow label="Date Format">
                <select className="h-9 px-3 rounded-lg text-sm bg-slate-50 dark:bg-[#111827] border border-slate-200 dark:border-white/10">
                  <option>DD/MM/YYYY</option>
                  <option>MM/DD/YYYY</option>
                  <option>YYYY-MM-DD</option>
                </select>
              </PreferenceRow>

              <PreferenceRow label="Time Format">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setTimeFormat("12h")}
                    className={cn(
                      "h-9 px-3 rounded-lg text-sm border",
                      timeFormat === "12h"
                        ? "bg-blue-500/15 border-blue-500/40 text-blue-500"
                        : "border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-300"
                    )}
                  >
                    12h
                  </button>
                  <button
                    type="button"
                    onClick={() => setTimeFormat("24h")}
                    className={cn(
                      "h-9 px-3 rounded-lg text-sm border",
                      timeFormat === "24h"
                        ? "bg-blue-500/15 border-blue-500/40 text-blue-500"
                        : "border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-300"
                    )}
                  >
                    24h
                  </button>
                </div>
              </PreferenceRow>

              <PreferenceRow label="Week Starts On">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setWeekStart("Sunday")}
                    className={cn(
                      "h-9 px-3 rounded-lg text-sm border",
                      weekStart === "Sunday"
                        ? "bg-blue-500/15 border-blue-500/40 text-blue-500"
                        : "border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-300"
                    )}
                  >
                    Sunday
                  </button>
                  <button
                    type="button"
                    onClick={() => setWeekStart("Monday")}
                    className={cn(
                      "h-9 px-3 rounded-lg text-sm border",
                      weekStart === "Monday"
                        ? "bg-blue-500/15 border-blue-500/40 text-blue-500"
                        : "border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-300"
                    )}
                  >
                    Monday
                  </button>
                </div>
              </PreferenceRow>

              <PreferenceRow label="Language">
                <select className="h-9 px-3 rounded-lg text-sm bg-slate-50 dark:bg-[#111827] border border-slate-200 dark:border-white/10">
                  <option>English (India)</option>
                  <option>Hindi</option>
                  <option>Marathi</option>
                </select>
              </PreferenceRow>

              <button type="button" className="h-9 px-4 rounded-lg text-sm bg-blue-600 text-white hover:bg-blue-500">
                Save Preferences
              </button>
            </div>
          </Card>
        ) : null}
      </div>
    </div>
  );
}

function InputField({
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
    <label className="block space-y-1.5">
      <span className="text-xs text-slate-500 dark:text-slate-400">{label}</span>
      <input
        type={type}
        placeholder={placeholder}
        defaultValue={defaultValue}
        className="w-full h-10 px-3 rounded-lg text-sm bg-slate-50 dark:bg-[#111827] border border-slate-200 dark:border-white/10"
      />
    </label>
  );
}

function SelectField({ label, options }: { label: string; options: string[] }) {
  return (
    <label className="block space-y-1.5">
      <span className="text-xs text-slate-500 dark:text-slate-400">{label}</span>
      <select className="w-full h-10 px-3 rounded-lg text-sm bg-slate-50 dark:bg-[#111827] border border-slate-200 dark:border-white/10">
        {options.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>
    </label>
  );
}

function SessionRow({
  icon,
  title,
  subtitle,
  right,
}: {
  icon: ReactNode;
  title: string;
  subtitle: string;
  right: ReactNode;
}) {
  return (
    <div className="rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-[#1b263b] px-3.5 py-3 flex items-center justify-between gap-3">
      <div className="flex items-center gap-3">
        <span className="w-8 h-8 rounded-lg bg-blue-500/15 text-blue-400 flex items-center justify-center">{icon}</span>
        <div>
          <p className="text-sm font-medium text-slate-800 dark:text-slate-200">{title}</p>
          <p className="text-xs text-slate-500 dark:text-slate-400">{subtitle}</p>
        </div>
      </div>
      {right}
    </div>
  );
}

function InfoStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-[#1b263b] px-3.5 py-3">
      <p className="text-xs text-slate-500 dark:text-slate-400">{label}</p>
      <p className="text-sm font-semibold text-slate-800 dark:text-slate-200 mt-1">{value}</p>
    </div>
  );
}

function PreferenceRow({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: ReactNode;
}) {
  return (
    <div className="flex items-center justify-between gap-3 pb-4 border-b border-slate-200 dark:border-white/10 last:border-b-0 last:pb-0">
      <div>
        <p className="text-sm font-medium text-slate-800 dark:text-slate-200">{label}</p>
        {hint ? <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{hint}</p> : null}
      </div>
      <div>{children}</div>
    </div>
  );
}
