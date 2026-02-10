export interface HospitalDoctor {
  id: string;
  name: string;
  specialization: string;
  experience?: number | null;
  profilePic?: string | null;
  hospitalId: string;
}

export interface CreateHospitalDoctorInput {
  name: string;
  specialization: string;
  experience?: number;
  profilePic?: string;
}
