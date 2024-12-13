"use client";

import React from 'react';

import Masonry from '@common/masonry';

import { PostProps } from '@global/interface';
import { Upload as UploadSvg } from '@svg';

import { Container, Upload } from './styles';

interface Props {
  posts: PostProps[];
};

export default function Post({ posts }: Props) {
  return (
    <Container>
      <Masonry posts={posts} />

      <Upload>
        <UploadSvg width={25} height={25} stroke='white' strokeWidth={2} />
      </Upload>
    </Container>
  );
};

