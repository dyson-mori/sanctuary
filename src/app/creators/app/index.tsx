"use client";

import React from 'react';
import { useRouter } from 'next/navigation';

import { Header, Masonry } from '@common';

import { CreatorProps } from '@global/interface';
import { Container } from './styles';

interface Props {
  creators: CreatorProps[];
};

export default function Post({ creators }: Props) {
  const route = useRouter();

  const navigate = (name: string) => {
    return route.push(`/creators/${name}`);
  };

  return (
    <>
      <Header creators={creators} />
      <Container>
        {/* @ts-expect-error: ksoa */}
        <Masonry posts={creators} navigate={navigate} />

      </Container>
    </>
  );
};

