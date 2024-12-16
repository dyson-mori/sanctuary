import type { Metadata, ResolvingMetadata } from "next";

import { api } from "@services";

import App from './app';

type Props = {
  params: Promise<{ name: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { name } = await params

  const product = await api.creator.find(name);

  // optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images || []

  return {
    title: product.name,
    description: product.description,
    openGraph: {
      images: ['/some-specific-page-image.jpg', ...previousImages],
    },
  }
}

export default async function CreatorName({ params }: Props) {
  const { name } = await params;

  const creator = await api.creator.find(name);
  const posts = await api.posts.list();

  return <App creator={creator} posts={posts} />;
}
