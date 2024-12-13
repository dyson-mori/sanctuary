import { Suspense } from "react";

import type { Metadata } from "next";
import dynamic from "next/dynamic";

import { api } from "@services/api";
// import { Header } from "@common/";

const DynamicPageWithNoSSR = dynamic(() => import('./posts'), {
  ssr: true
});

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Sanctuary',
    description: 'images hub'
  }
}

export default async function Posts() {
  const post = await api.posts.list();

  return (
    <Suspense fallback={<>Loading...</>}>
      <DynamicPageWithNoSSR posts={post} />
    </Suspense>
  );
}
