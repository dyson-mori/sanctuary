import { Creator } from "@prisma/client";
import { CategoryProps, PostProps } from "@global/interface";

export type ApiProps = {
  posts: {
    list: () => Promise<PostProps[]>;

    filter: (name: string) => Promise<PostProps[]>;
  };
  creator: {
    find: (name: string) => Promise<Creator>;
  };
  search: {
    list: () => Promise<PostProps[]>;
    filter: (id: { id: string }) => Promise<PostProps[]>;
  };
  category: {
    list: () => Promise<CategoryProps[]>;
  }
};
