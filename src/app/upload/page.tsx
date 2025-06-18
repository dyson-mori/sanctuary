import { Suspense } from "react";

import type { Metadata } from "next";

import Screen from './app';

export const metadata: Metadata = {
  title: 'Upload',
  description: 'sanctuary.com'
};

export default async function Upload() {
  return (
    <Suspense fallback={<p>loading</p>}>
      <Screen />
    </Suspense>
  );
};
