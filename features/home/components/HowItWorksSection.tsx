"use client";

import React from "react";
import { Search, BarChart3, CheckCircle } from "lucide-react";

export default function HowItWorksSection() {
  return (
    <section className="px-4 py-20 bg-white dark:bg-slate-950">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 border rounded-full text-xs font-semibold mb-5 bg-slate-50 dark:bg-slate-800">
            <CheckCircle className="w-4 h-4 text-cyan-500" />
            How It Works
          </div>

          <h2 className="text-3xl md:text-4xl font-black mb-4 bg-gradient-to-r from-slate-800 via-teal-700 to-cyan-700 dark:from-slate-100 dark:via-teal-300 dark:to-cyan-300 bg-clip-text text-transparent">
            Get Clarity in 3 Simple Steps
          </h2>

          <p className="text-base md:text-lg text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
            Finding the right healthcare option doesn’t have to be confusing.
            Just search, compare, and choose with confidence.
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Step 1 */}
          <div className="relative text-center p-8 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200/60 dark:border-slate-700/60 shadow-sm">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-cyan-500 text-white flex items-center justify-center font-bold">
              1
            </div>

            <div className="w-20 h-20 mx-auto mb-5 rounded-xl bg-cyan-500/10 flex items-center justify-center">
              <Search className="w-10 h-10 text-cyan-600" />
            </div>

            <h4 className="text-lg font-semibold text-slate-800 dark:text-slate-100">
              Search What You Need
            </h4>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
              Enter a doctor, test, medicine, or treatment you are looking for.
            </p>
          </div>

          {/* Step 2 */}
          <div className="relative text-center p-8 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200/60 dark:border-slate-700/60 shadow-sm">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-cyan-500 text-white flex items-center justify-center font-bold">
              2
            </div>

            <div className="w-20 h-20 mx-auto mb-5 rounded-xl bg-cyan-500/10 flex items-center justify-center">
              <BarChart3 className="w-10 h-10 text-cyan-600" />
            </div>

            <h4 className="text-lg font-semibold text-slate-800 dark:text-slate-100">
              Compare Prices
            </h4>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
              See verified prices from multiple doctors, hospitals, and labs.
            </p>
          </div>

          {/* Step 3 */}
          <div className="relative text-center p-8 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200/60 dark:border-slate-700/60 shadow-sm">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-cyan-500 text-white flex items-center justify-center font-bold">
              3
            </div>

            <div className="w-20 h-20 mx-auto mb-5 rounded-xl bg-cyan-500/10 flex items-center justify-center">
              <CheckCircle className="w-10 h-10 text-cyan-600" />
            </div>

            <h4 className="text-lg font-semibold text-slate-800 dark:text-slate-100">
              Choose Confidently
            </h4>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
              Pick the best option for you with full clarity and no surprises.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
