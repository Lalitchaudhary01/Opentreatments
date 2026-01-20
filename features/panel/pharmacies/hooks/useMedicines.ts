"use client";

import { useEffect, useState } from "react";
import {
  getMedicines,
  addMedicine,
  updateMedicine,
  deleteMedicine,
  searchMedicines,
} from "@/features/panel/pharmacy/actions";
import { MedicineInput } from "../types";

export function useMedicines(pharmacyId: string) {
  const [medicines, setMedicines] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const refresh = async () => {
    if (!pharmacyId) return;
    setLoading(true);
    const data = await getMedicines(pharmacyId);
    setMedicines(data as any);
    setLoading(false);
  };

  useEffect(() => {
    refresh();
  }, [pharmacyId]);

  const add = async (data: MedicineInput) => {
    const res = await addMedicine(pharmacyId, data);
    await refresh();
    return res;
  };

  const update = async (id: string, data: Partial<MedicineInput>) => {
    const res = await updateMedicine(id, data);
    await refresh();
    return res;
  };

  const remove = async (id: string) => {
    await deleteMedicine(id);
    await refresh();
  };

  const search = async (q: string) => {
    return searchMedicines(pharmacyId, q);
  };

  return {
    medicines,
    loading,
    refresh,
    add,
    update,
    remove,
    search,
  };
}
