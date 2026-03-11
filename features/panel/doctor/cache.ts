import { revalidatePath, revalidateTag } from "next/cache";

export function doctorPanelTag(doctorId: string) {
  return `doctor-panel:${doctorId}`;
}

export function doctorOverviewTag(doctorId: string) {
  return `doctor-overview:${doctorId}`;
}

export function invalidateDoctorPanelCache({
  doctorId,
  paths = [],
}: {
  doctorId: string;
  paths?: string[];
}) {
  revalidateTag(doctorPanelTag(doctorId), "max");
  revalidateTag(doctorOverviewTag(doctorId), "max");

  for (const path of paths) {
    revalidatePath(path);
  }
}
