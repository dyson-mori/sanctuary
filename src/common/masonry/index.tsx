import { useWindowSize } from "@hooks";

import { PostProps } from "@global/interface";

import { PostVideo } from "./video";

import { Column } from "./styles";

interface MasonryProps {
  posts: PostProps[];
  onClick?: (data: PostProps) => void;
};

export function Masonry({ posts, onClick }: MasonryProps) {
  const size = useWindowSize();

  const dimension = size.width <= 600 ? 2 : 6;

  return Array.from({ length: dimension }).map((_, index) => (
    <Column key={index}>
      {posts.map((row, i) => i % dimension === index &&
        <PostVideo key={i} post={row} size={size} enabled={!!onClick} onClick={onClick} />
      )}
    </Column>
  ))
}