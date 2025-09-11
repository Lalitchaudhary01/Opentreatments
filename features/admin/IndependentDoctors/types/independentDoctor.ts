// types/independentDoctor.ts

// Base type for Independent Doctor
export type IndependentDoctor = {
  id: string;
  name: string;
  specialties: string[];
  specialization: string;
  experience?: number;
  gender?: string;
  profilePic?: string;
  fees?: number;
  rating?: number; // default 0
  totalReviews?: number; // default 0
  languages: string[];
  availability?: {
    day: string;
    slots: string[];
  }[];
  badges?: string[];
  city?: string;
  createdAt: string; // ISO string
  updatedAt: string; // ISO string
  consultations?: IndependentConsultation[];
};

// Base type for Independent Consultation
export type IndependentConsultation = {
  id: string;
  doctorId: string;
  userId: string;
  slot: string; // ISO string
  status: "pending" | "confirmed" | "completed" | "cancelled";
  fee?: number;
  createdAt: string; // ISO string
  updatedAt: string; // ISO string
  doctor?: IndependentDoctor;
  user?: {
    id: string;
    name?: string;
    email: string;
  };
};
