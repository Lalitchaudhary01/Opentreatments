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
    <section className="px-4 py-20 bg-white">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-full text-xs font-semibold mb-5 bg-white text-gray-700">
            <HelpCircle className="w-4 h-4 text-cyan-500" />
            FAQs
          </div>

          <h2 className="text-3xl md:text-4xl font-black mb-4 text-gray-900">
            Frequently Asked Questions
          </h2>

          <p className="text-base md:text-lg text-gray-600">
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
                className="rounded-xl border border-gray-200 bg-white overflow-hidden shadow-sm"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full flex items-center justify-between gap-4 p-5 text-left hover:bg-gray-50 transition-colors"
                >
                  <span className="text-sm md:text-base font-semibold text-gray-900">
                    {item.q}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-gray-500 transition-transform ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 text-sm text-gray-600 leading-relaxed">
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