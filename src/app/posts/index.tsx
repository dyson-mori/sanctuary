"use client";

import React from 'react';

import Masonry from '@common/masonry';

import { PostProps } from '@global/interface';

import { Container } from './styles';

interface Props {
  posts: PostProps[];
};

export default function Post({ posts }: Props) {
  return (
    <Container>
      <Masonry posts={posts} />
    </Container>
  );
};

