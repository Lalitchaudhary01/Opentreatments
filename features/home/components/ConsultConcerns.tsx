"use client";

import React from "react";
import { useRouter } from "next/navigation";

const concerns = [
  {
    title: "Period doubts or Pregnancy",
    image: "https://ik.imagekit.io/gpo2lkfh1/image/period.png",
    slug: "pregnancy",
  },
  {
    title: "Acne, pimple or skin issues",
    image: "https://ik.imagekit.io/gpo2lkfh1/image/acne.png",
    slug: "skin-issues",
  },
  {
    title: "Performance issues in bed",
    image: "https://ik.imagekit.io/gpo2lkfh1/image/perfomance.png",
    slug: "sexual-health",
  },
  {
    title: "Cold, cough or fever",
    image: "https://ik.imagekit.io/gpo2lkfh1/image/cold.png",
    slug: "cold-fever",
  },
  {
    title: "Child not feeling well",
    image: "https://ik.imagekit.io/gpo2lkfh1/image/child.png",
    slug: "child-care",
  },
  {
    title: "Depression or anxiety",
    image: "https://ik.imagekit.io/gpo2lkfh1/image/anixety.png",
    slug: "mental-health",
  },
];

export default function ConsultConcerns() {
  const router = useRouter();

  return (
    <section className="px-4 py-16 bg-white dark:bg-slate-950">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-start justify-between mb-10 flex-wrap gap-4">
          <div>
            <h2 className="text-3xl md:text-4xl font-black mb-6 bg-gradient-to-r from-slate-800 via-teal-700 to-cyan-700 dark:from-slate-100 dark:via-teal-300 dark:to-cyan-300 bg-clip-text text-transparent leading-tight tracking-tight">
              Consult top doctors online for any{" "}
              <span className="text-cyan-500">Health concern</span>
            </h2>

            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed font-medium">
              Private online consultations with verified doctors in all
              specialties
            </p>
          </div>

          <button
            onClick={() => router.push("/services/doctors")}
            className="text-sm font-semibold text-cyan-600 hover:underline"
          >
            View All Specialities
          </button>
        </div>

        {/* Concerns */}
        <div className="flex gap-10 overflow-x-auto scrollbar-hide pb-4">
          {concerns.map((item, index) => (
            <div
              key={index}
              onClick={() => router.push(`/services/consult/${item.slug}`)}
              className="min-w-[140px] cursor-pointer text-center group"
            >
              {/* Circle */}
              <div
                className="w-24 h-24 mx-auto rounded-full overflow-hidden 
bg-slate-100 dark:bg-slate-800 
mb-3 shadow-sm 
transition-all duration-300
group-hover:shadow-lg
group-hover:scale-105"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Title */}
              <p className="text-sm font-medium text-slate-700 dark:text-slate-200 leading-snug">
                {item.title}
              </p>

              {/* CTA */}
              <p className="mt-1 text-xs font-semibold text-cyan-600">
                CONSULT NOW
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
