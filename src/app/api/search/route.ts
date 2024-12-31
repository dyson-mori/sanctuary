import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

import { prisma } from "@services";

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const post_id = url.searchParams.get("id");

  const cookie = await cookies();
  const token = cookie.get('auth-token');

  const found = await prisma.post.findFirst({
    where: {
      id: post_id ?? undefined
    },
    include: {
      user: {
        select: {
          id: true,
          nickname: true
        }
      },
      private: {
        select: {
          user_id: true
        }
      },
      categories: {
        select: {
          name: true
        }
      },
    }
  });

  const post = await prisma.post.findMany({
    orderBy: {
      createdAt: 'desc',
    },
    where: {
      NOT: {
        id: found?.id,
      },
      categories: {
        some: {
          name: {
            in: found?.categories.slice(0, 3).map(({ name }) => name)
          }
        }
      }
    },
    include: {
      user: {
        select: {
          id: true,
          nickname: true
        }
      },
      private: {
        select: {
          user_id: true
        }
      },
      categories: {
        select: {
          name: true
        }
      },
    }
  });

  const find_to_hide = post.map(row => {
    let priv = false;
    const find = row.private.find(el => el.user_id === token?.value);

    priv = !find?.user_id

    if (token?.value === row.user.id) {
      priv = false
    };

    return {
      ...row,
      url_video: priv ? `${'e_blur:800/' + row.url_video}` : row.url_video,
    }
  })

  return NextResponse.json([found, ...find_to_hide], { status: 201, statusText: 'success' });
};
