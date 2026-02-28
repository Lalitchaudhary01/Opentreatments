export type InvoiceStatus = "PENDING" | "PAID";

export type BillingInvoice = {
  id: string;
  patient: string;
  service: string;
  amount: number;
  date: string;
  status: InvoiceStatus;
  mode: string;
};
