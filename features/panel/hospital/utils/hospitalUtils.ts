import { HospitalProfile } from "../types";

export function getHospitalDisplayName(hospital?: HospitalProfile | null) {
  return hospital?.name || "Your Hospital";
}

export function formatAddress(hospital?: HospitalProfile | null) {
  if (!hospital) return "";
  return [hospital.address, hospital.city, hospital.state, hospital.country]
    .filter(Boolean)
    .join(", ");
}
