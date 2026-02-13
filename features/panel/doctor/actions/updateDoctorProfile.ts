"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import { updateDoctorProfileService } 
  from "../services/updateDoctorProfile.service";
import { SubmitDoctorProfileInput } from "../types";

export async function updateDoctorProfile(
  data: Partial<SubmitDoctorProfileInput>
) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  return updateDoctorProfileService(session.user.id, data);
}