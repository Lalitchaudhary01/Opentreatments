"use client";

import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const SPECIALTIES = [
  {
    title: "Gynaecology",
    price: "₹499",
    icon: "👩‍⚕️",
  },
  {
    title: "Sexology",
    price: "₹499",
    icon: "⚥",
  },
  {
    title: "General Physician",
    price: "₹399",
    icon: "🩺",
  },
  {
    title: "Dermatology",
    price: "₹449",
    icon: "🧴",
  },
  {
    title: "Psychiatry",
    price: "₹499",
    icon: "🧠",
  },
  {
    title: "Stomach & Digestion",
    price: "₹399",
    icon: "🫃",
  },
];

export default function DoctorSpecialties() {
  return (
    <section className="container mx-auto max-w-6xl px-6 py-14">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">
            25+ Specialities
          </h2>
          <p className="text-slate-500">
            Consult with top doctors across specialities
          </p>
        </div>

        <Button variant="outline" className="rounded-xl">
          See all Specialities
        </Button>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
        {SPECIALTIES.map((item) => (
          <div
            key={item.title}
            className="
              group
              bg-white
              border
              border-slate-200
              rounded-2xl
              p-5
              text-center
              shadow-sm
              hover:shadow-lg
              hover:border-cyan-400
              transition-all
              duration-300
            "
          >
            {/* Icon */}
            <div
              className="
                mx-auto
                mb-4
                w-16
                h-16
                rounded-full
                flex
                items-center
                justify-center
                bg-gradient-to-br
                from-cyan-100
                to-teal-100
                text-2xl
              "
            >
              {item.icon}
            </div>

            {/* Title */}
            <h3 className="font-semibold text-slate-800 mb-1">{item.title}</h3>

            {/* Price */}
            <p className="text-slate-500 text-sm mb-3">{item.price}</p>

            {/* CTA */}
            <button
              className="
                text-sm
                font-semibold
                text-cyan-600
                flex
                items-center
                justify-center
                gap-1
                mx-auto
                group-hover:text-teal-600
              "
            >
              Consult now
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
