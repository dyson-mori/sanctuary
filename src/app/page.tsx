import { Suspense } from "react";

import type { Metadata } from "next";
import dynamic from "next/dynamic";

import { api } from "@services";

const DynamicPageWithNoSSR = dynamic(() => import('./maps'), {
  ssr: true
});

export const metadata: Metadata = {
  title: 'sanctuary',
  description: 'sanctuary.com'
};

export default async function Posts() {
  // const post = await api.post.list();
  const user = await api.auth.find();

  return (
    <Suspense fallback={<>Loading...</>}>
      <DynamicPageWithNoSSR user={user} />
      {/* <DynamicPageWithNoSSR posts={post} user={user} /> */}
    </Suspense>
  );
}
