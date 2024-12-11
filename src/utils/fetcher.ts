"use server"

import { cookies } from "next/headers";

interface Props {
  url: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  next?: object;
  body?: object;
};

export const fetcher = async ({ url, method, next, body }: Props) => {
  const res = await fetch(`${process.env.NEXTBASE_URL}${url}`, {
    method,
    next,
    // cache: 'no-store',
    cache: 'no-cache',
    // @ts-expect-error: ignore header type
    headers: {
      Cookie: await cookies()
    },
    body: JSON.stringify(body)
  });

  if (!res.ok) {
    return console.log(res.statusText)
  };

  return res.json();
}
