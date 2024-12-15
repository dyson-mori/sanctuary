import { Creator } from "@prisma/client";
import { CategoryProps, CreatorProps, PostProps } from "@global/interface";

export type ApiProps = {
  posts: {
    list: () => Promise<PostProps[]>;
    create: (body: Pick<PostProps, 'categories' | 'creator_id' | 'width' | 'height' | 'url_pre_image' | 'url_pre_video' | 'url_video'>) => Promise<boolean>;
  };
  creator: {
    list: () => Promise<CreatorProps[]>;
    find: (name: string) => Promise<Creator>;
    create: (body: Omit<Creator, 'id' | 'updatedAt' | 'createdAt' | 'public'>) => Promise<boolean>
  };
  search: {
    list: () => Promise<PostProps[]>;
  };
  category: {
    list: () => Promise<CategoryProps[]>;
  }
};
