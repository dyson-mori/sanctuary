import React from 'react';

import type { Metadata } from 'next';

import { api } from '@services';

import App from './app';

export const metadata: Metadata = {
  title: 'sanctuary | feed',
  description: 'The official Next.js Learn Dashboard built with App Router.',
};

interface Props {
  params: Promise<{
    slug: string
  }>
};

export default async function Slug({ params }: Props) {
  const { slug } = await params;

  const data = await api.search.list(slug);

  return <App posts={data} />
};