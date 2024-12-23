import { useStorage, useWindowSize } from "@hooks";

import { PostVideo } from "./_components/video";

import { Column } from "./styles";
import { PostProps } from "@global/interface";

export interface MasonryProps {
  cloudinary_photo: string;
  cloudinary_video: string;
  width: number;
  height: number;
  id: string;
  creator: {
    nickname: string;
  };
};

export function Masonry({ posts, navigate }: { posts: PostProps[], navigate(name: string): void }) {
  const [storage] = useStorage('@preview-videos', true);
  const size = useWindowSize();

  const dimension = size.width <= 600 ? 2 : 6;

  return Array.from({ length: dimension }).map((_, index) => (
    <Column key={index}>
      {posts.map((row, i) => i % dimension === index &&
        <PostVideo show={storage} key={i} post={row} size={size} navigate={navigate} />
      )}
    </Column>
  ))
}