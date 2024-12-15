import { Suspense } from "react";

import type { Metadata } from "next";

import { api } from "@services";

import App from "./app";

export const metadata: Metadata = {
  title: 'sanctuary | creators',
  description: 'sanctuary.com'
};

export default async function Posts() {
  const creators = await api.creator.list();

  return (
    <Suspense fallback={<>Loading...</>}>
      <App creators={creators} />
    </Suspense>
  );
}
