import { motion } from "framer-motion";
import { ArrowRight, Heart, Shield, Award, Users } from "lucide-react";

const fadeIn = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

export const CTASection = () => {
  const features = [
    { icon: Shield, text: "Verified Data" },
    { icon: Award, text: "Trusted by Experts" },
    { icon: Users, text: "Growing Community" },
  ];

  return (
    <motion.section
      className="py-24 px-4 relative overflow-hidden bg-gradient-to-b from-white via-slate-50 to-white dark:from-slate-900 dark:via-slate-950 dark:to-slate-900"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <div className="container mx-auto max-w-4xl text-center">
        <motion.div variants={fadeIn}>
          <div className="inline-flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-cyan-50 via-white to-teal-50 dark:from-cyan-900/30 dark:via-slate-800/50 dark:to-teal-900/30 border border-cyan-200 dark:border-cyan-700 text-teal-800 dark:text-teal-200 rounded-full mb-8 font-semibold text-sm">
            <Heart className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
            Join OpenTreatment
          </div>

          <h2 className="text-4xl md:text-6xl font-black mb-6 bg-gradient-to-r from-slate-800 via-teal-700 to-cyan-700 dark:from-slate-100 dark:via-teal-400 dark:to-cyan-400 bg-clip-text text-transparent">
            Know the Cost.
            <br />
            Before You Start.
          </h2>

          <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 mb-12 max-w-2xl mx-auto">
            Compare doctors, hospitals, labs and pharmacies with full price
            transparency. Make smarter healthcare decisions from day one.
          </p>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
          variants={fadeIn}
        >
          <a
            href="/search"
            className="group relative inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-primary text-primary-foreground font-semibold text-base overflow-hidden"
          >
            {/* Hover Gradient Layer */}
            <span className="absolute inset-0 bg-gradient-to-r from-cyan-600 via-teal-600 to-sky-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            {/* Content */}
            <span className="relative z-10 flex items-center gap-2">
              Start Comparing
              <ArrowRight className="w-5 h-5" />
            </span>
          </a>

          <a
            href="/how-it-works"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl border border-cyan-300 dark:border-cyan-700 text-slate-800 dark:text-slate-100 font-semibold text-base hover:bg-cyan-50 dark:hover:bg-slate-800 transition"
          >
            How It Works
          </a>
        </motion.div>

        {/* Trust Indicators */}
        <motion.div
          className="flex flex-wrap justify-center gap-6"
          variants={fadeIn}
        >
          {features.map((f, i) => (
            <div
              key={i}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/70 dark:bg-slate-900/70 border border-slate-200/60 dark:border-slate-700/60 text-sm font-medium text-slate-700 dark:text-slate-200"
            >
              <f.icon className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
              {f.text}
            </div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
};
