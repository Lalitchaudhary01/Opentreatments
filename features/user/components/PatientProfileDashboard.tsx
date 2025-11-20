"use client";
import { useState, useEffect } from "react";
import { useSession, signIn } from "next-auth/react";
import { motion } from "framer-motion";
import {
  User,
  Heart,
  Activity,
  Calendar,
  Stethoscope,
  TrendingUp,
  Award,
  Shield,
  Sparkles,
  Zap,
} from "lucide-react";
import Header from "@/components/layout/Header";
import { usePatientData } from "../hooks/usePatientData";
import ProfileSidebar from "./ProfileSidebar";
import ProfileContent from "./ProfileContent";
import MedicalContent from "./MedicalContent";
import LifestyleContent from "./LifeStyleContent";
import AppointmentsContent from "./AppointmentsContent";
import CheckupContent from "./CheckupConetent";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

export default function PatientProfileDashboard() {
  const { data: session, status } = useSession();
  const [activeTab, setActiveTab] = useState("profile");

  const patientId = (session?.user as any)?.id;
  const {
    patient,
    appointments,
    loading,
    updatePersonalInfo,
    updateMedical,
    updateLifestyle,
    updateCheckup,
    addAppointment,
    editAppointment,
    removeAppointment,
  } = usePatientData(patientId);

  useEffect(() => {
    if (status === "unauthenticated") {
      signIn();
    }
  }, [status]);

  if (status === "loading" || loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-cyan-50/50 dark:from-slate-950 dark:via-slate-900 dark:to-cyan-950/20 flex items-center justify-center">
        <div className="text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-16 h-16 border-4 border-cyan-500 border-t-transparent rounded-full mx-auto mb-4"
          />
          <p className="text-slate-600 dark:text-slate-400 text-lg font-medium">
            Loading your profile...
          </p>
        </div>
      </div>
    );
  }

  if (!session || !patient) {
    return null;
  }

  const user = session.user as any;

  const tabs = [
    { id: "profile", label: "Personal Info", icon: User },
    { id: "medical", label: "Medical History", icon: Heart },
    { id: "lifestyle", label: "Lifestyle", icon: Activity },
    { id: "checkup", label: "Health Checkup", icon: Stethoscope },
    { id: "appointments", label: "Appointments", icon: Calendar },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-cyan-50/50 dark:from-slate-950 dark:via-slate-900 dark:to-cyan-950/20">
      <Header />

      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 -left-20 w-80 h-80 bg-cyan-400/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-teal-400/20 rounded-full blur-3xl animate-float-delayed" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-cyan-500/10 to-teal-500/10 rounded-full blur-3xl animate-pulse-slow" />

        {/* Floating Particles */}
        <motion.div
          className="absolute top-32 left-1/4"
          animate={{ y: [0, -30, 0], rotate: [0, 180, 360] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        >
          <Sparkles className="w-6 h-6 text-cyan-400/40" />
        </motion.div>
        <motion.div
          className="absolute bottom-32 right-1/4"
          animate={{ y: [0, 30, 0], rotate: [0, -180, -360] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        >
          <Zap className="w-8 h-8 text-teal-400/40" />
        </motion.div>
      </div>

      <motion.div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10 mt-16"
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
      >
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-8">
          {/* Sidebar */}
          <motion.div className="lg:col-span-1">
            <ProfileSidebar user={user} patient={patient} />
          </motion.div>

          {/* Main Content */}
          <motion.div className="lg:col-span-3 space-y-6">
            <WelcomeCard user={user} patient={patient} />

            {/* Tab Navigation */}
            <motion.div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl shadow-xl border border-slate-200/50 dark:border-slate-700/50">
              <div className="flex overflow-x-auto scrollbar-hide border-b border-slate-200/50 dark:border-slate-700/50">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center gap-3 px-6 py-4 text-sm font-semibold transition-all duration-300 whitespace-nowrap min-w-fit flex-1 lg:flex-none border-b-2 ${
                        activeTab === tab.id
                          ? "text-cyan-600 dark:text-cyan-400 border-cyan-500 bg-gradient-to-b from-cyan-50/50 to-transparent dark:from-cyan-900/20"
                          : "text-slate-600 dark:text-slate-400 border-transparent hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-50/50 dark:hover:bg-slate-700/50"
                      }`}
                    >
                      <Icon
                        className={`w-4 h-4 ${
                          activeTab === tab.id ? "text-cyan-500" : ""
                        }`}
                      />
                      {tab.label}
                    </button>
                  );
                })}
              </div>

              <div className="p-6 lg:p-8">
                {activeTab === "profile" && (
                  <ProfileContent
                    patient={patient}
                    onUpdate={updatePersonalInfo}
                  />
                )}
                {activeTab === "medical" && (
                  <MedicalContent patient={patient} onUpdate={updateMedical} />
                )}
                {activeTab === "lifestyle" && (
                  <LifestyleContent
                    patient={patient}
                    onUpdate={updateLifestyle}
                  />
                )}
                {activeTab === "checkup" && (
                  <CheckupContent patient={patient} onUpdate={updateCheckup} />
                )}
                {activeTab === "appointments" && (
                  <AppointmentsContent
                    appointments={appointments}
                    patientId={patientId}
                    onAdd={addAppointment}
                    onEdit={editAppointment}
                    onDelete={removeAppointment}
                  />
                )}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
            opacity: 0.3;
          }
          50% {
            transform: translateY(-40px) rotate(10deg);
            opacity: 0.5;
          }
        }

        @keyframes float-delayed {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
            opacity: 0.3;
          }
          50% {
            transform: translateY(40px) rotate(-10deg);
            opacity: 0.5;
          }
        }

        @keyframes pulse-slow {
          0%,
          100% {
            opacity: 0.1;
          }
          50% {
            opacity: 0.2;
          }
        }

        .animate-float {
          animation: float 15s ease-in-out infinite;
        }

        .animate-float-delayed {
          animation: float-delayed 18s ease-in-out infinite;
        }

        .animate-pulse-slow {
          animation: pulse-slow 8s ease-in-out infinite;
        }

        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }

        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}

function WelcomeCard({ user, patient }: { user: any; patient: any }) {
  const getWelcomeMessage = () => {
    if (!patient.healthScore) {
      return "Welcome! Let's start tracking your health journey with transparent healthcare insights.";
    }

    if (patient.healthScore >= 80) {
      return "Excellent! Your health is in great shape. Continue maintaining your healthy lifestyle!";
    } else if (patient.healthScore >= 60) {
      return "Good progress! Let's work together to improve your health score further.";
    } else {
      return "Let's focus on building healthier habits together. Every small step counts!";
    }
  };

  const getHealthGradient = () => {
    if (!patient.healthScore)
      return "bg-gradient-to-br from-cyan-500 to-teal-600";
    if (patient.healthScore >= 80)
      return "bg-gradient-to-br from-cyan-500 via-teal-500 to-emerald-600";
    if (patient.healthScore >= 60)
      return "bg-gradient-to-br from-cyan-500 to-amber-500";
    return "bg-gradient-to-br from-cyan-500 to-rose-500";
  };

  return (
    <motion.div
      className={`${getHealthGradient()} text-white rounded-2xl shadow-2xl p-6 lg:p-8 relative overflow-hidden`}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.1)_50%,transparent_75%)] bg-[length:64px_64px]" />

      {/* Animated Beam */}
      <motion.div
        className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white to-transparent"
        initial={{ x: "-100%" }}
        animate={{ x: "100%" }}
        transition={{ duration: 2, repeat: Infinity, delay: 1 }}
      />

      <div className="relative z-10">
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-4">
          <div className="flex-1">
            <motion.h2
              className="text-2xl lg:text-3xl font-black mb-3 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              Welcome back, {user.name?.split(" ")[0]}! 👋
            </motion.h2>

            <motion.p
              className="text-white/90 text-base lg:text-lg leading-relaxed mb-4 font-medium"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              {getWelcomeMessage()}
            </motion.p>

            {patient.healthScore && (
              <motion.div
                className="flex items-center gap-4 flex-wrap"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <div className="flex items-center gap-3 bg-white/20 backdrop-blur-sm rounded-xl px-4 py-3 border border-white/30">
                  <TrendingUp className="w-5 h-5 text-cyan-200" />
                  <span className="font-semibold text-cyan-50">
                    Health Score:
                  </span>
                  <span className="text-2xl font-black text-white">
                    {patient.healthScore}%
                  </span>
                </div>

                {patient.healthScore >= 80 && (
                  <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-xl px-4 py-3 border border-white/30">
                    <Award className="w-5 h-5 text-yellow-300" />
                    <span className="font-semibold text-cyan-50">
                      Excellent Health
                    </span>
                  </div>
                )}
              </motion.div>
            )}
          </div>

          <motion.div
            className="flex-shrink-0"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, type: "spring" }}
          >
            <div className="w-16 h-16 lg:w-20 lg:h-20 bg-white/20 backdrop-blur-xl rounded-2xl flex items-center justify-center border-2 border-white/30 shadow-lg">
              <Shield className="w-8 h-8 lg:w-10 lg:h-10 text-white" />
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
