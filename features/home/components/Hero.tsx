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
    transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
};

const scaleIn = {
  hidden: { scale: 0.9, opacity: 0, filter: "blur(10px)" },
  visible: {
    scale: 1,
    opacity: 1,
    filter: "blur(0px)",
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

const beamAnimation = {
  hidden: { x: "-100%", opacity: 0 },
  visible: {
    x: "200%",
    opacity: [0, 1, 1, 0],
    transition: {
      duration: 2.5,
      ease: "easeInOut",
      repeat: Infinity,
      repeatDelay: 4,
    },
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
      {/* Hero Section */}
      <motion.section
        className="relative pt-32 pb-20 px-4 overflow-hidden"
        initial="hidden"
        animate={isLoaded ? "visible" : "hidden"}
        variants={staggerContainer}
      >
        {/* Mega Background Effects */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 -left-40 w-[700px] h-[700px] bg-gradient-to-r from-cyan-400/20 via-teal-400/20 to-sky-400/20 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-20 -right-40 w-[700px] h-[700px] bg-gradient-to-r from-teal-500/20 via-sky-400/20 to-cyan-400/20 rounded-full blur-3xl animate-float-delayed" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-gradient-to-r from-cyan-500/10 to-teal-500/10 rounded-full blur-3xl animate-pulse-luxury" />

          {/* Top Beam */}
          <motion.div
            className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
            variants={beamAnimation}
            initial="hidden"
            animate="visible"
          />

          {/* Grid Pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.03)_1px,transparent_1px)] bg-[size:64px_64px]" />

          {/* Floating Particles */}
          <motion.div
            className="absolute top-32 left-24"
            animate={{ y: [0, -30, 0], rotate: [0, 180, 360] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          >
            <Sparkles className="w-8 h-8 text-cyan-400/40" />
          </motion.div>
          <motion.div
            className="absolute top-48 right-32"
            animate={{ y: [0, 30, 0], rotate: [0, -180, -360] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          >
            <Zap className="w-10 h-10 text-teal-400/40" />
          </motion.div>
        </div>

        <div className="container mx-auto max-w-7xl relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <motion.div variants={fadeInUp}>
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-50 via-white to-teal-50 dark:from-cyan-900/40 dark:via-slate-800/60 dark:to-teal-900/40 border-2 border-cyan-300 dark:border-cyan-600 rounded-full mb-10 font-bold text-base shadow-2xl backdrop-blur-md relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                <Sparkles className="w-5 h-5 text-cyan-600 dark:text-cyan-400 relative z-10 animate-pulse" />
                <span className="bg-gradient-to-r from-cyan-700 via-teal-700 to-sky-700 dark:from-cyan-300 dark:via-teal-300 dark:to-sky-300 bg-clip-text text-transparent relative z-10">
                  Transparent Healthcare Pricing
                </span>
              </div>

              {/* Main Heading */}
              <h1 className="text-6xl md:text-7xl lg:text-8xl font-black mb-8 leading-[0.95] tracking-tight">
                <span className="block bg-gradient-to-r from-slate-900 to-slate-800 dark:from-slate-50 dark:to-slate-100 bg-clip-text text-transparent">
                  Know the
                </span>
                <span className="block bg-gradient-to-r from-cyan-500 via-teal-500 to-sky-500 dark:from-cyan-400 dark:via-teal-400 dark:to-sky-400 bg-clip-text text-transparent animate-gradient my-2">
                  cost before
                </span>
                <span className="block bg-gradient-to-r from-slate-900 to-slate-800 dark:from-slate-50 dark:to-slate-100 bg-clip-text text-transparent">
                  you step in
                </span>
              </h1>

              {/* Subheading */}
              <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 mb-12 leading-relaxed font-semibold">
                Compare hospital, medicine, and consultation prices across
                India.
                <br />
                <span className="text-lg font-normal text-slate-500 dark:text-slate-400">
                  Make informed healthcare decisions with{" "}
                  <span className="font-bold bg-gradient-to-r from-cyan-600 to-teal-600 dark:from-cyan-400 dark:to-teal-400 bg-clip-text text-transparent">
                    verified pricing data
                  </span>
                </span>
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-6 mb-12">
                <motion.button
                  className="group relative px-10 py-5 bg-gradient-to-r from-cyan-500 via-teal-500 to-sky-500 text-white font-black text-xl rounded-2xl shadow-2xl transition-all duration-500 overflow-hidden"
                  whileHover={{ scale: 1.05, y: -4 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 via-teal-600 to-sky-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                  <div className="absolute inset-0 rounded-2xl bg-cyan-400/50 blur-xl opacity-0 group-hover:opacity-100 group-hover:scale-125 transition-all duration-500" />
                  <span className="relative z-10 flex items-center justify-center gap-3">
                    <Search className="w-6 h-6" />
                    Start Searching
                    <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" />
                  </span>
                </motion.button>

                <motion.button
                  className="group relative px-10 py-5 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border-2 border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-100 font-black text-xl rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden"
                  whileHover={{ scale: 1.05, y: -4 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-500 via-teal-500 to-sky-500 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500 -z-10" />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                  <span className="relative z-10 flex items-center justify-center gap-3">
                    <Play className="w-6 h-6 text-teal-600 dark:text-teal-400" />
                    Watch Demo
                  </span>
                </motion.button>
              </div>

              {/* Trust Indicators */}
              <div className="flex flex-wrap gap-8">
                {[
                  { label: "10,000+ Patients", icon: "👥" },
                  { label: "500+ Hospitals", icon: "🏥" },
                  { label: "99% Accuracy", icon: "✓" },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center gap-3"
                    variants={scaleIn}
                  >
                    <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-teal-500 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg">
                      {item.icon}
                    </div>
                    <span className="text-slate-700 dark:text-slate-300 font-bold text-base">
                      {item.label}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Right - Hero Image */}
            <motion.div variants={scaleIn} className="relative lg:-mt-16">
              {/* Multi-layer Glow */}
              <div className="absolute -inset-4 bg-gradient-to-br from-cyan-400 via-teal-400 to-sky-400 rounded-[2.5rem] blur-3xl opacity-30 animate-pulse-glow" />

              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white/50 dark:border-slate-800/50 max-w-xl mx-auto">
                {/* Image Container */}
                <div className="aspect-[4/3] relative overflow-hidden">
                  <img
                    src="/Hero.png"
                    alt="Healthcare Consulting"
                    className="w-full h-full object-cover"
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

                  {/* Animated Shine */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full hover:translate-x-full transition-transform duration-1500" />
                </div>

                {/* Floating Card 1 - Top Right */}
                {/* <motion.div
                  className="absolute top-8 right-8 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl rounded-2xl p-5 shadow-2xl border-2 border-white/50 dark:border-slate-800/50"
                  animate={{ y: [0, -15, 0] }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-cyan-500 to-teal-500 rounded-xl flex items-center justify-center shadow-lg">
                      <TrendingUp className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <div className="text-3xl font-black bg-gradient-to-r from-cyan-600 to-teal-600 dark:from-cyan-400 dark:to-teal-400 bg-clip-text text-transparent">
                        ₹15,000
                      </div>
                      <div className="text-sm text-slate-600 dark:text-slate-400 font-bold">
                        Avg. Saved
                      </div>
                    </div>
                  </div>
                </motion.div> */}

                {/* Floating Card 2 - Bottom Left */}
                {/* <motion.div
                  className="absolute bottom-8 left-8 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl rounded-2xl p-5 shadow-2xl border-2 border-white/50 dark:border-slate-800/50"
                  animate={{ y: [0, 15, 0] }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.5,
                  }}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-sky-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg">
                      <Star className="w-7 h-7 text-white fill-white" />
                    </div>
                    <div>
                      <div className="text-3xl font-black bg-gradient-to-r from-sky-600 to-cyan-600 dark:from-sky-400 dark:to-cyan-400 bg-clip-text text-transparent">
                        4.9/5
                      </div>
                      <div className="text-sm text-slate-600 dark:text-slate-400 font-bold">
                        User Rating
                      </div>
                    </div>
                  </div>
                </motion.div> */}
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>
      <GallerySection />

      {/* Features with Images */}
      <FeaturesSection />

      {/* Stats Section with Background Image */}
      <StatsSection />

      {/* Testimonials */}
      <TestimonialsSection />
      {/* How It Works with Images */}
      <HowItWorksSection />

      {/* Blog/Insights with Images */}
      <BlogSection />

      {/* CTA Section with Background */}
      <CTASection />

      {/* Footer */}
      <Footer />

      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
            opacity: 0.2;
          }
          50% {
            transform: translateY(-40px) rotate(10deg);
            opacity: 0.3;
          }
        }

        @keyframes pulseLuxury {
          0%,
          100% {
            opacity: 0.1;
            transform: scale(1);
          }
          50% {
            opacity: 0.2;
            transform: scale(1.15);
          }
        }

        @keyframes pulseGlow {
          0%,
          100% {
            opacity: 0.3;
            transform: scale(1);
          }
          50% {
            opacity: 0.5;
            transform: scale(1.05);
          }
        }

        @keyframes gradient {
          0%,
          100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        .animate-float {
          animation: float 18s ease-in-out infinite;
        }

        .animate-float-delayed {
          animation: float 18s ease-in-out 9s infinite;
        }

        .animate-pulse-luxury {
          animation: pulseLuxury 12s ease-in-out infinite;
        }

        .animate-pulse-glow {
          animation: pulseGlow 4s ease-in-out infinite;
        }

        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 8s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
