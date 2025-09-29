// components/CTASection.tsx
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Heart, Shield, Award, Users } from "lucide-react";

const fadeInUp = {
  hidden: { opacity: 0, y: 40, filter: "blur(10px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

export const CTASection = () => {
  return (
    <motion.section
      className="py-32 px-4 relative overflow-hidden"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={fadeInUp}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-emerald-50 to-teal-50" />

      <div className="container mx-auto max-w-4xl text-center relative z-10">
        <Badge variant="outline" className="mb-6 px-4 py-2">
          <Heart className="w-4 h-4 mr-2" />
          Join Us Today
        </Badge>

        <h2 className="text-4xl md:text-5xl font-bold mb-6 text-slate-900">
          Ready to save on healthcare?
        </h2>

        <p className="text-xl text-slate-600 mb-12 leading-relaxed max-w-2xl mx-auto">
          Start comparing prices and making smarter healthcare decisions today.
          Join thousands of users who have already saved on medical expenses.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            size="lg"
            className="px-8 py-6 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-semibold text-lg shadow-lg"
          >
            Get Started Free
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>

          <Button
            size="lg"
            variant="outline"
            className="px-8 py-6 border-2 border-emerald-200 text-emerald-700 hover:bg-emerald-50"
          >
            <Heart className="mr-2 w-5 h-5" />
            Explore Features
          </Button>
        </div>

        <div className="mt-12 flex flex-wrap justify-center gap-8 items-center opacity-60">
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-emerald-600" />
            <span className="text-sm text-slate-600">Verified Data</span>
          </div>
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-emerald-600" />
            <span className="text-sm text-slate-600">Award Winning</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-emerald-600" />
            <span className="text-sm text-slate-600">10K+ Users</span>
          </div>
        </div>
      </div>
    </motion.section>
  );
};
