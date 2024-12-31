import { Category, Post, User } from "@prisma/client";

export interface PostProps extends Post {
  categories: CategoryProps[];
  user: Pick<User, 'id' | 'nickname'>;
  private: {
    user: Pick<User, 'id' | 'nickname'>;
  }[];
};

export interface CategoryProps extends Category {
  name: string;
  _count: {
    post: number;
  }
};

export interface UserProps extends Omit<User, 'updatedAt' | 'createdAt'> {
  post: PostProps[];
  _count: {
    post: number;
  };
};