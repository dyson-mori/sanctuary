import { Suspense } from "react";

import type { Metadata } from "next";
// import dynamic from "next/dynamic";

import api from "@services/api";

import Screen from './app';

export const metadata: Metadata = {
  title: 'sanctuary | feed',
  description: 'sanctuary.com'
};

type Props = {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}

export default async function Feed(props: Props) {
  const params = await props.searchParams;
  const verify = params.id ? `/feed?id=${params.id}` : `/feed?tags=${params.tags}`;

  const { data } = await api.feed.list(verify);

  return (
    <Suspense fallback={<>Loading...</>}>
      <Screen post={data} />
    </Suspense>
  );
};
