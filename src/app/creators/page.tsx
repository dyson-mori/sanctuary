import { Suspense } from "react";

import type { Metadata } from "next";

import App from "./app";

export const metadata: Metadata = {
  title: 'sanctuary | creators',
  description: 'sanctuary.com'
};

export default async function Posts() {

  return (
    <Suspense fallback={<>Loading...</>}>
      <App creators={[]} />
    </Suspense>
  );
}
