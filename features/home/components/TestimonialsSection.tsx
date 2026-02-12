"use client";

import { useEffect, useRef } from "react";
import { Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "@/components/ui/avatar";

const testimonials = [
  // ✅ same data as yours (unchanged)
  {
    id: 1,
    name: "Meera Jain",
    location: "Mumbai",
    rating: 5,
    text: "Found the perfect doctor within minutes. The price transparency saved me from unpleasant surprises!",
    avatar: "https://i.pravatar.cc/150?u=meera",
  },
  {
    id: 2,
    name: "Crystal D'Souza",
    location: "Pune",
    rating: 5,
    text: "Booked a full health checkup package and paid transparently. The lab was professional and results were quick.",
    avatar: "https://i.pravatar.cc/150?u=crystal",
  },
  {
    id: 3,
    name: "Harsh Sharma",
    location: "Gurugram",
    rating: 5,
    text: "Comparing hospitals was so easy. I could see all costs upfront and book instantly. Highly recommend!",
    avatar: "https://i.pravatar.cc/150?u=harsh",
  },
  {
    id: 4,
    name: "Binita Kumarran",
    location: "Hyderabad",
    rating: 5,
    text: "The admin-approved badge gives me peace of mind. Only verified providers, exactly what healthcare needs.",
    avatar: "https://i.pravatar.cc/150?u=binita",
  },
  {
    id: 5,
    name: "Rahul Verma",
    location: "Delhi",
    rating: 5,
    text: "Finally found a good dentist after moving cities. The patient reviews helped me choose confidently.",
    avatar: "https://i.pravatar.cc/150?u=rahul",
  },
  {
    id: 6,
    name: "Priya Patel",
    location: "Bangalore",
    rating: 5,
    text: "No more hidden charges! Everything is upfront and clear. Best healthcare booking experience ever.",
    avatar: "https://i.pravatar.cc/150?u=priya",
  },
];

function TestimonialCard({
  testimonial,
}: {
  testimonial: typeof testimonials[0];
}) {
  return (
    <Card className="flex-shrink-0 w-[400px] rounded-2xl mx-3 shadow-sm hover:shadow-md transition-shadow duration-300">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Avatar className="h-12 w-12">
              <AvatarImage src={testimonial.avatar} />
              <AvatarFallback>
                {testimonial.name.charAt(0)}
              </AvatarFallback>
            </Avatar>

            <div>
              <h4 className="font-semibold text-sm">
                {testimonial.name}
              </h4>
              <p className="text-muted-foreground text-xs">
                {testimonial.location}
              </p>
            </div>
          </div>

          <div className="flex gap-0.5">
            {[...Array(testimonial.rating)].map((_, i) => (
              <Star
                key={i}
                className="w-4 h-4 fill-yellow-400 text-yellow-400"
              />
            ))}
          </div>
        </div>

        <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3">
          {testimonial.text}
        </p>
      </CardContent>
    </Card>
  );
}

export default function Testimonials() {
  const topRowRef = useRef<HTMLDivElement>(null);
  const bottomRowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const duplicateContent = (
      ref: React.RefObject<HTMLDivElement | null>
    ) => {
      if (!ref.current) return;
      const content = ref.current.innerHTML;
      ref.current.innerHTML = content + content;
    };

    duplicateContent(topRowRef);
    duplicateContent(bottomRowRef);
  }, []);

  return (
    <section className="py-20 bg-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 text-center">
        <h2 className="text-4xl font-bold mb-4">
          What our users say
        </h2>
        <p className="text-muted-foreground text-lg">
          Join thousands of satisfied patients making better healthcare choices
        </p>
      </div>

      <div className="relative mb-6">
        <div className="flex animate-scroll-right" ref={topRowRef}>
          {testimonials.slice(0, 3).map((t) => (
            <TestimonialCard key={t.id} testimonial={t} />
          ))}
        </div>
      </div>

      <div className="relative">
        <div className="flex animate-scroll-left" ref={bottomRowRef}>
          {testimonials.slice(3, 6).map((t) => (
            <TestimonialCard key={t.id} testimonial={t} />
          ))}
        </div>
      </div>
    </section>
  );
}