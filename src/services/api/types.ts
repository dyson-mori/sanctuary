import { Creator, Post } from "@prisma/client";
import { CategoryProps, CreatorProps, PostProps } from "@global/interface";

export type ApiProps = {
  posts: {
    list: () => Promise<PostProps[]>;
    create: (body: Pick<PostProps, 'categories' | 'creator_id'>) => Promise<boolean>;
  };
  creator: {
    list: () => Promise<CreatorProps[]>;
    find: (name: string) => Promise<Creator>;
  };
  search: {
    list: () => Promise<PostProps[]>;
  };
  category: {
    list: () => Promise<CategoryProps[]>;
  }
};
