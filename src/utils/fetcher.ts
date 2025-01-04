"use server"

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

interface Props {
  url: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  next?: object;
  body?: object;
  param?: string;
  header?: object;
};

export const fetcher = async ({ url, method, next, body, param, header }: Props) => {
  const p = param ? `?postId=${param}` : '';
  const res = await fetch(`${process.env.NEXTBASE_URL}${url}${p}`, {
    method,
    next,
    // cache: 'no-store',
    cache: 'no-cache',
    // @ts-expect-error: ignore header type
    headers: {
      ...header,
      // 'Content-type': 'application/json',
      Cookie: await cookies()
    },
    body: JSON.stringify(body)
  });

  if (!res.ok) {
    return console.log(res.statusText)
  };

  if (method === 'POST' || method === 'PUT' || method === 'DELETE') {
    revalidatePath(url)
  };

  return res.json();
}
