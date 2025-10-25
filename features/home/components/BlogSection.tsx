import { motion } from "framer-motion";
import { ArrowRight, Clock, Sparkles } from "lucide-react";

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
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
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

export const BlogSection = () => {
  const insights = [
    {
      title: "Appendix Surgery Cost Guide",
      category: "Cost Guide",
      description:
        "Complete breakdown of appendectomy costs across major hospitals",
      readTime: "5 min",
      image:
        "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80",
      gradient: "from-cyan-400/90 to-teal-500/90",
    },
    {
      title: "Choosing Health Insurance",
      category: "Analysis",
      description: "Expert tips on selecting the right health insurance plan",
      readTime: "8 min",
      image:
        "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800&q=80",
      gradient: "from-teal-400/90 to-sky-500/90",
    },
    {
      title: "Price Transparency 2025",
      category: "Trends",
      description: "Latest regulations making healthcare pricing transparent",
      readTime: "6 min",
      image:
        "https://images.unsplash.com/photo-1504439468489-c8920d796a29?w=800&q=80",
      gradient: "from-sky-400/90 to-cyan-500/90",
    },
  ];

  return (
    <motion.section
      className="py-24 px-4 relative overflow-hidden bg-gradient-to-b from-slate-50 via-white to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={staggerContainer}
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-32 -left-32 w-96 h-96 bg-gradient-to-r from-cyan-400/15 to-teal-400/15 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-32 -right-32 w-96 h-96 bg-gradient-to-r from-teal-500/15 to-sky-400/15 rounded-full blur-3xl animate-float-delayed" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-cyan-500/5 to-teal-500/5 rounded-full blur-3xl animate-pulse-luxury" />

        {/* Beam Effect */}
        <motion.div
          className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
          variants={beamAnimation}
          initial="hidden"
          animate="visible"
        />
      </div>

      <div className="container mx-auto max-w-6xl relative z-10">
        <motion.div className="text-center mb-16" variants={fadeInUp}>
          <div className="inline-flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-cyan-50 via-white to-teal-50 dark:from-cyan-900/30 dark:via-slate-800/50 dark:to-teal-900/30 border-2 border-cyan-200 dark:border-cyan-700 text-teal-800 dark:text-teal-200 rounded-full mb-6 font-bold text-sm shadow-lg backdrop-blur-sm">
            <Sparkles className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
            <span className="bg-gradient-to-r from-cyan-700 to-teal-700 dark:from-cyan-300 dark:to-teal-300 bg-clip-text text-transparent">
              Latest Insights
            </span>
          </div>

          <h2 className="text-5xl md:text-6xl font-black mb-8 bg-gradient-to-r from-slate-800 via-teal-700 to-cyan-700 dark:from-slate-100 dark:via-teal-400 dark:to-cyan-400 bg-clip-text text-transparent leading-tight tracking-tight">
            Healthcare Cost
            <br />
            <span className="bg-gradient-to-r from-cyan-600 to-teal-600 dark:from-cyan-400 dark:to-teal-400 bg-clip-text text-transparent">
              Insights & Guides
            </span>
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed font-medium">
            Expert analysis, comprehensive cost guides, and latest market trends
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {insights.map((insight, index) => (
            <motion.div
              key={index}
              className="group relative cursor-pointer"
              variants={scaleIn}
              whileHover={{
                y: -16,
                rotateY: 5,
                rotateX: 5,
                transition: { duration: 0.4 },
              }}
              style={{ perspective: 1000 }}
            >
              {/* Multi-layer Glow */}
              <div className="absolute -inset-2 bg-gradient-to-br from-cyan-400 via-teal-400 to-sky-400 rounded-3xl blur-3xl opacity-0 group-hover:opacity-60 transition-opacity duration-700 animate-pulse-glow" />
              <div className="absolute -inset-1 bg-gradient-to-br from-cyan-500 via-teal-500 to-sky-500 rounded-3xl blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-500" />

              <div className="relative bg-white dark:bg-slate-900 rounded-3xl overflow-hidden shadow-2xl group-hover:shadow-[0_35px_80px_-15px_rgba(6,182,212,0.5)] transition-all duration-700 h-full border border-slate-200/50 dark:border-slate-800/50 group-hover:border-cyan-400/50 dark:group-hover:border-cyan-500/50">
                {/* Image Section */}
                <div className="relative h-72 overflow-hidden">
                  <img
                    src={insight.image}
                    alt={insight.title}
                    className="w-full h-full object-cover group-hover:scale-125 group-hover:rotate-2 transition-all duration-1000"
                  />

                  {/* Dynamic Gradient Overlay */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${insight.gradient} mix-blend-overlay group-hover:mix-blend-multiply transition-all duration-700`}
                  />

                  {/* Animated Shine Bars */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1200 delay-100" />
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/30 to-transparent translate-y-full group-hover:-translate-y-full transition-transform duration-1400" />

                  {/* Floating Particles Effect */}
                  <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-white rounded-full opacity-0 group-hover:opacity-80 group-hover:animate-float-particle-1" />
                  <div className="absolute top-1/2 right-1/3 w-1.5 h-1.5 bg-white rounded-full opacity-0 group-hover:opacity-60 group-hover:animate-float-particle-2" />
                  <div className="absolute bottom-1/3 left-1/2 w-1 h-1 bg-white rounded-full opacity-0 group-hover:opacity-70 group-hover:animate-float-particle-3" />

                  {/* Category Badge - Enhanced */}
                  <div className="absolute top-5 left-5">
                    <motion.div
                      className="px-5 py-2.5 bg-white/98 dark:bg-slate-900/98 backdrop-blur-xl rounded-full text-sm font-black text-slate-900 dark:text-slate-100 shadow-2xl border-2 border-white/50 dark:border-slate-800/50"
                      whileHover={{ scale: 1.1, rotate: -5 }}
                    >
                      {insight.category}
                    </motion.div>
                  </div>

                  {/* Read Time - Enhanced */}
                  <div className="absolute top-5 right-5">
                    <motion.div
                      className="flex items-center gap-2 px-4 py-2.5 bg-black/60 backdrop-blur-xl rounded-full text-sm font-bold text-white shadow-xl"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                    >
                      <Clock className="w-4 h-4" />
                      {insight.readTime}
                    </motion.div>
                  </div>

                  {/* Shimmer Border Effect */}
                  <div className="absolute inset-0 border-4 border-transparent group-hover:border-cyan-400/30 transition-colors duration-700 rounded-t-3xl" />
                </div>

                {/* Content Section - Enhanced */}
                <div className="p-8 relative">
                  {/* Background Gradient Orb */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-cyan-400/20 to-teal-400/20 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                  <h3 className="text-2xl font-black mb-4 text-slate-900 dark:text-slate-100 group-hover:bg-gradient-to-r group-hover:from-cyan-600 group-hover:via-teal-600 group-hover:to-sky-600 dark:group-hover:from-cyan-400 dark:group-hover:via-teal-400 dark:group-hover:to-sky-400 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-500 relative z-10">
                    {insight.title}
                  </h3>

                  <p className="text-slate-600 dark:text-slate-400 mb-8 leading-relaxed font-medium text-base relative z-10">
                    {insight.description}
                  </p>

                  {/* Read More Link - Ultra Enhanced */}
                  <div className="relative inline-flex items-center gap-3 text-cyan-600 dark:text-cyan-400 font-black text-base group-hover:gap-6 transition-all duration-500 z-10">
                    <span className="relative">
                      Read Article
                      <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-600 to-teal-600 dark:from-cyan-400 dark:to-teal-400 group-hover:w-full transition-all duration-500" />
                    </span>
                    <div className="relative">
                      <ArrowRight className="w-6 h-6 group-hover:translate-x-3 transition-transform duration-500" />
                      <div className="absolute inset-0 bg-cyan-400 blur-lg opacity-0 group-hover:opacity-50 transition-opacity duration-500" />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Button */}
        <motion.div className="text-center mt-16" variants={fadeInUp}>
          <motion.button
            className="group relative px-10 py-4 bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600 text-white font-bold text-lg rounded-2xl shadow-xl hover:shadow-2xl hover:shadow-cyan-500/50 transition-all duration-500 overflow-hidden"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-teal-400 blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-500 -z-10" />
            <span className="relative z-10 flex items-center gap-2">
              View All Insights
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </span>
          </motion.button>
        </motion.div>
      </div>

      <style jsx>{`
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

        @keyframes pulseGlow {
          0%,
          100% {
            opacity: 0.4;
            transform: scale(1);
          }
          50% {
            opacity: 0.8;
            transform: scale(1.05);
          }
        }

        @keyframes floatParticle1 {
          0% {
            transform: translate(0, 0);
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
          100% {
            transform: translate(30px, -50px);
            opacity: 0;
          }
        }

        @keyframes floatParticle2 {
          0% {
            transform: translate(0, 0);
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
          100% {
            transform: translate(-40px, -60px);
            opacity: 0;
          }
        }

        @keyframes floatParticle3 {
          0% {
            transform: translate(0, 0);
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
          100% {
            transform: translate(25px, -45px);
            opacity: 0;
          }
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

        .animate-pulse-glow {
          animation: pulseGlow 3s ease-in-out infinite;
        }

        .animate-float-particle-1 {
          animation: floatParticle1 2s ease-out forwards;
        }

        .animate-float-particle-2 {
          animation: floatParticle2 2.5s ease-out forwards;
        }

        .animate-float-particle-3 {
          animation: floatParticle3 2.2s ease-out forwards;
        }
      `}</style>
    </motion.section>
  );
};
