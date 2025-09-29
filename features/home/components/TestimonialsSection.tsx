import React from "react";
import { motion } from "framer-motion";
import { Users, CheckCircle, Star, Quote } from "lucide-react";

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
    },
    {
      name: "Rajesh Kumar",
      role: "Cancer Treatment Patient",
      quote:
        "Transparent pricing helped me plan my cancer treatment without financial stress. Forever grateful!",
      avatar: "RK",
    },
    {
      name: "Anita Desai",
      role: "Mother of Two",
      quote:
        "As a mother, knowing exact costs beforehand gave me peace of mind. Highly recommend to all families!",
      avatar: "AD",
    },
  ];

  return (
    <motion.section
      className="py-24 px-4 relative overflow-hidden bg-white"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={staggerContainer}
    >
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-50 via-white to-white" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-cyan-50 via-transparent to-transparent" />

        <div className="absolute top-20 left-20 w-72 h-72 bg-emerald-100/40 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute bottom-20 right-20 w-96 h-96 bg-cyan-100/40 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        />
      </div>

      <div className="container mx-auto max-w-6xl relative z-10">
        <motion.div className="text-center mb-16" variants={fadeInUp}>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 border border-emerald-200 mb-6">
            <Users className="w-4 h-4 text-emerald-600" />
            <span className="font-semibold text-emerald-600">
              Success Stories
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent">
            What our users say
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Real people, real savings, real experiences
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
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-200/50 to-cyan-200/50 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Card */}
                <div className="relative h-full bg-white/80 backdrop-blur-xl border border-slate-200 rounded-2xl p-8 hover:border-emerald-400 transition-all duration-500 shadow-lg hover:shadow-2xl overflow-hidden">
                  {/* Shine Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

                  {/* Quote Icon Background */}
                  <motion.div
                    className="absolute top-4 right-4 opacity-5"
                    animate={floatAnimation}
                  >
                    <Quote className="w-24 h-24 text-emerald-600" />
                  </motion.div>

                  {/* Content */}
                  <div className="relative z-10">
                    {/* Avatar Section */}
                    <div className="flex items-center gap-4 mb-6">
                      <div className="relative">
                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white font-bold text-xl ring-4 ring-white group-hover:scale-110 transition-transform duration-500">
                          {testimonial.avatar}
                        </div>
                        <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center">
                          <CheckCircle className="w-4 h-4 text-white" />
                        </div>
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900">
                          {testimonial.name}
                        </h4>
                        <p className="text-sm text-emerald-600 font-semibold">
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
                    <p className="text-slate-700 leading-relaxed italic">
                      "{testimonial.quote}"
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
