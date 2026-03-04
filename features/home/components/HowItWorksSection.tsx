"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";

export default function HowItWorks() {

  const steps = [
    {
      title: "Search",
      desc: "Find doctors, hospitals, pharmacies, or labs near you",
      image: "https://ik.imagekit.io/gpo2lkfh1/search.png"
    },
    {
      title: "Compare",
      desc: "Compare prices, ratings, and availability side-by-side",
      image: "https://ik.imagekit.io/gpo2lkfh1/compare.png"
    },
    {
      title: "Decide",
      desc: "Choose the best option based on your needs",
      image: "https://ik.imagekit.io/gpo2lkfh1/decide.png"
    },
    {
      title: "Book",
      desc: "Book instantly with transparent pricing",
      image: "https://ik.imagekit.io/gpo2lkfh1/book.png"
    },
  ];

  const [progress, setProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  const progressRef = useRef(0);
  const animFrameRef = useRef<ReturnType<typeof requestAnimationFrame> | null>(null);
  const startTimeRef = useRef<number | null>(null);
  const animParamsRef = useRef({ from: 0, to: 0 });

  const DURATION = 5000;

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

      if (t < 1) {
        animFrameRef.current = requestAnimationFrame(tick);
      }
    };

    animFrameRef.current = requestAnimationFrame(tick);
  };

  useEffect(() => {
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  const isActive = (i: number) => isMobile || progress >= 12.5 + i * 25;

  const hasStarted = progress > 1;

  return (

    <section
      className="w-full bg-[#EFF7F4] py-[96px]"
      onMouseEnter={() => !isMobile && animateTo(100)}
      onMouseLeave={() => !isMobile && animateTo(0)}
    >

      <div className="mx-auto max-w-[1440px] px-6">

        {/* Heading */}

        <div className="text-center mb-[80px]">

          <h2 className="text-[56px] font-bold text-[#0F2D1E]">
            How it works
          </h2>

          <p className="text-[20px] text-[#5F7A6B] mt-4">
            Four simple steps to better healthcare decisions
          </p>

        </div>

        {/* DESKTOP */}

        <div className="relative hidden lg:grid grid-cols-4 gap-[60px] justify-items-center">

          {/* progress line */}

          <div
            className="absolute left-0 right-0 h-[2px]"
            style={{
              top: "calc(180px + 40px + 24px)",
              zIndex: 0
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

                {/* Image Card */}

                {/* Image Card */}

<div
  className={`
  relative
  w-[320px]
  h-[180px]
  rounded-[16px]
  border
  bg-white
  mb-[40px]
  flex items-end justify-center
  overflow-hidden
  transition-all
  duration-500
  ${active
    ? "opacity-100 scale-100 border-[#1DBF73] shadow-lg"
    : "opacity-0 scale-95 border-[#CFE3DA]"
  }
`}
>

  <Image
  src={step.image}
  alt={step.title}
  fill
  className="object-contain object-bottom"
/>

</div>

                {/* Number */}

                <div
                  className={`
                  relative z-10
                  w-[48px]
                  h-[48px]
                  rounded-full
                  flex
                  items-center
                  justify-center
                  text-lg
                  font-bold
                  mb-[24px]
                  transition-all
                  duration-300
                  ${active
                      ? "bg-[#1DBF73] text-white scale-110 shadow-md"
                      : "bg-white text-gray-400 border-2 border-gray-300 scale-75"
                    }
                `}
                >
                  {i + 1}
                </div>

                {/* Text */}

                <div
                  className={`
                  text-center
                  transition-all
                  duration-500
                  ${active ? "opacity-100" : "opacity-0"}
                `}
                >

                  <h4 className="text-[28px] font-semibold text-[#0F2D1E]">
                    {step.title}
                  </h4>

                  <p className="text-[15px] text-[#5F7A6B] mt-2 max-w-[260px]">
                    {step.desc}
                  </p>

                </div>

              </div>

            );

          })}

        </div>

      </div>

    </section>

  );
}