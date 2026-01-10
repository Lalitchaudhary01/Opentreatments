"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { CheckCircle } from "lucide-react";

const values = [
  {
    title: "Doctor Fees",
    desc: "Know the consultation cost before you visit.",
    image: "https://ik.imagekit.io/gpo2lkfh1/image/doctor.png",
    slug: "doctors",
  },
  {
    title: "Hospital Costs",
    desc: "See surgery & treatment expenses in advance.",
    image: "https://ik.imagekit.io/gpo2lkfh1/image/surgery.png",
    slug: "surgeries",
  },
  {
    title: "Medicine Prices",
    desc: "Find the lowest price for the same medicine.",
    image: "https://ik.imagekit.io/gpo2lkfh1/image/medicnies.png",
    slug: "medicine-pricing",
  },
  {
    title: "Lab Test Rates",
    desc: "Check blood test, MRI & X-ray charges first.",
    image: "https://ik.imagekit.io/gpo2lkfh1/image/labtest.png",
    slug: "lab-tests",
  },
];

export default function WhyOpenTreatment() {
  const router = useRouter();

  return (
    <section className="px-4 py-20 bg-slate-50 dark:bg-slate-950">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 border rounded-full text-xs font-semibold mb-5 bg-white dark:bg-slate-800">
            <CheckCircle className="w-4 h-4 text-cyan-500" />
            Why OpenTreatment
          </div>

          <h2 className="text-3xl md:text-4xl font-black mb-4 bg-gradient-to-r from-slate-800 via-teal-700 to-cyan-700 dark:from-slate-100 dark:via-teal-300 dark:to-cyan-300 bg-clip-text text-transparent">
            Know the Cost Before Your Treatment
          </h2>

          <p className="text-base md:text-lg text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
            Before visiting a doctor, going to a hospital, buying medicines, or
            getting tests — check the price first. No surprises. No hidden
            charges.
          </p>
        </div>

        {/* Image-Centric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((item, index) => (
            <div
              key={index}
              onClick={() => router.push(`/services/${item.slug}`)}
              className="cursor-pointer group rounded-2xl overflow-hidden
              bg-white dark:bg-slate-900
              border border-slate-200/60 dark:border-slate-700/60
              shadow-sm transition-all duration-300
              hover:shadow-lg hover:-translate-y-1"
            >
              {/* Image */}
              <div className="w-full h-44 bg-cyan-500/10 flex items-center justify-center">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-28 h-28 object-contain"
                />
              </div>

              {/* Content */}
              <div className="p-5 text-center">
                <h4 className="text-lg font-semibold text-slate-800 dark:text-slate-100">
                  {item.title}
                </h4>
                <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                  {item.desc}
                </p>

                <p className="mt-3 text-xs font-semibold text-cyan-600">
                  CHECK PRICES →
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Line */}
        <p className="text-center mt-12 text-sm text-slate-500 dark:text-slate-400">
          Get full clarity before any treatment. No extra bills. No surprises.
        </p>
      </div>
    </section>
  );
}
