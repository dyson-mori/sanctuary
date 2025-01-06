import { Suspense } from "react";
import type { Metadata } from "next";

import { api } from "@services";

import App from './app';

export const metadata: Metadata = {
  title: 'sanctuary | donate',
  description: 'sanctuary.com'
};

export default async function Posts() {
  const user = await api.auth.find();
  return (
    <Suspense fallback={<>Loading...</>}>
      <App user={user} />
    </Suspense>
  );
}
