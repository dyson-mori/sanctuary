import React from 'react';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'sanctuary | upload',
  description: 'The official Next.js Learn Dashboard built with App Router.',
};

import App from './app';
import { api } from '@services/api';

export default async function Upload() {
  const creators = await api.creator.list();
  const categories = await api.category.list();

  return <App creators={creators} categories={categories} />
};