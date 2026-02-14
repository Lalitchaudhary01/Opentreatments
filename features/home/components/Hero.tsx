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
import { BlogSection } from "./BlogSection";
import { CTASection } from "./CTASection";
import Footer from "@/components/layout/Footer";
import { StatsSection } from "./StatsSection";
import ServicesPage from "./ServicePage";
import WhyOpenTreatment from "./WhyOpentreatment";
import HowItWorksSection from "./HowItWorksSection";
import FAQSection from "./FAQ";
import WhoIsThisPlatform from "./ServicePage";
import FeaturedProviders from "./featured-providers";
import HowItWorks from "./HowItWorksSection";
import SearchSection from "./SearchSection";
import PriceTransparency from "./PriceTransparency";
import CompareSection from "./CompareSection";
import HeroSectio from "./HeroSection";

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
      
      {/* Rest of your sections */}
      <HeroSectio/>
      <SearchSection/>
      {/* <WhoIsThisPlatform /> */}
      <FeaturedProviders />
      <HowItWorks />
      <PriceTransparency/>
      {/* <WhyOpenTreatment /> */}
      {/* <GallerySection />
      <FeaturesSection /> */}
      {/* <StatsSection /> */}
      {/* <HowItWorksSection /> */}
      <CompareSection/>
      <FAQSection />
      <TestimonialsSection />
      {/* <BlogSection /> */}
      {/* <CTASection /> */}
      <Footer />
    </div>
  );
}
