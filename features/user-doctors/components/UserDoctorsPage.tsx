"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Stethoscope, Search, MapPin } from "lucide-react";
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
import UserDoctorList from "@/features/user-doctors/components/UserDoctorList";
import Header from "@/components/layout/Header";
import DoctorSpecialties from "./DoctorSpecialties";
import CommonHealthConcerns from "./CommonHealthConcerns";

const fadeInUp = {
  hidden: { opacity: 0, y: 40, filter: "blur(10px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)" },
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const beamAnimation = {
  hidden: { x: "-100%", opacity: 0 },
  visible: { x: "200%", opacity: [0, 1, 1, 0] },
};

export default function UserDoctorsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("all");
  const [selectedSpecialty, setSelectedSpecialty] = useState("All");
  const [appliedFilters, setAppliedFilters] = useState({
    search: "",
    location: "all",
    specialty: "All",
  });

  const handleSearch = () => {
    setAppliedFilters({
      search: searchQuery,
      location: selectedLocation,
      specialty: selectedSpecialty,
    });
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <>
      <Header />

      <div className="min-h-screen  bg-gradient-to-b from-slate-50 via-green to-green-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
        <motion.section
          className="relative pt-24 pb-16 px-6 overflow-hidden"
          variants={fadeInUp}
        >
          {/* Background Effects */}
          {/* Background Effects */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-20 -left-32 w-[600px] h-[600px] bg-gradient-to-r from-cyan-400/20 to-teal-400/20 rounded-full blur-3xl animate-float" />
            <div className="absolute bottom-20 -right-32 w-[600px] h-[600px] bg-gradient-to-r from-teal-500/20 to-sky-400/20 rounded-full blur-3xl animate-float-delayed" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-br from-cyan-300/10 via-transparent to-teal-300/10 rounded-full blur-3xl" />

            <motion.div
              className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
              variants={beamAnimation}
              initial="hidden"
              animate="visible"
            />

            {/* Floating particles */}
          </div>

          <div className="container mx-auto max-w-6xl relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              {/* IMAGE PANEL */}
              <motion.div
                className="hidden lg:flex justify-center items-center"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <div
                  className="
          relative
          w-[520px]
          h-[420px]
          xl:w-[560px]
          xl:h-[460px]
          rounded-3xl
          bg-gradient-to-br from-cyan-100 via-teal-50 to-green-50
          flex items-end justify-center
          overflow-hidden
        "
                >
                  <img
                    src="https://ik.imagekit.io/gpo2lkfh1/doctor-Photoroom.png"
                    alt="Online Doctor Consultation"
                    className="
              max-h-[420px]
              w-auto
              object-contain
              drop-shadow-xl
              translate-y-6
            "
                  />
                </div>
              </motion.div>

              {/* CONTENT */}
              <div className="max-w-xl">
                <Badge className="mb-6 px-5 py-2 bg-gradient-to-r from-cyan-50 via-white to-teal-50 border-2 border-cyan-200 text-teal-800 font-bold shadow-lg">
                  <Stethoscope className="w-4 h-4 mr-2" />
                  India’s Trusted Healthcare Network
                </Badge>

                <h1 className="text-5xl md:text-6xl font-black mb-6 leading-tight">
                  <span className="block bg-gradient-to-r from-slate-800 via-teal-700 to-cyan-700 bg-clip-text text-transparent">
                    Healthcare,
                  </span>
                  <span className="block bg-gradient-to-r from-cyan-600 to-teal-600 bg-clip-text text-transparent">
                    Just a Click Away
                  </span>
                </h1>

                <p className="text-xl text-slate-600 mb-8 font-medium">
                  Find experienced doctors, book consultations instantly, and
                  get expert medical advice from the comfort of your home.
                </p>
              </div>
            </div>
          </div>
        </motion.section>

        {/* SEARCH SECTION */}
        <div className="relative -mt-12 z-20">
          <div className="container mx-auto max-w-5xl px-6">
            <div className="relative">
              {/* Glow */}
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-teal-500 rounded-2xl blur-xl opacity-20" />

              {/* Search Card */}
              <div className="relative bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border border-slate-200 dark:border-slate-700 rounded-2xl shadow-xl p-4 flex flex-col md:flex-row gap-3">
                {/* Search Input */}
                <div className="flex-1 relative flex items-center">
                  <Search className="absolute left-4 w-5 h-5 text-cyan-600" />
                  <Input
                    placeholder="Search by name, specialization..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="pl-12 py-6 border-0 bg-transparent text-lg"
                  />
                </div>

                {/* Location */}
                <Select
                  value={selectedLocation}
                  onValueChange={setSelectedLocation}
                >
                  <SelectTrigger className="md:w-[180px] py-6">
                    <MapPin className="w-4 h-4 mr-2" />
                    <SelectValue placeholder="Location" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Locations</SelectItem>
                    <SelectItem value="delhi">Delhi</SelectItem>
                    <SelectItem value="mumbai">Mumbai</SelectItem>
                    <SelectItem value="bangalore">Bangalore</SelectItem>
                  </SelectContent>
                </Select>

                {/* Button */}
                <Button
                  onClick={handleSearch}
                  className="px-8 py-6 bg-gradient-to-r from-cyan-500 to-teal-500 text-white font-bold rounded-xl"
                >
                  Search
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/*doctor specilities */}
        <DoctorSpecialties />
        <CommonHealthConcerns />
        {/* DOCTOR LIST */}
        <div className="container mx-auto max-w-6xl px-6 pb-12">
          <UserDoctorList
            searchQuery={appliedFilters.search}
            selectedLocation={appliedFilters.location}
            selectedSpecialty={appliedFilters.specialty}
          />
        </div>
      </div>
    </>
  );
}
