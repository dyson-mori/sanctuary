import React from 'react';

import type { Metadata } from 'next';

import { api } from '@services';

export const metadata: Metadata = {
  title: 'sanctuary | feed',
  description: 'The official Next.js Learn Dashboard built with App Router.',
};

import App from './app';

export default async function MainSearch({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const data = await api.search.list(slug);

  return <App posts={data} />
};