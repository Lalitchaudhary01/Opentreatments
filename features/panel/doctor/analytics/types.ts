export type AnalyticsDailyPoint = {
  day: string;
  revenue: number;
};

export type AnalyticsTypePoint = {
  type: string;
  value: number;
  color: string;
};

export type AnalyticsInsight = {
  title: string;
  body: string;
  tone: "blue" | "green" | "amber" | "teal";
};
