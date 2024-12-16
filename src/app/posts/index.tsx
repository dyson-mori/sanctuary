"use client";

import React from 'react';

import { useRouter } from 'next/navigation';

import { Header, Masonry } from '@common';

import { CreatorProps, PostProps } from '@global/interface';
import { Upload as UploadSvg } from '@svg';

import { Container, Upload } from './styles';

interface Props {
  posts: PostProps[];
  creators: CreatorProps[];
};

export default function Post({ posts, creators }: Props) {
  const route = useRouter();

  const navigate = (name: string) => {
    return route.push(`/s`);
  };

  return (
    <>
      <Header creators={creators} />
      <Container>
        <Masonry posts={posts} navigate={navigate} />

        <Upload href={{ pathname: '/posts/upload' }}>
          <UploadSvg width={25} height={25} stroke='white' strokeWidth={2} />
        </Upload>
      </Container>
    </>
  );
};

