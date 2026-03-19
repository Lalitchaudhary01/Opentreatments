import { authOptions } from "@/lib/auth-options";
import prisma from "@/lib/prisma";
import { Role } from "@prisma/client";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const REDIRECT_BY_ROLE: Record<Role, string> = {
  USER: "/",
  DOCTOR: "/doctor/profile/submit",
  PHARMACY: "/pharmacy/profile/submit",
  LABORATORY: "/auth?mode=lab-details&role=LABORATORY",
  ADMIN: "/admin/dashbaord",
  HOSPITAL: "/hospital/profile/submit",
  INSURANCE_COMPANY: "/insurance/profile/submit",
};

function isSelectableRole(value: string | undefined): value is Role {
  return (
    value === "USER" ||
    value === "DOCTOR" ||
    value === "PHARMACY" ||
    value === "HOSPITAL" ||
    value === "LABORATORY" ||
    value === "ADMIN"
  );
}

export default async function GoogleRolePage({
  searchParams,
}: {
  searchParams?: Promise<{ role?: string }> | { role?: string };
}) {
  const resolved = (await Promise.resolve(searchParams)) ?? {};
  const role = resolved.role;

  if (!isSelectableRole(role)) {
    redirect("/auth?mode=login");
  }

  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    redirect(`/auth?mode=login&role=${role}`);
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { id: true, role: true },
  });

  if (!user) {
    redirect(`/auth?mode=login&role=${role}`);
  }

  if (user.role !== role) {
    const canSwitch = user.role === "USER";
    if (!canSwitch) {
      redirect(`/auth?mode=login&role=${user.role}`);
    }

    await prisma.user.update({
      where: { id: user.id },
      data: {
        role,
        isVerified: true,
      },
    });
  }

  redirect(REDIRECT_BY_ROLE[role]);
}
