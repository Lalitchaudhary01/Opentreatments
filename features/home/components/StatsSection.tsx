// components/StatsSection.tsx
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

export const StatsSection = () => {
  const stats = [
    {
      number: "10K+",
      label: "Patients Helped",
      image: "/stats/patients.png",
    },
    {
      number: "500+",
      label: "Trusted Hospitals",
      image: "/stats/hospitals.png",
    },
    {
      number: "50+",
      label: "Cities Across India",
      image: "/stats/cities.png",
    },
    {
      number: "99%",
      label: "Price Accuracy",
      image: "/stats/accuracy.png",
    },
  ];

  return (
    <motion.section
      className="py-20 px-4 bg-slate-50 dark:bg-slate-900"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-2 border rounded-full text-xs font-semibold mb-5 bg-white dark:bg-slate-800">
            <CheckCircle className="w-4 h-4 text-cyan-500" />
            Trusted by Thousands
          </div>

          <h2 className="text-3xl md:text-4xl font-black mb-5 bg-gradient-to-r from-slate-800 via-teal-700 to-cyan-700 dark:from-slate-100 dark:via-teal-300 dark:to-cyan-300 bg-clip-text text-transparent">
            Healthcare Transparency
            <span className="block">You can trust</span>
          </h2>

          <p className="text-lg text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
            Join the growing community making smarter healthcare decisions with
            our premium transparency platform
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              className="bg-white dark:bg-slate-800 rounded-2xl p-6 text-center shadow-md hover:shadow-lg transition"
            >
              {/* Image */}
              <div className="h-24 mb-4 flex items-center justify-center">
                <img
                  src={stat.image}
                  alt={stat.label}
                  className="h-full object-contain"
                />
              </div>

              {/* Number */}
              <div className="text-3xl font-bold text-cyan-600 dark:text-cyan-400 mb-1">
                {stat.number}
              </div>

              {/* Label */}
              <div className="text-sm text-slate-600 dark:text-slate-300">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};
