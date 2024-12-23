import { Category, User } from "@prisma/client";
import { CategoryProps, PostProps, UserProps } from "@global/interface";

type CreateBodyProps = Pick<PostProps, 'title' | 'description' | 'cloudinary_video' | 'hide'> & {
  categories: { id: string, name: string }[]
};

export type ApiProps = {
  user: {
    list: () => Promise<UserProps[]>;
  },
  auth: {
    find: () => Promise<User>;
    auth: (body: Pick<User, 'nickname' | 'password'>) => Promise<string | null>;
  },
  posts: {
    list: () => Promise<PostProps[]>;
    create: (body: CreateBodyProps) => Promise<boolean>;
  };
  // creator: {
  //   list: () => Promise<CreatorProps[]>;
  //   find: (name: string) => Promise<CreatorProps>;
  //   create: (body: Omit<Creator, 'id' | 'updatedAt' | 'createdAt' | 'public'>) => Promise<boolean>
  // };
  search: {
    list: () => Promise<PostProps[]>;
  };
  category: {
    list: () => Promise<CategoryProps[]>;
    create: (body: Pick<Category, 'name'>) => Promise<boolean>
  }
};
