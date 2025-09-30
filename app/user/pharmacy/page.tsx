"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Pill, Search, MapPin, Star, ShoppingBag } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import UserPharmacyList from "@/features/user-pharmacies/components/UserPharmacyList";
import Header from "@/components/layout/Header";

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
    transition: { staggerChildren: 0.1 },
  },
};

const beamAnimation = {
  hidden: { x: "-100%", opacity: 0 },
  visible: {
    x: "200%",
    opacity: [0, 1, 1, 0],
    transition: {
      duration: 2,
      ease: "easeInOut",
      repeat: Infinity,
      repeatDelay: 3,
    },
  },
};

export default function PharmaciesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("all");
  const [selectedType, setSelectedType] = useState("All");
  const [appliedFilters, setAppliedFilters] = useState({
    search: "",
    location: "all",
    type: "All",
  });

  const handleSearch = () => {
    setAppliedFilters({
      search: searchQuery,
      location: selectedLocation,
      type: selectedType,
    });
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <>
      <Header />
      <div className="min-h-screen mt-3 bg-gradient-to-b from-slate-50 via-white to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
        <motion.section
          className="relative pt-24 pb-12 px-6 overflow-hidden"
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
        >
          {/* Animated Background Elements */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-20 -left-32 w-96 h-96 bg-gradient-to-r from-cyan-400/15 to-teal-400/15 rounded-full blur-3xl animate-float" />
            <div className="absolute bottom-20 -right-32 w-96 h-96 bg-gradient-to-r from-teal-500/15 to-sky-400/15 rounded-full blur-3xl animate-float-delayed" />

            {/* Beam Effect */}
            <motion.div
              className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
              variants={beamAnimation}
              initial="hidden"
              animate="visible"
            />

            {/* Grid Pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.03)_1px,transparent_1px)] bg-[size:64px_64px]" />
          </div>

          <div className="container mx-auto max-w-6xl relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              {/* Left Content */}
              <div>
                {/* Badge */}
                <Badge className="mb-6 px-5 py-2 bg-gradient-to-r from-cyan-50 via-white to-teal-50 dark:from-cyan-900/30 dark:via-slate-800/50 dark:to-teal-900/30 border-2 border-cyan-200 dark:border-cyan-700 text-teal-800 dark:text-teal-200 font-bold text-sm shadow-lg backdrop-blur-sm hover:shadow-xl transition-shadow">
                  <Pill className="w-4 h-4 mr-2 text-cyan-600 dark:text-cyan-400" />
                  <span className="bg-gradient-to-r from-cyan-700 to-teal-700 dark:from-cyan-300 dark:to-teal-300 bg-clip-text text-transparent">
                    Trusted Pharmacy Partners
                  </span>
                </Badge>

                {/* Main Heading */}
                <h1 className="text-5xl md:text-6xl font-black mb-6 leading-tight tracking-tight">
                  <span className="block bg-gradient-to-r from-slate-800 via-teal-700 to-cyan-700 dark:from-slate-100 dark:via-teal-400 dark:to-cyan-400 bg-clip-text text-transparent">
                    Find Your
                  </span>
                  <span className="block bg-gradient-to-r from-cyan-600 to-teal-600 dark:from-cyan-400 dark:to-teal-400 bg-clip-text text-transparent">
                    Nearby Pharmacy
                  </span>
                </h1>

                {/* Description */}
                <p className="text-xl text-slate-600 dark:text-slate-300 mb-10 leading-relaxed font-medium">
                  Browse verified pharmacies and medical stores. Order medicines
                  with ease from trusted partners in your area.
                </p>
              </div>

              {/* Right Image */}
              <motion.div
                className="hidden lg:block relative"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <div className="relative">
                  {/* Glow Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-teal-400 rounded-3xl blur-3xl opacity-20 animate-pulse" />

                  {/* Image Container */}
                  <div className="relative bg-gradient-to-br from-cyan-50 to-teal-50 dark:from-cyan-900/20 dark:to-teal-900/20 rounded-3xl p-8 backdrop-blur-sm border-2 border-cyan-200 dark:border-cyan-700 shadow-2xl">
                    <img
                      src="https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=500&h=600&fit=crop"
                      alt="Pharmacy Store"
                      className="w-full h-[500px] object-cover rounded-2xl shadow-lg"
                    />

                    {/* Floating Badge */}
                    <div className="absolute -bottom-4 -right-4 bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-4 border-2 border-cyan-400 dark:border-cyan-600">
                      <div className="flex items-center gap-2">
                        <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                        <span className="text-2xl font-bold text-slate-800 dark:text-slate-100">
                          4.9
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 dark:text-slate-400 font-medium">
                        Top Rated
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Search Bar with Filters */}
            <div className="space-y-4 max-w-4xl mt-10">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-teal-500 rounded-2xl blur-xl opacity-20" />
                <div className="relative flex flex-col md:flex-row gap-3 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-2 border-slate-200 dark:border-slate-700 rounded-2xl shadow-xl hover:border-cyan-400 dark:hover:border-cyan-600 transition-all duration-500 p-3">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/10 to-transparent -translate-x-full hover:translate-x-full transition-transform duration-1000 rounded-2xl pointer-events-none" />

                  <div className="relative flex-1 flex items-center">
                    <Search className="absolute left-4 w-5 h-5 text-cyan-600 dark:text-cyan-400" />
                    <Input
                      type="text"
                      placeholder="Search by name, location..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onKeyPress={handleKeyPress}
                      className="pl-12 pr-4 py-6 bg-transparent border-0 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 text-lg font-medium focus-visible:ring-0 focus-visible:ring-offset-0"
                    />
                  </div>

                  <div className="flex gap-3">
                    <Select
                      value={selectedLocation}
                      onValueChange={setSelectedLocation}
                    >
                      <SelectTrigger className="w-full md:w-[180px] bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 py-6">
                        <MapPin className="w-4 h-4 mr-2 text-cyan-600 dark:text-cyan-400" />
                        <SelectValue placeholder="Location" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Locations</SelectItem>
                        <SelectItem value="delhi">Delhi</SelectItem>
                        <SelectItem value="mumbai">Mumbai</SelectItem>
                        <SelectItem value="bangalore">Bangalore</SelectItem>
                      </SelectContent>
                    </Select>

                    <Button
                      onClick={handleSearch}
                      className="px-8 py-6 bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      Search
                    </Button>
                  </div>
                </div>
              </div>

              {/* Filter Tags */}
              <motion.div
                className="flex flex-wrap gap-3"
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
              >
                {[
                  "All",
                  "24/7 Open",
                  "Home Delivery",
                  "Emergency",
                  "Prescription",
                ].map((type) => (
                  <motion.div key={type} variants={fadeInUp}>
                    <Badge
                      variant="outline"
                      onClick={() => {
                        setSelectedType(type);
                        setAppliedFilters({
                          search: searchQuery,
                          location: selectedLocation,
                          type: type,
                        });
                      }}
                      className={`px-4 py-2 backdrop-blur-sm cursor-pointer transition-all duration-300 font-semibold ${
                        selectedType === type
                          ? "bg-cyan-100 dark:bg-cyan-900/50 border-cyan-400 dark:border-cyan-600 text-cyan-700 dark:text-cyan-300"
                          : "bg-white/60 dark:bg-slate-900/60 hover:bg-cyan-50 dark:hover:bg-cyan-900/30 hover:border-cyan-400 dark:hover:border-cyan-600"
                      }`}
                    >
                      {type}
                    </Badge>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* Pharmacy List Section */}
        <div className="container mx-auto max-w-6xl px-6 pb-12 relative z-10">
          <UserPharmacyList
            searchQuery={appliedFilters.search}
            selectedLocation={appliedFilters.location}
            selectedType={appliedFilters.type}
          />
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

          .animate-float {
            animation: float 12s ease-in-out infinite;
          }

          .animate-float-delayed {
            animation: float 12s ease-in-out 6s infinite;
          }
        `}</style>
      </div>
    </>
  );
}
