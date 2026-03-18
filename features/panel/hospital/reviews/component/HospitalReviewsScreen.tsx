import { MessageCircle, Star, TriangleAlert, CheckCircle2 } from "lucide-react";

const stats = [
  { label: "Overall Rating", value: "4.7", sub: "Out of 5", delta: "+0.2", icon: Star, color: "text-[#a78bfa]" },
  { label: "Total Reviews", value: "1,240", sub: "48 new this month", delta: "+48", icon: MessageCircle, color: "text-[#14b8a6]" },
  { label: "Awaiting Reply", value: "8", sub: "Action required", delta: "8 pending", icon: TriangleAlert, color: "text-[#f59e0b]" },
  { label: "Positive Reviews", value: "94%", sub: "4 or 5 stars", delta: "+2%", icon: CheckCircle2, color: "text-[#22c55e]" },
];

const reviews = [
  {
    user: "Riya Nair",
    initials: "RN",
    area: "Cardiology",
    date: "Mar 10, 2026",
    stars: "★★★★★",
    score: "5.0",
    text: "Dr. Priya Sadiq was incredibly thorough and compassionate. She explained everything clearly and made me feel at ease.",
    doctor: "Dr. Priya Sadiq",
    reply: "Thank you for your kind words, Riya! We are delighted Dr. Sadiq could provide such exceptional care.",
    pending: false,
  },
  {
    user: "Sunita Kumar",
    initials: "SK",
    area: "General Medicine",
    date: "Mar 9, 2026",
    stars: "★★★★☆",
    score: "4.0",
    text: "Good overall experience, but wait time was long. Please improve appointment slot discipline.",
    doctor: "Dr. Amara Diallo",
    reply: "",
    pending: true,
  },
  {
    user: "Vijay Patil",
    initials: "VP",
    area: "Orthopedics",
    date: "Mar 7, 2026",
    stars: "★★☆☆☆",
    score: "2.0",
    text: "Billing queue was slow and communication could be better at discharge desk.",
    doctor: "Hospital Billing Desk",
    reply: "",
    pending: true,
  },
];

export default function HospitalReviewsScreen() {
  return (
    <div className="px-6 py-5">
      <section className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((s) => {
          const Icon = s.icon;
          return (
            <div key={s.label} className="rounded-[13px] border border-slate-200 dark:border-white/[0.07] bg-white dark:bg-[#161f30] p-5">
              <div className="mb-3 flex items-start justify-between">
                <div className={`flex h-[34px] w-[34px] items-center justify-center rounded-[9px] bg-slate-100 dark:bg-white/[0.06] ${s.color}`}><Icon className="h-4 w-4" /></div>
                <span className="rounded-full bg-slate-100 dark:bg-white/[0.06] px-2 py-0.5 text-[10px] font-medium text-slate-500 dark:text-[#94a3b8]">{s.delta}</span>
              </div>
              <div className="text-[28px] font-bold leading-none tracking-[-0.03em] text-slate-900 dark:text-[#f1f5f9]">{s.value}</div>
              <p className="mt-1 text-[11px] text-slate-500 dark:text-[#94a3b8]">{s.label}</p>
              <p className="mt-1 text-[10.5px] text-[#475569]">{s.sub}</p>
            </div>
          );
        })}
      </section>

      <section className="mt-4 grid gap-4 xl:grid-cols-[7fr_5fr]">
        <div className="space-y-3">
          {reviews.map((review) => (
            <div key={`${review.user}-${review.date}`} className={`rounded-[12px] border p-4 ${review.pending ? 'border-[rgba(245,158,11,.2)] bg-[rgba(245,158,11,.03)]' : 'border-slate-200 dark:border-white/[0.07] bg-white dark:bg-[#161f30]'}`}>
              <div className="mb-3 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-[#3b82f6] to-[#1d4ed8] text-[10px] font-bold text-white">{review.initials}</div>
                  <div>
                    <div className="font-medium text-slate-900 dark:text-[#f1f5f9]">{review.user}</div>
                    <div className="text-[10.5px] text-[#475569]">{review.date} · {review.area}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-[13px] text-[#f59e0b]">{review.stars}</div>
                  <div className="text-[10px] text-[#475569]">{review.score}</div>
                </div>
              </div>
              <p className="mb-3 text-[12.5px] leading-6 text-slate-500 dark:text-[#94a3b8]">{review.text}</p>
              <p className="mb-2 text-[11px] text-[#475569]">For: <span className="text-slate-900 dark:text-[#e2e8f0]">{review.doctor}</span></p>

              {review.reply ? (
                <div className="mb-2 rounded-lg border border-[rgba(59,130,246,.1)] bg-[rgba(59,130,246,.06)] p-3 text-[11.5px] text-slate-700 dark:text-[#cbd5e1]">
                  <span className="font-semibold text-[#3b82f6]">Hospital Reply:</span> {review.reply}
                </div>
              ) : (
                <div className="mb-2 rounded-lg border border-[rgba(245,158,11,.15)] bg-[rgba(245,158,11,.06)] p-3 text-[11.5px] text-[#fbbf24]">
                  No reply yet — this review needs a response.
                </div>
              )}

              <div className="flex items-center gap-1.5">
                <button className="rounded border border-slate-200 dark:border-white/[0.08] bg-slate-100 dark:bg-white/[0.04] px-2.5 py-1 text-[11px] text-slate-500 dark:text-[#94a3b8] hover:bg-slate-200 dark:hover:bg-white/[0.08]">
                  {review.reply ? 'Edit Reply' : 'Reply'}
                </button>
                <button className="rounded border border-slate-200 dark:border-white/[0.08] bg-slate-100 dark:bg-white/[0.04] px-2.5 py-1 text-[11px] text-slate-500 dark:text-[#94a3b8] hover:bg-slate-200 dark:hover:bg-white/[0.08]">Mark Resolved</button>
              </div>
            </div>
          ))}
        </div>

        <div className="rounded-[14px] border border-slate-200 dark:border-white/[0.07] bg-white dark:bg-[#161f30] p-5">
          <h3 className="text-[13px] font-semibold text-slate-900 dark:text-[#f1f5f9]">Rating Breakdown</h3>
          <p className="mt-1 text-[11px] text-slate-500 dark:text-[#94a3b8]">Based on 1,240 verified reviews</p>
          <div className="mt-4 space-y-3">
            {[['5 ★', 74], ['4 ★', 20], ['3 ★', 4], ['2 ★', 1], ['1 ★', 1]].map(([label, val]) => (
              <div key={label}>
                <div className="mb-1 flex items-center justify-between text-[11px] text-slate-500 dark:text-[#94a3b8]"><span>{label}</span><span>{val}%</span></div>
                <div className="h-[6px] rounded bg-slate-100 dark:bg-white/[0.06]">
                  <div className="h-[6px] rounded bg-[#a78bfa]" style={{ width: `${val}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
