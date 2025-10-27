import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import Link from "next/link";

const dashboardLinks = [
  { name: "Profile", href: "/hospital/profile/view" },
  { name: "Doctors", href: "/hospital/doctors" },
  { name: "Services", href: "/hospital/services" },
  { name: "Facilities", href: "/hospital/facilities" },
  { name: "Insurances", href: "/hospital/insurances" },
  { name: "Procedures", href: "/hospital/procedures" },
  { name: "Estimates", href: "/hospital/estimates" },
];

export default async function HospitalDashboardPage() {
  const session = await getServerSession(authOptions);

  // ❌ Unauthorized case
  if (!session || session.user.role !== "HOSPITAL") {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center p-8">
        <h1 className="text-4xl font-bold text-red-600 mb-4">
          ⛔ Unauthorized Access
        </h1>
        <p className="text-gray-600 mb-6">
          You do not have permission to view this page. Please login as a{" "}
          <span className="font-semibold">Hospital</span> account.
        </p>
        <Link
          href="/"
          className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
        >
          Go to Homepage
        </Link>
      </div>
    );
  }

  // ✅ Authorized hospital dashboard
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">🏥 Hospital Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {dashboardLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="block p-6 border rounded-xl shadow hover:shadow-lg hover:bg-blue-50 transition"
          >
            <h2 className="text-xl font-semibold">{link.name}</h2>
            <p className="text-sm text-gray-600 mt-2">
              Manage {link.name.toLowerCase()}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
