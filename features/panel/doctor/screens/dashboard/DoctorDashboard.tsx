"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { 
  ArrowUpRight, 
  MoreHorizontal, 
  CalendarDays,
  Clock,
  CheckCircle2,
  AlertCircle,
  IndianRupee,
  Users,
  FileText,
  TrendingUp,
  Calendar,
  Activity,
  BarChart3,
  ChevronRight,
  Bell
} from "lucide-react";

import { cn } from "@/lib/utils";
import { getConsultationsForDoctor } from "@/features/panel/doctor/consultations/actions";
import { filterToday } from "@/features/panel/doctor/consultations/filterConsultations";

// Stats Cards Data - Dono cards dynamic honge
const statsCards = [
  {
    title: "Today's Appointments",
    value: "12",
    change: "+4",
    changeColor: "text-[#22C55E]",
    bgColor: "bg-[#22C55E]/12",
    icon: CalendarDays
  },
  {
    title: "Total Patients",
    value: "1,284",
    change: "+28",
    changeColor: "text-[#22C55E]",
    bgColor: "bg-[#22C55E]/12",
    icon: Users
  },
  {
    title: "Revenue This Month",
    value: "₹92,100",
    change: "+12%",
    changeColor: "text-[#22C55E]",
    bgColor: "bg-[#22C55E]/12",
    icon: IndianRupee
  },
  {
    title: "Pending Invoices",
    value: "3",
    change: "3",
    changeColor: "text-[#EF4444]",
    bgColor: "bg-[#EF4444]/12",
    icon: FileText
  }
];

// Appointments Data (static rahega)
const appointmentsData = [
  {
    id: 1,
    initials: "PM",
    name: "Priya Menon",
    patientId: "#PT-0041",
    time: "9:00 AM",
    type: "Consultation",
    status: "In Progress",
    avatarBg: "bg-[#3B82F6]/20",
    textColor: "text-[#60A5FA]"
  },
  {
    id: 2,
    initials: "AK",
    name: "Arjun Kumar",
    patientId: "#PT-0088",
    time: "9:30 AM",
    type: "Follow-up",
    status: "Confirmed",
    avatarBg: "bg-[#14B8A6]/20",
    textColor: "text-[#2DD4BF]"
  },
  {
    id: 3,
    initials: "SR",
    name: "Sunita Rao",
    patientId: "#PT-0112",
    time: "10:00 AM",
    type: "Procedure",
    status: "Waiting",
    avatarBg: "bg-[#F59E0B]/20",
    textColor: "text-[#FBBF24]"
  },
  {
    id: 4,
    initials: "VN",
    name: "Vikram Nair",
    patientId: "#PT-0057",
    time: "10:30 AM",
    type: "Consultation",
    status: "Confirmed",
    avatarBg: "bg-[#8B5CF6]/20",
    textColor: "text-[#A78BFA]"
  },
  {
    id: 5,
    initials: "DS",
    name: "Deepa Sharma",
    patientId: "#PT-0203",
    time: "11:00 AM",
    type: "Follow-up",
    status: "Confirmed",
    avatarBg: "bg-[#EC4899]/20",
    textColor: "text-[#F472B6]"
  }
];

// Activity Data (static)
const activityData = [
  {
    id: 1,
    text: "Priya Menon checked in",
    time: "2 min ago",
    dotColor: "bg-[#22C55E]"
  },
  {
    id: 2,
    text: "Invoice INV-0188 paid ₹500",
    time: "18 min ago",
    dotColor: "bg-[#3B82F6]"
  },
  {
    id: 3,
    text: "Sunita Rao rescheduled to 3 PM",
    time: "34 min ago",
    dotColor: "bg-[#F59E0B]"
  },
  {
    id: 4,
    text: "New patient Karan Mehta registered",
    time: "1 hr ago",
    dotColor: "bg-[#14B8A6]"
  },
  {
    id: 5,
    text: "Rohit Verma appointment completed",
    time: "2 hr ago",
    dotColor: "bg-[#3B82F6]"
  }
];

// Revenue Data (static)
const revenueData = [
  {
    label: "Consultations",
    value: "₹54,200",
    percentage: 78,
    barColor: "bg-[#3B82F6]"
  },
  {
    label: "Procedures",
    value: "₹21,600",
    percentage: 45,
    barColor: "bg-[#14B8A6]"
  },
  {
    label: "Follow-ups",
    value: "₹16,300",
    percentage: 24,
    barColor: "bg-[#F59E0B]"
  }
];

