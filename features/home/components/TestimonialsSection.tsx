// components/TestimonialsSection.tsx
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, CheckCircle, Star } from "lucide-react";

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

export const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "Priya Sharma",
      role: "Saved ₹45,000 on Surgery",
      quote:
        "I compared prices for my knee surgery and found a top hospital at 40% less cost. The platform made it so easy!",
      gradient: "from-emerald-500/20 to-teal-500/20",
      avatar: "PS",
    },
    {
      name: "Rajesh Kumar",
      role: "Cancer Treatment Patient",
      quote:
        "Transparent pricing helped me plan my cancer treatment without financial stress. Forever grateful!",
      gradient: "from-blue-500/20 to-cyan-500/20",
      avatar: "RK",
    },
    {
      name: "Anita Desai",
      role: "Mother of Two",
      quote:
        "As a mother, knowing exact costs beforehand gave me peace of mind. Highly recommend to all families!",
      gradient: "from-purple-500/20 to-pink-500/20",
      avatar: "AD",
    },
  ];

  return (
    <motion.section
      className="py-24 px-4 bg-white"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={staggerContainer}
    >
      <div className="container mx-auto max-w-6xl">
        <motion.div className="text-center mb-16" variants={fadeInUp}>
          <Badge variant="outline" className="mb-6 px-4 py-2">
            <Users className="w-4 h-4 mr-2" />
            Success Stories
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-slate-900">
            What our users say
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Real people, real savings, real experiences
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div key={index} variants={scaleIn}>
              <Card
                className={`h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden bg-gradient-to-br ${testimonial.gradient}`}
              >
                <CardContent className="p-8">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="relative">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white font-bold text-xl ring-4 ring-white">
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
                      <p className="text-sm text-slate-600">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                  <div className="flex mb-4">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className="w-5 h-5 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>
                  <p className="text-slate-700 leading-relaxed italic">
                    "{testimonial.quote}"
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};
