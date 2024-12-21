import React from 'react';

import type { Metadata } from 'next';

import App from './app';

export const metadata: Metadata = {
  title: 'sanctuary | authentication',
  description: 'The official Next.js Learn Dashboard built with App Router.',
};

export default async function AuthenticationPage() {
  return <App />
};