"use client";

import { CSSProperties, useState } from "react";

import { PostProps } from "@global/interface";

import { Feed } from "@common";

import { Container, Section } from "./styles";

type Props = {
  post: PostProps[];
};

export default function FeedApp({ post }: Props) {
  const [isChatCommentOpen, setIsChatCommentOpen] = useState(false);
  const [data, setData] = useState<PostProps | null>(null);

  const style: CSSProperties = {
    width: isChatCommentOpen ? 'calc(100% / 1.6)' : '100%'
  };

  return (
    <Container>
      {post.map((el, i) => (
        <Section style={style} key={i}>
          <Feed.Video post={el} setTargetPost={setData} />
        </Section>
      ))}

      {/* <Feed.Like post={data ? data : post[0]} /> */}
      <Feed.Comment post={data ? data : post[0]} handleOpenChatMessage={setIsChatCommentOpen} />

    </Container>
  )
};
