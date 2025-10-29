"use client";

import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import {
  ArrowLeft,
  Shield,
  Award,
  Zap,
  Search,
  MapPin,
  Star,
  TrendingDown,
  Phone,
  Clock,
  CheckCircle,
  Filter,
  ChevronDown,
  Heart,
  Share2,
} from "lucide-react";
import Header from "@/components/layout/Header";
import { Button } from "@/components/ui/button";

export default function ExplorePage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;

  const [selectedFilter, setSelectedFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const pageData: Record<string, any> = {
    "medicine-pricing": {
      title: "Medicine Pricing",
      subtitle: "100% Transparent Costs",
      description:
        "Compare prices from 500+ pharmacies instantly. No hidden markups or surprise charges.",
      icon: Shield,
      gradient: "from-cyan-400 to-teal-500",
      bgGradient: "from-cyan-50 to-teal-50",
      darkBgGradient: "from-cyan-950/30 to-teal-950/30",
      image: "/api/placeholder/1200/400",
      stats: [
        { label: "Pharmacies", value: "500+", icon: MapPin },
        { label: "Medicines", value: "10,000+", icon: Shield },
        { label: "Avg Savings", value: "₹299", icon: TrendingDown },
        { label: "User Rating", value: "4.8/5", icon: Star },
      ],
      features: [
        "Real-time price comparison across 500+ pharmacies",
        "Generic alternatives suggestions to save more",
        "Price alerts for your regular medications",
        "Home delivery from trusted pharmacies",
        "Verified pharmacy reviews and ratings",
        "Prescription upload and verification",
      ],
      providers: [
        {
          name: "Apollo Pharmacy",
          price: "₹450",
          discount: "15% OFF",
          rating: 4.8,
          distance: "2.3 km",
          delivery: "Same Day",
        },
        {
          name: "MedPlus",
          price: "₹425",
          discount: "20% OFF",
          rating: 4.7,
          distance: "1.8 km",
          delivery: "2 Hours",
        },
        {
          name: "Netmeds",
          price: "₹399",
          discount: "25% OFF",
          rating: 4.9,
          distance: "3.5 km",
          delivery: "Next Day",
        },
        {
          name: "1mg",
          price: "₹410",
          discount: "18% OFF",
          rating: 4.6,
          distance: "2.8 km",
          delivery: "Same Day",
        },
        {
          name: "PharmEasy",
          price: "₹435",
          discount: "16% OFF",
          rating: 4.8,
          distance: "1.2 km",
          delivery: "4 Hours",
        },
        {
          name: "Wellness Forever",
          price: "₹445",
          discount: "12% OFF",
          rating: 4.5,
          distance: "4.1 km",
          delivery: "Next Day",
        },
      ],
    },
    "diagnostic-tests": {
      title: "Diagnostic Tests",
      subtitle: "Clear Lab Pricing",
      description:
        "1000+ tests with upfront pricing. Compare labs and book with confidence.",
      icon: Award,
      gradient: "from-teal-400 to-cyan-500",
      bgGradient: "from-teal-50 to-cyan-50",
      darkBgGradient: "from-teal-950/30 to-cyan-950/30",
      image: "/api/placeholder/1200/400",
      stats: [
        { label: "Test Types", value: "1,000+", icon: Award },
        { label: "Labs", value: "200+", icon: MapPin },
        { label: "Avg Savings", value: "₹500", icon: TrendingDown },
        { label: "Accuracy", value: "99.9%", icon: CheckCircle },
      ],
      features: [
        "Compare prices across 200+ NABL certified labs",
        "Home sample collection available",
        "Reports within 24-48 hours",
        "Doctor consultation included",
        "Package deals for comprehensive health checks",
        "Digital reports with lifetime access",
      ],
      providers: [
        {
          name: "Dr. Lal PathLabs",
          price: "₹1,200",
          discount: "30% OFF",
          rating: 4.9,
          distance: "1.5 km",
          delivery: "24 Hours",
        },
        {
          name: "Thyrocare",
          price: "₹980",
          discount: "40% OFF",
          rating: 4.7,
          distance: "3.2 km",
          delivery: "48 Hours",
        },
        {
          name: "Metropolis Healthcare",
          price: "₹1,150",
          discount: "35% OFF",
          rating: 4.8,
          distance: "2.1 km",
          delivery: "24 Hours",
        },
        {
          name: "Redcliffe Labs",
          price: "₹1,050",
          discount: "38% OFF",
          rating: 4.6,
          distance: "2.8 km",
          delivery: "36 Hours",
        },
        {
          name: "Healthians",
          price: "₹1,100",
          discount: "32% OFF",
          rating: 4.7,
          distance: "1.9 km",
          delivery: "24 Hours",
        },
      ],
    },
    "insurance-claims": {
      title: "Insurance Claims",
      subtitle: "Zero Confusion",
      description:
        "Track every rupee covered. Real-time claim status with complete transparency.",
      icon: Zap,
      gradient: "from-sky-400 to-teal-500",
      bgGradient: "from-sky-50 to-teal-50",
      darkBgGradient: "from-sky-950/30 to-teal-950/30",
      image: "/api/placeholder/1200/400",
      stats: [
        { label: "Claim Success", value: "95%", icon: CheckCircle },
        { label: "Avg Processing", value: "7 Days", icon: Clock },
        { label: "Insurers", value: "50+", icon: Shield },
        { label: "Claims Tracked", value: "10,000+", icon: Zap },
      ],
      features: [
        "Real-time claim status tracking",
        "Document checklist and verification",
        "AI-powered claim assistance",
        "Direct hospital cashless approval",
        "Reimbursement timeline updates",
        "Expert support for claim disputes",
      ],
      providers: [
        {
          name: "HDFC ERGO",
          price: "Cashless",
          discount: "95% Success",
          rating: 4.8,
          distance: "Network",
          delivery: "5-7 Days",
        },
        {
          name: "ICICI Lombard",
          price: "Cashless",
          discount: "92% Success",
          rating: 4.7,
          distance: "Network",
          delivery: "6-8 Days",
        },
        {
          name: "Star Health",
          price: "Cashless",
          discount: "94% Success",
          rating: 4.9,
          distance: "Network",
          delivery: "4-6 Days",
        },
        {
          name: "Care Health",
          price: "Cashless",
          discount: "91% Success",
          rating: 4.6,
          distance: "Network",
          delivery: "7-10 Days",
        },
      ],
    },
    "hospital-bills": {
      title: "Hospital Bills",
      subtitle: "Every Charge Explained",
      description:
        "Detailed itemized bills. Challenge unfair charges and save thousands.",
      icon: Shield,
      gradient: "from-cyan-400 to-sky-500",
      bgGradient: "from-cyan-50 to-sky-50",
      darkBgGradient: "from-cyan-950/30 to-sky-950/30",
      image: "/api/placeholder/1200/400",
      stats: [
        { label: "Bills Audited", value: "5,000+", icon: CheckCircle },
        { label: "Avg Savings", value: "₹15,000", icon: TrendingDown },
        { label: "Success Rate", value: "88%", icon: Star },
        { label: "Hospitals", value: "300+", icon: MapPin },
      ],
      features: [
        "Line-by-line bill analysis",
        "Identify overcharges and errors",
        "Compare with standard pricing",
        "Dispute resolution support",
        "Insurance claim optimization",
        "Detailed cost breakdown reports",
      ],
      providers: [
        {
          name: "Apollo Hospitals",
          price: "₹45,000",
          discount: "Premium",
          rating: 4.9,
          distance: "3.2 km",
          delivery: "Emergency",
        },
        {
          name: "Fortis Healthcare",
          price: "₹42,000",
          discount: "Standard",
          rating: 4.8,
          distance: "2.5 km",
          delivery: "24x7",
        },
        {
          name: "Max Healthcare",
          price: "₹48,000",
          discount: "Premium",
          rating: 4.9,
          distance: "4.1 km",
          delivery: "Emergency",
        },
        {
          name: "Manipal Hospitals",
          price: "₹40,000",
          discount: "Standard",
          rating: 4.7,
          distance: "3.8 km",
          delivery: "24x7",
        },
      ],
    },
    "surgery-packages": {
      title: "Surgery Packages",
      subtitle: "All-Inclusive Pricing",
      description:
        "200+ procedures with fixed costs. No hidden charges, post-op care included.",
      icon: Award,
      gradient: "from-teal-400 to-cyan-500",
      bgGradient: "from-teal-50 to-cyan-50",
      darkBgGradient: "from-teal-950/30 to-cyan-950/30",
      image: "/api/placeholder/1200/400",
      stats: [
        { label: "Procedures", value: "200+", icon: Award },
        { label: "Hospitals", value: "150+", icon: MapPin },
        { label: "Avg Savings", value: "₹25,000", icon: TrendingDown },
        { label: "Success Rate", value: "98%", icon: CheckCircle },
      ],
      features: [
        "Fixed all-inclusive package pricing",
        "Pre and post-operative care covered",
        "Top surgeons and specialists",
        "Private room accommodation",
        "Follow-up consultations included",
        "No hidden charges guarantee",
      ],
      providers: [
        {
          name: "Apollo Hospitals",
          price: "₹1,85,000",
          discount: "Package",
          rating: 4.9,
          distance: "3.2 km",
          delivery: "Scheduled",
        },
        {
          name: "Fortis Healthcare",
          price: "₹1,75,000",
          discount: "Package",
          rating: 4.8,
          distance: "2.5 km",
          delivery: "Scheduled",
        },
        {
          name: "Max Healthcare",
          price: "₹1,95,000",
          discount: "Premium",
          rating: 4.9,
          distance: "4.1 km",
          delivery: "Scheduled",
        },
        {
          name: "Manipal Hospitals",
          price: "₹1,65,000",
          discount: "Standard",
          rating: 4.7,
          distance: "3.8 km",
          delivery: "Scheduled",
        },
      ],
    },
    "price-comparison": {
      title: "Price Comparison",
      subtitle: "Smart Decisions",
      description:
        "50K+ prices updated daily. Side-by-side comparison across providers.",
      icon: Zap,
      gradient: "from-sky-400 to-cyan-500",
      bgGradient: "from-sky-50 to-cyan-50",
      darkBgGradient: "from-sky-950/30 to-cyan-950/30",
      image: "/api/placeholder/1200/400",
      stats: [
        { label: "Price Points", value: "50,000+", icon: Zap },
        { label: "Daily Updates", value: "Real-time", icon: Clock },
        { label: "Providers", value: "1,000+", icon: MapPin },
        { label: "Comparisons", value: "100K+", icon: TrendingDown },
      ],
      features: [
        "Real-time price updates across all categories",
        "Side-by-side provider comparison",
        "Quality and rating metrics",
        "Distance and availability filters",
        "Price history and trends",
        "Smart recommendation engine",
      ],
      providers: [
        {
          name: "HealthBuddy Plus",
          price: "Free",
          discount: "All Features",
          rating: 4.9,
          distance: "Online",
          delivery: "Instant",
        },
        {
          name: "Premium Analytics",
          price: "₹999/mo",
          discount: "Advanced",
          rating: 4.8,
          distance: "Online",
          delivery: "Instant",
        },
        {
          name: "Enterprise Suite",
          price: "₹4,999/mo",
          discount: "Enterprise",
          rating: 4.9,
          distance: "Online",
          delivery: "Instant",
        },
      ],
    },
  };

  const currentPage = pageData[slug] || pageData["medicine-pricing"];
  const Icon = currentPage.icon;

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-slate-50 to-white dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      {/* Hero Section */}
      <Header />
      <section className="relative pt-24 pb-16 px-4 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 pointer-events-none">
          <div
            className={`absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-r ${currentPage.gradient} opacity-10 rounded-full blur-3xl`}
          />
          <div
            className={`absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-r ${currentPage.gradient} opacity-10 rounded-full blur-3xl`}
          />
        </div>

        <div className="container mx-auto max-w-7xl relative z-10">
          {/* Back Button */}
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 mb-8 transition-colors group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span className="font-semibold">Back to Gallery</span>
          </button>

          {/* Hero Content */}
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <div
                className={`inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r ${currentPage.bgGradient} dark:${currentPage.darkBgGradient} border-2 border-cyan-200 dark:border-cyan-700 rounded-full mb-6 font-bold text-sm shadow-xl backdrop-blur-sm`}
              >
                <Icon className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
                <span
                  className={`bg-gradient-to-r ${currentPage.gradient} bg-clip-text text-transparent`}
                >
                  {currentPage.subtitle}
                </span>
              </div>

              <h1 className="text-5xl md:text-6xl font-black mb-6 leading-tight">
                <span
                  className={`bg-gradient-to-r ${currentPage.gradient} bg-clip-text text-transparent`}
                >
                  {currentPage.title}
                </span>
              </h1>

              <p className="text-xl text-slate-600 dark:text-slate-300 mb-8 leading-relaxed">
                {currentPage.description}
              </p>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {currentPage.stats.map((stat: any, index: number) => {
                  const StatIcon = stat.icon;
                  return (
                    <div
                      key={index}
                      className="bg-white dark:bg-slate-800 rounded-2xl p-4 shadow-lg border border-slate-200 dark:border-slate-700"
                    >
                      <StatIcon
                        className={`w-6 h-6 bg-gradient-to-r ${currentPage.gradient} bg-clip-text text-transparent mb-2`}
                      />
                      <div className="text-2xl font-black text-slate-800 dark:text-slate-200">
                        {stat.value}
                      </div>
                      <div className="text-xs text-slate-600 dark:text-slate-400 font-semibold">
                        {stat.label}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Hero Image */}
            <div className="relative">
              <div
                className={`absolute -inset-4 bg-gradient-to-r ${currentPage.gradient} rounded-3xl blur-2xl opacity-20`}
              />
              <img
                src={currentPage.image}
                alt={currentPage.title}
                className="relative rounded-3xl shadow-2xl border-4 border-white dark:border-slate-800"
              />
            </div>
          </div>

          {/* Search and Filters */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-xl border border-slate-200 dark:border-slate-700 mb-12">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search Bar */}
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  placeholder={`Search ${currentPage.title.toLowerCase()}...`}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-slate-50 dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-700 rounded-xl focus:border-cyan-500 dark:focus:border-cyan-400 outline-none transition-colors text-slate-800 dark:text-slate-200"
                />
              </div>

              {/* Filter Buttons */}
              <div className="flex gap-2">
                <button
                  className={`px-6 py-3 rounded-xl font-bold transition-all ${
                    selectedFilter === "all"
                      ? `bg-gradient-to-r ${currentPage.gradient} text-white`
                      : "bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300"
                  }`}
                >
                  All
                </button>
                <button
                  className={`px-6 py-3 rounded-xl font-bold transition-all ${
                    selectedFilter === "nearby"
                      ? `bg-gradient-to-r ${currentPage.gradient} text-white`
                      : "bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300"
                  }`}
                >
                  Nearby
                </button>
                <button className="px-6 py-3 bg-slate-100 dark:bg-slate-700 rounded-xl font-bold text-slate-700 dark:text-slate-300 flex items-center gap-2 hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors">
                  <Filter className="w-4 h-4" />
                  Filters
                </button>
              </div>
            </div>
          </div>

          {/* Features Grid */}
          <div className="mb-16">
            <h2 className="text-3xl font-black text-slate-800 dark:text-slate-200 mb-8">
              Key Features
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentPage.features.map((feature: string, index: number) => (
                <div
                  key={index}
                  className="flex items-start gap-4 bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border border-slate-200 dark:border-slate-700 hover:shadow-xl transition-shadow"
                >
                  <div
                    className={`w-10 h-10 rounded-xl bg-gradient-to-r ${currentPage.gradient} flex items-center justify-center flex-shrink-0`}
                  >
                    <CheckCircle className="w-5 h-5 text-white" />
                  </div>
                  <p className="text-slate-700 dark:text-slate-300 font-medium">
                    {feature}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Providers List */}
          <div>
            <h2 className="text-3xl font-black text-slate-800 dark:text-slate-200 mb-8">
              Available Providers
            </h2>
            <div className="space-y-4">
              {currentPage.providers.map((provider: any, index: number) => (
                <div
                  key={index}
                  className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border border-slate-200 dark:border-slate-700 hover:shadow-xl transition-all group"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-3">
                        <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200">
                          {provider.name}
                        </h3>
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                          <span className="font-bold text-slate-700 dark:text-slate-300">
                            {provider.rating}
                          </span>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-4 text-sm text-slate-600 dark:text-slate-400">
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4" />
                          <span>{provider.distance}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4" />
                          <span>{provider.delivery}</span>
                        </div>
                        <div
                          className={`px-3 py-1 bg-gradient-to-r ${currentPage.bgGradient} dark:${currentPage.darkBgGradient} rounded-full font-bold`}
                        >
                          {provider.discount}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <div
                          className={`text-3xl font-black bg-gradient-to-r ${currentPage.gradient} bg-clip-text text-transparent`}
                        >
                          {provider.price}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-700 flex items-center justify-center hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors">
                          <Heart className="w-5 h-5 text-slate-600 dark:text-slate-400" />
                        </Button>
                        <Button className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-700 flex items-center justify-center hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors">
                          <Share2 className="w-5 h-5 text-slate-600 dark:text-slate-400" />
                        </Button>
                        <Button
                          className={`px-6 py-3 bg-gradient-to-r ${currentPage.gradient} text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1`}
                        >
                          Book Now
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
