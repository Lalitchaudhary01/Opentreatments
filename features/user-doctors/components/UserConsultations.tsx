// app/components/UserConsultations.tsx
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/lib/prisma";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, User } from "lucide-react";

export default async function UserConsultations() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return (
      <div className="p-6">
        <p>You need to be logged in to view your consultations.</p>
      </div>
    );
  }

  const userEmail = session.user.email;

  const user = await prisma.user.findUnique({
    where: { email: userEmail },
  });

  if (!user) {
    return (
      <div className="p-6">
        <p>User not found.</p>
      </div>
    );
  }

  const consultations = await prisma.independentConsultation.findMany({
    where: { userId: user.id },
    include: { doctor: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <Card className="border-2 border-dashed border-gray-300 dark:border-gray-600 shadow-lg bg-white dark:bg-slate-800">
      <CardHeader>
        <CardTitle>My Consultations</CardTitle>
      </CardHeader>
      <CardContent>
        {consultations.length === 0 ? (
          <p className="text-center text-gray-600 dark:text-gray-400">
            You have no consultations.
          </p>
        ) : (
          <div className="space-y-4">
            {consultations.map((c) => (
              <div
                key={c.id}
                className="border rounded-lg p-4 space-y-2 hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold text-gray-800 dark:text-white">
                    <User className="inline-block h-4 w-4 mr-1" />
                    {c.doctor?.name || "Unknown Doctor"}
                  </h3>
                  <Badge
                    variant="outline"
                    className={
                      c.status === "APPROVED"
                        ? "text-green-600 border-green-600"
                        : c.status === "REJECTED"
                        ? "text-red-600 border-red-600"
                        : "text-gray-600 border-gray-400"
                    }
                  >
                    {c.status}
                  </Badge>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  <Calendar className="inline-block h-4 w-4 mr-1" />
                  {new Date(c.slot).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
