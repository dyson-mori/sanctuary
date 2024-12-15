"use client";

import React from 'react';

import { Header, Masonry } from '@common';

import { CreatorProps } from '@global/interface';
import { User } from '@svg';

import { Container, Upload } from './styles';

interface Props {
  creators: CreatorProps[];
};

export default function Post({ creators }: Props) {
  return (
    <>
      <Header creators={creators} />
      <Container>
        <Masonry posts={creators} />

        <Upload href='/creators/new'>
          <User width={25} height={25} stroke='white' strokeWidth={2} />
        </Upload>
      </Container>
    </>
  );
};

