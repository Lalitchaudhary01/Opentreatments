import { DoctorStatus } from "../types";

export const statusConfig: Record<
  DoctorStatus,
  { label: string; color: string }
> = {
  APPROVED: {
    label: "Approved",
    color: "bg-green-100 text-green-700 border-green-200",
  },
  PENDING: {
    label: "Pending",
    color: "bg-orange-100 text-orange-700 border-orange-200",
  },
  REJECTED: {
    label: "Rejected",
    color: "bg-red-100 text-red-700 border-red-200",
  },
  //   INACTIVE: {
  //     label: "Inactive",
  //     color: "bg-slate-100 text-slate-700 border-slate-200",
  //   },
};
