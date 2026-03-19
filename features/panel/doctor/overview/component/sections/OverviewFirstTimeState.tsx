import Link from "next/link";
import { Users } from "lucide-react";

function ChecklistRow({
  href,
  label,
  sub,
  cta,
  done = false,
}: {
  href: string;
  label: string;
  sub: string;
  cta: string;
  done?: boolean;
}) {
  return (
    <Link href={href} className="flex items-center gap-3 px-5 py-3 hover:bg-slate-50 dark:hover:bg-white/[0.02]">
      <div
        className={`h-5 w-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
          done
            ? "bg-green-500 border-green-500 text-white"
            : "border-slate-300 dark:border-white/20 text-transparent"
        }`}
      >
        ✓
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[12px] font-medium text-slate-800 dark:text-slate-100">{label}</p>
        <p className="text-[10.5px] text-slate-500 dark:text-[#94A3B8]">{sub}</p>
      </div>
      <span className="text-[11px] font-medium text-blue-500">{cta}</span>
    </Link>
  );
}

export default function OverviewFirstTimeState({
  doctorFirstName,
  setup,
}: {
  doctorFirstName: string;
  setup: {
    profileDone: boolean;
    servicesDone: boolean;
    availabilityDone: boolean;
    firstPatientDone: boolean;
    payoutDone: boolean;
  };
}) {
  const steps = [
    {
      href: "/doctor/profile",
      label: "Complete your profile",
      sub: "Profile details and verification info",
      cta: setup.profileDone ? "Done" : "Complete",
      done: setup.profileDone,
    },
    {
      href: "/doctor/services",
      label: "Add your services",
      sub: "List consultation and procedure offerings",
      cta: setup.servicesDone ? "Done" : "Add Services",
      done: setup.servicesDone,
    },
    {
      href: "/doctor/availability",
      label: "Set your availability",
      sub: "Configure clinic timings and slots",
      cta: setup.availabilityDone ? "Done" : "Set Hours",
      done: setup.availabilityDone,
    },
    {
      href: "/doctor/patients?new=1",
      label: "Register first patient",
      sub: "Add first patient manually or walk-in",
      cta: setup.firstPatientDone ? "Done" : "Add Patient",
      done: setup.firstPatientDone,
    },
    {
      href: "/doctor/settings",
      label: "Link your payout account",
      sub: "Add bank details to receive payments",
      cta: setup.payoutDone ? "Done" : "Add Bank",
      done: setup.payoutDone,
    },
  ];
  const doneCount = steps.filter((step) => step.done).length;
  const dashArray = 150.8;
  const dashOffset = dashArray - (dashArray * doneCount) / steps.length;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#111827] px-7 py-[22px]">
      <div className="w-full space-y-4">
        <div className="rounded-[16px] border border-blue-500/25 bg-gradient-to-r from-blue-500/15 to-blue-600/5 p-6">
          <div className="flex items-center gap-5">
            <div className="h-[52px] w-[52px] rounded-[14px] bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white">
              <Users className="h-6 w-6" />
            </div>
            <div className="flex-1">
              <div className="mb-1 text-[16px] font-bold text-slate-900 dark:text-slate-100">
                Welcome to OpenTreatment, Dr. {doctorFirstName}! 👋
              </div>
              <p className="text-[12px] leading-relaxed text-slate-600 dark:text-[#94A3B8]">
                Your clinic is set up and ready. Complete the steps below to start seeing patients on the platform.
              </p>
            </div>
            <div className="text-center">
              <svg width="60" height="60" viewBox="0 0 60 60">
                <circle cx="30" cy="30" r="24" fill="none" stroke="rgba(148,163,184,0.25)" strokeWidth="4" />
                <circle
                  cx="30"
                  cy="30"
                  r="24"
                  fill="none"
                  stroke="#3b82f6"
                  strokeWidth="4"
                  strokeDasharray={dashArray}
                  strokeDashoffset={dashOffset}
                  strokeLinecap="round"
                  transform="rotate(-90 30 30)"
                />
                <text x="30" y="35" textAnchor="middle" fontSize="13" fontWeight="700" fill="currentColor">{doneCount}/5</text>
              </svg>
              <div className="mt-1 text-[10px] text-slate-500 dark:text-[#64748B]">setup steps</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-[14px]">
          {[
            { label: "Today's Appointments", value: "0" },
            { label: "Total Patients", value: "0" },
            { label: "Revenue This Month", value: "Rs 0" },
            { label: "Pending Invoices", value: "0" },
          ].map((item) => (
            <div key={item.label} className="rounded-[13px] border border-slate-200 dark:border-white/[0.07] bg-white dark:bg-[#161f30] p-[18px]">
              <p className="mb-[3px] text-[24px] font-bold leading-none tracking-[-0.03em] text-slate-400">{item.value}</p>
              <p className="text-[11px] text-slate-500 dark:text-[#94A3B8]">{item.label}</p>
            </div>
          ))}
        </div>

        <div className="grid gap-4 xl:grid-cols-[1fr_310px]">
          <div className="rounded-[14px] border border-slate-200 dark:border-white/[0.07] bg-white dark:bg-[#161f30] overflow-hidden">
            <div className="px-5 py-[15px] border-b border-slate-200 dark:border-white/[0.07] flex items-center justify-between">
              <div>
                <div className="text-[13px] font-semibold text-slate-900 dark:text-slate-100">Getting Started</div>
                <div className="text-[11px] text-slate-500 dark:text-[#94A3B8] mt-0.5">Complete these steps to go live</div>
              </div>
              <span className="text-[11px] text-slate-500 dark:text-[#64748B]">{doneCount} of 5 complete</span>
            </div>
            <div className="divide-y divide-slate-200 dark:divide-white/[0.07]">
              {steps.map((step) => (
                <ChecklistRow
                  key={step.label}
                  href={step.href}
                  done={step.done}
                  label={step.label}
                  sub={step.sub}
                  cta={step.cta}
                />
              ))}
            </div>
          </div>

          <div className="rounded-[14px] border border-slate-200 dark:border-white/[0.07] bg-white dark:bg-[#161f30] p-5">
            <div className="text-[13px] font-semibold text-slate-900 dark:text-slate-100 mb-1">Quick Tips</div>
            <p className="text-[11.5px] text-slate-500 dark:text-[#94A3B8] leading-relaxed">
              Share your booking link, enable WhatsApp alerts, and collect reviews after each visit.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
