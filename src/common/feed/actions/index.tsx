import { useState, useTransition } from "react";

import { Heart, HeartBold } from "@svg";
import { PostProps } from "@global/interface";

import { Container, Loading } from "./styles";

type Props = {
  post: PostProps;
};

type Like = {
  post_id: string;
  liked: boolean;
  count: number;
};

const loading_css = (
  <Loading>
    <div className="lds-dual-ring"></div>
  </Loading>
);

export default function Like({ post }: Props) {
  const [like] = useState([] as Like[]);

  const [isPending, startTransition] = useTransition();

  const findRecentlyLike = like.find(el => el.post_id === post.id);

  const handleClick = () => {
    startTransition(async () => {
      // const res = await api.post.like(`?post_id=${post.id}`);

      // setLike(prev => [
      //   ...prev, {
      //     post_id: post.id,
      //     liked: res,
      //     count: res ? post._count.likes + 1 : post._count.likes - 1
      //   }
      // ]);
    });
  };

  const styles = {
    transition: '0.5s'
  };

  return (
    <Container style={styles} onClick={handleClick} disabled={isPending}>
      {isPending && loading_css}

      {!isPending && (findRecentlyLike ? findRecentlyLike.liked : post.like) && (
        <HeartBold width={20} height={20} strokeWidth={2} />
      )}

      {!isPending && (findRecentlyLike ? !findRecentlyLike?.liked : !post.like) && (
        <Heart width={20} height={20} strokeWidth={2} />
      )}

      <p>{findRecentlyLike?.count ?? post._count.likes}</p>
    </Container>
  )
};