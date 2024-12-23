"use client";

import React from 'react';

import { useRouter } from 'next/navigation';

import { Header, Masonry } from '@common';

import { PostProps, UserProps } from '@global/interface';
import { Upload as UploadSvg } from '@svg';

import { Container, Upload } from './styles';
import { User } from '@prisma/client';

interface Props {
  posts: PostProps[];
  users: UserProps[];
  user: User;
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
        <Masonry posts={posts} navigate={navigate} />

        <Upload href={{ pathname: '/posts/upload' }}>
          <UploadSvg width={25} height={25} stroke='white' strokeWidth={2} />
        </Upload>
      </Container>
    </>
  );
};

