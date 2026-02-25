"use client";

import { useState, useEffect, useRef } from "react";

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

  const [progress, setProgress] = useState(0);
  const progressRef = useRef(0);
  const animFrameRef = useRef<ReturnType<typeof requestAnimationFrame> | null>(null);
  const startTimeRef = useRef<number | null>(null);
  const animParamsRef = useRef({ from: 0, to: 0 });
  const DURATION = 5000;

  const animateTo = (target: number) => {
    if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    startTimeRef.current = null;
    animParamsRef.current = { from: progressRef.current, to: target };

    const tick = (now: number) => {
      if (!startTimeRef.current) startTimeRef.current = now;
      const elapsed = now - startTimeRef.current;
      const { from, to } = animParamsRef.current;
      const dist = Math.abs(to - from);
      const dur = DURATION * (dist / 100);
      const t = Math.min(elapsed / Math.max(dur, 1), 1);
      const eased = 1 - Math.pow(1 - t, 2); // softer ease-out
      const val = from + (to - from) * eased;
      progressRef.current = val;
      setProgress(val);
      if (t < 1) animFrameRef.current = requestAnimationFrame(tick);
    };
    animFrameRef.current = requestAnimationFrame(tick);
  };

  useEffect(() => () => {
    if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
  }, []);

  const isActive = (i: number) => progress >= 12.5 + i * 25;
  const hasStarted = progress > 1;

  return (
    <section
      className="w-full bg-[#EFF7F4] py-[96px]"
      onMouseEnter={() => animateTo(100)}
      onMouseLeave={() => animateTo(0)}
    >
      <div className="mx-auto max-w-[1440px] px-6">

        {/* Heading */}
        <div className="text-center mb-[64px]">
          <h2 className="text-[56px] font-bold text-[#0F2D1E]">How it works</h2>
          <p className="text-[20px] text-[#5F7A6B] mt-3">
            Four simple steps to better healthcare decisions
          </p>
        </div>

        {/* 
          ONE grid for all 4 columns.
          Each column has: box → number circle → title/desc
          The green line is absolutely positioned across the row of number circles.
        */}
        <div className="relative grid grid-cols-4 gap-[32px]">

          {/* ── Green line sits in the number-circle row ── */}
          {/* We position it using a full-width absolute div at the vertical midpoint of the circles */}
          {/* The circles row starts after the 140px box + 40px margin-bottom */}
          <div
            className="absolute left-0 right-0 h-[2px]"
            style={{
              top: "calc(140px + 40px + 24px)", // box height + mb + half circle (48/2)
              zIndex: 0,
            }}
          >
            {/* gray track */}
            <div
              className="absolute inset-0 bg-gray-200 transition-opacity duration-300"
              style={{ opacity: hasStarted ? 1 : 0 }}
            />
            {/* green fill */}
            <div
              className="absolute top-0 left-0 h-full bg-[#1DBF73]"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* ── 4 Columns ── */}
          {steps.map((step, i) => {
            const active = isActive(i);
            return (
              <div key={i} className="flex flex-col items-center">

                {/* Box */}
                <div
                  className={`
                    w-full h-[140px] rounded-[12px] border bg-white mb-[40px]
                    transition-all duration-500 ease-out
                    ${active
                      ? "opacity-100 translate-y-0 scale-100 border-[#1DBF73] shadow-lg"
                      : "opacity-0 translate-y-4 scale-95 border-[#CFE3DA]"
                    }
                  `}
                />

                {/* Number circle */}
                <div
                  className={`
                    relative z-10 w-[48px] h-[48px] rounded-full flex items-center justify-center text-lg font-bold mb-[24px]
                    transition-all duration-300
                    ${active
                      ? "opacity-100 scale-110 bg-[#1DBF73] text-white shadow-md"
                      : "opacity-0 scale-75 bg-white text-gray-400 border-2 border-gray-300"
                    }
                  `}
                >
                  {i + 1}
                </div>

                {/* Title + Description */}
                <div
                  className={`
                    text-center transition-all duration-500 ease-out
                    ${active ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"}
                  `}
                >
                  <h4 className="text-[28px] font-semibold text-[#0F2D1E]">{step.title}</h4>
                  <p className="text-[14px] text-[#5F7A6B] mt-2">{step.desc}</p>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}