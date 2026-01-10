"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { CheckCircle } from "lucide-react";

const services = [
  {
    title: "Doctors",
    subtitle: "Consult experts",
    image: "https://ik.imagekit.io/gpo2lkfh1/image/doctor.png",
    slug: "doctors",
  },
  {
    title: "Lab Tests",
    subtitle: "Compare prices",
    image: "https://ik.imagekit.io/gpo2lkfh1/image/labtest.png",
    slug: "lab-tests",
  },
  {
    title: "Medicines",
    subtitle: "Save on meds",
    image: "https://ik.imagekit.io/gpo2lkfh1/image/medicnies.png",
    slug: "medicine-pricing",
  },
  {
    title: "Surgeries",
    subtitle: "Fixed packages",
    image: "https://ik.imagekit.io/gpo2lkfh1/image/surgery.png",
    slug: "surgeries",
  },
  {
    title: "Hospital Bills",
    subtitle: "Bill clarity",
    image: "https://ik.imagekit.io/gpo2lkfh1/image/bills.png",
    slug: "hospital-bills",
  },
];

export default function ServicesCarousel() {
  const router = useRouter();

  return (
    <>
      {/* ================= SERVICES CAROUSEL ================= */}
      <section className="py-16 px-4 bg-gradient-to-b from-white via-slate-50 to-white dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 px-4 py-2 border rounded-full text-xs font-semibold mb-5 bg-white dark:bg-slate-800">
              <CheckCircle className="w-4 h-4 text-cyan-500" />
              Price Transparency Platform
            </div>

            <h2 className="text-3xl md:text-4xl font-black mb-4 bg-gradient-to-r from-slate-800 via-teal-700 to-cyan-700 dark:from-slate-100 dark:via-teal-300 dark:to-cyan-300 bg-clip-text text-transparent">
              One Platform for All Healthcare Prices
            </h2>

            <p className="text-base md:text-lg text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
              Compare costs for{" "}
              <span className="font-semibold text-slate-800 dark:text-white">
                Doctors
              </span>
              ,{" "}
              <span className="font-semibold text-slate-800 dark:text-white">
                Hospitals
              </span>
              ,{" "}
              <span className="font-semibold text-slate-800 dark:text-white">
                Medicines
              </span>{" "}
              &{" "}
              <span className="font-semibold text-slate-800 dark:text-white">
                Lab Tests
              </span>{" "}
              — before you decide.
            </p>

            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
              No hidden charges. No surprises. Just clear healthcare pricing.
            </p>
          </div>

          {/* Carousel */}
          <div className="flex gap-6 overflow-x-auto scrollbar-hide pb-6 px-6 snap-x snap-mandatory">
            {services.map((service, index) => (
              <div
                key={index}
                onClick={() => router.push(`/services/${service.slug}`)}
                className="min-w-[160px] cursor-pointer group flex-shrink-0 snap-center"
              >
                <div
                  className="w-36 h-60 sm:w-40 sm:h-64 lg:w-44 lg:h-72 mx-auto rounded-2xl overflow-hidden 
        bg-gradient-to-br from-white to-slate-50 dark:from-slate-900 dark:to-slate-800
        border border-slate-200/60 dark:border-slate-700/60
        shadow-sm 
        transition-all duration-300
        group-hover:shadow-lg
        group-hover:-translate-y-1
        flex flex-col items-center justify-between p-4"
                >
                  {/* Image */}
                  <div className="w-full h-36 sm:h-40 lg:h-44 rounded-xl overflow-hidden bg-cyan-500/10">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Text */}
                  <div className="text-center mt-2">
                    <h4 className="text-sm font-semibold text-slate-800 dark:text-slate-100">
                      {service.title}
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {service.subtitle}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
