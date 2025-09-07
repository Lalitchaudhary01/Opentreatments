export interface Like {
  id: string;
  createdAt: Date;

  // Relations
  user: {
    id: string;
    name?: string | null;
    email: string;
  };
  blogId: string;
}
