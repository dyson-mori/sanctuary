import { Category, Hide, Post, User } from "@prisma/client";

export interface PostProps extends Post {
  categories: CategoryProps[];
  hide: boolean | Array<Hide>;
  // category: Category;
  user: UserProps;
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