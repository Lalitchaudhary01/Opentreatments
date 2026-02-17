import { Hospital, Doctor, Procedure, Service, Facility, Insurance } from '../types';
import slugify from 'slugify';

export const generateHospitalSlug = (name: string): string => {
  return slugify(name, { lower: true, strict: true });
};

export const formatHospitalAddress = (hospital: Partial<Hospital>): string => {
  const parts = [
    hospital.address,
    hospital.city,
    hospital.state,
    hospital.country
  ].filter(Boolean);
  
  return parts.join(', ');
};

export const formatPhoneNumber = (phone: string): string => {
  // Basic formatting - can be enhanced based on requirements
  const cleaned = phone.replace(/\D/g, '');
  const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
  if (match) {
    return '(' + match[1] + ') ' + match[2] + '-' + match[3];
  }
  return phone;
};

export const getHospitalStats = (hospital: Hospital & {
  doctors?: Doctor[];
  procedures?: Procedure[];
  services?: Service[];
  facilities?: Facility[];
  insurances?: Insurance[];
}) => {
  return {
    totalDoctors: hospital.doctors?.length || 0,
    totalProcedures: hospital.procedures?.length || 0,
    totalServices: hospital.services?.length || 0,
    totalFacilities: hospital.facilities?.length || 0,
    totalInsurances: hospital.insurances?.length || 0,
    lastUpdated: hospital.updatedAt
  };
};

export const validateHospitalData = (data: Partial<Hospital>): { valid: boolean; errors: string[] } => {
  const errors: string[] = [];

  if (!data.name || data.name.trim().length < 2) {
    errors.push('Hospital name must be at least 2 characters');
  }

  if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.push('Invalid email format');
  }

  if (data.phone && !/^[0-9+\-\s()]{10,}$/.test(data.phone)) {
    errors.push('Invalid phone number format');
  }

  return {
    valid: errors.length === 0,
    errors
  };
};

export const groupDoctorsBySpecialization = (doctors: Doctor[]): Record<string, Doctor[]> => {
  return doctors.reduce((acc, doctor) => {
    const spec = doctor.specialization;
    if (!acc[spec]) {
      acc[spec] = [];
    }
    acc[spec].push(doctor);
    return acc;
  }, {} as Record<string, Doctor[]>);
};

export const sortByName = <T extends { name: string }>(items: T[]): T[] => {
  return [...items].sort((a, b) => a.name.localeCompare(b.name));
};