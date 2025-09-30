"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Building2, Search, MapPin, Star } from "lucide-react";
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
import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";
import UserHospitalList from "@/features/user-hospitals/components/UserHospitalList";
import Header from "@/components/layout/Header";
import { UserHospital } from "@/features/user-hospitals/types/userHospital";
import { getApprovedHospitals } from "@/features/user-hospitals/actions/getApprovedHospitals";

export default function UserHospitalsPage() {
  const [hospitals, setHospitals] = useState<UserHospital[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("all");
  const [selectedType, setSelectedType] = useState("All");
  const [appliedFilters, setAppliedFilters] = useState({
    search: "",
    location: "all",
    type: "All",
  });
  const router = useRouter();

  useEffect(() => {
    const fetchHospitals = async () => {
      try {
        const data = await getApprovedHospitals();
        setHospitals(data);
      } catch (error) {
        console.error("Error fetching hospitals:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchHospitals();
  }, []);

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

  if (loading) {
    return (
      <>
        <Header />
        <div className="min-h-screen  bg-gradient-to-b from-slate-50 via-white to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
          <div className="container mx-auto px-4 py-8 max-w-6xl">
            <div className="space-y-6">
              <div className="space-y-2">
                <Skeleton className="h-12 w-64" />
                <Skeleton className="h-6 w-96" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {[...Array(6)].map((_, index) => (
                  <Card key={index} className="p-6">
                    <div className="space-y-4">
                      <div className="flex items-start gap-4">
                        <Skeleton className="w-16 h-16 rounded-full" />
                        <div className="space-y-2 flex-1">
                          <Skeleton className="h-6 w-3/4" />
                          <Skeleton className="h-4 w-1/2" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Skeleton className="h-4 w-20" />
                        <div className="flex flex-wrap gap-1">
                          <Skeleton className="h-6 w-16" />
                          <Skeleton className="h-6 w-20" />
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="min-h-screen mt-3 bg-gradient-to-b from-slate-50 via-white to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
        {/* Header Section */}
        <section className="relative pt-24 pb-12 px-6 overflow-hidden animate-fadeInUp">
          {/* Animated Background Elements */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-20 -left-32 w-96 h-96 bg-gradient-to-r from-cyan-400/15 to-teal-400/15 rounded-full blur-3xl animate-float" />
            <div className="absolute bottom-20 -right-32 w-96 h-96 bg-gradient-to-r from-teal-500/15 to-sky-400/15 rounded-full blur-3xl animate-float-delayed" />

            {/* Beam Effect */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-beam" />

            {/* Grid Pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.03)_1px,transparent_1px)] bg-[size:64px_64px]" />
          </div>

          <div className="container mx-auto max-w-6xl relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              {/* Left Content */}
              <div>
                {/* Badge */}
                <Badge className="mb-6 px-5 py-2 bg-gradient-to-r from-cyan-50 via-white to-teal-50 dark:from-cyan-900/30 dark:via-slate-800/50 dark:to-teal-900/30 border-2 border-cyan-200 dark:border-cyan-700 text-teal-800 dark:text-teal-200 font-bold text-sm shadow-lg backdrop-blur-sm hover:shadow-xl transition-shadow">
                  <Building2 className="w-4 h-4 mr-2 text-cyan-600 dark:text-cyan-400" />
                  <span className="bg-gradient-to-r from-cyan-700 to-teal-700 dark:from-cyan-300 dark:to-teal-300 bg-clip-text text-transparent">
                    Trusted Healthcare Facilities
                  </span>
                </Badge>

                {/* Main Heading */}
                <h1 className="text-5xl md:text-6xl font-black mb-6 leading-tight tracking-tight">
                  <span className="block bg-gradient-to-r from-slate-800 via-teal-700 to-cyan-700 dark:from-slate-100 dark:via-teal-400 dark:to-cyan-400 bg-clip-text text-transparent">
                    Discover Top
                  </span>
                  <span className="block bg-gradient-to-r from-cyan-600 to-teal-600 dark:from-cyan-400 dark:to-teal-400 bg-clip-text text-transparent">
                    Healthcare Centers
                  </span>
                </h1>

                {/* Description */}
                <p className="text-xl text-slate-600 dark:text-slate-300 mb-10 leading-relaxed font-medium">
                  Explore verified and approved hospitals. Access world-class
                  healthcare facilities with state-of-the-art equipment.
                </p>
              </div>

              {/* Right Image */}
              <div className="hidden lg:block relative animate-slideInRight">
                <div className="relative">
                  {/* Glow Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-teal-400 rounded-3xl blur-3xl opacity-20 animate-pulse" />

                  {/* Image Container */}
                  <div className="relative bg-gradient-to-br from-cyan-50 to-teal-50 dark:from-cyan-900/20 dark:to-teal-900/20 rounded-3xl p-8 backdrop-blur-sm border-2 border-cyan-200 dark:border-cyan-700 shadow-2xl">
                    <img
                      src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=500&h=600&fit=crop"
                      alt="Modern Hospital"
                      className="w-full h-[500px] object-cover rounded-2xl shadow-lg"
                    />

                    {/* Floating Badge */}
                    <div className="absolute -bottom-4 -right-4 bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-4 border-2 border-cyan-400 dark:border-cyan-600">
                      <div className="flex items-center gap-2">
                        <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                        <span className="text-2xl font-bold text-slate-800 dark:text-slate-100">
                          4.8
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 dark:text-slate-400 font-medium">
                        Top Rated
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Search Bar with Filters */}
            <div className="space-y-4 max-w-4xl mt-10">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl blur-xl opacity-20" />
                <div className="relative flex flex-col md:flex-row gap-3 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-2 border-slate-200 dark:border-slate-700 rounded-2xl shadow-xl hover:border-blue-400 dark:hover:border-blue-600 transition-all duration-500 p-3 group">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-400/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 rounded-2xl pointer-events-none" />

                  <div className="relative flex-1 flex items-center">
                    <Search className="absolute left-4 w-5 h-5 text-blue-600 dark:text-blue-400" />
                    <Input
                      type="text"
                      placeholder="Search hospitals by name, facilities..."
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
                        <MapPin className="w-4 h-4 mr-2 text-blue-600 dark:text-blue-400" />
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
                      className="px-8 py-6 bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      Search
                    </Button>
                  </div>
                </div>
              </div>

              {/* Filter Tags */}
              <div className="flex flex-wrap gap-3">
                {[
                  "All",
                  "Multi-Specialty",
                  "Emergency Care",
                  "Surgical Center",
                  "Diagnostic Center",
                ].map((type, index) => (
                  <Badge
                    key={type}
                    variant="outline"
                    onClick={() => {
                      setSelectedType(type);
                      setAppliedFilters({
                        search: searchQuery,
                        location: selectedLocation,
                        type: type,
                      });
                    }}
                    className={`px-4 py-2 backdrop-blur-sm cursor-pointer transition-all duration-300 font-semibold animate-fadeInUp ${
                      selectedType === type
                        ? "bg-blue-100 dark:bg-blue-900/50 border-blue-400 dark:border-blue-600 text-blue-700 dark:text-blue-300"
                        : "bg-white/60 dark:bg-slate-900/60 hover:bg-blue-50 dark:hover:bg-blue-900/30 hover:border-blue-400 dark:hover:border-blue-600"
                    }`}
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    {type}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Hospital List Section */}
        <div className="container mx-auto max-w-6xl px-6 pb-12 relative z-10">
          <UserHospitalList
            hospitals={hospitals}
            onHospitalClick={(hospital) =>
              router.push(`/user/hospitals/${hospital.id}`)
            }
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

          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(40px);
              filter: blur(10px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
              filter: blur(0);
            }
          }

          @keyframes slideInRight {
            from {
              opacity: 0;
              transform: translateX(50px);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }

          @keyframes beam {
            0% {
              transform: translateX(-100%);
              opacity: 0;
            }
            25% {
              opacity: 1;
            }
            75% {
              opacity: 1;
            }
            100% {
              transform: translateX(200%);
              opacity: 0;
            }
          }

          .animate-float {
            animation: float 12s ease-in-out infinite;
          }

          .animate-float-delayed {
            animation: float 12s ease-in-out 6s infinite;
          }

          .animate-fadeInUp {
            animation: fadeInUp 0.8s ease-out forwards;
          }

          .animate-slideInRight {
            animation: slideInRight 0.8s ease-out 0.2s forwards;
            opacity: 0;
          }

          .animate-beam {
            animation: beam 5s ease-in-out infinite;
          }
        `}</style>
      </div>
    </>
  );
}
