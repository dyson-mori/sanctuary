import { NextResponse } from "next/server";
import { cookies } from "next/headers";

import { PostProps } from "@global/interface";
import prisma from "@services/prisma";

export async function GET() {
  const coo = await cookies();
  const value = coo.get('search')?.value as string;

  let find: PostProps | null = null;

  if (value.slice(0, 3).startsWith('id=')) {
    const found = await prisma.post.findFirst({
      where: {
        id: value.slice(0, 3).endsWith('id=') ? value.slice(3, value.length) : undefined
      },
      include: {
        participant: {
          select: {
            id: true,
            name: true,
            photo: true,
            public: true
          }
        },
        categories: {
          select: {
            name: true
          }
        },
      }
    });

    find = found;
  };

  const post = await prisma.post.findMany({
    orderBy: {
      createdAt: 'desc',
    },
    where: {
      NOT: {
        id: find?.id ?? undefined
      },
      categories: {
        some: {
          name: {
            in: find?.categories.slice(0, 3).map(({ name }) => name) ?? value.slice(5, value.length).split(",").map(item => item.trim())
          }
        }
      }
    },
    include: {
      participant: {
        select: {
          id: true,
          name: true,
          photo: true,
          public: true
        }
      },
      categories: {
        select: {
          name: true
        }
      },
    }
  })

  return NextResponse.json(find ? [find, ...post] : post, { status: 201, statusText: 'success' });
};
