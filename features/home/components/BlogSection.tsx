import { motion } from "framer-motion";
import { ArrowRight, Clock } from "lucide-react";

const fadeIn = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

export const BlogSection = () => {
  const insights = [
    {
      title: "Appendix Surgery Cost Guide",
      description:
        "Understand appendectomy costs across major hospitals with real examples.",
      readTime: "5 min",
      image:
        "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80",
      category: "Cost Guide",
    },
    {
      title: "Choosing the Right Health Insurance",
      description:
        "Simple guide to picking the right plan for your needs and budget.",
      readTime: "8 min",
      image:
        "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800&q=80",
      category: "Insurance",
    },
    {
      title: "Healthcare Price Transparency in 2025",
      description: "What’s changing and how it benefits patients across India.",
      readTime: "6 min",
      image:
        "https://images.unsplash.com/photo-1504439468489-c8920d796a29?w=800&q=80",
      category: "Trends",
    },
  ];

  return (
    <motion.section
      className="py-24 px-4 relative overflow-hidden bg-gradient-to-b from-slate-50 via-white to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <motion.div className="text-center mb-16" variants={fadeIn}>
          <h2 className="text-4xl md:text-5xl font-black mb-6 bg-gradient-to-r from-slate-800 via-teal-700 to-cyan-700 dark:from-slate-100 dark:via-teal-400 dark:to-cyan-400 bg-clip-text text-transparent">
            Healthcare Insights & Guides
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            Practical cost guides and updates to help you make smarter
            healthcare decisions.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {insights.map((item, i) => (
            <motion.div
              key={i}
              variants={fadeIn}
              className="group bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/60 dark:border-slate-800/60 overflow-hidden hover:shadow-xl hover:shadow-cyan-500/10 transition"
            >
              <div className="h-48 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              <div className="p-6">
                <div className="flex items-center justify-between mb-3 text-xs text-slate-500">
                  <span className="font-semibold text-cyan-600 dark:text-cyan-400">
                    {item.category}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {item.readTime}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                  {item.title}
                </h3>

                <p className="text-sm text-slate-600 dark:text-slate-400 mb-5">
                  {item.description}
                </p>

                {/* Read More */}
                <a
                  href="#"
                  className="group relative inline-flex items-center gap-2 text-sm font-semibold text-cyan-600 dark:text-cyan-400 overflow-hidden"
                >
                  {/* Hover Gradient Underline */}
                  <span className="absolute bottom-0 left-0 h-0.5 w-full bg-gradient-to-r from-cyan-600 via-teal-600 to-sky-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  <span className="relative z-10 flex items-center gap-2 group-hover:gap-3 transition-all">
                    Read more
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div className="text-center mt-16" variants={fadeIn}>
          <a
            href="/search"
            className="group relative inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-primary text-primary-foreground font-semibold text-base overflow-hidden"
          >
            {/* Hover Gradient Layer */}
            <span className="absolute inset-0 bg-gradient-to-r from-cyan-600 via-teal-600 to-sky-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            {/* Base Layer (same tone, not black) */}
            <span className="absolute inset-0 bg-primary opacity-100 group-hover:opacity-0 transition-opacity duration-300" />

            {/* Content */}
            <span className="relative z-10 flex items-center gap-2">
              View All Insights
              <ArrowRight className="w-5 h-5" />
            </span>
          </a>
        </motion.div>
      </div>
    </motion.section>
  );
};
