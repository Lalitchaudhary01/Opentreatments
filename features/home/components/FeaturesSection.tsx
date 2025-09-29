import React, { useEffect, useRef, useState } from "react";
import {
  DollarSign,
  Shield,
  Award,
  Sparkles,
  CheckCircle,
  ArrowRight,
} from "lucide-react";

export default function FeaturesSection() {
  const cardsRef = useRef([]);
  const [hoveredCard, setHoveredCard] = useState(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add("animate-in");
            }, index * 150);
          }
        });
      },
      { threshold: 0.1, rootMargin: "50px" }
    );

    cardsRef.current.forEach((card) => {
      if (card) observer.observe(card);
    });

    return () => observer.disconnect();
  }, []);

  const features = [
    {
      icon: DollarSign,
      title: "Compare Prices",
      description: "See real-time pricing from 500+ hospitals across India",
      image:
        "https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=800&q=80",
      gradient: "from-cyan-600/20 via-teal-500/10 to-cyan-400/20",
      darkGradient: "from-cyan-800/30 via-teal-700/20 to-cyan-600/30",
      borderGradient: "from-cyan-400 to-teal-500",
      badge: "Most Popular",
      stats: "500+ Hospitals",
    },
    {
      icon: Shield,
      title: "Verified Data",
      description: "All prices verified by healthcare experts for accuracy",
      image:
        "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=80",
      gradient: "from-teal-600/20 via-cyan-500/10 to-teal-400/20",
      darkGradient: "from-teal-800/30 via-cyan-700/20 to-teal-600/30",
      borderGradient: "from-teal-400 to-cyan-500",
      badge: "Trusted",
      stats: "100% Verified",
    },
    {
      icon: Award,
      title: "Best Value",
      description: "Find quality healthcare at prices that fit your budget",
      image:
        "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&q=80",
      gradient: "from-sky-600/20 via-teal-500/10 to-sky-400/20",
      darkGradient: "from-sky-800/30 via-teal-700/20 to-sky-600/30",
      borderGradient: "from-sky-400 to-teal-500",
      badge: "Premium",
      stats: "Top Quality",
    },
  ];

  return (
    <section className="relative py-24 px-4 overflow-hidden bg-gradient-to-b from-white via-slate-50 to-white dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-20 -left-20 w-80 h-80 bg-gradient-to-r from-cyan-400/10 to-teal-400/10 dark:from-cyan-600/20 dark:to-teal-600/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 -right-20 w-80 h-80 bg-gradient-to-r from-teal-500/10 to-sky-400/10 dark:from-teal-600/20 dark:to-sky-600/20 rounded-full blur-3xl animate-float-delayed" />
      </div>

      <div className="container mx-auto max-w-7xl relative z-10">
        {/* Header Section */}
        <div className="text-center mb-16 opacity-0 translate-y-12 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-cyan-50 via-white to-teal-50 dark:from-cyan-900/30 dark:via-slate-800/50 dark:to-teal-900/30 border-2 border-cyan-200 dark:border-cyan-700 text-teal-800 dark:text-teal-200 rounded-full mb-6 font-bold text-sm shadow-lg backdrop-blur-sm">
            <Sparkles className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
            <span className="bg-gradient-to-r from-cyan-700 to-teal-700 dark:from-cyan-300 dark:to-teal-300 bg-clip-text text-transparent">
              Why Choose Us
            </span>
          </div>
          <h2 className="text-5xl md:text-6xl font-black mb-6 bg-gradient-to-r from-slate-800 via-teal-700 to-cyan-700 dark:from-slate-100 dark:via-teal-300 dark:to-cyan-300 bg-clip-text text-transparent leading-tight tracking-tight">
            Healthcare Made Simple
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed font-medium">
            Everything you need to make informed healthcare decisions with
            complete transparency
          </p>
        </div>

        {/* Vertical Flow Cards Layout */}
        <div className="relative max-w-4xl mx-auto">
          {/* Connecting Lines */}
          <div className="absolute left-1/2 top-0 bottom-0 w-1 transform -translate-x-1/2 z-0 hidden md:block">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-cyan-400 via-teal-400 to-sky-400 dark:from-cyan-600 dark:via-teal-600 dark:to-sky-600 opacity-60 rounded-full" />
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-cyan-400 via-teal-400 to-sky-400 dark:from-cyan-600 dark:via-teal-600 dark:to-sky-600 opacity-20 blur-sm rounded-full" />
          </div>

          {/* Connection Dots */}
          <div className="absolute left-1/2 transform -translate-x-1/2 z-10 hidden md:block">
            <div className="absolute top-1/4 w-4 h-4 bg-cyan-500 dark:bg-cyan-600 rounded-full border-4 border-white dark:border-slate-800 shadow-lg" />
            <div className="absolute top-1/2 w-4 h-4 bg-teal-500 dark:bg-teal-600 rounded-full border-4 border-white dark:border-slate-800 shadow-lg" />
            <div className="absolute top-3/4 w-4 h-4 bg-sky-500 dark:bg-sky-600 rounded-full border-4 border-white dark:border-slate-800 shadow-lg" />
          </div>

          <div className="space-y-8 md:space-y-16 relative z-10">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              const isEven = index % 2 === 0;

              return (
                <div
                  key={index}
                  ref={(el) => (cardsRef.current[index] = el)}
                  className={`feature-card opacity-0 translate-y-16 flex ${
                    isEven ? "md:justify-start" : "md:justify-end"
                  }`}
                  onMouseEnter={() => setHoveredCard(index)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  <div
                    className={`w-full md:w-5/6 lg:w-2/3 ${
                      isEven ? "md:pr-8" : "md:pl-8"
                    }`}
                  >
                    <div className="relative group h-full rounded-3xl overflow-hidden bg-white dark:bg-slate-800 shadow-2xl hover:shadow-4xl dark:hover:shadow-4xl-dark transition-all duration-700 border border-slate-200/50 dark:border-slate-700/50">
                      {/* Card Image with Gradient Overlay */}
                      <div className="absolute inset-0 h-48 overflow-hidden">
                        <img
                          src={feature.image}
                          alt={feature.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div
                          className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} dark:${feature.darkGradient} mix-blend-overlay`}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-white via-white/50 to-transparent dark:from-slate-800 dark:via-slate-800/50" />
                      </div>

                      {/* Hover Gradient Effect */}
                      <div
                        className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${feature.borderGradient} opacity-0 group-hover:opacity-50 dark:group-hover:opacity-30 blur-xl transition-opacity duration-500 -z-10`}
                      />

                      {/* Card Content */}
                      <div className="relative p-6 h-full flex flex-col min-h-[400px]">
                        <div className="mt-36 space-y-4 flex-grow">
                          <div className="flex items-center justify-between mb-4">
                            <span
                              className={`px-3 py-1.5 bg-gradient-to-r ${feature.borderGradient} text-white text-xs font-bold rounded-full shadow-lg transform group-hover:scale-105 transition-transform duration-300`}
                            >
                              {feature.badge}
                            </span>
                            <div
                              className={`w-10 h-10 rounded-full bg-gradient-to-r ${feature.borderGradient} flex items-center justify-center shadow-lg transform group-hover:rotate-12 transition-transform duration-300`}
                            >
                              <IconComponent className="w-5 h-5 text-white" />
                            </div>
                          </div>

                          <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-2">
                            {feature.title}
                          </h3>
                          <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-sm font-medium">
                            {feature.description}
                          </p>
                        </div>

                        {/* Card Footer */}
                        <div className="space-y-4 mt-auto">
                          <div className="flex items-center gap-2 p-3 bg-gradient-to-r from-cyan-50 to-teal-50 dark:from-cyan-900/30 dark:to-teal-900/30 rounded-xl border border-cyan-200/50 dark:border-cyan-700/50">
                            <CheckCircle className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                            <span className="text-xs font-bold text-slate-700 dark:text-slate-200">
                              {feature.stats}
                            </span>
                          </div>

                          <button
                            className={`w-full py-3 px-5 bg-gradient-to-r ${feature.borderGradient} text-white font-bold rounded-xl shadow-lg hover:shadow-2xl dark:hover:shadow-2xl-dark transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 flex items-center justify-center gap-2 group/btn relative overflow-hidden`}
                          >
                            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000" />
                            <span className="relative text-sm">Learn More</span>
                            <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform relative" />
                          </button>
                        </div>
                      </div>

                      {/* Shimmer Effect on Hover */}
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-200/20 dark:via-cyan-400/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1200" />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(60px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
            opacity: 0.1;
          }
          50% {
            transform: translateY(-15px) rotate(3deg);
            opacity: 0.15;
          }
        }

        .animate-fade-in-up {
          animation: fadeInUp 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
        }

        .feature-card.animate-in {
          animation: fadeInUp 1s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
        }

        .feature-card {
          transition: transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        .feature-card:hover {
          transform: translateY(-12px) scale(1.02);
        }

        .animate-float {
          animation: float 10s ease-in-out infinite;
        }

        .animate-float-delayed {
          animation: float 10s ease-in-out 5s infinite;
        }

        .shadow-4xl {
          box-shadow: 0 40px 80px -12px rgba(0, 0, 0, 0.15),
            0 0 0 1px rgba(255, 255, 255, 0.05);
        }

        .dark .shadow-4xl-dark {
          box-shadow: 0 40px 80px -12px rgba(0, 0, 0, 0.4),
            0 0 0 1px rgba(255, 255, 255, 0.05);
        }

        .dark .hover\:shadow-2xl-dark:hover {
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
        }
      `}</style>
    </section>
  );
}
