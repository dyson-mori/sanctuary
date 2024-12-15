import React from 'react';

import type { Metadata } from 'next';

import { api } from '@services';

export const metadata: Metadata = {
  title: 'sanctuary | feed',
  description: 'The official Next.js Learn Dashboard built with App Router.',
};

import Search from './app';

export default async function MainSearch() {
  const data = await api.search.list();

  return <Search posts={data} />
};