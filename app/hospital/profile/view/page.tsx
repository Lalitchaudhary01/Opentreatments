"use client";

import { useState, useEffect } from "react";
import { getHospitalProfile } from "@/features/panel/hospitals/hospital-profile/actions/getHospitalProfile";
import { HospitalStatusBadge } from "@/features/panel/hospitals/hospital-profile/components/HospitalStatusBadge";
import { redirect } from "next/navigation";
import {
  Search,
  Bell,
  Heart,
  Building2,
  User,
  Stethoscope,
  Pill,
  Shield,
  Activity,
  Settings,
  MapPin,
  Phone,
  Mail,
  Globe,
  Edit,
  ActivitySquare,
  PlusCircle,
  BadgeCheck,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

type TabType =
  | "doctors"
  | "procedures"
  | "services"
  | "facilities"
  | "insurance";

export default function ViewHospitalProfilePage() {
  const [activeTab, setActiveTab] = useState<TabType>("procedures");
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getHospitalProfile();

        if (!data) {
          redirect("/hospitals/profile/submit");
        }

        // Transform null values to undefined for the component
        const transformedProfile = {
          ...data,
          address: data.address ?? undefined,
          city: data.city ?? undefined,
          state: data.state ?? undefined,
          country: data.country ?? undefined,
          phone: data.phone ?? undefined,
          email: data.email ?? undefined,
          website: data.website ?? undefined,
          logo: data.logo ?? undefined,
          image: data.image ?? undefined,
          createdAt: data.createdAt ? data.createdAt.toISOString() : undefined,
          updatedAt: data.updatedAt ? data.updatedAt.toISOString() : undefined,
          services: data.services?.map((service: any) => ({
            ...service,
            cost: service.cost ?? undefined,
            description: service.description ?? undefined,
          })),
          facilities: data.facilities?.map((facility: any) => ({
            ...facility,
            description: facility.description ?? undefined,
          })),
          doctors: data.doctors?.map((doctor: any) => ({
            ...doctor,
            experience: doctor.experience ?? undefined,
            profilePic: doctor.profilePic ?? undefined,
          })),
          procedures: data.procedures?.map((procedure: any) => ({
            ...procedure,
            description: procedure.description ?? undefined,
            cost: procedure.cost ?? undefined,
            duration: procedure.duration ?? undefined,
          })),
          insurances: data.Insurance?.map((insurance: any) => ({
            ...insurance,
            provider: insurance.provider ?? undefined,
            type: insurance.type ?? "Health Insurance",
          })),
        };

        setProfile(transformedProfile);
      } catch (error) {
        console.error("Failed to fetch profile:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const tabs = [
    { id: "doctors", label: "Doctors", icon: User },
    { id: "procedures", label: "Procedures", icon: Stethoscope },
    { id: "services", label: "Services", icon: Activity },
    { id: "facilities", label: "Facilities", icon: Pill },
    { id: "insurance", label: "Insurance", icon: Shield },
  ];

  const renderTabContent = () => {
    if (!profile) return null;

    switch (activeTab) {
      case "doctors":
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-[#001B36] dark:text-white">
                Medical Doctors
              </h3>
              <Link href="/hospital/doctors/add">
                <button className="flex items-center gap-2 px-4 py-2 bg-[#00C6D2] text-white rounded-2xl hover:bg-[#00B4C0] transition-colors">
                  <PlusCircle className="w-4 h-4" />
                  Add Doctor
                </button>
              </Link>
            </div>

            {profile.doctors && profile.doctors.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {profile.doctors.map((doctor: any) => (
                  <div
                    key={doctor.id}
                    className="p-6 rounded-2xl shadow-sm backdrop-blur-md bg-white/60 dark:bg-[#102224]/60 border border-white/80 dark:border-[#193436]/80"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 bg-[#00C6D2]/10 rounded-xl flex items-center justify-center">
                        <User className="text-[#00C6D2] w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="font-bold text-[#001B36] dark:text-white">
                          {doctor.name}
                        </h4>
                        <p className="text-sm text-[#6C7A89] dark:text-gray-400">
                          {doctor.specialization}
                        </p>
                      </div>
                    </div>
                    {doctor.experience && (
                      <p className="text-sm text-[#6C7A89] dark:text-gray-400">
                        Experience: {doctor.experience}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 rounded-2xl backdrop-blur-md bg-white/60 dark:bg-[#102224]/60 border border-white/80 dark:border-[#193436]/80">
                <User className="w-16 h-16 text-[#6C7A89] dark:text-gray-600 mx-auto mb-4" />
                <p className="text-[#6C7A89] dark:text-gray-400 mb-4">
                  No doctors added yet
                </p>
                <Link href="/hospital/doctors/add">
                  <button className="flex items-center gap-2 px-4 py-2 bg-[#00C6D2] text-white rounded-2xl hover:bg-[#00B4C0] transition-colors mx-auto">
                    <PlusCircle className="w-4 h-4" />
                    Add First Doctor
                  </button>
                </Link>
              </div>
            )}
          </div>
        );

      case "procedures":
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-[#001B36] dark:text-white">
                Medical Procedures
              </h3>
              <Link href="/hospital/procedures/add">
                <button className="flex items-center gap-2 px-4 py-2 bg-[#00C6D2] text-white rounded-2xl hover:bg-[#00B4C0] transition-colors">
                  <PlusCircle className="w-4 h-4" />
                  Add Procedure
                </button>
              </Link>
            </div>

            {profile.procedures && profile.procedures.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {profile.procedures.slice(0, 6).map((procedure: any) => (
                  <div
                    key={procedure.id}
                    className="p-6 rounded-2xl shadow-sm backdrop-blur-md bg-white/60 dark:bg-[#102224]/60 border border-white/80 dark:border-[#193436]/80"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 bg-[#00C6D2]/10 rounded-xl flex items-center justify-center">
                        <ActivitySquare className="text-[#00C6D2] w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="font-bold text-[#001B36] dark:text-white">
                          {procedure.name}
                        </h4>
                        {procedure.duration && (
                          <p className="text-sm text-[#6C7A89] dark:text-gray-400">
                            {procedure.duration}
                          </p>
                        )}
                      </div>
                    </div>
                    {procedure.description && (
                      <p className="text-sm text-[#6C7A89] dark:text-gray-400 mb-3">
                        {procedure.description}
                      </p>
                    )}
                    {procedure.cost && (
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-semibold text-[#001B36] dark:text-white">
                          Cost:
                        </span>
                        <span className="font-bold text-[#00C6D2]">
                          ₹{procedure.cost}
                        </span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 rounded-2xl backdrop-blur-md bg-white/60 dark:bg-[#102224]/60 border border-white/80 dark:border-[#193436]/80">
                <ActivitySquare className="w-16 h-16 text-[#6C7A89] dark:text-gray-600 mx-auto mb-4" />
                <p className="text-[#6C7A89] dark:text-gray-400 mb-4">
                  No procedures added yet
                </p>
                <Link href="/hospital/procedures/add">
                  <button className="flex items-center gap-2 px-4 py-2 bg-[#00C6D2] text-white rounded-2xl hover:bg-[#00B4C0] transition-colors mx-auto">
                    <PlusCircle className="w-4 h-4" />
                    Add First Procedure
                  </button>
                </Link>
              </div>
            )}
          </div>
        );

      case "services":
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-[#001B36] dark:text-white">
                Hospital Services
              </h3>
              <Link href="/hospital/services/add">
                <button className="flex items-center gap-2 px-4 py-2 bg-[#00C6D2] text-white rounded-2xl hover:bg-[#00B4C0] transition-colors">
                  <PlusCircle className="w-4 h-4" />
                  Add Service
                </button>
              </Link>
            </div>

            {profile.services && profile.services.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {profile.services.map((service: any) => (
                  <div
                    key={service.id}
                    className="p-6 rounded-2xl shadow-sm backdrop-blur-md bg-white/60 dark:bg-[#102224]/60 border border-white/80 dark:border-[#193436]/80"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 bg-[#00C6D2]/10 rounded-xl flex items-center justify-center">
                        <Activity className="text-[#00C6D2] w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="font-bold text-[#001B36] dark:text-white">
                          {service.name}
                        </h4>
                      </div>
                    </div>
                    {service.description && (
                      <p className="text-sm text-[#6C7A89] dark:text-gray-400 mb-3">
                        {service.description}
                      </p>
                    )}
                    {service.cost && (
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-semibold text-[#001B36] dark:text-white">
                          Cost:
                        </span>
                        <span className="font-bold text-[#00C6D2]">
                          ₹{service.cost}
                        </span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 rounded-2xl backdrop-blur-md bg-white/60 dark:bg-[#102224]/60 border border-white/80 dark:border-[#193436]/80">
                <Activity className="w-16 h-16 text-[#6C7A89] dark:text-gray-600 mx-auto mb-4" />
                <p className="text-[#6C7A89] dark:text-gray-400 mb-4">
                  No services added yet
                </p>
                <Link href="/hospital/services/add">
                  <button className="flex items-center gap-2 px-4 py-2 bg-[#00C6D2] text-white rounded-2xl hover:bg-[#00B4C0] transition-colors mx-auto">
                    <PlusCircle className="w-4 h-4" />
                    Add First Service
                  </button>
                </Link>
              </div>
            )}
          </div>
        );

      case "facilities":
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-[#001B36] dark:text-white">
                Hospital Facilities
              </h3>
              <Link href="/hospital/facilities/add">
                <button className="flex items-center gap-2 px-4 py-2 bg-[#00C6D2] text-white rounded-2xl hover:bg-[#00B4C0] transition-colors">
                  <PlusCircle className="w-4 h-4" />
                  Add Facility
                </button>
              </Link>
            </div>

            {profile.facilities && profile.facilities.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {profile.facilities.map((facility: any) => (
                  <div
                    key={facility.id}
                    className="p-6 rounded-2xl shadow-sm backdrop-blur-md bg-white/60 dark:bg-[#102224]/60 border border-white/80 dark:border-[#193436]/80"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 bg-[#00C6D2]/10 rounded-xl flex items-center justify-center">
                        <Pill className="text-[#00C6D2] w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="font-bold text-[#001B36] dark:text-white">
                          {facility.name}
                        </h4>
                      </div>
                    </div>
                    {facility.description && (
                      <p className="text-sm text-[#6C7A89] dark:text-gray-400">
                        {facility.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 rounded-2xl backdrop-blur-md bg-white/60 dark:bg-[#102224]/60 border border-white/80 dark:border-[#193436]/80">
                <Pill className="w-16 h-16 text-[#6C7A89] dark:text-gray-600 mx-auto mb-4" />
                <p className="text-[#6C7A89] dark:text-gray-400 mb-4">
                  No facilities added yet
                </p>
                <Link href="/hospital/facilities/add">
                  <button className="flex items-center gap-2 px-4 py-2 bg-[#00C6D2] text-white rounded-2xl hover:bg-[#00B4C0] transition-colors mx-auto">
                    <PlusCircle className="w-4 h-4" />
                    Add First Facility
                  </button>
                </Link>
              </div>
            )}
          </div>
        );

      case "insurance":
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-[#001B36] dark:text-white">
                Insurance Providers
              </h3>
              <Link href="/hospital/insurance/add">
                <button className="flex items-center gap-2 px-4 py-2 bg-[#00C6D2] text-white rounded-2xl hover:bg-[#00B4C0] transition-colors">
                  <PlusCircle className="w-4 h-4" />
                  Add Insurance
                </button>
              </Link>
            </div>

            {profile.insurances && profile.insurances.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {profile.insurances.map((insurance: any) => (
                  <div
                    key={insurance.id}
                    className="p-6 rounded-2xl shadow-sm backdrop-blur-md bg-white/60 dark:bg-[#102224]/60 border border-white/80 dark:border-[#193436]/80"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 bg-[#00C6D2]/10 rounded-xl flex items-center justify-center">
                        <Shield className="text-[#00C6D2] w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="font-bold text-[#001B36] dark:text-white">
                          {insurance.provider}
                        </h4>
                        <p className="text-sm text-[#6C7A89] dark:text-gray-400">
                          {insurance.type}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-green-600">
                      <BadgeCheck className="w-4 h-4" />
                      Accepted
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 rounded-2xl backdrop-blur-md bg-white/60 dark:bg-[#102224]/60 border border-white/80 dark:border-[#193436]/80">
                <Shield className="w-16 h-16 text-[#6C7A89] dark:text-gray-600 mx-auto mb-4" />
                <p className="text-[#6C7A89] dark:text-gray-400 mb-4">
                  No insurance providers added yet
                </p>
                <Link href="/hospital/insurance/add">
                  <button className="flex items-center gap-2 px-4 py-2 bg-[#00C6D2] text-white rounded-2xl hover:bg-[#00B4C0] transition-colors mx-auto">
                    <PlusCircle className="w-4 h-4" />
                    Add First Insurance
                  </button>
                </Link>
              </div>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  if (!profile) {
    return null; // redirect will happen
  }

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[#F4FAFA] dark:bg-[#0A1414]">
      {/* Background Effects */}
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-[#00C6D2]/20 dark:bg-[#00C6D2]/30 rounded-full blur-[150px] -translate-y-1/4 translate-x-1/4 opacity-50 dark:opacity-40"></div>
      <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-[#00C6D2]/20 dark:bg-[#00C6D2]/30 rounded-full blur-[150px] translate-y-1/4 -translate-x-1/4 opacity-50 dark:opacity-40"></div>

      <div className="flex h-screen">
        {/* Sidebar */}
        <aside className="w-64 flex-shrink-0 bg-white/50 dark:bg-black/20 p-4 border-r border-white/80 dark:border-black/30">
          <div className="flex items-center gap-2 px-4 py-4 mb-8">
            <Heart className="text-[#00C6D2] text-3xl" />
            <h1 className="text-xl font-bold text-[#001B36] dark:text-white">
              HealthSys
            </h1>
          </div>
          <ul className="flex flex-col gap-2">
            <li>
              <Link
                href="/hospital/dashboard"
                className="flex h-12 items-center gap-4 rounded-2xl px-4 text-[#6C7A89] dark:text-gray-400 hover:bg-[#00C6D2]/10 hover:text-[#00C6D2] dark:hover:bg-[#00C6D2]/20"
              >
                <div className="w-6 h-6 flex items-center justify-center">
                  <div className="w-2 h-2 bg-current rounded-full"></div>
                </div>
                <p className="text-base font-bold">Dashboard</p>
              </Link>
            </li>
            <li>
              <Link
                href="/hospital/profile"
                className="flex h-12 items-center gap-4 rounded-2xl px-4 bg-[#00C6D2]/20 text-[#00C6D2]"
              >
                <Building2 className="w-6 h-6" />
                <p className="text-base font-bold">Hospital Profile</p>
              </Link>
            </li>
            <li>
              <Link
                href="/hospital/doctors"
                className="flex h-12 items-center gap-4 rounded-2xl px-4 text-[#6C7A89] dark:text-gray-400 hover:bg-[#00C6D2]/10 hover:text-[#00C6D2] dark:hover:bg-[#00C6D2]/20"
              >
                <User className="w-6 h-6" />
                <p className="text-base font-bold">Doctors</p>
              </Link>
            </li>
            <li>
              <Link
                href="/hospital/procedures"
                className="flex h-12 items-center gap-4 rounded-2xl px-4 text-[#6C7A89] dark:text-gray-400 hover:bg-[#00C6D2]/10 hover:text-[#00C6D2] dark:hover:bg-[#00C6D2]/20"
              >
                <Stethoscope className="w-6 h-6" />
                <p className="text-base font-bold">Procedures</p>
              </Link>
            </li>
            <li>
              <Link
                href="/hospital/services"
                className="flex h-12 items-center gap-4 rounded-2xl px-4 text-[#6C7A89] dark:text-gray-400 hover:bg-[#00C6D2]/10 hover:text-[#00C6D2] dark:hover:bg-[#00C6D2]/20"
              >
                <Activity className="w-6 h-6" />
                <p className="text-base font-bold">Services</p>
              </Link>
            </li>
            <li>
              <Link
                href="/hospital/facilities"
                className="flex h-12 items-center gap-4 rounded-2xl px-4 text-[#6C7A89] dark:text-gray-400 hover:bg-[#00C6D2]/10 hover:text-[#00C6D2] dark:hover:bg-[#00C6D2]/20"
              >
                <Pill className="w-6 h-6" />
                <p className="text-base font-bold">Facilities</p>
              </Link>
            </li>
            <li>
              <Link
                href="/hospital/insurance"
                className="flex h-12 items-center gap-4 rounded-2xl px-4 text-[#6C7A89] dark:text-gray-400 hover:bg-[#00C6D2]/10 hover:text-[#00C6D2] dark:hover:bg-[#00C6D2]/20"
              >
                <Shield className="w-6 h-6" />
                <p className="text-base font-bold">Insurance</p>
              </Link>
            </li>
            <li>
              <Link
                href="/hospital/approvals"
                className="flex h-12 items-center gap-4 rounded-2xl px-4 text-[#6C7A89] dark:text-gray-400 hover:bg-[#00C6D2]/10 hover:text-[#00C6D2] dark:hover:bg-[#00C6D2]/20"
              >
                <div className="w-6 h-6 flex items-center justify-center">
                  <div className="w-3 h-3 border-2 border-current rounded-full"></div>
                </div>
                <p className="text-base font-bold">Approval Status</p>
              </Link>
            </li>
            <li>
              <Link
                href="/hospital/settings"
                className="flex h-12 items-center gap-4 rounded-2xl px-4 text-[#6C7A89] dark:text-gray-400 hover:bg-[#00C6D2]/10 hover:text-[#00C6D2] dark:hover:bg-[#00C6D2]/20"
              >
                <Settings className="w-6 h-6" />
                <p className="text-base font-bold">Settings</p>
              </Link>
            </li>
          </ul>
        </aside>

        {/* Main Content */}
        <main className="flex-1 flex flex-col h-screen overflow-y-auto">
          {/* Header */}
          <header className="flex items-center p-6 pb-4 flex-shrink-0 z-10">
            <div className="flex-1 max-w-xl">
              <div className="flex w-full items-stretch rounded-2xl h-12">
                <div className="text-[#6C7A89] dark:text-gray-400 flex border-r-0 border-none bg-white/60 dark:bg-[#102224]/60 items-center justify-center pl-4 rounded-l-2xl backdrop-blur-md border border-white/80 dark:border-[#193436]/80">
                  <Search className="w-5 h-5" />
                </div>
                <input
                  className="flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-2xl text-[#001B36] dark:text-gray-200 focus:outline-0 focus:ring-2 focus:ring-[#00C6D2]/50 border-none bg-white/60 dark:bg-[#102224]/60 h-full placeholder:text-[#6C7A89] dark:placeholder:text-gray-500 px-4 rounded-l-none border-l-0 pl-2 text-base font-normal leading-normal backdrop-blur-md border border-white/80 dark:border-[#193436]/80 border-l-0"
                  placeholder="Search for doctors, procedures..."
                />
              </div>
            </div>

            <div className="flex flex-1 items-center justify-end gap-4">
              <button className="relative flex items-center justify-center w-12 h-12 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors">
                <Bell className="text-2xl text-[#6C7A89] dark:text-gray-400" />
                <div className="absolute top-2 right-2 w-2.5 h-2.5 rounded-full bg-red-500 border-2 border-[#F4FAFA] dark:border-[#0A1414]"></div>
              </button>

              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-slate-300 dark:bg-slate-600 rounded-full"></div>
                <div>
                  <p className="font-bold text-[#001B36] dark:text-white">
                    {profile.name}
                  </p>
                  <p className="text-sm text-[#6C7A89] dark:text-gray-400">
                    Hospital Admin
                  </p>
                </div>
              </div>
            </div>
          </header>

          {/* Profile Content */}
          <div className="px-6 py-4 flex-1">
            {/* Header Image Section */}
            <div className="relative w-full h-48 md:h-64 rounded-2xl overflow-hidden shadow-lg shadow-[#00C6D2]/10 mb-6">
              {profile.image ? (
                <div
                  className="w-full h-full bg-center bg-no-repeat bg-cover"
                  style={{ backgroundImage: `url(${profile.image})` }}
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-r from-[#00C6D2] to-teal-500" />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              <div className="absolute bottom-4 left-4 md:bottom-6 md:left-6 flex items-center gap-4">
                {profile.logo ? (
                  <img
                    alt={`${profile.name} logo`}
                    className="size-16 md:size-24 rounded-full border-4 border-white dark:border-gray-800 object-cover"
                    src={profile.logo}
                  />
                ) : (
                  <div className="size-16 md:size-24 rounded-full border-4 border-white dark:border-gray-800 bg-slate-300 flex items-center justify-center">
                    <Building2 className="w-8 h-8 md:w-12 md:h-12 text-white" />
                  </div>
                )}
                <div>
                  <h1 className="text-2xl md:text-4xl font-bold text-white tracking-tight">
                    {profile.name}
                  </h1>
                  {profile.city && (
                    <p className="text-sm md:text-base text-white/80">
                      {profile.city}
                      {profile.state && `, ${profile.state}`}
                      {profile.country && `, ${profile.country}`}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Header Section with Edit Button */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-3xl font-bold text-[#001B36] dark:text-white">
                  Hospital Profile
                </h2>
                <p className="text-[#6C7A89] dark:text-gray-400 mt-1">
                  Manage your hospital information and services
                </p>
              </div>
              <div className="flex items-center gap-4">
                <HospitalStatusBadge status={profile.status} />
                {profile.status === "APPROVED" && (
                  <Link href="/hospital/profile/edit">
                    <button className="flex items-center gap-2 px-4 py-2 bg-[#00C6D2] text-white rounded-2xl hover:bg-[#00B4C0] transition-colors">
                      <Edit className="w-4 h-4" />
                      Edit Profile
                    </button>
                  </Link>
                )}
              </div>
            </div>

            {/* Hospital Information Card */}
            <div className="grid grid-cols-12 gap-6 mb-6">
              <div className="col-span-12">
                <div className="p-6 rounded-2xl shadow-sm backdrop-blur-md bg-white/60 dark:bg-[#102224]/60 border border-white/80 dark:border-[#193436]/80">
                  <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                    <h3 className="text-xl font-bold text-[#001B36] dark:text-white">
                      Hospital Information
                    </h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-[#001B36] dark:text-white">
                    {profile.address && (
                      <div className="flex items-start gap-3">
                        <MapPin className="text-[#00C6D2] mt-1 w-5 h-5" />
                        <div>
                          <p className="font-semibold">Address</p>
                          <p className="text-sm text-[#6C7A89] dark:text-gray-400">
                            {profile.address}
                          </p>
                        </div>
                      </div>
                    )}

                    {profile.website && (
                      <div className="flex items-start gap-3">
                        <Globe className="text-[#00C6D2] mt-1 w-5 h-5" />
                        <div>
                          <p className="font-semibold">Website</p>
                          <p className="text-sm text-[#6C7A89] dark:text-gray-400">
                            {profile.website}
                          </p>
                        </div>
                      </div>
                    )}

                    {profile.phone && (
                      <div className="flex items-start gap-3">
                        <Phone className="text-[#00C6D2] mt-1 w-5 h-5" />
                        <div>
                          <p className="font-semibold">Phone</p>
                          <p className="text-sm text-[#6C7A89] dark:text-gray-400">
                            {profile.phone}
                          </p>
                        </div>
                      </div>
                    )}

                    {profile.email && (
                      <div className="flex items-start gap-3">
                        <Mail className="text-[#00C6D2] mt-1 w-5 h-5" />
                        <div>
                          <p className="font-semibold">Email</p>
                          <p className="text-sm text-[#6C7A89] dark:text-gray-400">
                            {profile.email}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Tabbed Sections */}
            <div>
              <div className="border-b border-[#00C6D2]/20 mb-6">
                <nav
                  aria-label="Tabs"
                  className="-mb-px flex space-x-6 overflow-x-auto"
                >
                  {tabs.map((tab) => {
                    const Icon = tab.icon;
                    const isActive = activeTab === tab.id;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id as TabType)}
                        className={`whitespace-nowrap py-3 px-1 border-b-2 font-semibold text-base flex items-center gap-2 transition-colors ${
                          isActive
                            ? "text-[#00C6D2] border-[#00C6D2] font-bold"
                            : "text-[#6C7A89] dark:text-gray-400 border-transparent hover:text-[#00C6D2] hover:border-[#00C6D2]/50"
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                        {tab.label}
                      </button>
                    );
                  })}
                </nav>
              </div>

              {/* Dynamic Tab Content */}
              {renderTabContent()}
            </div>

            {/* Status Messages */}
            <div className="mt-8">
              {profile.status === "APPROVED" && (
                <div className="p-4 rounded-2xl bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700/50">
                  <p className="text-green-800 dark:text-green-300 text-sm font-semibold flex items-center gap-2">
                    <span>✅</span> Your hospital profile is approved. You can
                    update details anytime.
                  </p>
                </div>
              )}

              {profile.status === "PENDING" && (
                <div className="p-4 rounded-2xl bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-700/50">
                  <p className="text-yellow-800 dark:text-yellow-300 text-sm font-semibold flex items-center gap-2">
                    <span>⏳</span> Your hospital profile is under review.
                    Please wait for admin approval.
                  </p>
                </div>
              )}

              {profile.status === "REJECTED" && (
                <div className="p-4 rounded-2xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700/50">
                  <p className="text-red-800 dark:text-red-300 text-sm font-semibold flex items-center gap-2">
                    <span>❌</span> Your hospital profile was rejected. Please
                    contact admin.
                  </p>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
