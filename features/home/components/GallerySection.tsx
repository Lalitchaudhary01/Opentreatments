import React, { useEffect, useRef, useState } from "react";
import {
  CheckCircle,
  TrendingDown,
  ArrowRight,
  Sparkles,
  Shield,
  Award,
  Zap,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const GallerySection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Canvas animation code (same as before)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: any[] = [];
    const particleCount = 60;

    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;
      color: string;
      pulse: number;
      
      constructor() {
        this.x = Math.random() * canvas!.width;
        this.y = Math.random() * canvas!.height;
        this.size = Math.random() * 3 + 1;
        this.speedX = Math.random() * 0.8 - 0.4;
        this.speedY = Math.random() * 0.8 - 0.4;
        this.opacity = Math.random() * 0.5 + 0.3;
        this.color =
          Math.random() > 0.6
            ? "34, 211, 238"
            : Math.random() > 0.3
            ? "20, 184, 166"
            : "6, 182, 212";
        this.pulse = Math.random() * Math.PI * 2;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.pulse += 0.02;

        if (this.x > canvas!.width) this.x = 0;
        if (this.x < 0) this.x = canvas!.width;
        if (this.y > canvas!.height) this.y = 0;
        if (this.y < 0) this.y = canvas!.height;

        this.opacity = 0.3 + Math.sin(this.pulse) * 0.2;
      }

      draw() {
        const gradient = ctx!.createRadialGradient(
          this.x,
          this.y,
          0,
          this.x,
          this.y,
          this.size * 2
        );
        gradient.addColorStop(0, `rgba(${this.color}, ${this.opacity})`);
        gradient.addColorStop(1, `rgba(${this.color}, 0)`);

        ctx!.fillStyle = gradient;
        ctx!.beginPath();
        ctx!.arc(this.x, this.y, this.size * 2, 0, Math.PI * 2);
        ctx!.fill();
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    function animate() {
      ctx!.clearRect(0, 0, canvas!.width, canvas!.height);

      particles.forEach((particle) => {
        particle.update();
        particle.draw();
      });

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 120) {
            ctx!.strokeStyle = `rgba(${particles[i].color}, ${
              0.15 * (1 - distance / 120)
            })`;
            ctx!.lineWidth = 1.5;
            ctx!.beginPath();
            ctx!.moveTo(particles[i].x, particles[i].y);
            ctx!.lineTo(particles[j].x, particles[j].y);
            ctx!.stroke();
          }
        }
      }

      requestAnimationFrame(animate);
    }

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Intersection Observer
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

  // Gallery items data
  const galleryItems = [
    {
      title: "Medicine Pricing",
      subtitle: "100% Transparent Costs",
      description:
        "Compare prices from 500+ pharmacies instantly. No hidden markups or surprise charges.",
      stats: "Save ₹299 avg per prescription",
      savings: "Up to 70% OFF",
      image: "/images/medicines.png",
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
      image: "/images/diagnostics.png",
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
      image: "/hero.png",
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
      image: "/images/hospital.png",
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
      image: "/images/surgery.png",
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
      image: "/hero.png",
      icon: Zap,
      badge: "Live Data",
      bgGradient: "from-sky-600/20 via-cyan-500/10 to-sky-400/20",
      borderGradient: "from-sky-400 to-cyan-500",
    },
  ];

  // Carousel navigation functions
  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === galleryItems.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? galleryItems.length - 1 : prevIndex - 1
    );
  };

  // Auto-play carousel
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-16 px-3 overflow-hidden bg-gradient-to-b from-slate-50 via-white to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950"
    >
      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-40"
      />

      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-32 -left-32 w-96 h-96 bg-gradient-to-r from-cyan-400/15 to-teal-400/15 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-32 -right-32 w-96 h-96 bg-gradient-to-r from-teal-500/15 to-sky-400/15 rounded-full blur-3xl animate-float-delayed" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-cyan-500/5 to-teal-500/5 rounded-full blur-3xl animate-pulse-luxury" />
      </div>

      <div className="container mt-0 max-w-7xl relative z-10">
        <div className="text-center mb-24 opacity-0 translate-y-12 animate-fade-in-up">
          <div className="inline-flex  items-center gap-3 px-6 py-3 bg-gradient-to-r from-cyan-50 via-white to-teal-50 border-2 border-cyan-200 text-teal-800 rounded-full mb-8 font-bold text-sm shadow-xl backdrop-blur-sm">
            <CheckCircle className="w-5 h-5 text-cyan-600" />
            <span className="bg-gradient-to-r from-cyan-700 to-teal-700 bg-clip-text text-transparent">
              100% Transparency Guaranteed
            </span>
          </div>
          <h2 className="text-6xl md:text-7xl font-black mb-8 bg-gradient-to-r from-slate-800 via-teal-700 to-cyan-700 dark:from-slate-100 dark:via-teal-400 dark:to-cyan-400 bg-clip-text text-transparent leading-tight tracking-tight">
            Healthcare Without
            <br />
            <span className="bg-gradient-to-r from-cyan-600 to-teal-600 dark:from-cyan-400 dark:to-teal-400 bg-clip-text text-transparent">
              Hidden Costs
            </span>
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-4xl mx-auto leading-relaxed font-medium">
            Every rupee accounted for. Compare prices, understand bills, and
            save thousands on healthcare with our premium transparency platform.
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative">
          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-full shadow-2xl border border-slate-200 dark:border-slate-700 flex items-center justify-center hover:bg-white dark:hover:bg-slate-800 transition-all duration-300 hover:scale-110 hover:shadow-cyan-500/20 group"
          >
            <ChevronLeft className="w-6 h-6 text-slate-700 dark:text-slate-300 group-hover:text-cyan-600 transition-colors" />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-full shadow-2xl border border-slate-200 dark:border-slate-700 flex items-center justify-center hover:bg-white dark:hover:bg-slate-800 transition-all duration-300 hover:scale-110 hover:shadow-cyan-500/20 group"
          >
            <ChevronRight className="w-6 h-6 text-slate-700 dark:text-slate-300 group-hover:text-cyan-600 transition-colors" />
          </button>

          {/* Carousel Track */}
          <div className="">
            <div
              className="flex transition-transform duration-500 ease-out gap-8"
              style={{ transform: `translateX(-${currentIndex * (100 / 3)}%)` }}
            >
              {galleryItems.map((item, index) => {
                const IconComponent = item.icon;
                return (
                  <div
                    key={index}
                    ref={(el) => {
                      cardsRef.current[index] = el;
                    }}
                    className="gallery-card flex-shrink-0 opacity-0 translate-y-16"
                    style={{ width: "calc(33.333% - 22px)" }}
                    onMouseEnter={() => setHoveredCard(index)}
                    onMouseLeave={() => setHoveredCard(null)}
                  >
                    {/* Card Structure - FIXED HEIGHT ISSUE */}
                    <div className="relative group h-full rounded-3xl overflow-hidden bg-white dark:bg-slate-900 shadow-2xl hover:shadow-4xl transition-all duration-700 border border-slate-200/50 dark:border-slate-700/50 backdrop-blur-sm">
                      {/* Image Section - Fixed height with proper content flow */}
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

                        {/* Badges positioned over image */}
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

                      {/* Content Section - Flexible height */}
                      <div className="p-6 flex flex-col flex-1 min-h-0">
                        {/* Title and Description */}
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
                            className={`w-full py-3 px-4 bg-gradient-to-r ${item.borderGradient} text-white font-bold rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 flex items-center justify-center gap-2 group/btn relative overflow-hidden`}
                          >
                            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000" />
                            <span className="relative text-sm">
                              Explore Now
                            </span>
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
          </div>

          {/* Carousel Indicators */}
          {/* <div className="flex justify-center mt-8 gap-3">
            {galleryItems.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? "bg-cyan-500 scale-125"
                    : "bg-slate-300 dark:bg-slate-600 hover:bg-slate-400"
                }`}
              />
            ))}
          </div> */}
        </div>

        <div className="mt-24 text-center opacity-0 translate-y-12 animate-fade-in-delayed">
          <div className="inline-flex flex-col sm:flex-row gap-6">
            <button className="px-12 py-6 bg-gradient-to-r from-cyan-600 via-teal-600 to-cyan-700 text-white font-bold text-lg rounded-2xl shadow-2xl hover:shadow-cyan-500/30 transform hover:-translate-y-3 hover:scale-105 transition-all duration-500 flex items-center justify-center gap-4 relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              <Sparkles className="w-6 h-6 relative" />
              <span className="relative">Start Saving Today</span>
              <ArrowRight className="w-6 h-6 relative" />
            </button>
            <button className="px-12 py-6 bg-white text-teal-700 font-bold text-lg rounded-2xl border-2 border-teal-500 hover:bg-gradient-to-r hover:from-cyan-50 hover:to-teal-50 hover:border-teal-600 transform hover:-translate-y-3 hover:scale-105 transition-all duration-500 shadow-xl backdrop-blur-sm">
              Watch Demo
            </button>
          </div>
          <p className="text-slate-500 dark:text-slate-400 mt-8 text-base font-medium max-w-2xl mx-auto">
            Join 50,000+ users who saved ₹2.5 Cr+ on healthcare bills with our
            premium transparency platform
          </p>
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
            opacity: 0.15;
          }
          50% {
            transform: translateY(-20px) rotate(5deg);
            opacity: 0.25;
          }
        }

        @keyframes pulseLuxury {
          0%,
          100% {
            opacity: 0.05;
            transform: scale(1);
          }
          50% {
            opacity: 0.15;
            transform: scale(1.1);
          }
        }

        .animate-fade-in-up {
          animation: fadeInUp 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
        }

        .animate-fade-in-delayed {
          animation: fadeInUp 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.6s
            forwards;
        }

        .gallery-card.animate-in {
          animation: fadeInUp 1s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
        }

        .gallery-card {
          transition: transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        .gallery-card:hover {
          transform: translateY(-12px) scale(1.02);
        }

        .animate-float {
          animation: float 12s ease-in-out infinite;
        }

        .animate-float-delayed {
          animation: float 12s ease-in-out 6s infinite;
        }

        .animate-pulse-luxury {
          animation: pulseLuxury 8s ease-in-out infinite;
        }

        .shadow-4xl {
          box-shadow: 0 40px 80px -12px rgba(0, 0, 0, 0.15),
            0 0 0 1px rgba(255, 255, 255, 0.05);
        }

        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </section>
  );
};

export default GallerySection;
