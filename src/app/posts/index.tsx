"use client";

import React from 'react';

import { useRouter } from 'next/navigation';

import { Header, Masonry } from '@common';

import { PostProps, UserProps } from '@global/interface';

import { Container } from './styles';

interface Props {
  posts: PostProps[];
  users: UserProps[];
  user: UserProps;
};

export default function Post({ posts, users, user }: Props) {
  const route = useRouter();

  const navigate = () => {
    return route.push(`/s`);
  };

  return (
    <>
      <Header users={users} user={user} />
      <Container>
        <Masonry posts={posts} />
      </Container>
    </>
  );
};

