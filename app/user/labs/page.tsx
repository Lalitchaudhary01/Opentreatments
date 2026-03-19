"use client";

import { useEffect, useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Header from "@/components/layout/Header";
import { FlaskConical, MapPin, Search, Star } from "lucide-react";
import { getApprovedLabs } from "@/features/user-labs/actions/getApprovedLabs";
import { UserLabListItem } from "@/features/user-labs/types/userLab";
import UserLabList from "@/features/user-labs/components/UserLabList";

export default function UserLabsPage() {
  const [labs, setLabs] = useState<UserLabListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [locationFilter, setLocationFilter] = useState("all");

  useEffect(() => {
    async function load() {
      setLoading(true);
      const data = await getApprovedLabs();
      setLabs(data);
      setLoading(false);
    }

    load();
  }, []);

  const filteredLabs = useMemo(() => {
    return labs.filter((lab) => {
      const q = searchQuery.trim().toLowerCase();
      const matchesQuery =
        q.length === 0 ||
        lab.name.toLowerCase().includes(q) ||
        lab.address.toLowerCase().includes(q) ||
        `${lab.city || ""} ${lab.state || ""}`.toLowerCase().includes(q);

      const matchesLocation =
        locationFilter === "all" ||
        (lab.city || "").toLowerCase() === locationFilter ||
        (lab.state || "").toLowerCase() === locationFilter;

      return matchesQuery && matchesLocation;
    });
  }, [labs, locationFilter, searchQuery]);

  const locations = useMemo(() => {
    const set = new Set<string>();
    labs.forEach((lab) => {
      if (lab.city) set.add(lab.city.toLowerCase());
      if (lab.state) set.add(lab.state.toLowerCase());
    });
    return ["all", ...Array.from(set).slice(0, 8)];
  }, [labs]);

  return (
    <>
      <Header />
      <div className="min-h-screen mt-3 bg-gradient-to-b from-slate-50 via-white to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
        <section className="relative overflow-hidden px-6 pb-10 pt-24">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-20 -left-32 h-96 w-96 rounded-full bg-gradient-to-r from-cyan-400/15 to-teal-400/15 blur-3xl" />
            <div className="absolute bottom-20 -right-32 h-96 w-96 rounded-full bg-gradient-to-r from-teal-500/15 to-sky-400/15 blur-3xl" />
          </div>

          <div className="container relative z-10 mx-auto max-w-6xl">
            <Badge className="mb-5 border-2 border-cyan-200 bg-gradient-to-r from-cyan-50 via-white to-teal-50 px-5 py-2 text-sm font-bold text-teal-800 dark:border-cyan-700 dark:from-cyan-900/30 dark:via-slate-800/50 dark:to-teal-900/30 dark:text-teal-200">
              <FlaskConical className="mr-2 h-4 w-4 text-cyan-600 dark:text-cyan-400" />
              Trusted Diagnostic Labs
            </Badge>

            <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2">
              <div>
                <h1 className="mb-5 text-5xl font-black leading-tight tracking-tight md:text-6xl">
                  <span className="block bg-gradient-to-r from-slate-800 via-teal-700 to-cyan-700 bg-clip-text text-transparent dark:from-slate-100 dark:via-teal-400 dark:to-cyan-400">
                    Find Approved
                  </span>
                  <span className="block bg-gradient-to-r from-cyan-600 to-teal-600 bg-clip-text text-transparent dark:from-cyan-400 dark:to-teal-400">
                    Labs Near You
                  </span>
                </h1>
                <p className="mb-8 text-xl font-medium leading-relaxed text-slate-600 dark:text-slate-300">
                  Book diagnostic tests from verified labs with transparent pricing, faster report turnaround and home sample collection.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Badge className="border border-cyan-300 bg-cyan-50 text-cyan-700 dark:border-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-300">
                    <Star className="mr-1 h-3.5 w-3.5 fill-yellow-500 text-yellow-500" />
                    NABL-Grade Labs
                  </Badge>
                  <Badge className="border border-teal-300 bg-teal-50 text-teal-700 dark:border-teal-700 dark:bg-teal-900/30 dark:text-teal-300">
                    Home Collection
                  </Badge>
                </div>
              </div>

              <div className="hidden lg:block">
                <div className="rounded-3xl border-2 border-cyan-200 bg-gradient-to-br from-cyan-50 to-teal-50 p-8 shadow-2xl dark:border-cyan-700 dark:from-cyan-900/20 dark:to-teal-900/20">
                  <img
                    src="https://images.unsplash.com/photo-1582719508461-905c673771fd?w=700&h=700&fit=crop"
                    alt="Diagnostic Lab"
                    className="h-[420px] w-full rounded-2xl object-cover"
                  />
                </div>
              </div>
            </div>

            <div className="mt-10 space-y-4">
              <div className="relative rounded-2xl border-2 border-slate-200 bg-white/80 p-3 shadow-xl backdrop-blur-xl dark:border-slate-700 dark:bg-slate-900/80">
                <div className="flex flex-col gap-3 md:flex-row">
                  <div className="relative flex-1">
                    <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-cyan-600 dark:text-cyan-400" />
                    <Input
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search by lab name, city, state..."
                      className="h-12 border-0 bg-transparent pl-12 text-lg font-medium focus-visible:ring-0"
                    />
                  </div>

                  <div className="flex gap-2">
                    <select
                      value={locationFilter}
                      onChange={(e) => setLocationFilter(e.target.value)}
                      className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm font-medium text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 md:w-[190px]"
                    >
                      {locations.map((location) => (
                        <option key={location} value={location}>
                          {location === "all" ? "All Locations" : location.charAt(0).toUpperCase() + location.slice(1)}
                        </option>
                      ))}
                    </select>
                    <Button className="h-12 bg-gradient-to-r from-cyan-500 to-teal-500 px-8 font-bold text-white hover:from-cyan-600 hover:to-teal-600">
                      Search
                    </Button>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {["all", "home collection", "popular", "fast reports"].map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    className="rounded-full border border-slate-200 bg-white/70 px-3 py-1.5 text-xs font-semibold text-slate-600 transition hover:border-cyan-400 hover:text-cyan-700 dark:border-slate-700 dark:bg-slate-900/60 dark:text-slate-300 dark:hover:border-cyan-600 dark:hover:text-cyan-300"
                  >
                    {tag === "all" ? "All" : tag}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="container mx-auto max-w-6xl px-6 pb-12">
          {loading ? (
            <div className="flex items-center justify-center py-16">
              <div className="h-12 w-12 animate-spin rounded-full border-4 border-cyan-500 border-t-transparent" />
            </div>
          ) : (
            <>
              <div className="mb-5 flex items-center justify-between">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Available Labs</h2>
                <div className="flex items-center gap-1 text-sm text-slate-500 dark:text-slate-400">
                  <MapPin className="h-4 w-4" />
                  {filteredLabs.length} results
                </div>
              </div>
              <UserLabList labs={filteredLabs} />
            </>
          )}
        </section>
      </div>
    </>
  );
}
