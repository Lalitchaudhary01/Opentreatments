"use client";

import { useMemo, useState } from "react";

type ReviewItem = {
  id: string;
  customer: string;
  rating: number;
  title: string;
  body: string;
  createdAt: string;
  source: "Google" | "App" | "Website";
  replied: boolean;
};

const reviews: ReviewItem[] = [
  {
    id: "RV-8821",
    customer: "Ritika Sharma",
    rating: 5,
    title: "Fast delivery and genuine medicines",
    body: "Prescription verification was quick and medicines reached in under 40 mins.",
    createdAt: "1h ago",
    source: "App",
    replied: true,
  },
  {
    id: "RV-8819",
    customer: "Kunal Verma",
    rating: 4,
    title: "Good staff support",
    body: "Counter staff explained substitutes clearly. Packing was neat.",
    createdAt: "Today",
    source: "Google",
    replied: false,
  },
  {
    id: "RV-8814",
    customer: "Anita Rao",
    rating: 5,
    title: "Reliable monthly refill",
    body: "I use subscription refill and it always arrives on time.",
    createdAt: "Yesterday",
    source: "Website",
    replied: true,
  },
  {
    id: "RV-8802",
    customer: "Aman Kulkarni",
    rating: 3,
    title: "Stock issue once",
    body: "One medicine was unavailable but refund was instant.",
    createdAt: "2 days ago",
    source: "App",
    replied: false,
  },
];

const distribution = [
  { stars: 5, count: 132 },
  { stars: 4, count: 44 },
  { stars: 3, count: 18 },
  { stars: 2, count: 7 },
  { stars: 1, count: 3 },
];

function stars(n: number) {
  return Array.from({ length: 5 }, (_, i) => (i < n ? "★" : "☆")).join("");
}

