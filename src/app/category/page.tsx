import { Suspense } from "react";

import type { Metadata } from "next";
import dynamic from "next/dynamic";

import { api } from "@services/api";

const DynamicPageWithNoSSR = dynamic(() => import('./main'), {
  ssr: true
});

export const metadata: Metadata = {
  title: 'Fans | Category'
};

export default async function Category() {
  const category = await api.category.list();

  return (
    <Suspense fallback={<>Loading...</>}>
      <DynamicPageWithNoSSR categories={category} />
    </Suspense>
  );
};