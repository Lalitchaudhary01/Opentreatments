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
  const [isMobile, setIsMobile] = useState(false);
  const progressRef = useRef(0);
  const animFrameRef = useRef<ReturnType<typeof requestAnimationFrame> | null>(null);
  const startTimeRef = useRef<number | null>(null);
  const animParamsRef = useRef({ from: 0, to: 0 });
  const DURATION = 5000;

  // Detect mobile
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

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
      const eased = 1 - Math.pow(1 - t, 2);
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

  const isActive = (i: number) => isMobile || progress >= 12.5 + i * 25;
  const hasStarted = progress > 1;

  return (
    <section
      className="w-full bg-[#EFF7F4] py-[64px] md:py-[96px]"
      onMouseEnter={() => !isMobile && animateTo(100)}
      onMouseLeave={() => !isMobile && animateTo(0)}
    >
      <div className="mx-auto max-w-[1440px] px-4 md:px-6">

        {/* Heading */}
        <div className="text-center mb-[40px] md:mb-[64px]">
          <h2 className="text-[32px] md:text-[56px] font-bold text-[#0F2D1E]">How it works</h2>
          <p className="text-[16px] md:text-[20px] text-[#5F7A6B] mt-3">
            Four simple steps to better healthcare decisions
          </p>
        </div>

        {/* ── MOBILE layout: vertical stack ── */}
        <div className="flex flex-col gap-6 lg:hidden">
          {steps.map((step, i) => (
            <div key={i} className="flex items-start gap-4">
              {/* Left: number + vertical line */}
              <div className="flex flex-col items-center">
                <div className="w-[40px] h-[40px] rounded-full bg-[#1DBF73] text-white flex items-center justify-center text-base font-bold shadow-md flex-shrink-0">
                  {i + 1}
                </div>
                {i < steps.length - 1 && (
                  <div className="w-[2px] flex-1 min-h-[60px] bg-[#1DBF73] mt-2" />
                )}
              </div>

              {/* Right: box + title + desc */}
              <div className="flex-1 pb-4">
                <div className="w-full h-[120px] rounded-[12px] border border-[#1DBF73] bg-white shadow-md mb-3" />
                <h4 className="text-[20px] font-semibold text-[#0F2D1E]">{step.title}</h4>
                <p className="text-[13px] text-[#5F7A6B] mt-1">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* ── DESKTOP/TABLET layout: horizontal with animation ── */}
        <div className="relative hidden lg:grid grid-cols-4 gap-[32px]">

          {/* Green line */}
          <div
            className="absolute left-0 right-0 h-[2px]"
            style={{
              top: "calc(140px + 40px + 24px)",
              zIndex: 0,
            }}
          >
            <div
              className="absolute inset-0 bg-gray-200 transition-opacity duration-300"
              style={{ opacity: hasStarted ? 1 : 0 }}
            />
            <div
              className="absolute top-0 left-0 h-full bg-[#1DBF73]"
              style={{ width: `${progress}%` }}
            />
          </div>

          {steps.map((step, i) => {
            const active = isActive(i);
            return (
              <div key={i} className="flex flex-col items-center">

                {/* Box */}
                <div
                  className={`
                    w-[250px] h-[140px] rounded-[12px] border bg-white mb-[40px]
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