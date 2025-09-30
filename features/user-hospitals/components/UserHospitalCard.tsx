"use client";
import { UserHospital } from "../types/userHospital";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  MapPin,
  Phone,
  Mail,
  Globe,
  Building2,
  CheckCircle2,
  ArrowRight,
  Star,
} from "lucide-react";
import Link from "next/link";

type Props = {
  hospital: UserHospital;
};

export default function UserHospitalCard({ hospital }: Props) {
  return (
    <Link href={`/user/hospitals/${hospital.id}`} className="block group">
      <Card className="relative overflow-hidden border-2 border-slate-200 dark:border-slate-800 hover:border-cyan-400 dark:hover:border-cyan-600 transition-all duration-500 hover:shadow-2xl hover:shadow-cyan-500/20 backdrop-blur-sm bg-white/80 dark:bg-slate-900/80">
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-50/50 via-transparent to-teal-50/50 dark:from-cyan-900/10 dark:via-transparent dark:to-teal-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Animated Border Effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-teal-400 opacity-0 group-hover:opacity-10 blur-xl transition-opacity duration-500" />

        <CardContent className="relative p-6 space-y-4">
          {/* Header Section */}
          <div className="flex items-start gap-4">
            <div className="relative">
              <Avatar className="w-20 h-20 ring-4 ring-slate-100 dark:ring-slate-800 group-hover:ring-cyan-200 dark:group-hover:ring-cyan-800 transition-all duration-300">
                <AvatarImage
                  src={hospital.logo || hospital.image}
                  alt={hospital.name}
                  className="object-cover"
                />
                <AvatarFallback className="text-2xl font-bold bg-gradient-to-br from-cyan-100 to-teal-100 dark:from-cyan-900 dark:to-teal-900 text-cyan-700 dark:text-cyan-300">
                  {hospital.name.charAt(0)}
                </AvatarFallback>
              </Avatar>

              {/* Verified Badge */}
              {hospital.verified && (
                <div className="absolute -bottom-1 -right-1 bg-white dark:bg-slate-900 rounded-full p-1">
                  <CheckCircle2 className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
                </div>
              )}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors line-clamp-2">
                  {hospital.name}
                </h3>

                {/* Status Badge */}
                <Badge className="shrink-0 bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900/40 dark:to-emerald-900/40 text-green-700 dark:text-green-300 border-green-300 dark:border-green-700 font-semibold">
                  {hospital.status}
                </Badge>
              </div>

              {/* Location */}
              {(hospital.city || hospital.state) && (
                <div className="flex items-center gap-2 mt-2 text-slate-600 dark:text-slate-400">
                  <MapPin className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                  <span className="text-sm font-medium">
                    {[hospital.city, hospital.state, hospital.country]
                      .filter(Boolean)
                      .join(", ")}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Address */}
          {hospital.address && (
            <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2">
              {hospital.address}
            </p>
          )}

          {/* Contact Information */}
          <div className="flex flex-wrap gap-3">
            {hospital.phone && (
              <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                <Phone className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                <span className="font-medium">{hospital.phone}</span>
              </div>
            )}

            {hospital.email && (
              <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                <Mail className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                <span className="font-medium truncate max-w-[200px]">
                  {hospital.email}
                </span>
              </div>
            )}

            {hospital.website && (
              <div className="flex items-center gap-2 text-sm text-cyan-600 dark:text-cyan-400 hover:text-cyan-700 dark:hover:text-cyan-300">
                <Globe className="w-4 h-4" />
                <span className="font-medium">Visit Website</span>
              </div>
            )}
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-3 gap-3 pt-3 border-t border-slate-200 dark:border-slate-800">
            {/* Doctors Count */}
            <div className="text-center p-3 rounded-xl bg-gradient-to-br from-cyan-50 to-teal-50 dark:from-cyan-900/20 dark:to-teal-900/20 border border-cyan-100 dark:border-cyan-900">
              <div className="text-2xl font-bold text-cyan-600 dark:text-cyan-400">
                {hospital.doctors?.length || 0}
              </div>
              <div className="text-xs font-semibold text-slate-600 dark:text-slate-400 mt-1">
                Doctors
              </div>
            </div>

            {/* Services Count */}
            <div className="text-center p-3 rounded-xl bg-gradient-to-br from-teal-50 to-cyan-50 dark:from-teal-900/20 dark:to-cyan-900/20 border border-teal-100 dark:border-teal-900">
              <div className="text-2xl font-bold text-teal-600 dark:text-teal-400">
                {hospital.services?.length || 0}
              </div>
              <div className="text-xs font-semibold text-slate-600 dark:text-slate-400 mt-1">
                Services
              </div>
            </div>

            {/* Facilities Count */}
            <div className="text-center p-3 rounded-xl bg-gradient-to-br from-sky-50 to-cyan-50 dark:from-sky-900/20 dark:to-cyan-900/20 border border-sky-100 dark:border-sky-900">
              <div className="text-2xl font-bold text-sky-600 dark:text-sky-400">
                {hospital.facilities?.length || 0}
              </div>
              <div className="text-xs font-semibold text-slate-600 dark:text-slate-400 mt-1">
                Facilities
              </div>
            </div>
          </div>

          {/* Procedures Preview */}
          {hospital.procedures && hospital.procedures.length > 0 && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-slate-700 dark:text-slate-300">
                  Available Procedures
                </span>
                <Badge variant="secondary" className="text-xs">
                  {hospital.procedures.length}
                </Badge>
              </div>
              <div className="flex flex-wrap gap-2">
                {hospital.procedures.slice(0, 3).map((procedure, index) => (
                  <Badge
                    key={index}
                    variant="outline"
                    className="text-xs bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm border-cyan-200 dark:border-cyan-800 text-slate-700 dark:text-slate-300 hover:bg-cyan-50 dark:hover:bg-cyan-900/30 hover:border-cyan-400 dark:hover:border-cyan-600 transition-colors"
                  >
                    {procedure.name}
                  </Badge>
                ))}
                {hospital.procedures.length > 3 && (
                  <Badge
                    variant="outline"
                    className="text-xs bg-cyan-50 dark:bg-cyan-900/30 border-cyan-300 dark:border-cyan-700 text-cyan-700 dark:text-cyan-300 font-semibold"
                  >
                    +{hospital.procedures.length - 3} more
                  </Badge>
                )}
              </div>
            </div>
          )}

          {/* View Details Button */}
          <div className="pt-2 flex items-center justify-between text-cyan-600 dark:text-cyan-400 group-hover:text-cyan-700 dark:group-hover:text-cyan-300 transition-colors">
            <span className="text-sm font-bold">View Full Details</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </div>
        </CardContent>

        {/* Corner Accent */}
        <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-cyan-400/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </Card>
    </Link>
  );
}
