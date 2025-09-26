"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  Stethoscope,
  Hospital,
  Pill,
  FlaskConical,
  Building2,
  Users,
  Bell,
  Search,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// Sidebar Items
const navItems = [
  {
    name: "Dashboard",
    icon: <LayoutDashboard className="w-5 h-5" />,
    href: "/admin/dashboard",
  },
  {
    name: "Doctors",
    icon: <Stethoscope className="w-5 h-5" />,
    href: "/admin/doctor",
  },
  {
    name: "Hospitals",
    icon: <Hospital className="w-5 h-5" />,
    href: "/admin/hospitals/hospitals",
  },
  {
    name: "Pharmacies",
    icon: <Pill className="w-5 h-5" />,
    href: "/admin/pharmacy",
  },
  {
    name: "Labs",
    icon: <FlaskConical className="w-5 h-5" />,
    href: "/admin/labs",
  },
  {
    name: "Insurance",
    icon: <Building2 className="w-5 h-5" />,
    href: "/admin/insurance",
  },
  { name: "Users", icon: <Users className="w-5 h-5" />, href: "/admin/users" },
];

export default function AdminDashboard() {
  const [active, setActive] = useState("/admin/dashboard");

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg p-4 flex flex-col">
        <h2 className="text-xl font-bold mb-6">OpenTreatment Admin</h2>
        <nav className="space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              onClick={() => setActive(item.href)}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg transition ${
                active === item.href
                  ? "bg-blue-600 text-white"
                  : "hover:bg-gray-100"
              }`}
            >
              {item.icon}
              <span>{item.name}</span>
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        {/* Topbar */}
        <header className="h-16 bg-white border-b flex items-center justify-between px-6">
          {/* Search */}
          <div className="relative w-1/3">
            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring focus:ring-blue-200"
            />
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-4">
            <Button variant="outline" size="icon">
              <Bell className="w-5 h-5" />
            </Button>
            <div className="flex items-center gap-2">
              <img
                src="https://i.pravatar.cc/40"
                alt="Admin"
                className="w-8 h-8 rounded-full"
              />
              <span className="font-medium">Admin</span>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <motion.div
          className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <StatCard title="Doctors Pending" value={5} href="/admin/doctor" />
          <StatCard
            title="Hospitals Pending"
            value={2}
            href="/admin/hospitals/hospitals"
          />
          <StatCard
            title="Pharmacies Pending"
            value={3}
            href="/admin/pharmacy"
          />
          <StatCard title="Labs Pending" value={1} href="/admin/labs" />
          <StatCard
            title="Insurance Pending"
            value={4}
            href="/admin/insurance"
          />
          <StatCard title="Users Registered" value={120} href="/admin/users" />
        </motion.div>

        {/* Requests Table */}
        <div className="p-6">
          <Card>
            <CardContent>
              <h2 className="text-lg font-semibold mb-4">
                Recent Pending Requests
              </h2>
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2">Name</th>
                    <th className="text-left py-2">Type</th>
                    <th className="text-left py-2">Status</th>
                    <th className="text-left py-2">Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="py-2">Dr. Ramesh Kumar</td>
                    <td>Doctor</td>
                    <td>
                      <Badge variant="destructive">Pending</Badge>
                    </td>
                    <td>
                      <Button size="sm" asChild>
                        <Link href="/admin/doctors/1">Review</Link>
                      </Button>
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2">City Hospital</td>
                    <td>Hospital</td>
                    <td>
                      <Badge variant="destructive">Pending</Badge>
                    </td>
                    <td>
                      <Button size="sm" asChild>
                        <Link href="/admin/hospitals/2">Review</Link>
                      </Button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}

// Stat Card Component
function StatCard({
  title,
  value,
  href,
}: {
  title: string;
  value: number;
  href: string;
}) {
  return (
    <Link href={href}>
      <Card className="cursor-pointer hover:shadow-lg transition">
        <CardContent className="p-4 flex flex-col">
          <span className="text-sm text-gray-500">{title}</span>
          <span className="text-2xl font-bold">{value}</span>
        </CardContent>
      </Card>
    </Link>
  );
}
