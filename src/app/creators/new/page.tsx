import React from 'react';

import type { Metadata } from 'next';

import { api } from '@services';

import App from './app';

export const metadata: Metadata = {
  title: 'sanctuary | creator upload',
  description: 'The official Next.js Learn Dashboard built with App Router.',
};

type Props = {
  params: Promise<{ id: string }>
  searchParams: Promise<{ type: string }>
  // searchParams: Promise<{ [key: string]: string | string[] | undefined }>
};

export default async function Upload({ }: Props) {
  const categories = await api.category.list();

  return <App categories={categories} />
};