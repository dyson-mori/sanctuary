import { Category, Post, User } from "@prisma/client";

export interface PostProps extends Post {
  // participant: Creator[];
  categories: CategoryProps[];
  category: Category;
  user: User;
};

export interface CategoryProps extends Category {
  name: string;
  _count: {
    post: number;
  }
};

// export interface CreatorProps extends Creator {
//   post: PostProps[];
//   _count: {
//     post: number;
//   };
// };

export interface UserProps extends User {
  post: PostProps[];
  _count: {
    post: number;
  };
};