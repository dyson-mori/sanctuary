import { useRouter } from "next/navigation";

import { useWindowSize } from "@hooks";
import { serverActionCookie } from "@utils";

import { PostVideo } from "./_components/video";

import { Column } from "./styles";

export interface MasonryProps {
  url_pre_video: string;
  width: number;
  height: number;
  id: string;
  creator: {
    name: string;
  };
};

export function Masonry({ posts, navigate }: { posts: MasonryProps[], navigate(name: string): void }) {
  const size = useWindowSize();

  const dimension = size.width <= 600 ? 2 : 6;

  // const navigate = (id: string) => {
  //   serverActionCookie('search', `id=${id}`);
  //   return route.push('/s');
  // };

  return Array.from({ length: dimension }).map((_, index) => (
    <Column key={index}>
      {posts.map((row, i) => i % dimension === index &&
        <PostVideo key={i} post={row} size={size} navigate={navigate} />
      )}
    </Column>
  ))
}