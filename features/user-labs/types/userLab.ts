export type UserLabListItem = {
  id: string;
  name: string;
  slug: string;
  address: string;
  city?: string;
  state?: string;
  country?: string;
  pincode?: string;
  phone?: string;
  email: string;
  website?: string;
  rating: number;
  totalReviews: number;
  status: string;
  homeCollection: boolean;
  testsCount: number;
  packagesCount: number;
};

export type UserLabTest = {
  id: string;
  name: string;
  category: string;
  price: number;
  discountedPrice?: number;
  tatHours?: number;
  sampleType?: string;
  fastingRequired: boolean;
  isActive: boolean;
};

export type UserLabPackage = {
  id: string;
  name: string;
  category: string;
  price: number;
  discountedPrice?: number;
  reportTat?: number;
  isActive: boolean;
};

export type UserLabDetail = UserLabListItem & {
  registrationNumber?: string;
  licenseNumber?: string;
  description?: string;
  tests: UserLabTest[];
  packages: UserLabPackage[];
};
