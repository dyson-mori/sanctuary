import { Suspense } from "react";

import type { Metadata } from "next";

import api from "@services/api";

import Screen from './app';

export const metadata: Metadata = {
  title: 'Upload',
  description: 'sanctuary.com'
};

export default async function Upload() {
  const { data } = await api.category.list();

  return (
    <Suspense fallback={<p>loading</p>}>
      <Screen categories={data} />
    </Suspense>
  );
};
