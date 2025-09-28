"use client";
import { useState, useEffect, useRef } from "react";
import {
  Search,
  MapPin,
  Hospital,
  Shield,
  ArrowRight,
  Users,
  Stethoscope,
  Activity,
  Play,
  ChevronRight,
  Sparkles,
  Heart,
  TrendingUp,
} from "lucide-react";
import Header from "@/components/layout/Header";

export default function Home() {
  const [searchFocus, setSearchFocus] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState({});

  const heroRef = useRef(null);
  const searchCardRef = useRef(null);
  const statsRef = useRef(null);
  const cursorRef = useRef(null);
  const floatingElementsRef = useRef([]);
  const observerRef = useRef(null);

  // Intersection Observer for scroll animations
  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = entry.target.getAttribute("data-animate");
          if (entry.isIntersecting) {
            setIsVisible((prev) => ({ ...prev, [id]: true }));
          }
        });
      },
      { threshold: 0.1, rootMargin: "50px" }
    );

    // Observe elements
    const elementsToObserve = document.querySelectorAll("[data-animate]");
    elementsToObserve.forEach((el) => observerRef.current?.observe(el));

    return () => observerRef.current?.disconnect();
  }, []);

  // Initial load animations
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible((prev) => ({ ...prev, hero: true }));
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  // Mouse tracking for interactive effects
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${e.clientX - 10}px, ${
          e.clientY - 10
        }px)`;
      }
    };

    // Parallax effect
    const handleScroll = () => {
      const scrollY = window.scrollY;

      floatingElementsRef.current.forEach((element, index) => {
        if (element) {
          const speed = 0.3 + index * 0.1;
          const rotation = scrollY * 0.02;
          element.style.transform = `translateY(${
            scrollY * speed
          }px) rotate(${rotation}deg)`;
        }
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Magnetic button effect
  const handleMagneticHover = (e, isEntering) => {
    const button = e.currentTarget;

    if (isEntering) {
      button.style.transform = "scale(1.05) translateY(-5px)";
      button.style.boxShadow = "0 20px 40px rgba(16, 185, 129, 0.3)";
    } else {
      button.style.transform = "scale(1) translateY(0)";
      button.style.boxShadow = "0 10px 30px rgba(16, 185, 129, 0.15)";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 relative overflow-hidden">
      {/* Custom Cursor */}
      <div
        ref={cursorRef}
        className="fixed w-5 h-5 bg-emerald-500/30 rounded-full pointer-events-none z-50 mix-blend-difference transition-transform duration-100 ease-out"
      />

      {/* Floating Background Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            ref={(el) => (floatingElementsRef.current[i] = el)}
            className={`absolute rounded-full bg-gradient-to-r blur-xl animate-float ${
              i % 4 === 0
                ? "w-32 h-32 from-emerald-500/10 to-teal-500/10"
                : i % 4 === 1
                ? "w-24 h-24 from-blue-500/10 to-cyan-500/10"
                : i % 4 === 2
                ? "w-40 h-40 from-purple-500/8 to-pink-500/8"
                : "w-28 h-28 from-yellow-500/10 to-orange-500/10"
            }`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.7}s`,
              animationDuration: `${6 + i * 0.5}s`,
            }}
          />
        ))}
      </div>

      {/* Gradient Overlays */}
      <div
        className="fixed inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(16,185,129,0.15),transparent_50%)] pointer-events-none animate-pulse"
        style={{ animationDuration: "4s" }}
      />
      <div
        className="fixed inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(59,130,246,0.1),transparent_50%)] pointer-events-none animate-pulse"
        style={{ animationDuration: "5s", animationDelay: "2s" }}
      />

      {/* Navigation Header */}
      <Header />

      {/* Hero Section */}
      <section className="relative pt-32 pb-32 px-4">
        <div className="container mx-auto max-w-7xl">
          {/* Main Content */}
          <div
            ref={heroRef}
            data-animate="hero"
            className={`text-center max-w-5xl mx-auto mb-20 transition-all duration-1200 ease-out ${
              isVisible.hero
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-12"
            }`}
          >
            <div
              className={`inline-flex items-center px-4 py-2 rounded-full border border-emerald-200 bg-emerald-50/80 text-emerald-700 dark:border-emerald-800 dark:bg-emerald-900/20 dark:text-emerald-300 mb-8 backdrop-blur-sm transition-all duration-500 hover:scale-110 hover:shadow-lg hover:shadow-emerald-500/20 cursor-pointer ${
                isVisible.hero ? "animate-slideInDown" : ""
              }`}
              style={{ animationDelay: "0.2s" }}
            >
              <Sparkles
                className="w-4 h-4 mr-2 animate-spin"
                style={{ animationDuration: "3s" }}
              />
              Transparent Healthcare Pricing
            </div>

            <h1
              className={`text-5xl md:text-7xl lg:text-8xl font-bold mb-8 tracking-tight transition-all duration-1000 ${
                isVisible.hero ? "animate-fadeInUp" : ""
              }`}
              style={{ animationDelay: "0.4s" }}
            >
              <div className="block text-slate-900 dark:text-white mb-2 hover:scale-105 transition-transform duration-500 cursor-default">
                Know the
              </div>
              <div className="block bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-500 bg-clip-text text-transparent hover:from-emerald-500 hover:via-emerald-400 hover:to-teal-400 transition-all duration-500 cursor-default mb-2">
                cost before
              </div>
              <div className="block text-slate-900 dark:text-white hover:scale-105 transition-transform duration-500 cursor-default">
                you step in
              </div>
            </h1>

            <p
              className={`text-xl md:text-2xl text-slate-600 dark:text-slate-300 mb-12 leading-relaxed max-w-3xl mx-auto font-light transition-all duration-1000 ${
                isVisible.hero ? "animate-fadeInUp" : ""
              }`}
              style={{ animationDelay: "0.6s" }}
            >
              Compare hospital, medicine, and consultation prices across India.
              <span className="text-emerald-600 font-medium hover:text-emerald-500 transition-colors duration-300">
                {" "}
                Make informed healthcare decisions{" "}
              </span>
              with verified pricing data.
            </p>

            {/* Enhanced Search Interface */}
            <div
              ref={searchCardRef}
              className={`relative max-w-4xl mx-auto transition-all duration-1000 ${
                isVisible.hero ? "animate-slideInUp" : ""
              }`}
              style={{ animationDelay: "0.8s" }}
              onFocus={() => setSearchFocus(true)}
              onBlur={() => setSearchFocus(false)}
            >
              <div
                className={`bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20 dark:border-slate-700/50 transition-all duration-500 hover:shadow-3xl ${
                  searchFocus
                    ? "ring-2 ring-emerald-500/30 shadow-emerald-500/20 scale-102 -translate-y-2"
                    : "hover:scale-101 hover:-translate-y-1"
                }`}
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 mb-6">
                  <div className="lg:col-span-3">
                    <div className="relative">
                      <select className="w-full h-14 px-4 border border-slate-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-emerald-500/20 hover:border-emerald-300 transition-all duration-300 appearance-none bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200 cursor-pointer">
                        <option value="">Search For</option>
                        <option value="treatment">🩺 Treatment</option>
                        <option value="hospital">🏥 Hospital</option>
                        <option value="medicine">💊 Medicine</option>
                      </select>
                      <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                        <ChevronRight className="w-5 h-5 text-slate-400 rotate-90" />
                      </div>
                    </div>
                  </div>

                  <div className="lg:col-span-4 relative group">
                    <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5 group-focus-within:text-emerald-500 transition-colors duration-300" />
                    <input
                      type="text"
                      placeholder="Enter location (Delhi, Mumbai, Bangalore)"
                      className="w-full pl-12 h-14 border border-slate-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-emerald-500/20 hover:border-emerald-300 transition-all duration-300 bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200"
                    />
                  </div>

                  <div className="lg:col-span-5 relative group">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5 group-focus-within:text-emerald-500 transition-colors duration-300" />
                    <input
                      type="text"
                      placeholder="Search treatments, hospitals, medicines..."
                      className="w-full pl-12 h-14 border border-slate-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-emerald-500/20 hover:border-emerald-300 transition-all duration-300 bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200"
                    />
                  </div>
                </div>

                <button
                  className="w-full h-14 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl group relative overflow-hidden"
                  onMouseEnter={(e) => handleMagneticHover(e, true)}
                  onMouseLeave={(e) => handleMagneticHover(e, false)}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="relative flex items-center justify-center">
                    <Search className="mr-3 w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
                    Find Best Prices
                    <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                  </div>
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div
              className={`flex flex-col sm:flex-row gap-4 justify-center mt-12 transition-all duration-1000 ${
                isVisible.hero ? "animate-fadeInUp" : ""
              }`}
              style={{ animationDelay: "1s" }}
            >
              <button
                className="px-8 py-4 text-lg border-2 border-emerald-200 text-emerald-700 hover:bg-emerald-50 dark:border-emerald-800 dark:text-emerald-300 dark:hover:bg-emerald-900/20 rounded-xl group hover:scale-105 transition-all duration-300 backdrop-blur-sm"
                onMouseEnter={(e) => {
                  e.target.style.boxShadow =
                    "0 10px 30px rgba(16, 185, 129, 0.2)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.boxShadow = "none";
                }}
              >
                <div className="flex items-center">
                  <Play className="mr-2 w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                  Watch Demo
                </div>
              </button>

              <button className="px-8 py-4 text-lg text-slate-600 hover:text-emerald-600 dark:text-slate-300 dark:hover:text-emerald-400 rounded-xl group hover:scale-105 transition-all duration-300">
                <div className="flex items-center">
                  Learn More
                  <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </div>
              </button>
            </div>
          </div>

          {/* Stats Section */}
          <div
            ref={statsRef}
            data-animate="stats"
            className={`grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto transition-all duration-1000 ${
              isVisible.stats ? "animate-fadeInUp" : "opacity-0 translate-y-8"
            }`}
          >
            {[
              {
                number: "10K+",
                label: "Happy Patients",
                icon: Users,
                color: "from-blue-500 to-cyan-500",
              },
              {
                number: "500+",
                label: "Partner Hospitals",
                icon: Hospital,
                color: "from-emerald-500 to-teal-500",
              },
              {
                number: "50+",
                label: "Cities Covered",
                icon: MapPin,
                color: "from-purple-500 to-pink-500",
              },
              {
                number: "99%",
                label: "Price Accuracy",
                icon: Shield,
                color: "from-orange-500 to-red-500",
              },
            ].map((stat, index) => (
              <div
                key={index}
                className="text-center group cursor-pointer animate-scaleIn"
                style={{ animationDelay: `${1.2 + index * 0.1}s` }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform =
                    "translateY(-15px) scale(1.05)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0) scale(1)";
                }}
              >
                <div
                  className={`w-20 h-20 bg-gradient-to-br ${stat.color
                    .replace("from-", "from-")
                    .replace(
                      " to-",
                      "/20 to-"
                    )}/20 dark:from-opacity-30 dark:to-opacity-30 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-400 shadow-lg group-hover:shadow-xl`}
                >
                  <stat.icon className="w-10 h-10 text-white group-hover:scale-110 transition-transform duration-300" />
                </div>
                <div className="text-3xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-emerald-600 transition-colors duration-300">
                  {stat.number}
                </div>
                <div className="text-sm text-slate-600 dark:text-slate-400 font-medium group-hover:text-slate-700 transition-colors duration-300">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section
        data-animate="features"
        className={`py-32 px-4 bg-gradient-to-br from-emerald-50/50 via-white to-teal-50/50 dark:from-emerald-950/10 dark:via-slate-900 dark:to-teal-950/10 relative transition-all duration-1000 ${
          isVisible.features ? "animate-fadeIn" : "opacity-0"
        }`}
      >
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-20">
            <div className="inline-flex items-center px-4 py-2 rounded-full border border-emerald-200 bg-white/80 text-emerald-700 dark:border-emerald-800 dark:bg-slate-800/80 dark:text-emerald-300 mb-6 backdrop-blur-sm">
              <Shield className="w-4 h-4 mr-2" />
              Key Features
            </div>
            <h2 className="text-4xl md:text-6xl font-bold mb-6 text-slate-900 dark:text-white">
              Why choose us?
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed">
              Experience healthcare pricing like never before with our
              cutting-edge platform
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Search,
                title: "Smart Search",
                description:
                  "AI-powered search that understands your healthcare needs and finds the best options instantly.",
                gradient: "from-blue-500 to-cyan-500",
              },
              {
                icon: Shield,
                title: "Verified Prices",
                description:
                  "Every price point is verified by healthcare experts and updated in real-time for accuracy.",
                gradient: "from-emerald-500 to-teal-500",
              },
              {
                icon: Heart,
                title: "Patient First",
                description:
                  "Designed with patients in mind, making healthcare decisions transparent and stress-free.",
                gradient: "from-purple-500 to-pink-500",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className={`group cursor-pointer animate-slideInUp`}
                style={{ animationDelay: `${index * 0.2}s` }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform =
                    "translateY(-10px) scale(1.02)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0) scale(1)";
                }}
              >
                <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl p-8 h-full shadow-lg hover:shadow-2xl transition-all duration-500 border border-white/20 dark:border-slate-700/50 group-hover:shadow-emerald-500/10">
                  <div
                    className={`w-16 h-16 bg-gradient-to-br ${feature.gradient} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg`}
                  >
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 group-hover:text-emerald-600 transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed group-hover:text-slate-700 dark:group-hover:text-slate-300 transition-colors duration-300">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section
        data-animate="trust"
        className={`py-32 px-4 bg-gradient-to-r from-emerald-600 to-teal-600 relative overflow-hidden transition-all duration-1000 ${
          isVisible.trust ? "animate-slideInRight" : "opacity-0 translate-x-8"
        }`}
      >
        <div className="absolute inset-0 bg-black/10" />
        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_40%,rgba(255,255,255,0.1)_50%,transparent_60%)] animate-pulse" />

        <div className="container mx-auto max-w-6xl text-center relative z-10">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-6xl font-bold mb-8 text-white">
              Healthcare transparency you can trust
            </h2>
            <p className="text-xl md:text-2xl text-emerald-100 mb-12 leading-relaxed">
              Every price verified by healthcare experts. Every recommendation
              backed by data. Your health decisions deserve complete
              transparency.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button
                className="px-10 py-4 bg-white text-emerald-600 font-semibold text-lg rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 group"
                onMouseEnter={(e) => handleMagneticHover(e, true)}
                onMouseLeave={(e) => handleMagneticHover(e, false)}
              >
                Start Exploring
                <ArrowRight className="ml-2 w-5 h-5 inline group-hover:translate-x-1 transition-transform duration-300" />
              </button>

              <button className="px-10 py-4 border-2 border-white/30 text-white backdrop-blur-sm rounded-xl hover:bg-white/10 transition-all duration-300 group hover:scale-105">
                <Heart className="mr-2 w-5 h-5 inline group-hover:scale-110 group-hover:text-red-300 transition-all duration-300" />
                Join Community
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Insights */}
      <section
        data-animate="insights"
        className={`py-32 px-4 transition-all duration-1000 ${
          isVisible.insights ? "animate-fadeInUp" : "opacity-0 translate-y-8"
        }`}
      >
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-20">
            <div className="inline-flex items-center px-4 py-2 rounded-full border border-slate-200 bg-slate-50/80 text-slate-700 dark:border-slate-700 dark:bg-slate-800/80 dark:text-slate-300 mb-6 backdrop-blur-sm">
              <TrendingUp className="w-4 h-4 mr-2" />
              Latest Insights
            </div>
            <h2 className="text-4xl md:text-6xl font-bold mb-6 text-slate-900 dark:text-white">
              Healthcare cost insights
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
              Stay informed with our expert analysis, cost guides, and market
              trends
            </p>
          </div>

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
              <div
                key={index}
                className={`group cursor-pointer animate-scaleIn`}
                style={{ animationDelay: `${index * 0.2}s` }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform =
                    "translateY(-20px) scale(1.03)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0) scale(1)";
                }}
              >
                <div className="h-full border-0 shadow-xl hover:shadow-2xl transition-all duration-500 bg-white dark:bg-slate-800 overflow-hidden rounded-2xl group-hover:shadow-emerald-500/20">
                  <div
                    className={`h-48 bg-gradient-to-br ${insight.gradient} relative overflow-hidden group-hover:scale-105 transition-transform duration-500`}
                  >
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                      <div className="px-3 py-1 bg-white/20 text-white border border-white/30 backdrop-blur-sm rounded-full text-sm group-hover:bg-white/30 transition-all duration-300">
                        {insight.category}
                      </div>
                      <span className="text-white/90 text-sm font-medium group-hover:text-white transition-colors duration-300">
                        {insight.readTime}
                      </span>
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-bold leading-tight group-hover:text-emerald-600 transition-colors duration-300 mb-3">
                      {insight.title}
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-6 group-hover:text-slate-700 dark:group-hover:text-slate-300 transition-colors duration-300">
                      {insight.description}
                    </p>
                    <div className="flex items-center text-emerald-600 hover:text-emerald-700 font-medium cursor-pointer group-hover:text-emerald-500 transition-colors duration-300">
                      Read Article
                      <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-2 duration-300" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 dark:bg-black text-white py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div>
              <div className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent mb-4">
                HealthPricing
              </div>
              <p className="text-slate-400 leading-relaxed">
                Making healthcare pricing transparent and accessible for
                everyone across India.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <div className="space-y-2">
                <a
                  href="#"
                  className="block text-slate-400 hover:text-emerald-400 transition-colors duration-300"
                >
                  Search
                </a>
                <a
                  href="#"
                  className="block text-slate-400 hover:text-emerald-400 transition-colors duration-300"
                >
                  About
                </a>
                <a
                  href="#"
                  className="block text-slate-400 hover:text-emerald-400 transition-colors duration-300"
                >
                  Blog
                </a>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <div className="space-y-2">
                <a
                  href="#"
                  className="block text-slate-400 hover:text-emerald-400 transition-colors duration-300"
                >
                  Help Center
                </a>
                <a
                  href="#"
                  className="block text-slate-400 hover:text-emerald-400 transition-colors duration-300"
                >
                  Contact
                </a>
                <a
                  href="#"
                  className="block text-slate-400 hover:text-emerald-400 transition-colors duration-300"
                >
                  Privacy
                </a>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Connect</h4>
              <div className="space-y-2">
                <a
                  href="#"
                  className="block text-slate-400 hover:text-emerald-400 transition-colors duration-300"
                >
                  Twitter
                </a>
                <a
                  href="#"
                  className="block text-slate-400 hover:text-emerald-400 transition-colors duration-300"
                >
                  LinkedIn
                </a>
                <a
                  href="#"
                  className="block text-slate-400 hover:text-emerald-400 transition-colors duration-300"
                >
                  Instagram
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-slate-800 pt-8 text-center text-slate-400">
            <p>&copy; 2025 HealthPricing. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
            opacity: 0.7;
          }
          50% {
            transform: translateY(-30px) rotate(5deg);
            opacity: 1;
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(60px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideInDown {
          from {
            opacity: 0;
            transform: translateY(-30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(40px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        .animate-fadeInUp {
          animation: fadeInUp 1s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
        }

        .animate-fadeIn {
          animation: fadeIn 1s ease-out forwards;
        }

        .animate-slideInUp {
          animation: slideInUp 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)
            forwards;
        }

        .animate-slideInDown {
          animation: slideInDown 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)
            forwards;
        }

        .animate-slideInRight {
          animation: slideInRight 1s cubic-bezier(0.25, 0.46, 0.45, 0.94)
            forwards;
        }

        .animate-scaleIn {
          animation: scaleIn 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
        }

        .scale-102 {
          transform: scale(1.02);
        }

        .scale-101 {
          transform: scale(1.01);
        }

        .shadow-3xl {
          box-shadow: 0 35px 70px -12px rgba(0, 0, 0, 0.25);
        }

        /* Smooth transitions for all interactive elements */
        * {
          transition-property: transform, opacity, box-shadow, background-color,
            border-color, color, filter;
          transition-timing-function: cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        /* Custom scrollbar */
        ::-webkit-scrollbar {
          width: 6px;
        }

        ::-webkit-scrollbar-track {
          background: #f1f1f1;
        }

        ::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #10b981, #14b8a6);
          border-radius: 3px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #059669, #0d9488);
        }

        /* Glass morphism effect */
        .backdrop-blur-xl {
          backdrop-filter: blur(20px);
        }

        /* Gradient text animation */
        @keyframes gradientShift {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        .bg-gradient-to-r {
          background-size: 200% 200%;
          animation: gradientShift 3s ease infinite;
        }
      `}</style>
    </div>
  );
}
