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

  const navigate = (data: PostProps) => {
    return route.push(`/${data.id}`);
  };

  return (
    <>
      <Header user={user} />
      <Container>
        <Masonry posts={posts ?? []} onClick={navigate} />
      </Container>
    </>
  );
};

