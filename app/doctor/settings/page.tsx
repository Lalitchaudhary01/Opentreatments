import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import Link from "next/link";
import { signOut } from "next-auth/react";

export default async function SettingsPage() {
  const session = await getServerSession(authOptions);
  if (!session) return null;

  return (
    <div className="p-6 space-y-6 max-w-2xl">
      <h2 className="text-2xl font-bold">Settings</h2>

      {/* Account Info */}
      <div className="rounded-xl border p-4 space-y-1">
        <p className="font-semibold">Account</p>
        <p className="text-sm text-muted-foreground">
          Email: {session.user?.email}
        </p>
        <p className="text-sm text-muted-foreground">
          Role: {session.user?.role}
        </p>
      </div>

      {/* Profile Actions */}
      <div className="rounded-xl border p-4 space-y-3">
        <p className="font-semibold">Profile</p>

        <Link href="/doctor/profile" className="block text-blue-600 underline">
          View Profile
        </Link>

        <Link
          href="/doctor/profile/edit"
          className="block text-blue-600 underline"
        >
          Update Profile
        </Link>
      </div>

      {/* Security */}
      <div className="rounded-xl border p-4 space-y-3">
        <p className="font-semibold">Security</p>
        <p className="text-sm text-muted-foreground">
          Change password (coming soon)
        </p>

        {/* Logout */}
        <form
          action={async () => {
            "use server";
            await signOut({ redirect: true, callbackUrl: "/" });
          }}
        >
          <button
            type="submit"
            className="mt-2 inline-flex items-center rounded-lg bg-red-500 px-4 py-2 text-white hover:bg-red-600"
          >
            Logout
          </button>
        </form>
      </div>
    </div>
  );
}
