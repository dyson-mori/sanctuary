"use client";

import React from 'react';

import { Header, Masonry } from '@common';

import { CreatorProps, PostProps } from '@global/interface';
import { Upload as UploadSvg } from '@svg';

import { Container, Upload } from './styles';

interface Props {
  posts: PostProps[];
  creators: CreatorProps[];
};

export default function Post({ posts, creators }: Props) {
  return (
    <>
      <Header creators={creators} />
      <Container>
        <Masonry posts={posts} />

        <Upload href={{ pathname: '/upload' }}>
          <UploadSvg width={25} height={25} stroke='white' strokeWidth={2} />
        </Upload>
      </Container>
    </>
  );
};

