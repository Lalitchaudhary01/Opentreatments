"use client";

import { useState } from "react";

export default function HowItWorks() {
  const steps = [
    {
      title: "Search",
      desc: "Find doctors, hospitals, pharmacies, or labs near you",
    },
    {
      title: "Compare",
      desc: "Compare prices, ratings, and availability side-by-side",
    },
    {
      title: "Decide",
      desc: "Choose the best option based on your needs",
    },
    {
      title: "Book",
      desc: "Book instantly with transparent pricing",
    },
  ];

  const [isHovered, setIsHovered] = useState(false);

  return (
    <section
      className="w-full bg-[#EFF7F4] py-[96px]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="mx-auto max-w-[1440px] px-6">
        {/* Heading */}
        <div className="text-center mb-[64px]">
          <h2 className="text-[56px] font-bold text-[#0F2D1E]">How it works</h2>
          <p className="text-[20px] text-[#5F7A6B] mt-3">
            Four simple steps to better healthcare decisions
          </p>
        </div>

        {/* Illustration boxes */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-[32px] mb-[40px]">
          {steps.map((_, i) => (
            <div
              key={i}
              className="h-[140px] rounded-[12px] border border-[#CFE3DA] bg-white transition-all duration-300 hover:shadow-lg hover:scale-105 hover:border-[#1DBF73] cursor-pointer"
            />
          ))}
        </div>

        {/* Line + Numbers — same container as boxes so columns align */}
        <div className="relative mb-[40px]">
          {/* Green animated line — full width of container */}
          <div className="absolute top-1/2 left-0 right-0 h-[2px] bg-gray-200 -translate-y-1/2">
            <div
              className="h-full bg-[#1DBF73] transition-all duration-1000 ease-out"
              style={{ width: isHovered ? "100%" : "0%" }}
            />
          </div>

          {/* Numbers grid — same 4-col grid as boxes so each number centers under its box */}
          <div className="grid grid-cols-4 gap-[32px]">
            {[1, 2, 3, 4].map((n, index) => {
              const isActive = isHovered;

              return (
                <div key={n} className="flex justify-center">
                  <div
                    className={`
                      relative z-10 w-[48px] h-[48px] rounded-full flex items-center justify-center text-lg font-bold
                      transition-all duration-700 ease-out
                      ${
                        isActive
                          ? "bg-[#1DBF73] text-white scale-110"
                          : "bg-white text-gray-400 border-2 border-gray-300"
                      }
                    `}
                    style={{
                      transitionDelay: isHovered ? `${index * 200}ms` : "0ms",
                    }}
                  >
                    {n}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Titles + descriptions */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-[32px] text-center mt-4">
          {steps.map((step, i) => (
            <div
              key={i}
              className={`transition-all duration-500 text-center ${
                isHovered ? "opacity-100" : "opacity-50"
              }`}
              style={{
                transitionDelay: isHovered ? `${i * 150}ms` : "0ms",
              }}
            >
              <h4 className="text-[28px] font-semibold text-[#0F2D1E]">
                {step.title}
              </h4>
              <p className="text-[14px] text-[#5F7A6B] mt-2">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}