import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../[...nextauth]/route";

export default async function Dashboard() {
  const session = await getServerSession(authOptions);
  const role = (session?.user as any)?.role;

  if (!session || role !== "ADMIN") {
    redirect("/auth/admin");
  }

  return (
    <main className="p-6">
      <h1 className="text-2xl font-semibold">Welcome, Admin 👋</h1>
      <p className="text-gray-600 mt-2">
        You have full access to the dashboard.
      </p>
    </main>
  );
}
