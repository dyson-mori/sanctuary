"use server";

import { cookies } from "next/headers";

export const serverActionCookie = async (name: 'search' | 'auth-token', value: string) => {
  const coo = await cookies();

  if (value === 'clean') {
    return await coo.delete({
      name,
      // httpOnly: true,
      // path: '/s'
    });
  };

  await coo.set({
    name,
    value,
    // httpOnly: true,
    // path: '/s'
  });
};