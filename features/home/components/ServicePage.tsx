"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, CheckCircle } from "lucide-react";
import ConsultConcerns from "./ConsultConcerns";

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
  //   {
  //     title: "Insurance",
  //     subtitle: "Claim clarity",
  //     image: "https://ik.imagekit.io/gpo2lkfh1/image/insurance%20(2).png",
  //     slug: "insurance-claims",
  //   },
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
              Our Services
            </div>

            <h2 className="text-3xl md:text-4xl font-black mb-5 bg-gradient-to-r from-slate-800 via-teal-700 to-cyan-700 dark:from-slate-100 dark:via-teal-300 dark:to-cyan-300 bg-clip-text text-transparent">
              Transparent Healthcare Services
              {/* <span className="block">No Hidden Costs</span> */}
            </h2>

            {/* <p className="text-lg text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
              Make confident healthcare decisions with complete price
              transparency
            </p> */}
          </div>

          {/* Carousel */}
          {/* Carousel */}
          <div className="flex gap-6 overflow-x-auto scrollbar-hide pb-4 justify-center">
            {services.map((service, index) => (
              <div
                key={index}
                onClick={() => router.push(`/services/${service.slug}`)}
                className="min-w-[120px] sm:min-w-[140px] cursor-pointer text-center group flex-shrink-0"
              >
                {/* Circle */}
                <div
                  className="w-36 h-36 sm:w-32 sm:h-32 mx-auto rounded-full overflow-hidden 
          bg-gradient-to-br from-cyan-500/20 to-teal-500/20 
          shadow-sm 
          transition-all duration-300
          group-hover:shadow-lg
          group-hover:scale-105"
                >
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                <h4 className="mt-3 text-sm font-semibold text-slate-800 dark:text-slate-100">
                  {service.title}
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {service.subtitle}
                </p>
              </div>
            ))}
          </div>

          {/* CTA */}
          {/* <div className="mt-8">
            <button
              onClick={() => router.push("/services")}
              className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-600 dark:text-cyan-400 hover:underline"
            >
              View all services
              <ArrowRight className="w-4 h-4" />
            </button>
          </div> */}
        </div>
      </section>

      {/* ================= CONSULT CONCERNS SECTION ================= */}
      <ConsultConcerns />
    </>
  );
}
