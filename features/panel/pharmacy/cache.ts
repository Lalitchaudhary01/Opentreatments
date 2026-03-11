import { revalidatePath, revalidateTag } from "next/cache";

export function pharmacyPanelTag(pharmacyId: string) {
  return `pharmacy-panel:${pharmacyId}`;
}

export function pharmacyOverviewTag(pharmacyId: string) {
  return `pharmacy-overview:${pharmacyId}`;
}

export function invalidatePharmacyPanelCache({
  pharmacyId,
  paths = [],
}: {
  pharmacyId: string;
  paths?: string[];
}) {
  revalidateTag(pharmacyPanelTag(pharmacyId), "max");
  revalidateTag(pharmacyOverviewTag(pharmacyId), "max");

  for (const path of paths) {
    revalidatePath(path);
  }
}
