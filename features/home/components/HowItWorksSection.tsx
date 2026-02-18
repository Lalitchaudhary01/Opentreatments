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

  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="w-full bg-[#EFF7F4] py-[96px]">
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
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="h-[140px] rounded-[12px] border border-[#CFE3DA] bg-white transition-all duration-300 hover:shadow-lg hover:scale-105 hover:border-[#1DBF73] cursor-pointer"
            />
          ))}
        </div>

        {/* Line + Numbers */}
        <div className="relative mb-[40px] w-screen left-1/2 -translate-x-1/2" style={{ width: '100vw', marginLeft: 'calc(-50vw + 50%)' }}>
          {/* Animated Green Line */}
          <div className="absolute top-1/2 left-0 right-0 h-[2px] bg-gray-200">
            <div 
              className="h-full bg-[#1DBF73] transition-all duration-700 ease-out"
              style={{ 
                width: hoveredIndex !== null ? `${((hoveredIndex + 1) * 25)}%` : '0%'
              }}
            />
          </div>
          
          {/* Numbers on the line - perfectly aligned with boxes */}
          <div className="relative grid grid-cols-4 max-w-[1440px] mx-auto">
            {[1, 2, 3, 4].map((n, index) => {
              const isActive = hoveredIndex !== null && n <= hoveredIndex + 1;
              const isCurrentHover = hoveredIndex !== null && n === hoveredIndex + 1;
              
              // Calculate exact center position based on grid columns
              return (
                <div 
                  key={n} 
                  className="relative flex justify-center"
                  style={{
                    // Har column ke exact center mein position
                    left: index === 0 ? '0' : 
                          index === 1 ? '0' : 
                          index === 2 ? '0' : '0'
                  }}
                >
                  <div 
                    className={`
                      absolute w-[48px] h-[48px] -top-6 rounded-full flex items-center justify-center text-lg font-bold
                      transition-all duration-500 ease-out
                      ${isActive 
                        ? 'bg-[#1DBF73] text-white scale-110' 
                        : 'bg-white text-gray-400 border-2 border-gray-300'
                      }
                      ${isCurrentHover ? 'ring-4 ring-[#1DBF73] ring-opacity-50 scale-125' : ''}
                    `}
                    style={{
                      // Har number ko uske column ke exact center mein le jao
                      left: '50%',
                      transform: 'translateX(-50%)'
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
        <div className="grid grid-cols-1 md:grid-cols-4 gap-[32px] text-center mt-12">
          {steps.map((step, i) => {
            const isActive = hoveredIndex !== null && i <= hoveredIndex;
            
            return (
              <div 
                key={i}
                className={`
                  transition-all duration-500 text-center
                  ${isActive ? 'opacity-100' : 'opacity-50'}
                `}
              >
                <h4 className="text-[28px] font-semibold text-[#0F2D1E]">
                  {step.title}
                </h4>
                <p className="text-[14px] text-[#5F7A6B] mt-2">{step.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}