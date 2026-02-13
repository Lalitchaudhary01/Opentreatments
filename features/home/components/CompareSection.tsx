// components/CompareSection.tsx
"use client";

import { Star, IndianRupee, MapPin, BadgeCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const features = [
  {
    icon: Star,
    title: "Best Rated",
    description: "Top-rated providers based on verified patient reviews",
    color: "bg-yellow-100 text-yellow-600",
  },
  {
    icon: IndianRupee,
    title: "Most Affordable",
    description: "Best value options with transparent pricing",
    color: "bg-green-100 text-green-600",
  },
  {
    icon: MapPin,
    title: "Nearest to You",
    description: "Conveniently located providers in your area",
    color: "bg-blue-100 text-blue-600",
  },
];

const doctors = [
  {
    id: 1,
    name: "Dr. Patel Specialty Clinic",
    specialty: "Cardiologist",
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=300&fit=crop",
    tags: ["Consultation", "Diagnostics"],
    rating: 4.1,
    reviews: 456,
    distance: "1.2 km",
    availability: "Available Today",
    price: "₹300",
    badge: "Lowest Price",
    badgeColor: "bg-green-500",
    verified: true,
  },
  {
    id: 2,
    name: "HealthPlus Diagnostics",
    specialty: "Diagnostic Center",
    image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=400&h=300&fit=crop",
    tags: ["Blood Tests", "Pathology"],
    rating: 4.8,
    reviews: 733,
    distance: "2.3 km",
    availability: "Next Day",
    price: "₹800",
    badge: "Best Rated",
    badgeColor: "bg-blue-500",
    verified: true,
  },
  {
    id: 3,
    name: "Dr. Raghav Sharma",
    specialty: "General Physician",
    image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400&h=300&fit=crop",
    tags: ["Consultation", "Diagnostics"],
    rating: 4.5,
    reviews: 234,
    distance: "0.4 km",
    availability: "Available Today",
    price: "₹500",
    badge: "Nearest",
    badgeColor: "bg-purple-500",
    verified: true,
  },
];

export default function CompareSection() {
  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden bg-gray-50">
      {/* Plus Grid Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div 
          className="absolute inset-0 flex items-center justify-center"
          style={{
            perspective: '1200px',
            transformStyle: 'preserve-3d',
          }}
        >
          <div 
            className="absolute w-[200%] h-[200%] animate-grid-float"
            style={{
              transform: 'rotateX(55deg) rotateZ(-45deg)',
              transformOrigin: 'center center',
            }}
          >
            {[...Array(12)].map((_, row) => (
              <div key={row} className="flex">
                {[...Array(16)].map((_, col) => (
                  <div
                    key={col}
                    className="relative w-20 h-20 flex items-center justify-center"
                  >
                    <div className="relative w-6 h-6 opacity-20">
                      <div className="absolute left-1/2 top-0 w-px h-full bg-blue-400 transform -translate-x-1/2" />
                      <div className="absolute top-1/2 left-0 w-full h-px bg-blue-400 transform -translate-y-1/2" />
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Fade masks */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse 70% 50% at 50% 50%, transparent 30%, rgba(249, 250, 251, 0.8) 100%)',
          }}
        />
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-gray-50 to-transparent pointer-events-none" />
        <div className="absolute inset-x-0 top-0 h-1/4 bg-gradient-to-b from-gray-50 to-transparent pointer-events-none" />
      </div>

      <div className="relative max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Left Side - Content */}
          <div className="space-y-10">
            <div className="space-y-4">
              <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight">
                Compare instantly and choose what's right for you
              </h2>
              <p className="text-lg text-gray-600">
                We highlight the best options based on your priorities
              </p>
            </div>

            {/* Features List */}
            <div className="space-y-6">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className={`flex-shrink-0 w-12 h-12 rounded-full ${feature.color} flex items-center justify-center`}>
                    <feature.icon className="w-6 h-6" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-lg font-bold text-gray-900">{feature.title}</h3>
                    <p className="text-gray-600 text-sm">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side - Doctor Cards */}
          <div className="relative h-[500px] flex items-center justify-center">
            {doctors.map((doctor, index) => (
              <div
                key={doctor.id}
                className="absolute bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 w-72 transition-all duration-300 hover:scale-105 hover:z-30"
                style={{
                  left: index === 0 ? '0%' : index === 1 ? '25%' : '50%',
                  top: index === 0 ? '10%' : index === 1 ? '0%' : '15%',
                  zIndex: index === 1 ? 20 : 10,
                  transform: `rotate(${index === 0 ? '-3' : index === 2 ? '3' : '0'}deg)`,
                }}
              >
                {/* Image */}
                <div className="relative h-36 overflow-hidden">
                  <img
                    src={doctor.image}
                    alt={doctor.name}
                    className="w-full h-full object-cover"
                  />
                  {/* Badges */}
                  <div className="absolute top-3 left-3 flex items-center gap-1 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full">
                    <BadgeCheck className="w-3 h-3 text-green-500" />
                    <span className="text-xs font-medium text-gray-700">Verified</span>
                  </div>
                  <div className={`absolute top-3 right-0 ${doctor.badgeColor} text-white px-3 py-1 rounded-l-full text-xs font-medium flex items-center gap-1`}>
                    {index === 1 && <Star className="w-3 h-3 fill-white" />}
                    {doctor.badge}
                  </div>
                </div>

                {/* Content */}
                <div className="p-4 space-y-3">
                  <div>
                    <h4 className="font-bold text-gray-900 text-sm truncate">{doctor.name}</h4>
                    <p className="text-xs text-gray-500">{doctor.specialty}</p>
                  </div>

                  {/* Tags */}
                  <div className="flex gap-2">
                    {doctor.tags.map((tag) => (
                      <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-md">
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Stats */}
                  <div className="flex items-center gap-3 text-xs text-gray-500">
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                      <span className="font-medium text-gray-700">{doctor.rating}</span>
                      <span>({doctor.reviews})</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      <span>{doctor.distance}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                      <span>{doctor.availability}</span>
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="h-px bg-gray-100" />

                  {/* Price */}
                  <div className="flex items-baseline gap-1">
                    <span className="text-xl font-bold text-blue-600">{doctor.price}</span>
                    <span className="text-xs text-gray-500">Onwards</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}