"use client";
import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  ChevronLeft,
  ChevronRight,
  Shield,
  Award,
  Zap,
  TrendingDown,
  ArrowRight,
  CheckCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const GallerySection = () => {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const autoPlayRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const galleryItems = [
    {
      title: "Medicine Pricing",
      description:
        "Compare prices from 500+ pharmacies instantly. No hidden markups.",
      stats: "Save ₹299 avg",
      savings: "Up to 70% OFF",
      image: "/api/placeholder/400/320",
      icon: Shield,
      badge: "Most Popular",
      bgGradient: "from-cyan-600/20 via-teal-500/10 to-cyan-400/20",
      borderGradient: "from-cyan-400 to-teal-500",
    },
    {
      title: "Diagnostic Tests",
      description: "1000+ tests with upfront pricing. Compare labs easily.",
      stats: "1000+ tests",
      savings: "Best Prices",
      image: "/api/placeholder/400/320",
      icon: Award,
      badge: "Verified",
      bgGradient: "from-teal-600/20 via-cyan-500/10 to-teal-400/20",
      borderGradient: "from-teal-400 to-cyan-500",
    },
    {
      title: "Insurance Claims",
      description: "Track every rupee covered with real-time claim clarity.",
      stats: "95% clarity",
      savings: "Hassle Free",
      image: "/api/placeholder/400/320",
      icon: Zap,
      badge: "AI Powered",
      bgGradient: "from-sky-600/20 via-teal-500/10 to-sky-400/20",
      borderGradient: "from-sky-400 to-teal-500",
    },
    {
      title: "Hospital Bills",
      description: "Itemized bills. Challenge unfair charges easily.",
      stats: "₹15K saved",
      savings: "Audit",
      image: "/api/placeholder/400/320",
      icon: Shield,
      badge: "Trending",
      bgGradient: "from-cyan-600/20 via-sky-500/10 to-cyan-400/20",
      borderGradient: "from-cyan-400 to-sky-500",
    },
    {
      title: "Surgery Packages",
      description: "All-inclusive fixed pricing. No hidden charges.",
      stats: "200+ packs",
      savings: "Fixed",
      image: "/api/placeholder/400/320",
      icon: Award,
      badge: "Guaranteed",
      bgGradient: "from-teal-600/20 via-cyan-500/10 to-teal-400/20",
      borderGradient: "from-teal-400 to-cyan-500",
    },
    {
      title: "Price Comparison",
      description: "Side-by-side comparison across providers.",
      stats: "50K updates",
      savings: "Live",
      image: "/api/placeholder/400/320",
      icon: Zap,
      badge: "Live Data",
      bgGradient: "from-sky-600/20 via-cyan-500/10 to-sky-400/20",
      borderGradient: "from-sky-400 to-cyan-500",
    },
  ];

  const nextSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((p) => (p + 1) % galleryItems.length);
    setTimeout(() => setIsTransitioning(false), 700);
  };

  const prevSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((p) => (p - 1 + galleryItems.length) % galleryItems.length);
    setTimeout(() => setIsTransitioning(false), 700);
  };

  useEffect(() => {
    if (isAutoPlaying) {
      autoPlayRef.current = setInterval(nextSlide, 5000);
    }
    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [isAutoPlaying, currentIndex]);

  const getVisibleCards = () => {
    const cards = [];
    for (let i = -1; i <= 1; i++) {
      const index =
        (currentIndex + i + galleryItems.length) % galleryItems.length;
      cards.push({ ...galleryItems[index], position: i });
    }
    return cards;
  };

  return (
    <section className="relative min-h-screen px-4 pt-11 overflow-hidden bg-gradient-to-b from-white via-slate-50 to-white dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <div className="container mx-auto max-w-7xl flex flex-col justify-center h-screen">
        {/* HEADER */}
        <div className=" text-center mb-1">
          <div className="inline-flex items-center gap-2 px-4 py-2 border rounded-full text-xs font-semibold mb-4">
            <CheckCircle className="w-4 h-4 text-cyan-500" />
            100% Transparency Guaranteed
          </div>

          <h2 className="text-3xl md:text-4xl font-black mb-6 bg-gradient-to-r from-slate-800 via-teal-700 to-cyan-700 dark:from-slate-100 dark:via-teal-300 dark:to-cyan-300 bg-clip-text text-transparent leading-tight tracking-tight">
            Healthcare Without{" "}
            <span className="text-cyan-500">Hidden Costs</span>
          </h2>

          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed font-medium">
            Compare prices, understand bills, and save thousands on healthcare.
          </p>
        </div>

        {/* CAROUSEL */}
        <div className="relative flex-1 flex items-center justify-center px-4">
          {/* Cards wrapper */}
          <div className="relative h-[420px] sm:h-[460px] w-full max-w-6xl flex items-center justify-center overflow-hidden">
            {getVisibleCards().map((item, idx) => {
              let transform = "translateX(0)";
              let scale = 1;
              let opacity = 1;
              let zIndex = 20;

              if (item.position === -1) {
                transform = "translateX(-60%)";
                scale = 0.85;
                opacity = 0.45;
                zIndex = 10;
              }

              if (item.position === 1) {
                transform = "translateX(60%)";
                scale = 0.85;
                opacity = 0.45;
                zIndex = 10;
              }

              return (
                <div
                  key={idx}
                  className="absolute w-full max-w-[320px] sm:max-w-sm transition-all duration-700 ease-out"
                  style={{
                    transform: `${transform} scale(${scale})`,
                    opacity,
                    zIndex,
                  }}
                >
                  <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-xl hover:shadow-2xl transition-shadow duration-300 overflow-hidden border border-slate-200 dark:border-slate-700">
                    {/* Image */}
                    <div className="h-36 sm:h-40 overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                      />
                    </div>

                    {/* Content */}
                    <div className="p-4 sm:p-5">
                      <h3 className="font-bold text-base sm:text-lg mb-1 text-slate-800 dark:text-slate-100">
                        {item.title}
                      </h3>

                      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mb-4 leading-relaxed line-clamp-3">
                        {item.description}
                      </p>

                      <button
                        onClick={() =>
                          router.push(
                            `/user/explore/${item.title
                              .toLowerCase()
                              .replace(/\s+/g, "-")}`
                          )
                        }
                        className="w-full py-2.5 text-xs sm:text-sm font-bold bg-gradient-to-r from-cyan-500 to-teal-500 text-white rounded-xl flex items-center justify-center gap-2 hover:scale-[1.03] transition-transform"
                      >
                        Explore
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* NAV BUTTONS */}
          <button
            onClick={prevSlide}
            className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white dark:bg-slate-800 shadow-lg flex items-center justify-center hover:scale-110 transition"
            aria-label="Previous"
          >
            <ChevronLeft className="w-5 h-5 text-slate-700 dark:text-slate-200" />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white dark:bg-slate-800 shadow-lg flex items-center justify-center hover:scale-110 transition"
            aria-label="Next"
          >
            <ChevronRight className="w-5 h-5 text-slate-700 dark:text-slate-200" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default GallerySection;
