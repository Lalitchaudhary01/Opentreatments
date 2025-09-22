// /user-pharmacies/types/userPharmacy.ts

// Pharmacy type (for user side)
export type UserPharmacy = {
  id: string;
  name: string;
  address: string;
  phone: string;
  status: "APPROVED"; // user side me sirf approved dikhana hai
  createdAt: string;
  updatedAt: string;
};

// Medicine type (for pharmacies)
export type UserMedicine = {
  id: string;
  name: string;
  description?: string;
  price: number;
  stock: number;
  pharmacyId: string;
  createdAt: string;
  updatedAt: string;
};