export default function PharmacyReviewsScreen() {
  const [selectedId, setSelectedId] = useState<string>(reviews[0]?.id ?? "");

  const totals = useMemo(() => {
    const total = reviews.length;
    const avg = total ? reviews.reduce((acc, r) => acc + r.rating, 0) / total : 0;
    const replied = reviews.filter((r) => r.replied).length;
    const positive = reviews.filter((r) => r.rating >= 4).length;
    return {
      total,
      avg,
      repliedPct: total ? Math.round((replied / total) * 100) : 0,
      positivePct: total ? Math.round((positive / total) * 100) : 0,
    };
  }, []);

  const selected = useMemo(
    () => reviews.find((item) => item.id === selectedId) ?? reviews[0] ?? null,
    [selectedId]
  );

  const maxBucket = Math.max(...distribution.map((d) => d.count), 1);

  return (
    <div className="min-h-full bg-[#0B1120] p-6 md:p-8">
      <div className="space-y-4">
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-[13px] border border-white/[0.07] bg-[#161f30] p-4">
            <div className="text-[11px] text-[#94A3B8]">Average Rating</div>
            <div className="mt-1 text-[22px] font-bold text-slate-100">{totals.avg.toFixed(1)}★</div>
            <div className="text-[10px] text-[#22c55e]">+0.2 this month</div>
          </div>
          <div className="rounded-[13px] border border-white/[0.07] bg-[#161f30] p-4">
            <div className="text-[11px] text-[#94A3B8]">Total Reviews</div>
            <div className="mt-1 text-[22px] font-bold text-slate-100">{totals.total}</div>
            <div className="text-[10px] text-[#22c55e]">New 14 this week</div>
          </div>
          <div className="rounded-[13px] border border-white/[0.07] bg-[#161f30] p-4">
            <div className="text-[11px] text-[#94A3B8]">Response Rate</div>
            <div className="mt-1 text-[22px] font-bold text-slate-100">{totals.repliedPct}%</div>
            <div className="text-[10px] text-[#22c55e]">Within 24h SLA</div>
          </div>
          <div className="rounded-[13px] border border-white/[0.07] bg-[#161f30] p-4">
            <div className="text-[11px] text-[#94A3B8]">Positive Sentiment</div>
            <div className="mt-1 text-[22px] font-bold text-slate-100">{totals.positivePct}%</div>
            <div className="text-[10px] text-[#22c55e]">4★ and above</div>
          </div>
        </div>

        <div className="grid gap-4 xl:grid-cols-[1.2fr_0.8fr]">
          <div className="overflow-hidden rounded-[14px] border border-white/[0.07] bg-[#161f30]">
            <div className="flex items-center justify-between border-b border-white/[0.07] px-5 py-[15px]">
              <div>
                <h2 className="text-[13px] font-semibold text-slate-100">Latest Reviews</h2>
                <p className="mt-0.5 text-[11px] text-[#94A3B8]">Monitor and respond quickly</p>
              </div>
              <button
                type="button"
                className="rounded-md border border-white/[0.1] bg-white/[0.04] px-3 py-1.5 text-[11px] text-[#CBD5E1]"
              >
                Export
              </button>
            </div>

            <div className="divide-y divide-white/[0.07]">
              {reviews.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setSelectedId(item.id)}
                  className={`w-full px-5 py-4 text-left transition hover:bg-white/[0.02] ${
                    selected?.id === item.id ? "bg-white/[0.03]" : ""
                  }`}
                >
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div>
                      <div className="text-sm font-semibold text-slate-100">{item.title}</div>
                      <div className="mt-1 text-xs text-[#94A3B8]">{item.customer} • {item.createdAt} • {item.source}</div>
                    </div>
                    <div className="text-xs text-[#f59e0b]">{stars(item.rating)}</div>
                  </div>
                  <p className="mt-2 text-xs text-[#CBD5E1]">{item.body}</p>
                  <div className="mt-2 flex items-center gap-2">
                    <span
                      className={`rounded-full px-2 py-1 text-[10px] ${
                        item.replied ? "bg-[#14b8a6]/15 text-[#14b8a6]" : "bg-[#f59e0b]/15 text-[#f59e0b]"
                      }`}
                    >
                      {item.replied ? "Replied" : "Pending reply"}
                    </span>
                    <span className="rounded-full bg-white/[0.06] px-2 py-1 text-[10px] text-[#94A3B8]">{item.id}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <div className="overflow-hidden rounded-[14px] border border-white/[0.07] bg-[#161f30]">
              <div className="border-b border-white/[0.07] px-4 py-3 text-[12px] font-semibold text-slate-100">
                Rating Breakdown
              </div>
              <div className="space-y-2 p-4">
                {distribution.map((bucket) => (
                  <div key={bucket.stars} className="grid grid-cols-[44px_1fr_32px] items-center gap-2 text-xs">
                    <span className="text-[#CBD5E1]">{bucket.stars}★</span>
                    <div className="h-2 overflow-hidden rounded-full bg-white/[0.08]">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-[#3b82f6] to-[#14b8a6]"
                        style={{ width: `${(bucket.count / maxBucket) * 100}%` }}
                      />
                    </div>
                    <span className="text-right text-[#94A3B8]">{bucket.count}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="overflow-hidden rounded-[14px] border border-white/[0.07] bg-[#161f30]">
              <div className="border-b border-white/[0.07] px-4 py-3 text-[12px] font-semibold text-slate-100">
                Service Quality Snapshot
              </div>
              <div className="space-y-3 p-4 text-xs">
                {[
                  ["Delivery Time", 88],
                  ["Medicine Availability", 82],
                  ["Staff Behavior", 91],
                  ["Packaging", 86],
                ].map(([label, value]) => (
                  <div key={label as string}>
                    <div className="mb-1 flex items-center justify-between text-[#CBD5E1]">
                      <span>{label as string}</span>
                      <span>{value as number}%</span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-white/[0.08]">
                      <div
                        className="h-full rounded-full bg-[#14b8a6]"
                        style={{ width: `${value as number}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="overflow-hidden rounded-[14px] border border-white/[0.07] bg-[#161f30]">
              <div className="border-b border-white/[0.07] px-4 py-3 text-[12px] font-semibold text-slate-100">
                Selected Review
              </div>
              <div className="p-4 text-xs">
                {selected ? (
                  <div className="space-y-2 rounded-lg border border-white/[0.07] bg-white/[0.02] p-3">
                    <div className="text-sm font-semibold text-slate-100">{selected.customer}</div>
                    <div className="text-[#f59e0b]">{stars(selected.rating)}</div>
                    <div className="text-[#CBD5E1]">{selected.body}</div>
                    <button className="mt-2 w-full rounded-lg bg-[#3B82F6] px-3 py-2 text-xs font-medium text-white">
                      Reply to review
                    </button>
                  </div>
                ) : (
                  <div className="text-[#64748B]">No review selected</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
