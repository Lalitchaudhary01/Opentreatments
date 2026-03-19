"use client";

import { FlaskConical } from "lucide-react";
import { UserLabListItem } from "../types/userLab";
import UserLabCard from "./UserLabCard";

type Props = {
  labs: UserLabListItem[];
};

export default function UserLabList({ labs }: Props) {
  if (labs.length === 0) {
    return (
      <div className="rounded-2xl border-2 border-slate-200 bg-white/80 p-10 text-center dark:border-slate-700 dark:bg-slate-900/80">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-cyan-100 dark:bg-cyan-900/30">
          <FlaskConical className="h-8 w-8 text-cyan-600 dark:text-cyan-400" />
        </div>
        <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">No Labs Available</h3>
        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
          We couldn&apos;t find approved labs right now. Please check again soon.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
      {labs.map((lab) => (
        <UserLabCard key={lab.id} lab={lab} />
      ))}
    </div>
  );
}
