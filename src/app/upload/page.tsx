import React from 'react';

import type { Metadata, ResolvingMetadata } from 'next';

import { api } from '@services';

import App from './app';

export const metadata: Metadata = {
  title: 'sanctuary | upload',
  description: 'The official Next.js Learn Dashboard built with App Router.',
};

type Props = {
  params: Promise<{ id: string }>
  searchParams: Promise<{ type: string }>
  // searchParams: Promise<{ [key: string]: string | string[] | undefined }>
};

// export async function generateMetadata(
//   { params, searchParams }: Props,
//   parent: ResolvingMetadata
// ): Promise<Metadata> {
//   // read route params
//   const id = (await params).id

//   // fetch data
//   const product = await fetch(`https://.../${id}`).then((res) => res.json())

//   // optionally access and extend (rather than replace) parent metadata
//   const previousImages = (await parent).openGraph?.images || []

//   return {
//     title: product.title,
//     openGraph: {
//       images: ['/some-specific-page-image.jpg', ...previousImages],
//     },
//   }
// }

export default async function Upload({ searchParams }: Props) {
  const { type } = await searchParams;

  const creators = await api.creator.list();
  const categories = await api.category.list();

  return <App creators={creators} categories={categories} />
};