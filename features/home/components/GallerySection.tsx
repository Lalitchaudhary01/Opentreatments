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

const GallerySection = () => {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const autoPlayRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const galleryItems = [
    {
      title: "Medicine Pricing",
      subtitle: "100% Transparent Costs",
      description:
        "Compare prices from 500+ pharmacies instantly. No hidden markups or surprise charges.",
      stats: "Save ₹299 avg per prescription",
      savings: "Up to 70% OFF",
      image: "/api/placeholder/400/320",
      icon: Shield,
      badge: "Most Popular",
      bgGradient: "from-cyan-600/20 via-teal-500/10 to-cyan-400/20",
      borderGradient: "from-cyan-400 to-teal-500",
    },
    {
      title: "Diagnostic Tests",
      subtitle: "Clear Lab Pricing",
      description:
        "1000+ tests with upfront pricing. Compare labs and book with confidence.",
      stats: "1000+ verified tests",
      savings: "Best Prices",
      image: "/api/placeholder/400/320",
      icon: Award,
      badge: "Verified Labs",
      bgGradient: "from-teal-600/20 via-cyan-500/10 to-teal-400/20",
      borderGradient: "from-teal-400 to-cyan-500",
    },
    {
      title: "Insurance Claims",
      subtitle: "Zero Confusion",
      description:
        "Track every rupee covered. Real-time claim status with complete transparency.",
      stats: "95% approval clarity",
      savings: "Hassle Free",
      image: "/api/placeholder/400/320",
      icon: Zap,
      badge: "AI Powered",
      bgGradient: "from-sky-600/20 via-teal-500/10 to-sky-400/20",
      borderGradient: "from-sky-400 to-teal-500",
    },
    {
      title: "Hospital Bills",
      subtitle: "Every Charge Explained",
      description:
        "Detailed itemized bills. Challenge unfair charges and save thousands.",
      stats: "₹15K avg saved per visit",
      savings: "Bill Audit",
      image: "/api/placeholder/400/320",
      icon: Shield,
      badge: "Trending",
      bgGradient: "from-cyan-600/20 via-sky-500/10 to-cyan-400/20",
      borderGradient: "from-cyan-400 to-sky-500",
    },
    {
      title: "Surgery Packages",
      subtitle: "All-Inclusive Pricing",
      description:
        "200+ procedures with fixed costs. No hidden charges, post-op care included.",
      stats: "200+ verified packages",
      savings: "Fixed Price",
      image: "/api/placeholder/400/320",
      icon: Award,
      badge: "Guaranteed",
      bgGradient: "from-teal-600/20 via-cyan-500/10 to-teal-400/20",
      borderGradient: "from-teal-400 to-cyan-500",
    },
    {
      title: "Price Comparison",
      subtitle: "Smart Decisions",
      description:
        "50K+ prices updated daily. Side-by-side comparison across providers.",
      stats: "50,000+ daily updates",
      savings: "Best Deals",
      image: "/api/placeholder/400/320",
      icon: Zap,
      badge: "Live Data",
      bgGradient: "from-sky-600/20 via-cyan-500/10 to-sky-400/20",
      borderGradient: "from-sky-400 to-cyan-500",
    },
  ];

  const [isTransitioning, setIsTransitioning] = useState(false);
  const handleExplore = (title: string) => {
    const slug = title.toLowerCase().replace(/\s+/g, "-");
    router.push(`/user/explore/${slug}`);
  };

  const nextSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev + 1) % galleryItems.length);
    setTimeout(() => setIsTransitioning(false), 800);
  };

  const prevSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex(
      (prev) => (prev - 1 + galleryItems.length) % galleryItems.length
    );
    setTimeout(() => setIsTransitioning(false), 800);
  };

  useEffect(() => {
    if (isAutoPlaying) {
      autoPlayRef.current = setInterval(nextSlide, 6000);
    }
    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [isAutoPlaying, currentIndex]);

  const handleMouseEnter = () => setIsAutoPlaying(false);
  const handleMouseLeave = () => setIsAutoPlaying(true);

  const getVisibleCards = () => {
    const cards = [];
    for (let i = -1; i <= 2; i++) {
      const index =
        (currentIndex + i + galleryItems.length) % galleryItems.length;
      cards.push({ ...galleryItems[index], position: i });
    }
    return cards;
  };

  return (
    <section className="relative py-32 px-4 overflow-hidden bg-gradient-to-b from-white via-slate-50 to-white dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-400/10 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute bottom-0 right-1/4 w-96 h-96 bg-teal-400/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        />
      </div>

      <div className="container mx-auto max-w-7xl relative z-10">
        {/* Header */}
        <div className="text-center mb-24">
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-cyan-50 via-white to-teal-50 dark:from-cyan-900/40 dark:via-slate-800/60 dark:to-teal-900/40 border-2 border-cyan-200 dark:border-cyan-700 rounded-full mb-8 font-bold text-sm shadow-xl backdrop-blur-sm">
            <CheckCircle className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
            <span className="bg-gradient-to-r from-cyan-700 to-teal-700 dark:from-cyan-300 dark:to-teal-300 bg-clip-text text-transparent">
              100% Transparency Guaranteed
            </span>
          </div>
          <h2 className="text-5xl md:text-7xl font-black mb-8 leading-tight tracking-tight">
            <span className="block bg-gradient-to-r from-slate-800 via-teal-700 to-cyan-700 dark:from-slate-100 dark:via-teal-400 dark:to-cyan-400 bg-clip-text text-transparent">
              Healthcare Without
            </span>
            <span className="block bg-gradient-to-r from-cyan-600 to-teal-600 dark:from-cyan-400 dark:to-teal-400 bg-clip-text text-transparent mt-2">
              Hidden Costs
            </span>
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-4xl mx-auto leading-relaxed font-medium">
            Every rupee accounted for. Compare prices, understand bills, and
            save thousands on healthcare with our premium transparency platform.
          </p>
        </div>

        {/* Carousel Container */}
        <div
          className="relative"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {/* Cards Container */}
          <div
            className="relative h-[600px] flex items-center justify-center"
            style={{ perspective: "2000px" }}
          >
            {getVisibleCards().map((item, idx) => {
              const Icon = item.icon;
              const position = item.position;

              let transform = "";
              let zIndex = 0;
              let opacity = 0;
              let scale = 1;
              let rotateY = 0;
              let blur = 0;

              if (position === 0) {
                transform = "translateX(0) translateZ(0)";
                zIndex = 30;
                opacity = 1;
                scale = 1;
                rotateY = 0;
                blur = 0;
              } else if (position === 1) {
                transform = "translateX(80%) translateZ(-200px)";
                zIndex = 20;
                opacity = 0.5;
                scale = 0.8;
                rotateY = -15;
                blur = 2;
              } else if (position === -1) {
                transform = "translateX(-80%) translateZ(-200px)";
                zIndex = 20;
                opacity = 0.5;
                scale = 0.8;
                rotateY = 15;
                blur = 2;
              } else {
                transform =
                  position > 1
                    ? "translateX(160%) translateZ(-400px)"
                    : "translateX(-160%) translateZ(-400px)";
                zIndex = 10;
                opacity = 0;
                scale = 0.6;
                rotateY = position > 1 ? -30 : 30;
                blur = 4;
              }

              return (
                <div
                  key={`${item.title}-${idx}`}
                  className="absolute w-full max-w-md transition-all duration-800 ease-out"
                  style={{
                    transform: `${transform} scale(${scale}) rotateY(${rotateY}deg)`,
                    zIndex,
                    opacity,
                    filter: `blur(${blur}px)`,
                    transformStyle: "preserve-3d",
                  }}
                >
                  <div className="relative group h-full rounded-3xl overflow-hidden bg-white dark:bg-slate-900 shadow-2xl hover:shadow-4xl transition-all duration-700 border border-slate-200/50 dark:border-slate-700/50 backdrop-blur-sm">
                    {/* Image Section */}
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div
                        className={`absolute inset-0 bg-gradient-to-br ${item.bgGradient} mix-blend-overlay`}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-white/20 dark:from-slate-900/20 to-transparent" />

                      {/* Badges */}
                      <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                        <span
                          className={`px-3 py-1.5 bg-gradient-to-r ${item.borderGradient} text-white text-xs font-bold rounded-full shadow-lg transform group-hover:scale-105 transition-transform duration-300`}
                        >
                          {item.badge}
                        </span>
                        <span className="px-3 py-1.5 bg-slate-800/90 text-white text-xs font-bold rounded-full shadow-lg transform group-hover:scale-105 transition-transform duration-300 backdrop-blur-sm">
                          {item.savings}
                        </span>
                      </div>
                    </div>

                    {/* Content Section */}
                    <div className="p-6 flex flex-col">
                      <div className="space-y-4 mb-6 flex-1">
                        <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 leading-tight">
                          {item.title}
                        </h3>
                        <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-sm font-medium line-clamp-3">
                          {item.description}
                        </p>
                      </div>

                      {/* Stats and Button */}
                      <div className="space-y-4">
                        <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-cyan-50 to-teal-50 dark:from-cyan-950/30 dark:to-teal-950/30 rounded-xl border border-cyan-200/50 dark:border-cyan-800/50">
                          <div
                            className={`w-7 h-7 rounded-full bg-gradient-to-r ${item.borderGradient} flex items-center justify-center flex-shrink-0`}
                          >
                            <TrendingDown className="w-3.5 h-3.5 text-white" />
                          </div>
                          <span className="text-sm font-bold text-slate-700 dark:text-slate-200 truncate">
                            {item.stats}
                          </span>
                        </div>

                        <button
                          onClick={() => handleExplore(item.title)}
                          className={`w-full py-3 px-4 bg-gradient-to-r ${item.borderGradient} text-white font-bold rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 flex items-center justify-center gap-2 group/btn relative overflow-hidden`}
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000" />
                          <span className="relative text-sm">Explore Now</span>
                          <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform relative" />
                        </button>
                      </div>
                    </div>

                    {/* Hover Effects */}
                    <div
                      className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${item.borderGradient} opacity-0 group-hover:opacity-50 blur-xl transition-opacity duration-500 -z-10`}
                    />
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-200/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1200" />
                    </div>
                    <div
                      className={`absolute top-0 right-0 w-16 h-16 bg-gradient-to-br ${item.borderGradient} opacity-10 group-hover:opacity-20 transition-opacity duration-500 rounded-bl-3xl`}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-40 w-14 h-14 bg-white dark:bg-slate-800 rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-all duration-300 border-2 border-cyan-200 dark:border-cyan-700 group"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-6 h-6 text-cyan-600 dark:text-cyan-400 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors" />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-40 w-14 h-14 bg-white dark:bg-slate-800 rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-all duration-300 border-2 border-cyan-200 dark:border-cyan-700 group"
            aria-label="Next slide"
          >
            <ChevronRight className="w-6 h-6 text-cyan-600 dark:text-cyan-400 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors" />
          </button>
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center gap-3 mt-16">
          {galleryItems.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`transition-all duration-300 rounded-full ${
                idx === currentIndex
                  ? "w-12 h-3 bg-gradient-to-r from-cyan-500 to-teal-500"
                  : "w-3 h-3 bg-slate-300 dark:bg-slate-700 hover:bg-slate-400 dark:hover:bg-slate-600"
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default GallerySection;
