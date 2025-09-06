"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Hospital, Calculator, CheckCircle, TrendingUp } from "lucide-react";
import TextBorderAnimation from "@/components/animata/text/text-border-animation";

const KeyFeatures = () => {
  const features = [
    {
      icon: <Hospital className="w-6 h-6 text-primary" />,
      title: "Compare Hospital Costs",
      desc: "Get transparent pricing from hospitals in your area for any procedure or treatment.",
      bg: "bg-primary/10",
      color: "text-primary",
    },
    {
      icon: <TrendingUp className="w-6 h-6 text-accent" />,
      title: "AI Estimator",
      desc: "Our AI analyzes your specific case to provide personalized cost estimates.",
      bg: "bg-accent/10",
      color: "text-accent",
    },
    {
      icon: <CheckCircle className="w-6 h-6 text-primary" />,
      title: "Verified Bills",
      desc: "Real patient bills and experiences to give you accurate cost expectations.",
      bg: "bg-primary/10",
      color: "text-primary",
    },
    {
      icon: <Calculator className="w-6 h-6 text-accent" />,
      title: "Insurance Calculator",
      desc: "Calculate your out-of-pocket costs based on your insurance coverage.",
      bg: "bg-accent/10",
      color: "text-accent",
    },
  ];

  return (
    <section className="py-20 px-4 bg-muted/30 relative overflow-hidden">
      {/* background */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -left-20 w-64 h-64 rounded-full bg-primary/5 animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 rounded-full bg-accent/5 animate-pulse delay-1000"></div>
      </div>

      <div className="container mx-auto max-w-6xl relative z-10">
        <h2 className="text-3xl text-[#10B981] md:text-4xl font-bold text-center mb-16 text-balance">
          <TextBorderAnimation
            text="Everything you need to make informed healthcare decisions"
            className="text-3xl md:text-4xl font-bold text-center mb-16 text-balance text-[#10B981]"
          />
        </h2>

        {/* marquee wrapper */}
        <div className="overflow-hidden relative">
          <div className="flex gap-6 animate-marquee">
            {[...features, ...features].map((item, idx) => (
              <Card
                key={idx}
                className="text-center hover:shadow-xl transition-all duration-300 min-w-[300px] flex-shrink-0 group relative overflow-hidden rounded-xl"
              >
                {/* Point Light Orbit */}
                <div className="absolute inset-0 rounded-xl border border-muted">
                  <div className="absolute w-3 h-3 bg-cyan-400 rounded-full shadow-[0_0_12px_4px_rgba(34,211,238,0.7)] animate-orbit group-hover:animate-none"></div>
                </div>

                <CardHeader className="relative z-10">
                  <div
                    className={`w-12 h-12 ${item.bg} rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}
                  >
                    {item.icon}
                  </div>
                  <CardTitle
                    className={`group-hover:${item.color} transition-colors duration-300`}
                  >
                    {item.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="relative z-10">
                  <CardDescription className="group-hover:text-foreground/80 transition-colors duration-300">
                    {item.desc}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Tailwind custom animations */}
      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .animate-marquee {
          display: flex;
          width: max-content;
          animation: marquee 20s linear infinite;
        }

        /* Orbit animation for the glowing point */
        @keyframes orbit {
          0% {
            top: 0%;
            left: 50%;
            transform: translate(-50%, -50%);
          }
          25% {
            top: 50%;
            left: 100%;
            transform: translate(-50%, -50%);
          }
          50% {
            top: 100%;
            left: 50%;
            transform: translate(-50%, -50%);
          }
          75% {
            top: 50%;
            left: 0%;
            transform: translate(-50%, -50%);
          }
          100% {
            top: 0%;
            left: 50%;
            transform: translate(-50%, -50%);
          }
        }

        .animate-orbit {
          position: absolute;
          animation: orbit 3s linear infinite;
        }
      `}</style>
    </section>
  );
};

export default KeyFeatures;
