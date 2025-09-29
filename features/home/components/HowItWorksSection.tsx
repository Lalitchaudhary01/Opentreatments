// components/HowItWorksSection.tsx
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Search, Activity, CheckCircle, ChevronRight } from "lucide-react";

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

export const HowItWorksSection = () => {
  const steps = [
    {
      step: "01",
      title: "Search",
      description: "Enter your treatment or hospital name and location",
      icon: Search,
      color: "emerald",
    },
    {
      step: "02",
      title: "Compare",
      description: "View detailed price comparisons across multiple providers",
      icon: Activity,
      color: "blue",
    },
    {
      step: "03",
      title: "Book",
      description: "Choose the best option and book your appointment",
      icon: CheckCircle,
      color: "purple",
    },
  ];

  return (
    <motion.section
      className="py-24 px-4 bg-slate-50"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={staggerContainer}
    >
      <div className="container mx-auto max-w-6xl">
        <motion.div className="text-center mb-16" variants={fadeInUp}>
          <Badge variant="outline" className="mb-6 px-4 py-2">
            <Activity className="w-4 h-4 mr-2" />
            Simple Process
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-slate-900">
            How it works
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-12">
          {steps.map((step, index) => (
            <motion.div key={index} className="relative" variants={scaleIn}>
              <div className="text-center">
                <div className="w-24 h-24 bg-gradient-to-br from-slate-100 to-slate-200 rounded-2xl flex items-center justify-center mx-auto mb-6 relative">
                  <step.icon className="w-12 h-12 text-slate-700" />
                  <div className="absolute -top-3 -right-3 w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center text-white font-bold shadow-lg">
                    {step.step}
                  </div>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-slate-900">
                  {step.title}
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  {step.description}
                </p>
              </div>
              {index < 2 && (
                <div className="hidden md:block absolute top-12 -right-6 w-12 h-12">
                  <ChevronRight className="w-full h-full text-slate-300" />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};
