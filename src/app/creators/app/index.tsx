"use client";

import React from 'react';
import { useRouter } from 'next/navigation';

import { Masonry } from '@common';

import { Container } from './styles';

export default function Post({ creators }) {
  const route = useRouter();

  const navigate = (name: string) => {
    return route.push(`/creators/${name}`);
  };

  return (
    <>
      <Container>
        <Masonry posts={creators} navigate={navigate} />
      </Container>
    </>
  );
};

