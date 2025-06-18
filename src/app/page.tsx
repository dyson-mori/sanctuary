import { Suspense } from "react";

import type { Metadata } from "next";

import api from "@services/api";

import Screen from './posts';

export const metadata: Metadata = {
  title: 'sanctuary',
  description: 'sanctuary.com'
};

export default async function Page() {
  const { data } = await api.posts.list();

  // console.log({ posts });

  return (
    <Suspense fallback={<p>loading</p>}>
      <Screen posts={data} />
    </Suspense>
  );
};
