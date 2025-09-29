// components/BlogSection.tsx
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, TrendingUp, Clock } from "lucide-react";

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

export const BlogSection = () => {
  const insights = [
    {
      title: "Appendix Surgery Cost Guide",
      category: "Cost Guide",
      description:
        "Complete breakdown of appendectomy costs across major hospitals",
      readTime: "5 min",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      title: "Choosing Health Insurance",
      category: "Analysis",
      description: "Expert tips on selecting the right health insurance plan",
      readTime: "8 min",
      gradient: "from-emerald-500 to-teal-500",
    },
    {
      title: "Price Transparency 2025",
      category: "Trends",
      description: "Latest regulations making healthcare pricing transparent",
      readTime: "6 min",
      gradient: "from-purple-500 to-pink-500",
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
            <TrendingUp className="w-4 h-4 mr-2" />
            Latest Insights
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-slate-900">
            Healthcare cost insights
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Expert analysis, cost guides, and market trends
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {insights.map((insight, index) => (
            <motion.div key={index} variants={scaleIn}>
              <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer">
                <div
                  className={`h-56 bg-gradient-to-br ${insight.gradient} relative`}
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    <TrendingUp className="w-16 h-16 text-white opacity-80" />
                  </div>
                  <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                    <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-sm">
                      {insight.category}
                    </Badge>
                    <span className="text-white/90 text-sm font-medium flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {insight.readTime}
                    </span>
                  </div>
                </div>

                <CardHeader>
                  <CardTitle className="text-lg group-hover:text-emerald-600 transition-colors">
                    {insight.title}
                  </CardTitle>
                </CardHeader>

                <CardContent>
                  <CardDescription className="text-slate-600 mb-4">
                    {insight.description}
                  </CardDescription>
                  <div className="flex items-center text-emerald-600 font-medium group-hover:translate-x-2 transition-transform">
                    Read More
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};
