// components/StatsSection.tsx
import { motion } from "framer-motion";
import { Users, Hospital, MapPin, Shield } from "lucide-react";

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

export const StatsSection = () => {
  const stats = [
    { number: "10K+", label: "Happy Patients", icon: Users },
    { number: "500+", label: "Partner Hospitals", icon: Hospital },
    { number: "50+", label: "Cities Covered", icon: MapPin },
    { number: "99%", label: "Price Accuracy", icon: Shield },
  ];

  return (
    <motion.section
      className="py-24 px-4 relative overflow-hidden bg-white"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={staggerContainer}
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-50 via-white to-white" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-cyan-50 via-transparent to-transparent" />

        {/* Beam Effect */}
        <motion.div
          className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-emerald-400 to-transparent"
          variants={beamAnimation}
          initial="hidden"
          animate="visible"
        />

        {/* Floating Orbs */}
        <div className="absolute top-20 left-20 w-72 h-72 bg-emerald-100/40 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute bottom-20 right-20 w-96 h-96 bg-cyan-100/40 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        />
      </div>

      <div className="container mx-auto max-w-6xl relative z-10">
        <motion.div className="text-center mb-16" variants={fadeInUp}>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent">
            Trusted by thousands
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Join the growing community making smarter healthcare decisions
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="text-center group relative"
              variants={scaleIn}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
            >
              {/* Card Background with Glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-200/50 to-cyan-200/50 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative bg-white/80 backdrop-blur-xl border border-slate-200 rounded-2xl p-6 hover:border-emerald-400 transition-all duration-500 shadow-lg hover:shadow-2xl">
                {/* Icon Container */}
                <div className="w-20 h-20 bg-gradient-to-br from-emerald-100 to-cyan-100 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-500 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                  <stat.icon className="w-10 h-10 text-emerald-600 relative z-10" />
                </div>

                {/* Number */}
                <div className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-cyan-600 bg-clip-text text-transparent mb-2">
                  {stat.number}
                </div>

                {/* Label */}
                <div className="text-slate-600 font-medium group-hover:text-slate-700 transition-colors duration-300">
                  {stat.label}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};
