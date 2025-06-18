"use server";

// import { cookies } from "next/headers";

const NEXT_URL = 'http://localhost:3000/api';
// const NEXT_URL = process.env.SANCTUARY_API_URL;

type FetchProps = {
  url: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  cache?: 'default' | 'force-cache' | 'no-cache' | 'no-store' | 'reload' | 'only-if-cached';
  body?: object;
};

const fetcher = async ({ method, url, cache, body }: FetchProps) => {
  // const cookie = await cookies();
  // const token = cookie.get('porcupine-token');
  const isBodyAllowed = method !== 'GET' && method !== 'DELETE';

  try {
    const res = await fetch(`${NEXT_URL}${url}`, {
      method,
      cache,
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        "Authorization": "123-987-456-852"
        // ...(token?.value ? { 'Authorization': token.value } : undefined),
        // ...(token?.value ? { Cookie: cookie.toString() } : undefined)
      },
      ...(isBodyAllowed && body ? { body: JSON.stringify(body) } : {})
    });

    // const data = await res.json().catch(() => ({}));

    if (!res.ok) {
      return {
        status: res.status,
        statsText: res.statusText,
        data: []
      };
    };

    return {
      status: res.status,
      statsText: res.statusText,
      data: await res.json()
    };
  } catch (error) {
    console.log("Erro ao buscar dados:", error);
    return {
      data: []
    };
  }
}

export default fetcher;