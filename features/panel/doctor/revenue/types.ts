export type RevenueHistoryItem = {
  inv: string;
  name: string;
  av: string;
  col: string;
  ac: string;
  svc: string;
  date: string;
  mode: string;
  amt: number;
  status: "PAID" | "PENDING";
};

export type RevenueByService = {
  svc: string;
  icon: string;
  count: number;
  rev: number;
  color: string;
};
