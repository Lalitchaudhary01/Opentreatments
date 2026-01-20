import { PharmacyProfile } from "../types";

export function formatPharmacyName(p?: PharmacyProfile | null) {
  if (!p) return "";
  return `${p.name} (${p.city ?? "N/A"})`;
}

export function isProfileComplete(p?: PharmacyProfile | null) {
  if (!p) return false;
  return Boolean(
    p.name &&
      p.phone &&
      p.ownerName &&
      p.licenseNumber &&
      p.address &&
      p.city
  );
}
