"use server";

import { cookies } from "next/headers";

export const serverActionCookie = async (name: 'search', value: string) => {
  const coo = await cookies();

  if (value === 'clean') {
    return await coo.delete({
      name,
      httpOnly: true,
      path: '/search'
    });
  };

  await coo.set({
    name,
    value,
    httpOnly: true,
    path: '/search'
  });
};