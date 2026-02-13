"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import { getDoctorProfileService } from "../services/getDoctorProfile.service";


export async function getDoctorProfile() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  return getDoctorProfileService(session.user.id);
}