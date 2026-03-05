export type ChipFilter = "all" | "confirmed" | "in-progress" | "waiting" | "completed";

export type UiAppointment = {
  id: string;
  recordType: "consultation" | "walkin";
  patientName: string;
  patientId: string;
  phoneNumber?: string;
  avatar: string;
  avatarBg: string;
  avatarText: string;
  time: string;
  type: string;
  booking: "Online Booked" | "Offline Booked" | "Walk-in";
  statusLabel: "Confirmed" | "In Progress" | "Waiting" | "Completed" | "Cancelled";
  sortTime: number;
};
