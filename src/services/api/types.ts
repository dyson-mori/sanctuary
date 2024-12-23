import { Category, User } from "@prisma/client";
import { CategoryProps, PostProps, UserProps } from "@global/interface";

type CreatePostProps = Omit<PostProps, 'updatedAt' | 'createdAt' | 'id' | 'user' | 'user_id'>;

export type ApiProps = {
  user: {
    list: () => Promise<UserProps[]>;
  },
  auth: {
    find: () => Promise<UserProps>;
    auth: (body: Pick<User, 'nickname' | 'password'>) => Promise<string | null>;
  },
  post: {
    list: () => Promise<PostProps[]>;
    create: (body: CreatePostProps) => Promise<boolean>;
  };
  search: {
    list: () => Promise<PostProps[]>;
  };
  category: {
    list: () => Promise<CategoryProps[]>;
    create: (body: Pick<Category, 'name'>) => Promise<boolean>
  }
};
