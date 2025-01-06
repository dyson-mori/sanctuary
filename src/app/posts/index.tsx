"use client";

import React from 'react';

import { useRouter } from 'next/navigation';

import { Header, Masonry } from '@common';

import { PostProps, UserProps } from '@global/interface';

import { Container } from './styles';

interface Props {
  posts: PostProps[];
  user: UserProps;
};

export default function Post({ posts, user }: Props) {
  const route = useRouter();
  // const [post, setPost] = useState<PostProps | undefined>(undefined);

  const navigate = (data: PostProps) => {
    // if (data.private.length > 0) {
    //   return setPost(data)
    // };
    return route.push(`/${data.id}`);
  };

  return (
    <>
      <Header user={user} />

      <Container>
        <Masonry posts={posts} onClick={navigate} />
      </Container>

      {/* <Modal open={!!post?.id} onClickOutside={() => setPost(undefined)}>
        skao
      </Modal> */}
    </>
  );
};

