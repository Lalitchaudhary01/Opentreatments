import React, { useState } from "react";
import {
  DollarSign,
  Shield,
  Award,
  CheckCircle,
  ListChecks,
  ArrowRight,
} from "lucide-react";

export default function FeaturesSection() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const features = [
    {
      icon: DollarSign,
      title: "Compare Treatment Prices",
      description:
        "Compare real treatment costs from trusted hospitals before you decide",
      gradient: "from-cyan-400 to-teal-500",
      stats: "500+ Trusted Hospitals",
      image: "/features/compare-prices.png",
    },
    {
      icon: Shield,
      title: "Verified & Honest Data",
      description:
        "All prices are verified by healthcare experts — no fake numbers",
      gradient: "from-teal-400 to-cyan-500",
      stats: "Expert Verified",
      image: "/features/verified-data.png",
    },
    {
      icon: ListChecks,
      title: "Clear Treatment Process",
      description:
        "Understand every step — consultation, tests, treatment & final bill",
      gradient: "from-emerald-400 to-cyan-500",
      stats: "Step-by-Step Clarity",
      image: "/features/treatment-process.png",
    },
    {
      icon: Award,
      title: "Best Value Care",
      description:
        "Find the right balance of quality care and affordable pricing",
      gradient: "from-sky-400 to-teal-500",
      stats: "Quality + Price Match",
      image: "/features/best-value.png",
    },
  ];

  return (
    <section className="px-4 py-20 bg-slate-50 dark:bg-slate-900">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-2 border rounded-full text-xs font-semibold mb-5 bg-white dark:bg-slate-800">
            <CheckCircle className="w-4 h-4 text-cyan-500" />
            Why Choose OpenTreatment
          </div>

          <h2 className="text-3xl md:text-4xl font-black mb-5 bg-gradient-to-r from-slate-800 via-teal-700 to-cyan-700 dark:from-slate-100 dark:via-teal-300 dark:to-cyan-300 bg-clip-text text-transparent">
            Healthcare Made Simple —
            <span className="block">No Hidden Costs</span>
          </h2>

          <p className="text-lg text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
            Make confident healthcare decisions with complete price transparency
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            const isHovered = hoveredCard === index;

            return (
              <div
                key={index}
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
                className={`bg-white dark:bg-slate-800 rounded-xl overflow-hidden border transition-all duration-300
                ${
                  isHovered
                    ? "shadow-xl -translate-y-1 border-cyan-400"
                    : "shadow-md border-slate-200 dark:border-slate-700"
                }`}
              >
                {/* Image */}
                <div className="h-36 overflow-hidden">
                  <img
                    src={feature.image}
                    alt={feature.title}
                    className={`w-full h-full object-cover transition-transform duration-300 ${
                      isHovered ? "scale-105" : "scale-100"
                    }`}
                  />
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Icon */}
                  <div
                    className={`w-10 h-10 rounded-lg bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-4`}
                  >
                    <IconComponent className="w-5 h-5 text-white" />
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                    {feature.title}
                  </h3>

                  <p className="text-sm text-slate-600 dark:text-slate-300 mb-4">
                    {feature.description}
                  </p>

                  <div className="text-sm font-semibold text-cyan-600 dark:text-cyan-400">
                    {feature.stats}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Trust */}
        {/* <div className="mt-12 text-center space-y-2">
          <p className="text-sm text-slate-600 dark:text-slate-300">
            ✓ We don’t take commission from hospitals
          </p>
          <p className="text-sm text-slate-600 dark:text-slate-300">
            ✓ We show facts, not promotions
          </p>
        </div> */}

        {/* CTA */}
        <div className="mt-10 flex justify-center">
          <button className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-cyan-500 to-teal-500 text-white font-semibold shadow-lg hover:shadow-xl transition">
            Compare Treatment Prices
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
