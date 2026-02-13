"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import { SubmitDoctorProfileInput } from "../types";
import { submitDoctorProfileService } from "../services/submitDoctorProfile.service";

export async function submitDoctorProfile(
  data: Partial<SubmitDoctorProfileInput>
) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  return submitDoctorProfileService(session.user.id, data);
}