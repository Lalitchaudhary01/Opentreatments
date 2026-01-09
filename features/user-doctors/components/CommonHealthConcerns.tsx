"use client";

import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const CONCERNS = [
  {
    title: "Cough & Cold?",
    price: "₹399",
    image: "https://ik.imagekit.io/gpo2lkfh1/coldand%20cough.jpg",
  },
  {
    title: "Period problems?",
    price: "₹499",
    image: "https://ik.imagekit.io/gpo2lkfh1/period.jpg",
  },
  {
    title: "Performance issues in bed?",
    price: "₹499",
    image: "https://ik.imagekit.io/gpo2lkfh1/low.jpg",
  },
  {
    title: "Skin problems?",
    price: "₹449",
    image: "https://images.unsplash.com/photo-1596755389378-c31d21fd1273",
  },
];

export default function CommonHealthConcerns() {
  return (
    <section className="container mx-auto max-w-6xl px-6 py-14">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">
            Common Health Concerns
          </h2>
          <p className="text-slate-500">
            Consult a doctor online for any health issue
          </p>
        </div>

        <Button variant="outline" className="rounded-xl">
          See All Symptoms
        </Button>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {CONCERNS.map((item) => (
          <div
            key={item.title}
            className="
              group
              bg-white
              border
              border-slate-200
              rounded-2xl
              overflow-hidden
              shadow-sm
              hover:shadow-xl
              transition-all
              duration-300
            "
          >
            {/* Image */}
            <div className="relative h-44 overflow-hidden">
              <img
                src={item.image}
                alt={item.title}
                className="
                  w-full
                  h-full
                  object-cover
                  group-hover:scale-105
                  transition-transform
                  duration-500
                "
              />
            </div>

            {/* Content */}
            <div className="p-5">
              <h3 className="font-semibold text-slate-800 mb-1">
                {item.title}
              </h3>

              <p className="text-slate-500 text-sm mb-4">{item.price}</p>

              <button
                className="
                  text-sm
                  font-semibold
                  text-cyan-600
                  flex
                  items-center
                  gap-1
                  group-hover:text-teal-600
                "
              >
                Consult Now
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
