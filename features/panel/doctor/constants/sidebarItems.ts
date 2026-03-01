// constants/index.ts - Update this

import {
  LayoutDashboard,
  CalendarDays,
  Users,
  CheckSquare,
  Clock3,
  Receipt,
  LineChart,
  Wallet,
  Star,
  Settings,
  UserCircle2,
} from "lucide-react";

export const doctorSidebarItems = [
  {
    section: "MAIN",
    items: [
      { 
        label: "Overview", 
        href: "/doctor/overview", 
        icon: LayoutDashboard,
      },
      { 
        label: "Appointments", 
        href: "/doctor/appointments", 
        icon: CalendarDays,
        badge: "12"
      },
      { 
        label: "Patients", 
        href: "/doctor/patients", 
        icon: Users 
      },
      {
        label: "Services",
        href: "/doctor/services",
        icon: CheckSquare,
      },
      {
        label: "Availability",
        href: "/doctor/availability",
        icon: Clock3,
      },
    ]
  },
  {
    section: "FINANCE",
    items: [
      { 
        label: "Billing", 
        href: "/doctor/billing", 
        icon: Receipt,
        badge: "3",
        badgeTone: "amber",
      },
      { 
        label: "Revenue", 
        href: "/doctor/revenue", 
        icon: Wallet 
      },
    ]
  },
  {
    section: "PERFORMANCE",
    items: [
      {
        label: "Analytics",
        href: "/doctor/analytics",
        icon: LineChart,
      },
      {
        label: "Reviews",
        href: "/doctor/reviews",
        icon: Star,
        badge: "4.8",
        badgeTone: "amber-dark",
      },
    ],
  },
  {
    section: "Account",
    items: [
      {
        label: "Settings",
        href: "/doctor/settings",
        icon: Settings,
      },
      {
        label: "Profile",
        href: "/doctor/profile",
        icon: UserCircle2,
      },
    ]
  }
];
