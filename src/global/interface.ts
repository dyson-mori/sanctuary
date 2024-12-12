// eslint-disable-next-line no-use-before-define
import { Category, Creator, Post } from "@prisma/client";

export interface PostProps extends Post {
  participant: Creator[];
  categories: Category[];
  creator: Creator;
};

export interface CategoryProps extends Category {
  _count: {
    post: number;
  }
};

export interface CreatorProps extends Creator {
  posts: Post[]
}