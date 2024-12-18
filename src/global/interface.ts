import { Category, Creator, Post } from "@prisma/client";

export interface PostProps extends Post {
  // participant: Creator[];
  categories: CategoryProps[];
  category: Category;
  creator: Creator;
};

export interface CategoryProps extends Category {
  name: string;
  _count: {
    post: number;
  }
};

export interface CreatorProps extends Creator {
  post: PostProps[];
  _count: {
    post: number;
  };
};