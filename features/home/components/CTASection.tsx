import { motion } from "framer-motion";
import {
  ArrowRight,
  Heart,
  Shield,
  Award,
  Users,
  Sparkles,
  Star,
} from "lucide-react";

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
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
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

export const CTASection = () => {
  const features = [
    {
      icon: Shield,
      text: "Verified Data",
      gradient: "from-cyan-400 to-teal-500",
    },
    {
      icon: Award,
      text: "Award Winning",
      gradient: "from-teal-400 to-sky-500",
    },
    {
      icon: Users,
      text: "10K+ Users",
      gradient: "from-sky-400 to-cyan-500",
    },
  ];

  return (
    <motion.section
      className="py-32 px-4 relative overflow-hidden bg-gradient-to-b from-white via-slate-50 to-white dark:from-slate-900 dark:via-slate-950 dark:to-slate-900"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={staggerContainer}
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-32 -left-32 w-[600px] h-[600px] bg-gradient-to-r from-cyan-400/20 to-teal-400/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-32 -right-32 w-[600px] h-[600px] bg-gradient-to-r from-teal-500/20 to-sky-400/20 rounded-full blur-3xl animate-float-delayed" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-gradient-to-r from-cyan-500/10 to-teal-500/10 rounded-full blur-3xl animate-pulse-luxury" />

        {/* Beam Effect */}
        <motion.div
          className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
          variants={beamAnimation}
          initial="hidden"
          animate="visible"
        />

        {/* Floating Stars */}
        <motion.div
          className="absolute top-20 left-20"
          animate={{
            y: [0, -20, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <Star className="w-6 h-6 text-cyan-400/30 dark:text-cyan-400/20 fill-cyan-400/30 dark:fill-cyan-400/20" />
        </motion.div>
        <motion.div
          className="absolute bottom-40 right-32"
          animate={{
            y: [0, 20, 0],
            rotate: [0, -180, -360],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        >
          <Star className="w-8 h-8 text-teal-400/30 dark:text-teal-400/20 fill-teal-400/30 dark:fill-teal-400/20" />
        </motion.div>
      </div>

      <div className="container mx-auto max-w-5xl text-center relative z-10">
        <motion.div variants={fadeInUp}>
          <div className="inline-flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-cyan-50 via-white to-teal-50 dark:from-cyan-900/30 dark:via-slate-800/50 dark:to-teal-900/30 border-2 border-cyan-200 dark:border-cyan-700 text-teal-800 dark:text-teal-200 rounded-full mb-8 font-bold text-sm shadow-lg backdrop-blur-sm">
            <Heart className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
            <span className="bg-gradient-to-r from-cyan-700 to-teal-700 dark:from-cyan-300 dark:to-teal-300 bg-clip-text text-transparent">
              Join Our Community
            </span>
          </div>

          <h2 className="text-5xl md:text-7xl font-black mb-8 bg-gradient-to-r from-slate-800 via-teal-700 to-cyan-700 dark:from-slate-100 dark:via-teal-400 dark:to-cyan-400 bg-clip-text text-transparent leading-tight tracking-tight">
            Ready to Save on
            <br />
            <span className="bg-gradient-to-r from-cyan-600 to-teal-600 dark:from-cyan-400 dark:to-teal-400 bg-clip-text text-transparent">
              Healthcare?
            </span>
          </h2>

          <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 mb-12 leading-relaxed max-w-3xl mx-auto font-medium">
            Start comparing prices and making smarter healthcare decisions
            today. Join thousands of users who have already saved on medical
            expenses.
          </p>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-6 justify-center mb-16"
          variants={scaleIn}
        >
          <motion.button
            className="group relative px-10 py-5 bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600 text-white font-bold text-lg rounded-2xl shadow-2xl hover:shadow-cyan-500/50 transition-all duration-500 overflow-hidden"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            {/* Shine Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

            <span className="relative z-10 flex items-center justify-center gap-2">
              Get Started Free
              <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform duration-300" />
            </span>

            {/* Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-teal-400 blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-500 -z-10" />
          </motion.button>

          <motion.button
            className="group relative px-10 py-5 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-2 border-cyan-300 dark:border-cyan-700 text-slate-800 dark:text-slate-100 font-bold text-lg rounded-2xl shadow-lg hover:shadow-xl hover:border-cyan-400 dark:hover:border-cyan-600 transition-all duration-500 overflow-hidden"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            {/* Shine Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

            <span className="relative z-10 flex items-center justify-center gap-2">
              <Sparkles className="w-6 h-6 text-cyan-600 dark:text-cyan-400" />
              Explore Features
            </span>
          </motion.button>
        </motion.div>

        {/* Trust Indicators */}
        <motion.div
          className="flex flex-wrap justify-center gap-8 items-center"
          variants={staggerContainer}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="group relative"
              variants={scaleIn}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
            >
              <div className="flex items-center gap-3 px-6 py-3 bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl border border-slate-200/50 dark:border-slate-700/50 rounded-full shadow-lg hover:shadow-xl hover:border-cyan-300 dark:hover:border-cyan-700 transition-all duration-500 relative overflow-hidden">
                {/* Shine Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 dark:via-slate-800/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

                {/* Icon */}
                <div
                  className={`w-10 h-10 bg-gradient-to-br ${feature.gradient} rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-500 relative overflow-hidden`}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                  <feature.icon className="w-5 h-5 text-white relative z-10" />
                </div>

                {/* Text */}
                <span className="text-slate-700 dark:text-slate-200 font-bold text-sm group-hover:text-slate-900 dark:group-hover:text-slate-50 transition-colors duration-300 relative z-10">
                  {feature.text}
                </span>
              </div>

              {/* Glow Effect */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} rounded-full blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 -z-10`}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
            opacity: 0.2;
          }
          50% {
            transform: translateY(-30px) rotate(5deg);
            opacity: 0.3;
          }
        }

        @keyframes pulseLuxury {
          0%,
          100% {
            opacity: 0.1;
            transform: scale(1);
          }
          50% {
            opacity: 0.2;
            transform: scale(1.1);
          }
        }

        .animate-float {
          animation: float 15s ease-in-out infinite;
        }

        .animate-float-delayed {
          animation: float 15s ease-in-out 7.5s infinite;
        }

        .animate-pulse-luxury {
          animation: pulseLuxury 10s ease-in-out infinite;
        }
      `}</style>
    </motion.section>
  );
};
