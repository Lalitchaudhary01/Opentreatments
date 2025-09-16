// features/user-doctors/types/userDoctor.ts
export type UserDoctor = {
  id: string;
  name: string;
  email: string;
  phone: string;
  specialization: string;
  specialties?: string[]; // ✅ Added
  experience?: number;
  city?: string;
  profilePic?: string | null;
  fees?: number | null;
  rating?: number | null;
  totalReviews?: number | null;
  languages?: string[];
};

export type GetApprovedDoctorsResponse = UserDoctor[];