// Upcoming Data (static)
const upcomingData = [
  {
    id: 1,
    time: "11:30",
    ampm: "AM",
    name: "Ravi Pillai",
    type: "Consultation"
  },
  {
    id: 2,
    time: "12:00",
    ampm: "PM",
    name: "Meena Joshi",
    type: "Follow-up"
  },
  {
    id: 3,
    time: "2:00",
    ampm: "PM",
    name: "Sanjay Bhat",
    type: "Procedure"
  },
  {
    id: 4,
    time: "3:30",
    ampm: "PM",
    name: "Anita Desai",
    type: "Consultation"
  }
];

// Week days for chart
const weekDays = [
  { day: "M", height: 26, isActive: false },
  { day: "T", height: 36, isActive: false },
  { day: "W", height: 31, isActive: false },
  { day: "T", height: 36, isActive: false },
  { day: "F", height: 34, isActive: true },
  { day: "S", height: 13, isActive: false },
  { day: "S", height: 6, isActive: false }
];

// Type and Status configurations
const typeColors = {
  "Consultation": "bg-[#3B82F6]/12 text-[#60A5FA]",
  "Follow-up": "bg-[#14B8A6]/12 text-[#2DD4BF]",
  "Procedure": "bg-[#F59E0B]/12 text-[#FBBF24]"
};

const statusColors = {
  "In Progress": "bg-[#3B82F6]/12 text-[#60A5FA]",
  "Confirmed": "bg-[#22C55E]/12 text-[#4ADE80]",
  "Waiting": "bg-[#F59E0B]/12 text-[#FBBF24]"
};

const dotColors = {
  "Consultation": "bg-[#60A5FA]",
  "Follow-up": "bg-[#2DD4BF]",
  "Procedure": "bg-[#FBBF24]",
  "In Progress": "bg-[#60A5FA]",
  "Confirmed": "bg-[#4ADE80]",
  "Waiting": "bg-[#FBBF24]"
};

