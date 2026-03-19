"use client";

import Link from "next/link";
import { Activity, Clock3, FlaskConical, MapPin, Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { UserLabListItem } from "../types/userLab";

type Props = {
  lab: UserLabListItem;
};

export default function UserLabCard({ lab }: Props) {
  return (
    <Link href={`/user/labs/${lab.id}`} className="block group">
      <Card className="h-full border-2 border-slate-200 bg-white/80 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400 hover:shadow-xl dark:border-slate-700 dark:bg-slate-900/80 dark:hover:border-cyan-600">
        <CardContent className="space-y-4 p-5">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h3 className="text-lg font-bold text-slate-900 transition-colors group-hover:text-cyan-600 dark:text-slate-100 dark:group-hover:text-cyan-400">
                {lab.name}
              </h3>
              <div className="mt-1 flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                <MapPin className="h-4 w-4" />
                <span>{[lab.city, lab.state].filter(Boolean).join(", ") || "Location not set"}</span>
              </div>
            </div>

            <Badge className="border border-cyan-300 bg-cyan-50 text-cyan-700 dark:border-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-300">
              {lab.status}
            </Badge>
          </div>

          <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 dark:border-slate-700 dark:bg-slate-800/60">
            <div className="mb-2 flex items-center gap-1.5 text-sm font-semibold text-slate-700 dark:text-slate-200">
              <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
              {lab.rating.toFixed(1)}
              <span className="text-xs font-normal text-slate-500 dark:text-slate-400">({lab.totalReviews} reviews)</span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="rounded-lg bg-white px-2 py-1.5 dark:bg-slate-900/70">
                <span className="text-slate-500 dark:text-slate-400">Tests</span>
                <div className="font-semibold text-slate-900 dark:text-slate-100">{lab.testsCount}</div>
              </div>
              <div className="rounded-lg bg-white px-2 py-1.5 dark:bg-slate-900/70">
                <span className="text-slate-500 dark:text-slate-400">Packages</span>
                <div className="font-semibold text-slate-900 dark:text-slate-100">{lab.packagesCount}</div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-1 text-slate-600 dark:text-slate-300">
              <Activity className="h-3.5 w-3.5 text-teal-500" />
              {lab.homeCollection ? "Home Collection" : "In-lab Collection"}
            </div>
            <div className="flex items-center gap-1 text-slate-500 dark:text-slate-400">
              <Clock3 className="h-3.5 w-3.5" />
              Trusted lab
            </div>
          </div>

          <div className="flex items-center justify-between border-t border-slate-200 pt-3 text-sm dark:border-slate-700">
            <div className="flex items-center gap-1 text-cyan-600 dark:text-cyan-400">
              <FlaskConical className="h-4 w-4" />
              View Tests
            </div>
            <span className="font-medium text-cyan-600 transition-transform group-hover:translate-x-1 dark:text-cyan-400">Details →</span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
