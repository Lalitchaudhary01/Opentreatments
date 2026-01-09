"use client";
import { useState, useEffect } from "react";
import {
  Search,
  ArrowRight,
  Play,
  Sparkles,
  TrendingUp,
  Star,
  Zap,
} from "lucide-react";
import { motion } from "framer-motion";
import Header from "@/components/layout/Header";
import GallerySection from "./GallerySection";
import FeaturesSection from "./FeaturesSection";
import TestimonialsSection from "./TestimonialsSection";
import { HowItWorksSection } from "./HowItWorksSection";
import { BlogSection } from "./BlogSection";
import { CTASection } from "./CTASection";
import Footer from "@/components/layout/Footer";
import { StatsSection } from "./StatsSection";

const fadeInUp = {
  hidden: { opacity: 0, y: 40, filter: "blur(10px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
  },
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.05 },
  },
};

const scaleIn = {
  hidden: { scale: 0.9, opacity: 0, filter: "blur(10px)" },
  visible: {
    scale: 1,
    opacity: 1,
    filter: "blur(0px)",
  },
};

const beamAnimation = {
  hidden: { x: "-100%", opacity: 0 },
  visible: {
    x: "200%",
    opacity: [0, 1, 1, 0],
  },
};

export default function HeroSection() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <Header />

      {/* Hero Section - COMPACT VERSION */}
      <motion.section
        className="relative pt-16 sm:pt-20 md:pt-24 px-4 sm:px-6 overflow-hidden min-h-[calc(100vh-60px)] flex items-center"
        initial="hidden"
        animate={isLoaded ? "visible" : "hidden"}
        variants={staggerContainer}
      >
        {/* Optimized Background Effects - Lighter for compact layout */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {/* Simplified Gradients */}
          <div className="absolute top-10 -left-20 sm:top-20 sm:-left-40 w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] md:w-[500px] md:h-[500px] bg-gradient-to-r from-cyan-400/15 via-teal-400/15 to-sky-400/15 rounded-full blur-2xl sm:blur-3xl" />
          <div className="absolute bottom-10 -right-20 sm:bottom-20 sm:-right-40 w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] md:w-[500px] md:h-[500px] bg-gradient-to-r from-teal-500/15 via-sky-400/15 to-cyan-400/15 rounded-full blur-2xl sm:blur-3xl" />

          {/* Top Beam */}
          <motion.div
            className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
            variants={beamAnimation}
            initial="hidden"
            animate="visible"
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatDelay: 3,
            }}
          />

          {/* Subtle Grid Pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.02)_1px,transparent_1px)] bg-[size:40px_40px] sm:bg-[size:64px_64px]" />
        </div>

        <div className="container mx-auto max-w-7xl relative z-10">
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12 items-center">
            {/* Left Content - COMPACT */}
            <motion.div variants={fadeInUp} className="order-2 lg:order-1">
              {/* Compact Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-50 via-white to-teal-50 dark:from-cyan-900/30 dark:via-slate-800/50 dark:to-teal-900/30 border border-cyan-300 dark:border-cyan-600 rounded-full mb-4 sm:mb-6 font-semibold text-xs sm:text-sm shadow-lg backdrop-blur-sm relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-cyan-600 dark:text-cyan-400 relative z-10" />
                <span className="bg-gradient-to-r from-cyan-700 via-teal-700 to-sky-700 dark:from-cyan-300 dark:via-teal-300 dark:to-sky-300 bg-clip-text text-transparent relative z-10">
                  Transparent Healthcare Pricing
                </span>
              </div>

              {/* Compact Main Heading */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-3 sm:mb-4 md:mb-6 leading-[1.1] tracking-tight">
                <span className="inline bg-gradient-to-r from-slate-900 to-slate-800 dark:from-slate-50 dark:to-slate-100 bg-clip-text text-transparent">
                  Know the{" "}
                </span>
                <span className="inline bg-gradient-to-r from-cyan-500 via-teal-500 to-sky-500 dark:from-cyan-400 dark:via-teal-400 dark:to-sky-400 bg-clip-text text-transparent">
                  cost before{" "}
                </span>
                <span className="inline bg-gradient-to-r from-slate-900 to-slate-800 dark:from-slate-50 dark:to-slate-100 bg-clip-text text-transparent">
                  you step in
                </span>
              </h1>

              {/* Compact Subheading */}
              <p className="text-sm sm:text-base md:text-lg text-slate-600 dark:text-slate-300 mb-4 sm:mb-6 md:mb-8 leading-relaxed font-medium">
                Compare hospital, medicine, and consultation prices across
                India.
                <br className="hidden sm:block" />
                <span className="text-xs sm:text-sm md:text-base font-normal text-slate-500 dark:text-slate-400 block mt-1 sm:mt-2">
                  Make informed healthcare decisions with{" "}
                  <span className="font-semibold bg-gradient-to-r from-cyan-600 to-teal-600 dark:from-cyan-400 dark:to-teal-400 bg-clip-text text-transparent">
                    verified pricing data
                  </span>
                </span>
              </p>

              {/* Compact CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-6 sm:mb-8 md:mb-10">
                <motion.button
                  className="group relative px-5 sm:px-6 md:px-8 py-3 sm:py-4 bg-gradient-to-r from-cyan-500 via-teal-500 to-sky-500 text-white font-semibold sm:font-bold text-sm sm:text-base md:text-lg rounded-lg sm:rounded-xl shadow-lg transition-all duration-300 overflow-hidden w-full sm:w-auto"
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 via-teal-600 to-sky-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500" />
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    <Search className="w-4 h-4 sm:w-5 sm:h-5" />
                    Start Searching
                    <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform duration-300" />
                  </span>
                </motion.button>

                <motion.button
                  className="group relative px-5 sm:px-6 md:px-8 py-3 sm:py-4 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-100 font-semibold sm:font-bold text-sm sm:text-base md:text-lg rounded-lg sm:rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden w-full sm:w-auto"
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="absolute inset-0 rounded-lg sm:rounded-xl bg-gradient-to-r from-cyan-500 via-teal-500 to-sky-500 opacity-0 group-hover:opacity-20 blur-sm transition-opacity duration-300 -z-10" />
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    <Play className="w-4 h-4 sm:w-5 sm:h-5 text-teal-600 dark:text-teal-400" />
                    Watch Demo
                  </span>
                </motion.button>
              </div>

              {/* Compact Trust Indicators - INLINE */}
              <div className="flex items-center justify-start gap-4 sm:gap-6 md:gap-8">
                {[
                  {
                    label: "10K+ Patients",
                    icon: "👥",
                    fullLabel: "10,000+ Patients",
                  },
                  {
                    label: "500+ Hospitals",
                    icon: "🏥",
                    fullLabel: "500+ Hospitals",
                  },
                  {
                    label: "99% Accurate",
                    icon: "✓",
                    fullLabel: "99% Accuracy",
                  },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center gap-2"
                    variants={scaleIn}
                  >
                    <div className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 bg-gradient-to-br from-cyan-500 to-teal-500 rounded-md sm:rounded-lg flex items-center justify-center text-white font-bold text-xs sm:text-sm shadow">
                      {item.icon}
                    </div>
                    <div className="hidden sm:block">
                      <span className="text-slate-700 dark:text-slate-300 font-semibold text-xs sm:text-sm">
                        {item.fullLabel}
                      </span>
                    </div>
                    <div className="sm:hidden">
                      <span className="text-slate-700 dark:text-slate-300 font-semibold text-xs">
                        {item.label}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Right - Compact Hero Image */}
            <motion.div
              variants={scaleIn}
              className="relative order-1 lg:order-2 mb-4 sm:mb-0"
            >
              {/* Subtle Glow */}
              <div className="absolute -inset-2 sm:-inset-3 bg-gradient-to-br from-cyan-400 via-teal-400 to-sky-400 rounded-xl sm:rounded-2xl blur-lg sm:blur-xl opacity-15 sm:opacity-20" />

              <div className="relative rounded-lg sm:rounded-xl md:rounded-2xl overflow-hidden shadow-lg border-2 border-white/50 dark:border-slate-800/50 max-w-full mx-auto">
                {/* Image Container - Slightly Smaller */}
                <div className="aspect-[4/3] sm:aspect-[4/3.2] relative overflow-hidden">
                  <img
                    src="/Hero.png"
                    alt="Healthcare Consulting"
                    className="w-full h-full object-cover"
                    loading="eager"
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                </div>

                {/* Compact Floating Cards */}
                <motion.div
                  className="absolute top-3 right-3 sm:top-4 sm:right-4 bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm rounded-lg p-2 sm:p-3 shadow-lg border border-white/50 dark:border-slate-800/50"
                  animate={{ y: [0, -5, 0] }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-br from-cyan-500 to-teal-500 rounded-md flex items-center justify-center shadow">
                      <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                    </div>
                    <div>
                      <div className="text-sm sm:text-base font-bold bg-gradient-to-r from-cyan-600 to-teal-600 dark:from-cyan-400 dark:to-teal-400 bg-clip-text text-transparent">
                        ₹15K
                      </div>
                      <div className="text-[10px] sm:text-xs text-slate-600 dark:text-slate-400 font-semibold">
                        Avg. Saved
                      </div>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm rounded-lg p-2 sm:p-3 shadow-lg border border-white/50 dark:border-slate-800/50"
                  animate={{ y: [0, 5, 0] }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.5,
                  }}
                >
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-br from-sky-500 to-cyan-500 rounded-md flex items-center justify-center shadow">
                      <Star className="w-3 h-3 sm:w-4 sm:h-4 text-white fill-white" />
                    </div>
                    <div>
                      <div className="text-sm sm:text-base font-bold bg-gradient-to-r from-sky-600 to-cyan-600 dark:from-sky-400 dark:to-cyan-400 bg-clip-text text-transparent">
                        4.9/5
                      </div>
                      <div className="text-[10px] sm:text-xs text-slate-600 dark:text-slate-400 font-semibold">
                        Rating
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Rest of your sections */}
      <GallerySection />
      <FeaturesSection />
      <StatsSection />
      <TestimonialsSection />
      <HowItWorksSection />
      <BlogSection />
      <CTASection />
      <Footer />
    </div>
  );
}
