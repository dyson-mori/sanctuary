import { useRouter } from "next/navigation";

import { useWindowSize } from "@hooks/useWindowSize";
import { PostVideo } from "@common/videos/post";
import { PostProps } from "@global/interface";
import { serverActionCookie } from "@utils";

import { Column } from "./styles";

export default function Masonry({ posts }: { posts: PostProps[] }) {
  const route = useRouter();
  const size = useWindowSize();

  const dimension = size.width <= 600 ? 2 : 6;

  const navigate = (id: string) => {
    serverActionCookie('search', `id=${id}`);
    return route.push('/s');
  };

  return Array.from({ length: dimension }).map((_, index) => (
    <Column key={index}>
      {posts.map((row, i) => i % dimension === index &&
        <PostVideo key={i} post={row} size={size} navigate={navigate} />
      )}
    </Column>
  ))
}