// components/StatsSection.tsx
import { motion } from "framer-motion";
import { Users, Hospital, MapPin, Shield, Sparkles } from "lucide-react";

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

const beamAnimation = {
  hidden: { x: "-100%", opacity: 0 },
  visible: {
    x: "200%",
    opacity: 1,
    transition: {
      duration: 2,
      repeat: Infinity,
      repeatDelay: 3,
    },
  },
};

export const StatsSection = () => {
  const stats = [
    {
      number: "10K+",
      label: "Happy Patients",
      icon: Users,
      gradient: "from-cyan-400 to-teal-500",
    },
    {
      number: "500+",
      label: "Partner Hospitals",
      icon: Hospital,
      gradient: "from-teal-400 to-cyan-500",
    },
    {
      number: "50+",
      label: "Cities Covered",
      icon: MapPin,
      gradient: "from-sky-400 to-teal-500",
    },
    {
      number: "99%",
      label: "Price Accuracy",
      icon: Shield,
      gradient: "from-cyan-400 to-sky-500",
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
              Trusted by Thousands
            </span>
          </div>

          <h2 className="text-5xl md:text-6xl font-black mb-8 bg-gradient-to-r from-slate-800 via-teal-700 to-cyan-700 dark:from-slate-100 dark:via-teal-400 dark:to-cyan-400 bg-clip-text text-transparent leading-tight tracking-tight">
            Healthcare Transparency
            <br />
            <span className="bg-gradient-to-r from-cyan-600 to-teal-600 dark:from-cyan-400 dark:to-teal-400 bg-clip-text text-transparent">
              You Can Trust
            </span>
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed font-medium">
            Join the growing community making smarter healthcare decisions with
            our premium transparency platform
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="text-center group relative"
              variants={scaleIn}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
            >
              {/* Card Background with Glow */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} rounded-2xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500`}
              />

              <div className="relative bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/50 dark:border-slate-700/50 rounded-2xl p-6 hover:border-cyan-400 dark:hover:border-cyan-600 transition-all duration-500 shadow-lg hover:shadow-2xl group-hover:shadow-cyan-500/20">
                {/* Shine Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 dark:via-slate-800/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

                {/* Icon Container */}
                <div
                  className={`w-20 h-20 bg-gradient-to-br ${stat.gradient} backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-500 relative overflow-hidden`}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                  <stat.icon className="w-10 h-10 text-white relative z-10" />
                </div>

                {/* Number */}
                <div className="text-4xl font-bold bg-gradient-to-r from-cyan-600 to-teal-600 dark:from-cyan-400 dark:to-teal-400 bg-clip-text text-transparent mb-2">
                  {stat.number}
                </div>

                {/* Label */}
                <div className="text-slate-600 dark:text-slate-300 font-medium group-hover:text-slate-800 dark:group-hover:text-slate-100 transition-colors duration-300">
                  {stat.label}
                </div>
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
