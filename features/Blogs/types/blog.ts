import { Comment } from "./comment";
import { Like } from "./like";
import { Tag } from "./tag";

export interface Blog {
  id: string;
  title: string;
  content: string;
  image?: string | null;
  createdAt: Date;
  updatedAt: Date;

  // Relations
  author: {
    id: string;
    name?: string | null;
    email: string;
  };
  comments: Comment[]; // ✅ full Comment[] type
  likes: Like[];       // ✅ full Like[] type
  tags: {
    tag: Tag;          // ✅ correct relation (because connectOrCreate in prisma)
  }[];
}
