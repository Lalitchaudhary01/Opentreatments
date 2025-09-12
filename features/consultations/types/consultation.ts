export type ConsultationStatus =
  | "PENDING"
  | "APPROVED"
  | "REJECTED"
  | "COMPLETED"
  | "CANCELLED";

export interface Consultation {
  id: string;
  doctorId: string;
  userId: string;
  slot: Date;
  duration?: number;
  status: ConsultationStatus;
  mode: "online" | "offline" | string; // extendable
  fee?: number;
  paymentId?: string;
  paymentStatus: "unpaid" | "paid" | "refunded";
  notes?: string;
  prescription?: string;
  cancelReason?: string;
  createdAt: Date;
  updatedAt: Date;
}
