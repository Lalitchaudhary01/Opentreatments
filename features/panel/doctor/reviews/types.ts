export type ReviewItem = {
  id: string;
  name: string;
  av: string;
  col: string;
  ac: string;
  rating: number;
  date: string;
  service: string;
  text: string;
  replied: boolean;
  reply: string;
};

export type CategoryScore = {
  label: string;
  score: number;
};
