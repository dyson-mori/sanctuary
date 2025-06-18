import { Suspense } from "react";

import type { Metadata } from "next";

import api from "@services/api";

import App from './app';

export const metadata: Metadata = {
  title: 'sanctuary | Category'
};

export default async function Category() {
  const { data } = await api.category.list();

  return (
    <Suspense fallback={<>Loading...</>}>
      <App data={data} />
    </Suspense>
  );
};