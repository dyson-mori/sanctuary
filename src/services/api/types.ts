import { Creator } from "@prisma/client";
import { CategoryProps, PostProps } from "@global/interface";

export type ApiProps = {
  posts: {
    list: () => Promise<PostProps[]>;
  };
  creator: {
    find: (name: string) => Promise<Creator>;
  };
  search: {
    list: () => Promise<PostProps[]>;
  };
  category: {
    list: () => Promise<CategoryProps[]>;
  }
};
