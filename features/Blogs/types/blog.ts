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
  comments: Comment[];
  likes: Like[];
  tags: {
    tag: Tag;
  }[];
}
