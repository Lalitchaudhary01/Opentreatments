export interface Comment {
  id: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;

  // Relations
  author: {
    id: string;
    name?: string | null;
    email: string;
  };
  blogId: string;
}
