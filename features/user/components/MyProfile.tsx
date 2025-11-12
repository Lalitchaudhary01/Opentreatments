"use client";

import { useState, useEffect } from "react";
import { useSession, signIn } from "next-auth/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Edit3,
  Trash2,
  Plus,
  Mail,
  Phone,
  User,
  BookOpen,
  Calendar,
  Eye,
  Settings,
  Crown,
  Star,
  TrendingUp,
  ArrowLeft,
  Upload,
  ChevronDown,
} from "lucide-react";
import Link from "next/link";

import { updateUser } from "../actions/updateUser";
import { deleteBlog } from "@/features/Blogs/actions/deleteBlog";
import { getUserBlogs } from "@/features/Blogs/actions/getUserBlogs";
import Header from "@/components/layout/Header";

export default function MedicalProfile() {
  const { data: session, status } = useSession();
  const [loadingSession, setLoadingSession] = useState(true);

  useEffect(() => {
    if (status !== "loading") setLoadingSession(false);
  }, [status]);

  if (loadingSession) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background-light dark:bg-background-dark">
        <div className="flex flex-col items-center gap-4">
          <div className="relative">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-transparent bg-gradient-to-r from-primary to-blue-500"></div>
          </div>
          <p className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-600 font-semibold animate-pulse">
            Loading your medical profile...
          </p>
        </div>
      </div>
    );
  }

  if (!session) {
    signIn();
    return null;
  }

  const user = {
    id: (session.user as any)?.id,
    name: session.user?.name || "Alexandra Chen",
    email: session.user?.email || "",
    phone: (session.user as any)?.phone || "",
    image: session.user?.image || "",
    age: 34,
    bloodGroup: "O+",
    gender: "Female",
  };

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark font-display">
      {/* Top App Bar */}
      <div className="sticky top-0 z-20 flex items-center bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-sm p-4 justify-between">
        <div className="flex size-12 shrink-0 items-center">
          <ArrowLeft className="text-dark-blue dark:text-white h-6 w-6" />
        </div>
        <h2 className="text-dark-blue dark:text-white text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center">
          My Profile
        </h2>
        <div className="flex w-12 items-center justify-end">
          <Button
            variant="ghost"
            size="icon"
            className="text-dark-blue dark:text-white"
          >
            <Settings className="h-6 w-6" />
          </Button>
        </div>
      </div>

      <div className="relative flex flex-col w-full">
        {/* Header Image & Profile Header Combined */}
        <div className="relative mb-28">
          <div className="w-full h-52 bg-gradient-to-br from-primary/40 to-blue-500/40 flex flex-col justify-end overflow-hidden">
            <div className="absolute inset-0 bg-dark-blue/20"></div>
          </div>
          <div className="absolute -bottom-24 left-0 right-0 px-4">
            <div className="flex w-full flex-col items-center gap-4 bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg shadow-primary/10">
              <div className="flex flex-col items-center gap-3">
                <Avatar className="h-28 w-28 -mt-20 border-4 border-white dark:border-gray-800">
                  <AvatarImage src={user.image} alt={user.name} />
                  <AvatarFallback className="text-2xl font-bold bg-primary text-white">
                    {user.name.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col items-center justify-center">
                  <p className="text-dark-blue dark:text-white text-[22px] font-bold leading-tight tracking-[-0.015em] text-center">
                    {user.name}
                  </p>
                  <p className="text-gray-500 dark:text-gray-400 text-base font-normal leading-normal text-center">
                    {user.age} years old | {user.bloodGroup} Blood Group
                  </p>
                </div>
              </div>
              <Button className="bg-primary/20 text-primary hover:bg-primary/30">
                Edit Profile
              </Button>
            </div>
          </div>
        </div>

        {/* Accordions Section */}
        <div className="flex flex-col p-4 gap-4">
          <PersonalInfoAccordion user={user} />
          <ContactDetailsAccordion user={user} />
          <MedicalInfoAccordion />
          <LifestyleInfoAccordion />
        </div>

        {/* Insurance & Reports Section */}
        <InsuranceReportsSection />

        <div className="h-5 bg-background-light dark:bg-background-dark"></div>
      </div>
    </div>
  );
}

