import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// 👈 yaha import

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/auth/login");

  const userName = session.user?.name || session.user?.email || "User";
  const initials = userName.charAt(0).toUpperCase();

  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-4rem)] p-6">
      <Card className="w-full max-w-md shadow-lg rounded-2xl">
        <CardHeader className="flex flex-col items-center space-y-3">
          <Avatar className="h-16 w-16">
            <AvatarImage src={session.user?.image || ""} alt={userName} />
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
          <CardTitle className="text-2xl font-bold">
            Welcome, {userName}
          </CardTitle>
          <CardTitle className="text-sm text-muted-foreground">
            {session.user?.email}
          </CardTitle>
        </CardHeader>

        <CardContent className="flex flex-col items-center space-y-4 text-center">
          <p className="text-muted-foreground">
            You are successfully logged in 🎉
          </p>
          {/* 👈 yaha use ho raha */}
        </CardContent>
      </Card>
    </div>
  );
}
