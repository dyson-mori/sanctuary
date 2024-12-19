import { Category, Creator } from "@prisma/client";
import { CategoryProps, CreatorProps, PostProps } from "@global/interface";

type CreateBodyProps = Pick<PostProps, 'creator_id' | 'width' | 'height' | 'url_pre_image' | 'url_pre_video' | 'url_video'> & {
  categories: { id: string, name: string }[]
};

export type ApiProps = {
  posts: {
    list: () => Promise<PostProps[]>;
    create: (body: CreateBodyProps) => Promise<boolean>;
  };
  creator: {
    list: () => Promise<CreatorProps[]>;
    find: (name: string) => Promise<CreatorProps>;
    create: (body: Omit<Creator, 'id' | 'updatedAt' | 'createdAt' | 'public'>) => Promise<boolean>
  };
  search: {
    list: () => Promise<PostProps[]>;
  };
  category: {
    list: () => Promise<CategoryProps[]>;
    create: (body: Pick<Category, 'name'>) => Promise<boolean>
  }
};
