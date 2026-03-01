"use client";

import { ReactNode, useMemo, useState } from "react";
import { ArrowDown, ArrowUp, CheckCheck, MessageSquare, Star, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { CategoryScore, ReviewItem } from "../types";

const seedReviews: ReviewItem[] = [
  {
    id: "R1",
    name: "Priya Menon",
    av: "PM",
    col: "rgba(59,130,246,0.2)",
    ac: "#60a5fa",
    rating: 5,
    date: "18 Feb 2026",
    service: "Consultation",
    text: "Dr. Iyer was incredibly thorough and patient. He explained everything clearly and I left feeling confident about my treatment plan. Highly recommend!",
    replied: true,
    reply: "Thank you so much, Priya! It was a pleasure. Please don't hesitate to reach out anytime.",
  },
  {
    id: "R2",
    name: "Vikram Nair",
    av: "VN",
    col: "rgba(139,92,246,0.2)",
    ac: "#a78bfa",
    rating: 5,
    date: "15 Feb 2026",
    service: "Follow-up",
    text: "Second visit and still impressed. Wait time was minimal and the doctor remembered details from my previous visit without referring to notes. Great experience.",
    replied: false,
    reply: "",
  },
  {
    id: "R3",
    name: "Sunita Rao",
    av: "SR",
    col: "rgba(245,158,11,0.2)",
    ac: "#fbbf24",
    rating: 4,
    date: "12 Feb 2026",
    service: "Procedure",
    text: "Procedure was smooth and I felt no discomfort at all. The support staff is very kind too. Would have given 5 stars but the parking was a bit difficult.",
    replied: true,
    reply: "Thank you Sunita! We're looking into the parking situation. Glad the procedure went well!",
  },
  {
    id: "R4",
    name: "Karan Mehta",
    av: "KM",
    col: "rgba(59,130,246,0.2)",
    ac: "#60a5fa",
    rating: 5,
    date: "10 Feb 2026",
    service: "Consultation",
    text: "First time visiting and I'm very impressed. The clinic is clean, staff is friendly, and Dr. Iyer took time to answer all my questions without rushing.",
    replied: false,
    reply: "",
  },
  {
    id: "R5",
    name: "Meena Joshi",
    av: "MJ",
    col: "rgba(251,191,36,0.2)",
    ac: "#fbbf24",
    rating: 3,
    date: "5 Feb 2026",
    service: "Blood Test",
    text: "Test results were accurate and received on time. However the reception desk was a bit slow and I had to wait 40 minutes past my appointment time.",
    replied: false,
    reply: "",
  },
  {
    id: "R6",
    name: "Ravi Pillai",
    av: "RP",
    col: "rgba(34,197,94,0.2)",
    ac: "#4ade80",
    rating: 5,
    date: "1 Feb 2026",
    service: "Consultation",
    text: "Exceptional doctor. Very knowledgeable, compassionate, and always keeps things simple. My whole family visits Sunrise Clinic now.",
    replied: true,
    reply: "Ravi, that means a lot to us! Looking forward to serving your family. Stay healthy!",
  },
  {
    id: "R7",
    name: "Deepa Sharma",
    av: "DS",
    col: "rgba(236,72,153,0.2)",
    ac: "#f472b6",
    rating: 4,
    date: "28 Jan 2026",
    service: "Follow-up",
    text: "Good experience overall. Dr. Iyer is attentive and caring. The app for booking appointments is very convenient.",
    replied: false,
    reply: "",
  },
  {
    id: "R8",
    name: "Arjun Kumar",
    av: "AK",
    col: "rgba(20,184,166,0.2)",
    ac: "#2dd4bf",
    rating: 5,
    date: "22 Jan 2026",
    service: "Consultation",
    text: "Best GP in Pune. Clear, honest, and genuinely cares about your health. No unnecessary tests, just straight answers.",
    replied: true,
    reply: "Thank you Arjun! That's exactly the kind of care we aim to provide. See you next time!",
  },
];

const ratingDist = { 5: 178, 4: 48, 3: 14, 2: 5, 1: 2 };

const categoryScores: CategoryScore[] = [
  { label: "Communication", score: 4.9 },
  { label: "Wait Time", score: 4.3 },
  { label: "Cleanliness", score: 4.8 },
  { label: "Treatment", score: 4.9 },
  { label: "Value for Money", score: 4.6 },
];

type ReviewFilter = "all" | "pending" | 5 | 4 | 3;

type SortMode = "recent" | "high" | "low";

export default function DoctorReviewsScreen() {
  const [reviews, setReviews] = useState<ReviewItem[]>(seedReviews);
  const [filter, setFilter] = useState<ReviewFilter>("all");
  const [sort, setSort] = useState<SortMode>("recent");
  const [draftReplies, setDraftReplies] = useState<Record<string, string>>({});

  const totalReviews = useMemo(() => Object.values(ratingDist).reduce((a, b) => a + b, 0), []);

  const filtered = useMemo(() => {
    let d = reviews;
    if (filter === "pending") d = reviews.filter((r) => !r.replied);
    else if (typeof filter === "number") d = reviews.filter((r) => (filter === 3 ? r.rating <= 3 : r.rating === filter));

    if (sort === "high") d = [...d].sort((a, b) => b.rating - a.rating);
    if (sort === "low") d = [...d].sort((a, b) => a.rating - b.rating);
    return d;
  }, [filter, reviews, sort]);

  const awaitingReplies = reviews.filter((r) => !r.replied).length;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#111827] px-7 py-[22px]">
      <div className="w-full space-y-[18px]">
        <div className="grid grid-cols-1 gap-[14px] md:grid-cols-2 xl:grid-cols-4">
          <KpiCard
            title="Overall Rating"
            value="4.8"
            delta="+0.2"
            trend="up"
            tone="amber"
            icon={<Star className="h-[17px] w-[17px]" />}
          />
          <KpiCard
            title="Total Reviews"
            value="247"
            delta="+12"
            trend="up"
            tone="blue"
            icon={<MessageSquare className="h-[17px] w-[17px]" />}
          />
          <KpiCard
            title="Positive Reviews"
            value="92%"
            delta="+3pp"
            trend="up"
            tone="green"
            icon={<CheckCheck className="h-[17px] w-[17px]" />}
          />
          <KpiCard
            title="Awaiting Reply"
            value={`${awaitingReplies}`}
            delta={`${awaitingReplies} pending`}
            trend="down"
            tone="teal"
            icon={<MessageSquare className="h-[17px] w-[17px]" />}
          />
        </div>

        <div className="grid grid-cols-1 items-start gap-[18px] xl:grid-cols-[1fr_290px]">
          <div className="flex flex-col gap-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div id="rev-filters" className="flex flex-wrap items-center gap-2">
                {[
                  { label: "All", val: "all" as ReviewFilter },
                  { label: "★ 5", val: 5 as ReviewFilter },
                  { label: "★ 4", val: 4 as ReviewFilter },
                  { label: "★ 3 & below", val: 3 as ReviewFilter },
                  { label: "Awaiting Reply", val: "pending" as ReviewFilter },
                ].map((chip) => {
                  const active = filter === chip.val;
                  return (
                    <button
                      key={chip.label}
                      type="button"
                      onClick={() => setFilter(chip.val)}
                      className={
                        active
                          ? "rounded-[20px] border border-blue-500/40 bg-blue-500/15 px-3 py-[5px] text-[11.5px] font-medium text-blue-400"
                          : "rounded-[20px] border border-slate-200 dark:border-white/[0.07] bg-transparent px-3 py-[5px] text-[11.5px] font-medium text-slate-500 dark:text-[#94A3B8] transition-colors hover:border-white/20 hover:text-slate-900 dark:hover:text-[#F1F5F9]"
                      }
                    >
                      {chip.label}
                    </button>
                  );
                })}
              </div>

              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as SortMode)}
                className="cursor-pointer rounded-lg border border-slate-200 dark:border-white/[0.07] bg-slate-100 dark:bg-[#1c2840] px-[10px] py-[6px] text-[12px] text-slate-900 dark:text-[#F1F5F9] outline-none"
              >
                <option value="recent">Most Recent</option>
                <option value="high">Highest Rated</option>
                <option value="low">Lowest Rated</option>
              </select>
            </div>

            <div id="rev-feed" className="flex flex-col gap-[10px]">
              {filtered.map((r) => (
                <div
                  key={r.id}
                  className="rounded-[12px] border border-slate-200 dark:border-white/[0.07] bg-white dark:bg-[#161f30] px-[18px] py-4 transition-colors hover:border-white/20"
                >
                  <div className="mb-[10px] flex items-start justify-between gap-3">
                    <div className="flex items-center gap-[10px]">
                      <div
                        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[12px] font-semibold"
                        style={{ background: r.col, color: r.ac }}
                      >
                        {r.av}
                      </div>
                      <div>
                        <div className="text-[13px] font-semibold text-slate-900 dark:text-[#F1F5F9]">{r.name}</div>
                        <div className="mt-[1px] text-[10.5px] text-slate-500 dark:text-[#475569]">
                          {r.service} · {r.date}
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col items-end gap-[5px]">
                      <div className="flex gap-[1px]">{renderStars(r.rating, "13")}</div>
                      <span
                        className={cn(
                          "rounded-[10px] px-[7px] py-[2px] text-[10px]",
                          r.replied ? "bg-green-500/10 text-green-400" : "bg-amber-500/10 text-amber-400"
                        )}
                      >
                        {r.replied ? "Replied" : "Awaiting"}
                      </span>
                    </div>
                  </div>

                  <div className="mb-[10px] text-[12.5px] leading-[1.6] text-slate-500 dark:text-[#94A3B8]">{r.text}</div>

                  {r.replied ? (
                    <div className="mb-[10px] rounded-r-lg border-l-[3px] border-blue-500 bg-blue-500/10 px-3 py-[10px]">
                      <div className="mb-[3px] text-[10.5px] font-semibold text-blue-400">Dr. Ramesh Iyer · replied</div>
                      <div className="text-[12px] text-slate-500 dark:text-[#94A3B8]">{r.reply}</div>
                    </div>
                  ) : null}

                  {!r.replied ? (
                    <div className="mt-1 flex gap-2">
                      <input
                        id={`reply-${r.id}`}
                        value={draftReplies[r.id] || ""}
                        onChange={(e) => setDraftReplies((prev) => ({ ...prev, [r.id]: e.target.value }))}
                        placeholder="Write a reply…"
                        className="h-[35px] flex-1 rounded-lg border border-slate-200 dark:border-white/[0.07] bg-slate-100 dark:bg-white/5 px-3 text-[12px] text-slate-900 dark:text-[#F1F5F9] outline-none placeholder:text-slate-500 dark:placeholder:text-[#475569]"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          const txt = (draftReplies[r.id] || "").trim();
                          if (!txt) return;
                          setReviews((prev) => prev.map((x) => (x.id === r.id ? { ...x, replied: true, reply: txt } : x)));
                          setDraftReplies((prev) => ({ ...prev, [r.id]: "" }));
                        }}
                        className="rounded-lg bg-[#3b82f6] px-[14px] py-[6px] text-[11.5px] font-medium text-white hover:bg-[#2563eb]"
                      >
                        Reply
                      </button>
                    </div>
                  ) : null}
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-[14px]">
            <div className="overflow-hidden rounded-[14px] border border-slate-200 dark:border-white/[0.07] bg-white dark:bg-[#161f30]">
              <div className="flex items-center justify-between border-b border-slate-200 dark:border-white/[0.07] px-5 py-[15px]">
                <div>
                  <div className="text-[13px] font-semibold text-slate-900 dark:text-[#F1F5F9]">Rating Breakdown</div>
                  <div className="mt-[2px] text-[11px] text-slate-500 dark:text-[#94A3B8]">Based on 247 reviews</div>
                </div>
              </div>

              <div className="px-5 py-[18px]">
                <div className="mb-4 flex items-center gap-4">
                  <div className="text-center">
                    <div className="text-[42px] font-bold leading-none text-slate-900 dark:text-[#F1F5F9]">4.8</div>
                    <div className="my-[5px] flex justify-center gap-[2px]" id="big-stars">
                      {renderStars(5, "14")}
                    </div>
                    <div className="text-[10px] text-slate-500 dark:text-[#475569]">247 reviews</div>
                  </div>

                  <div id="rating-bars" className="flex flex-1 flex-col gap-[5px]">
                    {[5, 4, 3, 2, 1].map((s) => {
                      const count = ratingDist[s as keyof typeof ratingDist];
                      const pct = Math.round((count / totalReviews) * 100);
                      const color = s >= 4 ? "bg-amber-400" : s === 3 ? "bg-blue-500" : "bg-red-500";
                      return (
                        <div key={s} className="flex items-center gap-[6px]">
                          <div className="w-[14px] text-right text-[10px] text-slate-500 dark:text-[#475569]">{s}</div>
                          <div className="h-[5px] flex-1 overflow-hidden rounded bg-white/[0.07]">
                            <div className={cn("h-full rounded", color)} style={{ width: `${pct}%` }} />
                          </div>
                          <div className="w-6 text-[10px] text-slate-500 dark:text-[#475569]">{count}</div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="mb-[14px] h-px bg-white/[0.07]" />

                <div className="grid grid-cols-2 gap-2">
                  <div className="rounded-[9px] border border-green-500/20 bg-green-500/10 px-3 py-[10px] text-center">
                    <div className="text-[18px] font-bold text-green-400">92%</div>
                    <div className="mt-[2px] text-[10px] text-slate-500 dark:text-[#475569]">Recommend</div>
                  </div>
                  <div className="rounded-[9px] border border-blue-500/20 bg-blue-500/10 px-3 py-[10px] text-center">
                    <div className="text-[18px] font-bold text-blue-400">68%</div>
                    <div className="mt-[2px] text-[10px] text-slate-500 dark:text-[#475569]">Return Patients</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="overflow-hidden rounded-[14px] border border-slate-200 dark:border-white/[0.07] bg-white dark:bg-[#161f30]">
              <div className="flex items-center justify-between border-b border-slate-200 dark:border-white/[0.07] px-5 py-[15px]">
                <div>
                  <div className="text-[13px] font-semibold text-slate-900 dark:text-[#F1F5F9]">Category Scores</div>
                </div>
              </div>

              <div id="cat-scores" className="flex flex-col gap-3 px-[18px] py-[14px]">
                {categoryScores.map((c) => (
                  <div key={c.label}>
                    <div className="mb-1 flex items-center justify-between">
                      <span className="text-[12px] text-slate-500 dark:text-[#94A3B8]">{c.label}</span>
                      <span className="text-[12px] font-semibold text-slate-900 dark:text-[#F1F5F9]">{c.score}</span>
                    </div>
                    <div className="h-[5px] overflow-hidden rounded bg-white/[0.07]">
                      <div className="h-full rounded bg-amber-400" style={{ width: `${(c.score / 5) * 100}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function KpiCard({
  title,
  value,
  delta,
  trend,
  tone,
  icon,
}: {
  title: string;
  value: string;
  delta: string;
  trend: "up" | "down";
  tone: "blue" | "green" | "amber" | "teal";
  icon: ReactNode;
}) {
  return (
    <div className="rounded-[13px] border border-slate-200 dark:border-white/[0.07] bg-white dark:bg-[#161f30] p-[18px] transition-all hover:-translate-y-[2px] hover:border-white/20">
      <div className="mb-3 flex items-start justify-between">
        <div
          className={cn(
            "flex h-[34px] w-[34px] items-center justify-center rounded-[9px]",
            tone === "blue" && "bg-blue-500/15 text-blue-400",
            tone === "green" && "bg-green-500/15 text-green-400",
            tone === "amber" && "bg-amber-500/15 text-amber-400",
            tone === "teal" && "bg-teal-500/15 text-teal-400"
          )}
        >
          {icon}
        </div>

        <span
          className={cn(
            "inline-flex items-center gap-[3px] rounded-[20px] px-[7px] py-[2px] text-[10px] font-medium",
            trend === "up" ? "bg-green-500/15 text-green-400" : "bg-red-500/15 text-red-400"
          )}
        >
          {trend === "up" ? <ArrowUp className="h-[10px] w-[10px]" /> : <ArrowDown className="h-[10px] w-[10px]" />}
          {delta}
        </span>
      </div>

      <div className="mb-[3px] text-[24px] font-bold leading-none tracking-[-0.03em] text-slate-900 dark:text-[#F1F5F9]">{value}</div>
      <div className="text-[11px] text-slate-500 dark:text-[#94A3B8]">{title}</div>
    </div>
  );
}

function renderStars(n: number, size = "13") {
  return [1, 2, 3, 4, 5].map((i) => (
    <Star
      key={`${size}-${i}`}
      className={cn(i <= n ? "text-amber-400 fill-amber-400" : "text-slate-500 dark:text-[#475569]")}
      style={{ width: `${size}px`, height: `${size}px` }}
    />
  ));
}
