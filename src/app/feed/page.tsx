import { Suspense } from "react";

import type { Metadata } from "next";
// import dynamic from "next/dynamic";

// import api from "@services/api";

// const DynamicPageWithNoSSR = dynamic(() => import('./app'), {
//   ssr: true
// });

// import Screen from './app';

export const metadata: Metadata = {
  title: 'sanctuary | feed',
  description: 'sanctuary.com'
};

export default async function Feed() {
  // const { data } = await api.feed.list();

  return (
    <Suspense fallback={<>Loading...</>}>
      {/* <Screen post={data} /> */}
    </Suspense>
  );
};
