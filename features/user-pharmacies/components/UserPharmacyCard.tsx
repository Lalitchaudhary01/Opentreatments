"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  MapPin,
  Phone,
  Clock,
  Star,
  ChevronRight,
  Package,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { UserPharmacy } from "../types/userPharmacy";
import UserMedicineList from "./UserMedicineList";

interface Props {
  pharmacy: UserPharmacy;
}

export default function UserPharmacyCard({ pharmacy }: Props) {
  const [showMedicines, setShowMedicines] = useState(false);
  const router = useRouter();

  const handleViewDetails = () => {
    router.push(`/user/pharmacy/${pharmacy.id}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      whileHover={{ y: -4 }}
      className="h-full"
    >
      <Card className="relative overflow-hidden border-2 border-slate-200 dark:border-slate-700 hover:border-cyan-400 dark:hover:border-cyan-600 transition-all duration-300 shadow-lg hover:shadow-2xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm h-full flex flex-col">
        {/* Gradient Overlay */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 to-teal-500" />

        {/* Glow Effect on Hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-teal-500/5 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

        <CardHeader className="relative space-y-4 pb-4">
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1">
              <CardTitle className="text-2xl font-black bg-gradient-to-r from-slate-800 to-cyan-700 dark:from-slate-100 dark:to-cyan-400 bg-clip-text text-transparent mb-2">
                {pharmacy.name}
              </CardTitle>

              {/* Rating Badge */}
              <div className="flex items-center gap-2 mb-3">
                <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white border-0 px-3 py-1">
                  <Star className="w-3 h-3 mr-1 fill-white" />
                  <span className="font-bold">4.8</span>
                </Badge>
                <Badge
                  variant="outline"
                  className="border-cyan-400 dark:border-cyan-600 text-cyan-700 dark:text-cyan-300 font-semibold"
                >
                  Verified
                </Badge>
              </div>
            </div>

            {/* Pharmacy Icon */}
            <div className="bg-gradient-to-br from-cyan-100 to-teal-100 dark:from-cyan-900/30 dark:to-teal-900/30 p-3 rounded-2xl border-2 border-cyan-200 dark:border-cyan-700">
              <Package className="w-6 h-6 text-cyan-600 dark:text-cyan-400" />
            </div>
          </div>

          {/* Address */}
          {pharmacy.address && (
            <div className="flex items-start gap-2 text-slate-600 dark:text-slate-300">
              <MapPin className="w-4 h-4 mt-1 text-cyan-600 dark:text-cyan-400 flex-shrink-0" />
              <p className="text-sm font-medium leading-relaxed">
                {pharmacy.address}
              </p>
            </div>
          )}

          {/* Phone */}
          <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
            <Phone className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
            <p className="text-sm font-semibold">{pharmacy.phone}</p>
          </div>

          {/* Open Status */}
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-teal-600 dark:text-teal-400" />
            <Badge
              variant="outline"
              className="border-teal-400 dark:border-teal-600 text-teal-700 dark:text-teal-300 font-semibold"
            >
              Open Now
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="space-y-3 flex-1 flex flex-col relative">
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowMedicines(!showMedicines)}
              className="flex-1 border-2 border-cyan-400 dark:border-cyan-600 text-cyan-700 dark:text-cyan-300 hover:bg-cyan-50 dark:hover:bg-cyan-900/30 font-semibold transition-all duration-300"
            >
              <Package className="w-4 h-4 mr-2" />
              {showMedicines ? "Hide Medicines" : "View Medicines"}
            </Button>

            <Button
              size="sm"
              onClick={handleViewDetails}
              className="flex-1 bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600 text-white font-bold shadow-lg hover:shadow-xl transition-all duration-300 border-0"
            >
              View Details
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>

          {/* Medicine List */}
          {showMedicines && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-4 pt-4 border-t-2 border-slate-200 dark:border-slate-700"
            >
              <UserMedicineList pharmacyId={pharmacy.id} />
            </motion.div>
          )}
        </CardContent>

        {/* Bottom Accent */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </Card>
    </motion.div>
  );
}
