"use client";

import { ReactNode, useMemo, useState } from "react";
import { ArrowUp, MessageSquare, Star, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { CategoryScore, ReviewItem } from "../types";

const seedReviews: ReviewItem[] = [
  { id: "R1", name: "Priya Menon", av: "PM", col: "rgba(59,130,246,0.2)", ac: "#60a5fa", rating: 5, date: "18 Feb 2026", service: "Consultation", text: "Dr. Iyer was incredibly thorough and patient. He explained everything clearly and I left feeling confident about my treatment plan. Highly recommend!", replied: true, reply: "Thank you so much, Priya! It was a pleasure. Please don't hesitate to reach out anytime." },
  { id: "R2", name: "Vikram Nair", av: "VN", col: "rgba(139,92,246,0.2)", ac: "#a78bfa", rating: 5, date: "15 Feb 2026", service: "Follow-up", text: "Second visit and still impressed. Wait time was minimal and the doctor remembered details from my previous visit.", replied: false, reply: "" },
  { id: "R3", name: "Sunita Rao", av: "SR", col: "rgba(245,158,11,0.2)", ac: "#fbbf24", rating: 4, date: "12 Feb 2026", service: "Procedure", text: "Procedure was smooth and I felt no discomfort at all. The support staff is very kind too.", replied: true, reply: "Thank you Sunita! We're looking into the parking situation. Glad the procedure went well!" },
  { id: "R4", name: "Karan Mehta", av: "KM", col: "rgba(59,130,246,0.2)", ac: "#60a5fa", rating: 5, date: "10 Feb 2026", service: "Consultation", text: "First time visiting and I'm very impressed. Clinic is clean and doctor took time to answer all questions.", replied: false, reply: "" },
  { id: "R5", name: "Meena Joshi", av: "MJ", col: "rgba(251,191,36,0.2)", ac: "#fbbf24", rating: 3, date: "5 Feb 2026", service: "Blood Test", text: "Test results were accurate and on time, but reception was a bit slow.", replied: false, reply: "" },
  { id: "R6", name: "Ravi Pillai", av: "RP", col: "rgba(34,197,94,0.2)", ac: "#4ade80", rating: 5, date: "1 Feb 2026", service: "Consultation", text: "Exceptional doctor. Very knowledgeable, compassionate, and keeps things simple.", replied: true, reply: "Ravi, that means a lot to us! Looking forward to serving your family." },
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

export default function DoctorReviewsScreen() {
  const [reviews, setReviews] = useState<ReviewItem[]>(seedReviews);
  const [filter, setFilter] = useState<ReviewFilter>("all");
  const [draftReplies, setDraftReplies] = useState<Record<string, string>>({});

  const filtered = useMemo(() => {
    if (filter === "all") return reviews;
    if (filter === "pending") return reviews.filter((r) => !r.replied);
    if (filter === 3) return reviews.filter((r) => r.rating <= 3);
    return reviews.filter((r) => r.rating === filter);
  }, [filter, reviews]);

  const totalReviews = Object.values(ratingDist).reduce((a, b) => a + b, 0);

  const stats = {
    avg: 4.8,
    totalReviews,
    responseRate: 92,
    pendingReplies: reviews.filter((r) => !r.replied).length,
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#111827] p-6">
      <div className="max-w-[1164px] mx-auto space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
          <KpiCard title="Average Rating" value={`${stats.avg} / 5`} helper="+0.1" icon={<Star className="w-4 h-4" />} />
          <KpiCard title="Total Reviews" value={`${stats.totalReviews}`} helper="+14" icon={<MessageSquare className="w-4 h-4" />} />
          <KpiCard title="Response Rate" value={`${stats.responseRate}%`} helper="+3%" icon={<TrendingUp className="w-4 h-4" />} />
          <KpiCard title="Pending Replies" value={`${stats.pendingReplies}`} helper="Action" icon={<MessageSquare className="w-4 h-4" />} helperTone="amber" />
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-[1fr_320px] gap-4">
          <div className="space-y-3">
            <div id="rev-filters" className="flex flex-wrap items-center gap-2">
              {[{ label: "All", val: "all" as ReviewFilter }, { label: "Pending", val: "pending" as ReviewFilter }, { label: "5★", val: 5 as ReviewFilter }, { label: "4★", val: 4 as ReviewFilter }, { label: "3★ & below", val: 3 as ReviewFilter }].map((chip) => (
                <button
                  key={chip.label}
                  type="button"
                  onClick={() => setFilter(chip.val)}
                  className={cn(
                    "px-4 py-1.5 rounded-full text-sm border transition-colors",
                    filter === chip.val
                      ? "bg-blue-500/15 border-blue-500/40 text-blue-400"
                      : "bg-white dark:bg-[#161f30] border-slate-200 dark:border-white/10 text-slate-500 dark:text-slate-300"
                  )}
                >
                  {chip.label}
                </button>
              ))}
            </div>

            <div className="space-y-3" id="rev-feed">
              {filtered.map((r) => (
                <div key={r.id} className="rounded-2xl border bg-white dark:bg-[#161f30] border-slate-200 dark:border-white/10 p-4">
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full text-xs font-semibold flex items-center justify-center" style={{ background: r.col, color: r.ac }}>
                        {r.av}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">{r.name}</p>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400">{r.service} · {r.date}</p>
                      </div>
                    </div>

                    <div className="flex flex-col items-end gap-1.5">
                      <div className="flex items-center gap-0.5">{renderStars(r.rating)}</div>
                      <span className={cn("text-[10px] px-2 py-0.5 rounded-full", r.replied ? "bg-green-500/15 text-green-400" : "bg-amber-500/15 text-amber-400")}>
                        {r.replied ? "Replied" : "Awaiting"}
                      </span>
                    </div>
                  </div>

                  <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{r.text}</p>

                  {r.replied ? (
                    <div className="mt-3 bg-blue-500/10 border-l-2 border-blue-500 rounded-r-lg px-3 py-2">
                      <p className="text-[10px] font-semibold text-blue-400 mb-1">Dr. Ramesh Iyer · replied</p>
                      <p className="text-xs text-slate-600 dark:text-slate-300">{r.reply}</p>
                    </div>
                  ) : (
                    <div className="mt-3 flex items-center gap-2">
                      <input
                        value={draftReplies[r.id] || ""}
                        onChange={(e) =>
                          setDraftReplies((prev) => ({ ...prev, [r.id]: e.target.value }))
                        }
                        placeholder="Write a reply..."
                        className="flex-1 h-9 px-3 rounded-lg text-sm bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-200"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          const txt = (draftReplies[r.id] || "").trim();
                          if (!txt) return;
                          setReviews((prev) =>
                            prev.map((item) =>
                              item.id === r.id ? { ...item, replied: true, reply: txt } : item
                            )
                          );
                          setDraftReplies((prev) => ({ ...prev, [r.id]: "" }));
                        }}
                        className="px-3 py-2 rounded-lg text-xs bg-blue-600 hover:bg-blue-500 text-white"
                      >
                        Reply
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <div className="rounded-2xl border bg-white dark:bg-[#161f30] border-slate-200 dark:border-white/10 overflow-hidden">
              <div className="px-4 py-3 border-b border-slate-200 dark:border-white/10">
                <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">Rating Breakdown</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">Based on 247 reviews</p>
              </div>

              <div className="p-4 space-y-3">
                <div className="flex items-center gap-3 mb-1">
                  <div>
                    <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">4.8</p>
                    <div className="flex items-center gap-0.5" id="big-stars">{renderStars(5)}</div>
                  </div>
                  <div className="text-[10px] text-slate-500 dark:text-slate-400">247 reviews</div>
                </div>

                {[5, 4, 3, 2, 1].map((s) => {
                  const count = ratingDist[s as keyof typeof ratingDist];
                  const pct = Math.round((count / totalReviews) * 100);
                  const barColor = s >= 4 ? "bg-amber-400" : s === 3 ? "bg-blue-500" : "bg-red-500";
                  return (
                    <div key={s} className="flex items-center gap-2">
                      <span className="text-[10px] text-slate-500 dark:text-slate-400 w-3 text-right">{s}</span>
                      <div className="flex-1 h-1.5 rounded-full bg-slate-100 dark:bg-white/10 overflow-hidden">
                        <div className={cn("h-full rounded-full", barColor)} style={{ width: `${pct}%` }} />
                      </div>
                      <span className="text-[10px] text-slate-500 dark:text-slate-400 w-6">{count}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="rounded-2xl border bg-white dark:bg-[#161f30] border-slate-200 dark:border-white/10 overflow-hidden">
              <div className="px-4 py-3 border-b border-slate-200 dark:border-white/10">
                <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">Category Scores</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">Patient experience metrics</p>
              </div>

              <div className="p-4 space-y-3" id="cat-scores">
                {categoryScores.map((c) => (
                  <div key={c.label}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-slate-600 dark:text-slate-300">{c.label}</span>
                      <span className="text-xs font-semibold text-slate-900 dark:text-slate-100">{c.score}</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-slate-100 dark:bg-white/10 overflow-hidden">
                      <div className="h-full rounded-full bg-amber-400" style={{ width: `${(c.score / 5) * 100}%` }} />
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
  helper,
  icon,
  helperTone = "green",
}: {
  title: string;
  value: string;
  helper: string;
  icon: ReactNode;
  helperTone?: "green" | "amber";
}) {
  return (
    <div className="rounded-2xl border bg-white dark:bg-[#161f30] border-slate-200 dark:border-white/10 p-4">
      <div className="flex items-center justify-between mb-3">
        <div className="w-9 h-9 rounded-xl bg-blue-500/15 text-blue-400 flex items-center justify-center">{icon}</div>
        <div
          className={cn(
            "px-2 py-1 rounded-full text-[10px] inline-flex items-center gap-1",
            helperTone === "green"
              ? "bg-green-500/15 text-green-400"
              : "bg-amber-500/15 text-amber-400"
          )}
        >
          <ArrowUp className="w-3 h-3" />
          {helper}
        </div>
      </div>
      <p className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">{value}</p>
      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{title}</p>
    </div>
  );
}

function renderStars(n: number) {
  return [1, 2, 3, 4, 5].map((i) => (
    <Star
      key={i}
      className={cn(
        "w-3.5 h-3.5",
        i <= n ? "text-amber-400 fill-amber-400" : "text-slate-500"
      )}
    />
  ));
}
