import { DoctorProfile } from "../types";

export function getDoctorDisplayName(profile: DoctorProfile) {
  return `Dr. ${profile.name}`;
}

export function isProfileComplete(profile: Partial<DoctorProfile>) {
  return Boolean(
    profile.name &&
      profile.specialization &&
      profile.languages?.length &&
      profile.city
  );
}
