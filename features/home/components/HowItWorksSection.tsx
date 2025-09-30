import { motion } from "framer-motion";
import { Search, Activity, CheckCircle, Sparkles } from "lucide-react";

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
      duration: 2,
      ease: "easeInOut",
      repeat: Infinity,
      repeatDelay: 3,
    },
  },
};

export const HowItWorksSection = () => {
  const steps = [
    {
      step: "01",
      title: "Search",
      description:
        "Enter your treatment or hospital name and location to discover options",
      icon: Search,
      gradient: "from-cyan-400 to-teal-500",
      shadowColor: "shadow-cyan-500/20",
    },
    {
      step: "02",
      title: "Compare",
      description:
        "View detailed price comparisons across multiple trusted providers",
      icon: Activity,
      gradient: "from-teal-400 to-sky-500",
      shadowColor: "shadow-teal-500/20",
    },
    {
      step: "03",
      title: "Book",
      description:
        "Choose the best option and book your appointment with confidence",
      icon: CheckCircle,
      gradient: "from-sky-400 to-cyan-500",
      shadowColor: "shadow-sky-500/20",
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
          className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-teal-400 to-transparent"
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
              Simple 3-Step Process
            </span>
          </div>

          <h2 className="text-5xl md:text-6xl font-black mb-8 bg-gradient-to-r from-slate-800 via-teal-700 to-cyan-700 dark:from-slate-100 dark:via-teal-400 dark:to-cyan-400 bg-clip-text text-transparent leading-tight tracking-tight">
            How It Works
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed font-medium">
            Get started in minutes and discover the best healthcare options for
            your needs
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 relative">
          {/* Connection Lines */}
          <div className="hidden md:block absolute top-24 left-0 right-0 h-1">
            <div className="absolute left-[16.66%] right-[16.66%] top-0 h-full">
              <div className="w-full h-full bg-gradient-to-r from-cyan-200 via-teal-200 to-sky-200 dark:from-cyan-700 dark:via-teal-700 dark:to-sky-700 rounded-full" />
            </div>
          </div>

          {steps.map((step, index) => (
            <motion.div
              key={index}
              className="relative group"
              variants={scaleIn}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
            >
              {/* Card Background with Glow */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${step.gradient} rounded-3xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500`}
              />

              <div className="relative bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/50 dark:border-slate-700/50 rounded-3xl p-8 hover:border-cyan-400 dark:hover:border-cyan-600 transition-all duration-500 shadow-lg hover:shadow-2xl group-hover:shadow-cyan-500/20 text-center">
                {/* Shine Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 dark:via-slate-800/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 rounded-3xl" />

                {/* Step Number Badge */}
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-20">
                  <div
                    className={`w-12 h-12 bg-gradient-to-br ${step.gradient} rounded-full flex items-center justify-center text-white font-black text-lg shadow-xl group-hover:scale-110 transition-transform duration-500 relative overflow-hidden`}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                    <span className="relative z-10">{step.step}</span>
                  </div>
                </div>

                {/* Icon Container */}
                <div
                  className={`w-24 h-24 bg-gradient-to-br ${step.gradient} backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-6 mt-4 group-hover:scale-110 transition-transform duration-500 relative overflow-hidden`}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                  <step.icon className="w-12 h-12 text-white relative z-10" />
                </div>

                {/* Title */}
                <h3 className="text-3xl font-bold mb-4 bg-gradient-to-r from-slate-800 to-teal-700 dark:from-slate-100 dark:to-teal-400 bg-clip-text text-transparent">
                  {step.title}
                </h3>

                {/* Description */}
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed font-medium group-hover:text-slate-800 dark:group-hover:text-slate-100 transition-colors duration-300">
                  {step.description}
                </p>

                {/* Decorative Arrow for all except last */}
                {index < 2 && (
                  <div className="hidden md:block absolute -right-4 top-1/2 -translate-y-1/2 z-30">
                    <div className="w-8 h-8 bg-gradient-to-r from-cyan-400 to-teal-400 dark:from-cyan-500 dark:to-teal-500 rounded-full flex items-center justify-center shadow-lg">
                      <svg
                        className="w-4 h-4 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={3}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
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

        .animate-float {
          animation: float 12s ease-in-out infinite;
        }

        .animate-float-delayed {
          animation: float 12s ease-in-out 6s infinite;
        }

        .animate-pulse-luxury {
          animation: pulseLuxury 8s ease-in-out infinite;
        }
      `}</style>
    </motion.section>
  );
};
