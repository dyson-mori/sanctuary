import { useStorage, useWindowSize } from "@hooks";

import { PostProps } from "@global/interface";

import { PostVideo } from "./_components/video";

import { Column } from "./styles";

export interface MasonryTProps {
  cloudinary_photo: string;
  cloudinary_video: string;
  width: number;
  height: number;
  id: string;
};

interface MasonryProps {
  posts: PostProps[];
  onClick?: (data: PostProps) => void;
};

export function Masonry({ posts, onClick }: MasonryProps) {
  const [storage] = useStorage('@preview-videos', true);
  const size = useWindowSize();

  const dimension = size.width <= 600 ? 2 : 6;

  return Array.from({ length: dimension }).map((_, index) => (
    <Column key={index}>
      {posts.map((row, i) => i % dimension === index &&
        <PostVideo show={storage} key={i} post={row} size={size} enabled={!!onClick} onClick={onClick} />
      )}
    </Column>
  ))
}