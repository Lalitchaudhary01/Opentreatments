export interface Policy {
  id: string;
  userId: string;
  name: string; // Policy name (ex: Health Plus Plan)
  provider: string; // Insurance provider (ex: HDFC Ergo, ICICI Lombard)
  policyNumber: string; // Unique policy number
  sumInsured: number; // Total sum insured
  deductible?: number; // Deductible (if any)
  coPay?: number; // Co-pay % (if any)
  startDate: string; // ISO Date string
  endDate: string; // ISO Date string
  cashless: boolean; // Cashless support available
  pdfUrl?: string; // Uploaded PDF file URL
  createdAt: string;
  updatedAt: string;
}

export interface PolicyInput {
  name: string;
  provider: string;
  policyNumber: string;
  sumInsured: number;
  deductible?: number;
  coPay?: number;
  startDate: string;
  endDate: string;
  cashless?: boolean;
  pdfUrl?: string;
}

export interface EstimateInput {
  policyId: string;
  hospitalId: string;
  procedureCost: number; // Total cost of treatment/procedure
}

export interface EstimateResult {
  policyId: string;
  hospitalId: string;
  procedureCost: number;
  coveredAmount: number; // How much insurance will cover
  outOfPocket: number; // Final out-of-pocket cost
  breakdown: {
    deductible: number;
    coPayAmount: number;
    insuranceCover: number;
  };
}

export interface PolicySummary {
  id: string;
  name: string;
  provider: string;
  sumInsured: number;
  cashless: boolean;
}
