"use client";

import React, { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";

const faqs = [
  {
    q: "What is OpenTreatment?",
    a: "OpenTreatment is a healthcare price transparency platform. It helps you check and compare prices for doctors, hospitals, medicines, and lab tests before you take any treatment.",
  },
  {
    q: "Are the prices shown real?",
    a: "Yes. Prices are collected from verified providers and updated regularly. We aim to show the most accurate and practical cost ranges.",
  },
  {
    q: "Do I have to book from here?",
    a: "No. You are free to just check prices and decide. Booking is optional. Our goal is to give you clarity before you choose.",
  },
  {
    q: "Is OpenTreatment free to use?",
    a: "Yes. Checking prices and comparing options on OpenTreatment is completely free for users.",
  },
  {
    q: "Why should I check prices before treatment?",
    a: "Healthcare costs vary widely. By checking prices first, you avoid surprises, save money, and make better decisions for yourself and your family.",
  },
  {
    q: "Which services are covered?",
    a: "We cover doctor consultation fees, hospital and surgery costs, medicine prices, and diagnostic lab test rates.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="px-4 py-20 bg-slate-50 dark:bg-slate-950">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-2 border rounded-full text-xs font-semibold mb-5 bg-white dark:bg-slate-800">
            <HelpCircle className="w-4 h-4 text-cyan-500" />
            FAQs
          </div>

          <h2 className="text-3xl md:text-4xl font-black mb-4 bg-gradient-to-r from-slate-800 via-teal-700 to-cyan-700 dark:from-slate-100 dark:via-teal-300 dark:to-cyan-300 bg-clip-text text-transparent">
            Frequently Asked Questions
          </h2>

          <p className="text-base md:text-lg text-slate-600 dark:text-slate-300">
            Everything you need to know about OpenTreatment and how it works.
          </p>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqs.map((item, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={index}
                className="rounded-xl border border-slate-200/60 dark:border-slate-700/60 bg-white dark:bg-slate-900 overflow-hidden"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full flex items-center justify-between gap-4 p-5 text-left"
                >
                  <span className="text-sm md:text-base font-semibold text-slate-800 dark:text-slate-100">
                    {item.q}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-500 transition-transform ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    {item.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
