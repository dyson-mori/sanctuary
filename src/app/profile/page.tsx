import { Suspense } from "react";

import type { Metadata } from "next";

import { api } from "@services";

import App from './app'

export const metadata: Metadata = {
  title: 'sanctuary | profile',
  description: 'sanctuary.com'
};

export default async function ProfilePage() {
  const user = await api.auth.find();
  const category = await api.category.list();

  return (
    <Suspense fallback={<>Loading...</>}>
      <App user={user} category={category} />
    </Suspense>
  );
}
