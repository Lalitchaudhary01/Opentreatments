// /features/doctors/types/doctor.ts

export interface IndependentDoctor {
  id: string;
  name: string;
  slug: string;
  specialization: string;
  specialties: string[];
  languages: string[];
  experience?: number | null;
  gender?: "Male" | "Female" | "Other" | null;
  profilePic?: string | null;
  fees?: number | null;
  rating: number;
  totalReviews: number;
  badges?: string[];
  city?: string | null;
  availability?: AvailabilitySlot[];
}

export interface AvailabilitySlot {
  day: string; // Example: "Monday", "Tuesday"
  startTime: string; // Example: "09:00"
  endTime: string; // Example: "17:00"
}

export interface Review {
  id: string;
  doctorId: string;
  reviewerName: string;
  rating: number;
  comment: string;
  createdAt: string;
}
