import {
  LayoutDashboard,
  Hospital,
  Users,
  Building2,
  Activity,
  Stethoscope,
  Shield,
  FileText,
  Settings,
  type LucideIcon
} from 'lucide-react';

export interface SidebarItem {
  title: string;
  href: string;
  icon: LucideIcon;
  items?: SidebarItem[];
}

export const sidebarItems: SidebarItem[] = [
  {
    title: 'Dashboard',
    href: '/hospital',
    icon: LayoutDashboard,
  },
  {
    title: 'Profile',
    href: '/hospital/profile',
    icon: Hospital,
  },
  {
    title: 'Doctors',
    href: '/hospital/doctors',
    icon: Users,
  },
  {
    title: 'Facilities',
    href: '/hospital/facilities',
    icon: Building2,
  },
  {
    title: 'Procedures',
    href: '/hospital/procedures',
    icon: Activity,
  },
  {
    title: 'Services',
    href: '/hospital/services',
    icon: Stethoscope,
  },
  {
    title: 'Insurance',
    href: '/hospital/insurance',
    icon: Shield,
  },
  {
    title: 'Estimates',
    href: '/hospital/estimates',
    icon: FileText,
  },
  {
    title: 'Settings',
    href: '/hospital/settings',
    icon: Settings,
  },
];