export default function DoctorDashboard() {
  const [selectedPeriod, setSelectedPeriod] = useState("This Week");
  const [todayCount, setTodayCount] = useState("12");
  const [totalPatients, setTotalPatients] = useState("1,284"); // 👈 ADDED: Total patients state
  const [loading, setLoading] = useState(true);

  // Fetch data on component mount
  useEffect(() => {
    async function fetchData() {
      try {
        const all = await getConsultationsForDoctor(); // Saara data fetch karo
        
        // Today's appointments count
        const todayConsultations = filterToday(all);
        setTodayCount(todayConsultations.length.toString());
        
        // 👇 ADDED: Total patients count (total consultations)
        setTotalPatients(all.length.toString());
        
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  // 👇 UPDATED: Both cards dynamic
  const updatedStatsCards = statsCards.map((card, index) => {
    if (index === 0) { // Today's Appointments card
      return {
        ...card,
        value: loading ? "..." : todayCount
      };
    }
    if (index === 1) { // Total Patients card
      return {
        ...card,
        value: loading ? "..." : totalPatients
      };
    }
    return card;
  });

  return (
    <div className="p-6 bg-[#111827] min-h-screen">
      <div className="max-w-[1164px] mx-auto">
        
        {/* Header with Notification */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold text-white">Dashboard</h1>
          <button className="p-2 rounded-lg bg-[#161F30] border border-[rgba(255,255,255,0.07)]">
            <Bell className="w-5 h-5 text-[#94A3B8]" />
          </button>
        </div>
        
        {/* Stats Cards Grid */}
        <div className="grid grid-cols-4 gap-4 mb-4">
          {updatedStatsCards.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="bg-[#161F30] border border-[rgba(255,255,255,0.07)] rounded-[12.67px] p-4"
              >
                <div className="flex justify-between items-start">
                  <Icon className="w-[33.1px] h-[33.1px] text-[#3B82F6]" />
                  <div className={cn(
                    "flex items-center gap-1 px-2 py-1 rounded-[19.5px] text-[9.75px]",
                    stat.bgColor,
                    stat.changeColor
                  )}>
                    <ArrowUpRight className="w-[9.7px] h-[9.7px]" />
                    <span>{stat.change}</span>
                  </div>
                </div>
                <div className="mt-3">
                  <div className="text-[23.4px] font-bold text-white tracking-[-0.7px] leading-none">
                    {stat.value}
                  </div>
                  <div className="text-[10.72px] text-[#94A3B8] mt-1">
                    {stat.title}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Rest of your JSX remains exactly the same */}
        {/* Main Content Grid */}
        <div className="grid grid-cols-12 gap-4">
          
          {/* Today's Appointments - Left Column */}
          <div className="col-span-7 bg-[#161F30] border border-[rgba(255,255,255,0.07)] rounded-[13.65px] overflow-hidden">
            {/* Header */}
            <div className="px-4 py-3 border-b border-[rgba(255,255,255,0.07)] flex justify-between items-center">
              <div>
                <h3 className="text-[12.67px] font-semibold text-white">Today's Appointments</h3>
                <p className="text-[10.72px] text-[#94A3B8]">
                  Feb 20 · {loading ? "..." : todayCount} scheduled
                </p>
              </div>
              <button className="text-[11.7px] text-[#3B82F6] hover:underline flex items-center gap-1">
                View all <ChevronRight className="w-3 h-3" />
              </button>
            </div>

            {/* Table Header */}
            <div className="grid grid-cols-12 px-4 py-2 border-b border-[rgba(255,255,255,0.07)] text-[9.75px] font-semibold tracking-[0.68px] uppercase text-[#475569]">
              <div className="col-span-5">Patient</div>
              <div className="col-span-2">Time</div>
              <div className="col-span-3">Type</div>
              <div className="col-span-2">Status</div>
            </div>

            {/* Appointments List */}
            <div className="divide-y divide-[rgba(255,255,255,0.07)]">
              {appointmentsData.map((appointment) => (
                <div key={appointment.id} className="grid grid-cols-12 px-4 py-3 text-[10.72px]">
                  {/* Patient */}
                  <div className="col-span-5 flex items-center gap-3">
                    <div className={cn(
                      "w-[29.2px] h-[29.2px] rounded-full flex items-center justify-center text-[10.24px] font-medium",
                      appointment.avatarBg,
                      appointment.textColor
                    )}>
                      {appointment.initials}
                    </div>
                    <div>
                      <p className="text-[12.19px] text-[#F1F5F9]">{appointment.name}</p>
                      <p className="text-[#475569]">{appointment.patientId}</p>
                    </div>
                  </div>

                  {/* Time */}
                  <div className="col-span-2 flex items-center text-[12.19px] text-[#94A3B8]">
                    <Clock className="w-3 h-3 mr-1 opacity-70" />
                    {appointment.time}
                  </div>

                  {/* Type */}
                  <div className="col-span-3 flex items-center">
                    <span className={cn(
                      "px-3 py-1 rounded-[19.5px] text-[10.72px]",
                      typeColors[appointment.type as keyof typeof typeColors]
                    )}>
                      <span className={cn(
                        "inline-block w-[4.9px] h-[4.9px] rounded-full mr-2",
                        dotColors[appointment.type as keyof typeof dotColors]
                      )} />
                      {appointment.type}
                    </span>
                  </div>

                  {/* Status */}
                  <div className="col-span-2 flex items-center">
                    <span className={cn(
                      "px-3 py-1 rounded-[19.5px] text-[10.72px]",
                      statusColors[appointment.status as keyof typeof statusColors]
                    )}>
                      <span className={cn(
                        "inline-block w-[4.9px] h-[4.9px] rounded-full mr-2",
                        dotColors[appointment.status as keyof typeof dotColors]
                      )} />
                      {appointment.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - This Week Chart */}
          <div className="col-span-5 bg-[#161F30] border border-[rgba(255,255,255,0.07)] rounded-[13.65px] p-4">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-[12.67px] font-semibold text-white">This Week</h3>
                <p className="text-[10.72px] text-[#94A3B8] mt-1">Appointments Mon–Sun</p>
              </div>
              <MoreHorizontal className="w-4 h-4 text-[#475569]" />
            </div>
            
            {/* Bar Chart */}
            <div className="relative mt-8">
              <div className="flex items-end justify-between h-[120px]">
                {weekDays.map((day, index) => (
                  <div key={index} className="flex flex-col items-center w-8">
                    <div 
                      className={cn(
                        "w-full rounded-t-[3.9px] transition-all",
                        day.isActive 
                          ? "bg-[#3B82F6] shadow-[0_0_9.75px_rgba(59,130,246,0.4)]" 
                          : "bg-[#3B82F6]/28"
                      )}
                      style={{ height: `${day.height}px` }}
                    />
                    <span className={cn(
                      "text-[9.75px] mt-2",
                      day.isActive ? "text-[#60A5FA] font-semibold" : "text-[#475569]"
                    )}>
                      {day.day}
                    </span>
                  </div>
                ))}
              </div>
              
              <div className="absolute -left-6 top-0 h-full flex flex-col justify-between text-[8px] text-[#475569]">
                <span>40</span>
                <span>30</span>
                <span>20</span>
                <span>10</span>
                <span>0</span>
              </div>
            </div>
            
            <div className="flex items-center gap-4 mt-6 text-[9px] text-[#475569]">
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-[#3B82F6]" />
                <span>This week</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-[#3B82F6]/28" />
                <span>Last week</span>
              </div>
            </div>
          </div>

          {/* Activity Feed */}
          <div className="col-span-5 bg-[#161F30] border border-[rgba(255,255,255,0.07)] rounded-[13.65px] overflow-hidden">
            <div className="px-4 py-3 border-b border-[rgba(255,255,255,0.07)] flex justify-between items-center">
              <h3 className="text-[12.67px] font-semibold text-white flex items-center gap-2">
                <Activity className="w-4 h-4 text-[#3B82F6]" />
                Activity
              </h3>
            </div>
            <div className="divide-y divide-[rgba(255,255,255,0.07)]">
              {activityData.map((activity) => (
                <div key={activity.id} className="px-4 py-3 hover:bg-[#1E293B] transition-colors">
                  <div className="flex items-start gap-3">
                    <span className={cn("w-[6.8px] h-[6.8px] rounded-full mt-1.5", activity.dotColor)} />
                    <div className="flex-1">
                      <p className="text-[11.7px] text-[#F1F5F9] leading-[17.55px]">
                        {activity.text}
                      </p>
                      <p className="text-[10.24px] text-[#475569] mt-0.5">{activity.time}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Revenue Breakdown */}
          <div className="col-span-3 bg-[#161F30] border border-[rgba(255,255,255,0.07)] rounded-[13.65px] overflow-hidden">
            <div className="px-4 py-3 border-b border-[rgba(255,255,255,0.07)]">
              <h3 className="text-[12.67px] font-semibold text-white flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-[#3B82F6]" />
                Revenue Breakdown
              </h3>
              <p className="text-[10.72px] text-[#94A3B8]">February 2026</p>
            </div>
            <div className="p-4 space-y-4">
              {revenueData.map((item, index) => (
                <div key={index}>
                  <div className="flex justify-between text-[12.19px] mb-1">
                    <span className="text-[#94A3B8]">{item.label}</span>
                    <span className="text-white font-semibold">{item.value}</span>
                  </div>
                  <div className="w-full h-[4.9px] bg-[rgba(255,255,255,0.06)] rounded-[9.75px] overflow-hidden">
                    <div 
                      className={cn("h-full rounded-[9.75px]", item.barColor)}
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming Today */}
          <div className="col-span-4 bg-[#161F30] border border-[rgba(255,255,255,0.07)] rounded-[13.65px] overflow-hidden">
            <div className="px-4 py-3 border-b border-[rgba(255,255,255,0.07)]">
              <h3 className="text-[12.67px] font-semibold text-white flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#3B82F6]" />
                Upcoming Today
              </h3>
            </div>
            <div className="divide-y divide-[rgba(255,255,255,0.07)]">
              {upcomingData.map((item) => (
                <div key={item.id} className="px-4 py-3 flex items-center gap-3 hover:bg-[#1E293B] transition-colors">
                  <div className="w-[46.8px] h-[34.6px] bg-[#3B82F6]/12 rounded-[7.8px] flex flex-col items-center justify-center text-[11.2px]">
                    <span className="font-semibold text-[#3B82F6]">{item.time}</span>
                    <span className="text-[8.8px] text-[#60A5FA]">{item.ampm}</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-[12.2px] text-[#F1F5F9]">{item.name}</p>
                    <p className="text-[10.7px] text-[#475569]">{item.type}</p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-[#475569]" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}