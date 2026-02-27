// constants/index.ts - Update this

import {
  LayoutDashboard,
  CalendarDays,
  Users,
  Receipt,
  LineChart,
  Wallet,
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
    ]
  },
  {
    section: "FINANCE",
    items: [
      { 
        label: "Billing", 
        href: "/doctor/billing", 
        icon: Receipt,
        badge: "3"
      },
      { 
        label: "Revenue", 
        href: "/doctor/revenue", 
        icon: Wallet 
      },
      { 
        label: "Analytics", 
        href: "/doctor/analytics", 
        icon: LineChart 
      },
    ]
  }
];