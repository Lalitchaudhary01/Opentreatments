"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  MapPin,
  Hospital,
  Shield,
  ArrowRight,
  Users,
  Play,
  ChevronRight,
  Sparkles,
  Stethoscope,
  Activity,
  TrendingUp,
  Heart,
  CheckCircle,
  Award,
  Clock,
  DollarSign,
  Star,
} from "lucide-react";
import { motion } from "framer-motion";
import Header from "@/components/layout/Header";
import { StatsSection } from "./StatsSection";
import { BlogSection } from "./BlogSection";
import Footer from "@/components/layout/Footer";
import { HowItWorksSection } from "./HowItWorksSection";
import { CTASection } from "./CTASection";
import GallerySection from "./GallerySection";
import FeaturesSection from "./FeaturesSection";
import TestimonialsSection from "./TestimonialsSection";

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8 },
  },
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
};

const scaleIn = {
  hidden: { scale: 0.9, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { duration: 0.6 },
  },
};

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [searchFocus, setSearchFocus] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50/30 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      {/* Header */}
      <Header />

      {/* Hero Section with Image */}
      <motion.section
        className="relative pt-32 pb-20 px-4 overflow-hidden"
        initial="hidden"
        animate={isLoaded ? "visible" : "hidden"}
        variants={staggerContainer}
      >
        {/* Background decorative elements */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(16,185,129,0.15),transparent_50%)] pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_60%,rgba(14,165,233,0.1),transparent_50%)] pointer-events-none" />

        <div className="container mx-auto max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <motion.div variants={fadeInUp}>
              <Badge
                variant="outline"
                className="mb-6 px-4 py-2 text-sm border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-800 dark:bg-emerald-900/20 dark:text-emerald-300"
              >
                <Sparkles className="w-4 h-4 mr-2" />
                Transparent Healthcare Pricing
              </Badge>

              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight">
                <span className="block text-slate-900 dark:text-white">
                  Know the
                </span>
                <span className="block bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-500 bg-clip-text text-transparent">
                  cost before
                </span>
                <span className="block text-slate-900 dark:text-white">
                  you step in
                </span>
              </h1>

              <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 mb-8 leading-relaxed">
                Compare hospital, medicine, and consultation prices across
                India.
                <span className="text-emerald-600 font-medium">
                  {" "}
                  Make informed healthcare decisions
                </span>{" "}
                with verified pricing data.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Button
                  size="lg"
                  className="px-8 py-6 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-semibold text-lg shadow-lg"
                >
                  <Search className="mr-2 w-5 h-5" />
                  Start Searching
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>

                <Button
                  size="lg"
                  variant="outline"
                  className="px-8 py-6 border-2 border-emerald-200 text-emerald-700 hover:bg-emerald-50 dark:border-emerald-800 dark:text-emerald-300"
                >
                  <Play className="mr-2 w-5 h-5" />
                  Watch Demo
                </Button>
              </div>

              {/* Trust indicators */}
              <div className="flex flex-wrap gap-6 text-sm text-slate-600 dark:text-slate-400">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-emerald-600" />
                  <span>10,000+ Happy Patients</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-emerald-600" />
                  <span>500+ Hospitals</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-emerald-600" />
                  <span>99% Accuracy</span>
                </div>
              </div>
            </motion.div>

            {/* Right - Hero Image */}
            <motion.div variants={scaleIn} className="relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                {/* Real image */}
                <div className="aspect-[4/3] relative">
                  <img
                    src="/Hero.png"
                    alt="Healthcare Consulting"
                    className="w-full h-full object-cover"
                  />
                  {/* Overlay gradient for better text visibility on floating cards */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                </div>

                {/* Floating stats cards */}
                <motion.div
                  className="absolute top-8 right-8 bg-white dark:bg-slate-800 rounded-xl p-4 shadow-xl"
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg flex items-center justify-center">
                      <TrendingUp className="w-6 h-6 text-emerald-600" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-slate-900 dark:text-white">
                        ₹15,000
                      </div>
                      <div className="text-xs text-slate-600 dark:text-slate-400">
                        Avg. Saved
                      </div>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  className="absolute bottom-8 left-8 bg-white dark:bg-slate-800 rounded-xl p-4 shadow-xl"
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                      <Star className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-slate-900 dark:text-white">
                        4.9/5
                      </div>
                      <div className="text-xs text-slate-600 dark:text-slate-400">
                        User Rating
                      </div>
                    </div>
                  </div>
                </motion.div>
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
    </div>
  );
}
