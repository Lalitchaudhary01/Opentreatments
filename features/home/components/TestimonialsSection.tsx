import React from "react";
import { motion } from "framer-motion";
import { Users, CheckCircle, Star, Quote, Sparkles } from "lucide-react";

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

const floatAnimation = {
  y: [0, -10, 0],
  transition: {
    duration: 3,
    repeat: Infinity,
    ease: "easeInOut",
  },
};

export default function TestimonialsSection() {
  const testimonials = [
    {
      name: "Priya Sharma",
      role: "Saved ₹45,000 on Surgery",
      quote:
        "I compared prices for my knee surgery and found a top hospital at 40% less cost. The platform made it so easy!",
      avatar: "PS",
      gradient: "from-cyan-400 to-teal-500",
    },
    {
      name: "Rajesh Kumar",
      role: "Cancer Treatment Patient",
      quote:
        "Transparent pricing helped me plan my cancer treatment without financial stress. Forever grateful!",
      avatar: "RK",
      gradient: "from-teal-400 to-cyan-500",
    },
    {
      name: "Anita Desai",
      role: "Mother of Two",
      quote:
        "As a mother, knowing exact costs beforehand gave me peace of mind. Highly recommend to all families!",
      avatar: "AD",
      gradient: "from-sky-400 to-teal-500",
    },
  ];

  return (
    <motion.section
      className="py-24 px-4 relative overflow-hidden bg-gradient-to-b from-slate-50 via-white to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={staggerContainer}
    >
      {/* Animated Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-32 -left-32 w-96 h-96 bg-gradient-to-r from-cyan-400/15 to-teal-400/15 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-32 -right-32 w-96 h-96 bg-gradient-to-r from-teal-500/15 to-sky-400/15 rounded-full blur-3xl animate-float-delayed" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-cyan-500/5 to-teal-500/5 rounded-full blur-3xl animate-pulse-luxury" />
      </div>

      <div className="container mx-auto max-w-6xl relative z-10">
        <motion.div className="text-center mb-16" variants={fadeInUp}>
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-cyan-50 via-white to-teal-50 dark:from-cyan-950/30 dark:to-teal-950/30 border-2 border-cyan-200 dark:border-cyan-800 text-teal-800 dark:text-teal-200 rounded-full mb-8 font-bold text-sm shadow-xl backdrop-blur-sm">
            <Users className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
            <span className="bg-gradient-to-r from-cyan-700 to-teal-700 dark:from-cyan-400 dark:to-teal-400 bg-clip-text text-transparent">
              Success Stories
            </span>
          </div>

          <h2 className="text-5xl md:text-6xl font-black mb-8 bg-gradient-to-r from-slate-800 via-teal-700 to-cyan-700 dark:from-slate-100 dark:via-teal-400 dark:to-cyan-400 bg-clip-text text-transparent leading-tight tracking-tight">
            What Our Users
            <br />
            <span className="bg-gradient-to-r from-cyan-600 to-teal-600 dark:from-cyan-400 dark:to-teal-400 bg-clip-text text-transparent">
              Say About Us
            </span>
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed font-medium">
            Real people, real savings, real experiences with healthcare
            transparency
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              variants={scaleIn}
              whileHover={{ y: -8, scale: 1.02, transition: { duration: 0.3 } }}
              className="group"
            >
              <div className="relative h-full">
                {/* Glow Effect */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${testimonial.gradient} rounded-2xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500`}
                />

                {/* Card */}
                <div className="relative h-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/50 dark:border-slate-700/50 rounded-2xl p-8 hover:border-cyan-400 dark:hover:border-cyan-600 transition-all duration-500 shadow-lg hover:shadow-2xl group-hover:shadow-cyan-500/20 overflow-hidden">
                  {/* Shine Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 dark:via-slate-800/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

                  {/* Quote Icon Background */}
                  <motion.div
                    className="absolute top-4 right-4 opacity-5"
                    animate={floatAnimation}
                  >
                    <Quote className="w-24 h-24 text-cyan-600 dark:text-cyan-400" />
                  </motion.div>

                  {/* Content */}
                  <div className="relative z-10">
                    {/* Avatar Section */}
                    <div className="flex items-center gap-4 mb-6">
                      <div className="relative">
                        <div
                          className={`w-16 h-16 rounded-full bg-gradient-to-br ${testimonial.gradient} flex items-center justify-center text-white font-bold text-xl ring-4 ring-white dark:ring-slate-900 group-hover:scale-110 transition-transform duration-500`}
                        >
                          {testimonial.avatar}
                        </div>
                        <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-cyan-500 rounded-full flex items-center justify-center ring-2 ring-white dark:ring-slate-900">
                          <CheckCircle className="w-4 h-4 text-white" />
                        </div>
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900 dark:text-slate-100">
                          {testimonial.name}
                        </h4>
                        <p className="text-sm text-cyan-600 dark:text-cyan-400 font-semibold">
                          {testimonial.role}
                        </p>
                      </div>
                    </div>

                    {/* Stars */}
                    <div className="flex mb-4">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className="w-5 h-5 fill-yellow-400 text-yellow-400"
                        />
                      ))}
                    </div>

                    {/* Quote */}
                    <p className="text-slate-700 dark:text-slate-300 leading-relaxed italic">
                      "{testimonial.quote}"
                    </p>
                  </div>
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
}
