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
  Calculator,
  Shield,
  CheckCircle,
  ArrowRight,
  Star,
  Users,
  Award,
  TrendingUp,
  Heart,
  Stethoscope,
  Activity,
  Zap,
  Clock,
  DollarSign,
  Play,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import Header from "@/components/layout/Header";
import KeyFeatures from "./KeyFeatures";
import HowWork from "./HowWork";
import Footer from "@/components/layout/Footer";

// Refined Animation variants
const fadeInUp = {
  hidden: {
    opacity: 0,
    y: 40,
    filter: "blur(10px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const scaleIn = {
  hidden: {
    scale: 0.9,
    opacity: 0,
    filter: "blur(10px)",
  },
  visible: {
    scale: 1,
    opacity: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

export default function Home() {
  const { theme } = useTheme();
  const [isLoaded, setIsLoaded] = useState(false);
  const [searchFocus, setSearchFocus] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      {/* Header */}
      <Header />

      {/* Subtle Background Pattern */}
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(16,185,129,0.1),transparent_70%)] pointer-events-none" />
      <div className="fixed inset-0 bg-[linear-gradient(45deg,transparent_49%,rgba(16,185,129,0.03)_50%,transparent_51%)] pointer-events-none" />

      {/* Hero Section - Refined */}
      <motion.section
        className="relative pt-24 pb-32 px-4"
        initial="hidden"
        animate={isLoaded ? "visible" : "hidden"}
        variants={staggerContainer}
      >
        <div className="container mx-auto max-w-7xl">
          {/* Main Content */}
          <div className="text-center max-w-5xl mx-auto mb-16">
            <motion.div variants={fadeInUp}>
              <Badge
                variant="outline"
                className="mb-8 px-4 py-2 text-sm border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-800 dark:bg-emerald-900/20 dark:text-emerald-300"
              >
                <Sparkles className="w-4 h-4 mr-2" />
                Transparent Healthcare Pricing
              </Badge>
            </motion.div>

            <motion.h1
              className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 tracking-tight"
              variants={fadeInUp}
            >
              <span className="block text-slate-900 dark:text-white">
                Know the
              </span>
              <span className="block bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-500 bg-clip-text text-transparent">
                cost before
              </span>
              <span className="block text-slate-900 dark:text-white">
                you step in
              </span>
            </motion.h1>

            <motion.p
              className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 mb-12 leading-relaxed max-w-3xl mx-auto font-light"
              variants={fadeInUp}
            >
              Compare hospital, medicine, and consultation prices across India.
              <span className="text-emerald-600 font-medium">
                {" "}
                Make informed healthcare decisions
              </span>{" "}
              with verified pricing data.
            </motion.p>

            {/* Enhanced Search Interface */}
            <motion.div
              className="relative max-w-4xl mx-auto"
              variants={fadeInUp}
              onFocusCapture={() => setSearchFocus(true)}
              onBlurCapture={() => setSearchFocus(false)}
            >
              <motion.div
                className={`bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-2xl border border-slate-200 dark:border-slate-700 backdrop-blur-sm transition-all duration-500 ${
                  searchFocus
                    ? "ring-2 ring-emerald-500/20 shadow-emerald-500/10"
                    : ""
                }`}
                animate={{
                  y: searchFocus ? -8 : 0,
                }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 mb-6">
                  <div className="lg:col-span-3">
                    <Select>
                      <SelectTrigger className="h-14 border-slate-200 dark:border-slate-600 focus:ring-2 focus:ring-emerald-500/20">
                        <SelectValue placeholder="Search For" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="treatment">
                          <div className="flex items-center gap-3">
                            <Stethoscope className="w-4 h-4 text-emerald-600" />
                            Treatment
                          </div>
                        </SelectItem>
                        <SelectItem value="hospital">
                          <div className="flex items-center gap-3">
                            <Hospital className="w-4 h-4 text-blue-600" />
                            Hospital
                          </div>
                        </SelectItem>
                        <SelectItem value="medicine">
                          <div className="flex items-center gap-3">
                            <Activity className="w-4 h-4 text-purple-600" />
                            Medicine
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="lg:col-span-4 relative">
                    <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                    <Input
                      placeholder="Enter location (Delhi, Mumbai, Bangalore)"
                      className="pl-12 h-14 border-slate-200 dark:border-slate-600 focus:ring-2 focus:ring-emerald-500/20"
                    />
                  </div>

                  <div className="lg:col-span-5 relative">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                    <Input
                      placeholder="Search treatments, hospitals, medicines..."
                      className="pl-12 h-14 border-slate-200 dark:border-slate-600 focus:ring-2 focus:ring-emerald-500/20"
                    />
                  </div>
                </div>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    size="lg"
                    className="w-full h-14 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <Search className="mr-3 w-5 h-5" />
                    Find Best Prices
                    <ArrowRight className="ml-3 w-5 h-5" />
                  </Button>
                </motion.div>
              </motion.div>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center mt-12"
              variants={fadeInUp}
            >
              <motion.div
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  size="lg"
                  variant="outline"
                  className="px-8 py-4 text-lg border-2 border-emerald-200 text-emerald-700 hover:bg-emerald-50 dark:border-emerald-800 dark:text-emerald-300 dark:hover:bg-emerald-900/20"
                >
                  <Play className="mr-2 w-5 h-5" />
                  Watch Demo
                </Button>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  size="lg"
                  variant="ghost"
                  className="px-8 py-4 text-lg text-slate-600 hover:text-emerald-600 dark:text-slate-300 dark:hover:text-emerald-400"
                >
                  Learn More
                  <ChevronRight className="ml-2 w-5 h-5" />
                </Button>
              </motion.div>
            </motion.div>
          </div>

          {/* Stats Section */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto"
            variants={staggerContainer}
          >
            {[
              { number: "10K+", label: "Happy Patients", icon: Users },
              { number: "500+", label: "Partner Hospitals", icon: Hospital },
              { number: "50+", label: "Cities Covered", icon: MapPin },
              { number: "99%", label: "Price Accuracy", icon: Shield },
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="text-center group"
                variants={scaleIn}
                whileHover={{ y: -5 }}
              >
                <div className="w-16 h-16 bg-gradient-to-br from-emerald-100 to-teal-100 dark:from-emerald-900/30 dark:to-teal-900/30 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <stat.icon className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
                </div>
                <div className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
                  {stat.number}
                </div>
                <div className="text-sm text-slate-600 dark:text-slate-400 font-medium">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Key Features */}
      <KeyFeatures />

      {/* How It Works */}
      <HowWork />

      {/* Trust & Safety - Minimal */}
      <motion.section
        className="py-24 px-4 bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-950/20 dark:to-teal-950/20"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={staggerContainer}
      >
        <div className="container mx-auto max-w-6xl text-center">
          <motion.div variants={fadeInUp} className="max-w-3xl mx-auto">
            <Badge
              variant="outline"
              className="mb-6 px-4 py-2 border-emerald-200 bg-white text-emerald-700 dark:border-emerald-800 dark:bg-slate-900 dark:text-emerald-300"
            >
              <Shield className="w-4 h-4 mr-2" />
              Trusted & Verified
            </Badge>

            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-slate-900 dark:text-white">
              Healthcare transparency you can trust
            </h2>

            <p className="text-xl text-slate-600 dark:text-slate-300 mb-12 leading-relaxed">
              Every price verified by healthcare experts. Every recommendation
              backed by data. Your health decisions deserve complete
              transparency.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  size="lg"
                  className="px-8 py-4 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-semibold shadow-lg"
                >
                  Start Exploring
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  size="lg"
                  variant="outline"
                  className="px-8 py-4 border-2 border-emerald-200 text-emerald-700 hover:bg-emerald-50 dark:border-emerald-800 dark:text-emerald-300"
                >
                  <Heart className="mr-2 w-5 h-5" />
                  Join Community
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Latest Insights - Refined */}
      <motion.section
        className="py-24 px-4"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={staggerContainer}
      >
        <div className="container mx-auto max-w-6xl">
          <motion.div className="text-center mb-16" variants={fadeInUp}>
            <Badge
              variant="outline"
              className="mb-6 px-4 py-2 border-slate-200 bg-slate-50 text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
            >
              <TrendingUp className="w-4 h-4 mr-2" />
              Latest Insights
            </Badge>

            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-slate-900 dark:text-white">
              Healthcare cost insights
            </h2>

            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
              Stay informed with our expert analysis, cost guides, and market
              trends
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Appendix Surgery Cost in Delhi — 2025 Guide",
                category: "Cost Guide",
                description:
                  "Complete breakdown of appendectomy costs across major hospitals in Delhi, including insurance coverage options.",
                readTime: "5 min read",
                gradient: "from-blue-500 to-cyan-500",
              },
              {
                title: "How to Choose the Right Health Insurance Plan",
                category: "Analysis",
                description:
                  "Expert tips on selecting health insurance that covers your needs while minimizing out-of-pocket costs.",
                readTime: "8 min read",
                gradient: "from-emerald-500 to-teal-500",
              },
              {
                title: "Healthcare Price Transparency: What's New in 2025",
                category: "Trends",
                description:
                  "Latest regulations and how they're making healthcare pricing more transparent for patients.",
                readTime: "6 min read",
                gradient: "from-purple-500 to-pink-500",
              },
            ].map((insight, index) => (
              <motion.div
                key={index}
                variants={scaleIn}
                whileHover={{ y: -10, scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white dark:bg-slate-800 overflow-hidden group">
                  <div
                    className={`h-48 bg-gradient-to-br ${insight.gradient} relative overflow-hidden`}
                  >
                    <div className="absolute inset-0 bg-black/20" />
                    <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                      <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-sm">
                        {insight.category}
                      </Badge>
                      <span className="text-white/80 text-sm font-medium">
                        {insight.readTime}
                      </span>
                    </div>
                  </div>

                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg leading-tight group-hover:text-emerald-600 transition-colors duration-300">
                      {insight.title}
                    </CardTitle>
                  </CardHeader>

                  <CardContent className="flex-1 flex flex-col">
                    <CardDescription className="text-slate-600 dark:text-slate-400 leading-relaxed flex-1 mb-6">
                      {insight.description}
                    </CardDescription>

                    <motion.div
                      whileHover={{ x: 5 }}
                      className="flex items-center text-emerald-600 hover:text-emerald-700 font-medium cursor-pointer group"
                    >
                      Read Article
                      <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </motion.div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