function PersonalInfoAccordion({ user }: { user: any }) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <Card className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm shadow-primary/5">
      <CardContent className="p-0">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex w-full cursor-pointer items-center justify-between gap-4 py-4 px-4"
        >
          <div className="flex items-center gap-3">
            <User className="h-5 w-5 text-primary" />
            <p className="text-dark-blue dark:text-white text-base font-bold">
              Personal Information
            </p>
          </div>
          <ChevronDown
            className={`h-5 w-5 text-dark-blue dark:text-white transition-transform ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </button>

        {isOpen && (
          <div className="text-gray-600 dark:text-gray-300 text-sm font-normal leading-relaxed pb-4 space-y-2 border-t border-gray-100 dark:border-gray-700 pt-4 px-4">
            <p>
              <strong>Name:</strong> {user.name}
            </p>
            <p>
              <strong>Gender:</strong> {user.gender}
            </p>
            <p>
              <strong>Age:</strong> {user.age}
            </p>
            <p>
              <strong>Blood Group:</strong> {user.bloodGroup}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function ContactDetailsAccordion({ user }: { user: any }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Card className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm shadow-primary/5">
      <CardContent className="p-0">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex w-full cursor-pointer items-center justify-between gap-4 py-4 px-4"
        >
          <div className="flex items-center gap-3">
            <Phone className="h-5 w-5 text-primary" />
            <p className="text-dark-blue dark:text-white text-base font-bold">
              Contact Details
            </p>
          </div>
          <ChevronDown
            className={`h-5 w-5 text-dark-blue dark:text-white transition-transform ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </button>

        {isOpen && (
          <div className="text-gray-600 dark:text-gray-300 text-sm font-normal leading-relaxed pb-4 space-y-2 border-t border-gray-100 dark:border-gray-700 pt-4 px-4">
            <p>
              <strong>Phone:</strong> +1 (555) 123-4567
            </p>
            <p>
              <strong>Email:</strong> {user.email}
            </p>
            <p>
              <strong>Address:</strong> 123 Health St, Medville, USA
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function MedicalInfoAccordion() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Card className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm shadow-primary/5">
      <CardContent className="p-0">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex w-full cursor-pointer items-center justify-between gap-4 py-4 px-4"
        >
          <div className="flex items-center gap-3">
            <TrendingUp className="h-5 w-5 text-primary" />
            <p className="text-dark-blue dark:text-white text-base font-bold">
              Medical Information
            </p>
          </div>
          <ChevronDown
            className={`h-5 w-5 text-dark-blue dark:text-white transition-transform ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </button>

        {isOpen && (
          <div className="text-gray-600 dark:text-gray-300 text-sm font-normal leading-relaxed pb-4 space-y-2 border-t border-gray-100 dark:border-gray-700 pt-4 px-4">
            <p>
              <strong>Allergies:</strong> Penicillin, Peanuts
            </p>
            <p>
              <strong>Chronic Diseases:</strong> Asthma
            </p>
            <p>
              <strong>Current Medication:</strong> Albuterol Inhaler (As needed)
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function LifestyleInfoAccordion() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Card className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm shadow-primary/5">
      <CardContent className="p-0">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex w-full cursor-pointer items-center justify-between gap-4 py-4 px-4"
        >
          <div className="flex items-center gap-3">
            <User className="h-5 w-5 text-primary" />
            <p className="text-dark-blue dark:text-white text-base font-bold">
              Lifestyle Information
            </p>
          </div>
          <ChevronDown
            className={`h-5 w-5 text-dark-blue dark:text-white transition-transform ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </button>

        {isOpen && (
          <div className="text-gray-600 dark:text-gray-300 text-sm font-normal leading-relaxed pb-4 space-y-2 border-t border-gray-100 dark:border-gray-700 pt-4 px-4">
            <p>
              <strong>Smoking:</strong> Non-smoker
            </p>
            <p>
              <strong>Alcohol:</strong> Occasionally
            </p>
            <p>
              <strong>Exercise:</strong> 3 times a week
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function InsuranceReportsSection() {
  return (
    <div className="px-4 pb-4">
      <h3 className="text-dark-blue dark:text-white text-lg font-bold leading-tight tracking-[-0.015em] pb-4 pt-2">
        Insurance & Medical Reports
      </h3>

      {/* Insurance Card */}
      <Card className="rounded-xl p-5 mb-4 bg-gradient-to-br from-primary/80 to-primary dark:from-primary/50 dark:to-primary/70 shadow-lg shadow-primary/30 backdrop-blur-md relative overflow-hidden border-0">
        <div className="absolute -top-8 -right-8 w-24 h-24 rounded-full bg-white/20"></div>
        <div className="absolute -bottom-10 -left-6 w-32 h-32 rounded-full bg-white/10"></div>
        <CardContent className="relative z-10 p-0">
          <div className="flex justify-between items-start mb-4">
            <p className="text-white font-bold text-xl">HealthWell Insurance</p>
            <Crown className="text-white h-8 w-8" />
          </div>
          <div className="text-white space-y-1">
            <p className="text-sm opacity-80">Policy Number</p>
            <p className="font-semibold tracking-wider">HW-987654321</p>
          </div>
          <div className="text-white mt-3">
            <p className="text-sm opacity-80">Member ID</p>
            <p className="font-semibold tracking-wider">AC-123456</p>
          </div>
        </CardContent>
      </Card>

      {/* Medical Reports List */}
      <Card className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm shadow-primary/5">
        <CardContent className="p-0">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <FileText className="h-5 w-5 text-primary" />
                <p className="text-dark-blue dark:text-white text-sm">
                  Blood Test - Jan 2024.pdf
                </p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-gray-400"
              >
                <MoreVertical className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <FileText className="h-5 w-5 text-primary" />
                <p className="text-dark-blue dark:text-white text-sm">
                  X-Ray Report - Dec 2023.pdf
                </p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-gray-400"
              >
                <MoreVertical className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <Button className="w-full mt-6 gap-2 h-12 bg-primary text-white hover:bg-opacity-90">
            <Upload className="h-4 w-4" />
            Upload New Report
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

// Additional icons needed
function FileText(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
      <path d="M14 2v4a2 2 0 0 0 2 2h4" />
      <path d="M10 9H8" />
      <path d="M16 13H8" />
      <path d="M16 17H8" />
    </svg>
  );
}

function MoreVertical(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="1" />
      <circle cx="12" cy="5" r="1" />
      <circle cx="12" cy="19" r="1" />
    </svg>
  );
}
