import { useWindowSize } from "@hooks";

import { PostProps } from "@global/interface";

import { PostVideo } from "./video";

import { Column } from "./styles";

interface MasonryProps {
  posts: PostProps[];
  onClick?: (data: PostProps) => void;
};

const dimension = [
  {
    max_width: 500,
    colunm: 2,
    size: 2.1
  },
  {
    max_width: 600,
    colunm: 3,
    size: 3.1
  },
  {
    max_width: 800,
    colunm: 4,
    size: 4.1
  },
  {
    max_width: 1000,
    colunm: 5,
    size: 5.1
  },
  {
    max_width: 10000,
    colunm: 6,
    size: 6.1
  }
];

export function Masonry({ posts, onClick }: MasonryProps) {
  const size = useWindowSize();

  const colunm = dimension.find(el => size.width <= el.max_width)!;

  return Array.from({ length: colunm!.colunm }).map((_, index) => (
    <Column key={index}>
      {posts.map((row, i) => i % colunm!.colunm === index &&
        <PostVideo key={i} post={row} size={size} enabled={!!onClick} onClick={onClick} dimension={colunm} />
      )}
    </Column>
  ))
}