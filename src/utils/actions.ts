"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

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

export const custom_revalidate = async (path: string) => {
  await revalidatePath(path)
};