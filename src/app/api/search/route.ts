import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

import { prisma } from "@services";

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const search = url.searchParams.get("id");

  const tags = search?.includes('tags=') ? search!.replace('tags=', '').split(',') : null;

  const cookie = await cookies();
  const token = cookie.get('auth-token');

  const found = await prisma.post.findFirst({
    where: {
      id: search ?? undefined
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
        orderBy: {
          post: {
            _count: 'desc'
          }
        },
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
        id: found?.id ?? undefined,
      },
      categories: {
        some: {
          name: {
            in: found?.categories.slice(0, 3).map(({ name }) => name) ?? tags!.map(name => name)
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
    const find = !!row.private.find(el => el.user_id === token?.value);

    if (row.private.length > 0 && !token?.value) {
      priv = true
    };

    if (find && priv === false) {
      priv = false
    };

    if (!find && row.private.length > 0) {
      priv = true
    };

    if (token?.value === row.user.id) {
      priv = false
    };

    return {
      ...row,
      url_video: priv ? `${'e_blur:800/' + row.url_video}` : row.url_video,
    };
  });

  return NextResponse.json(tags ? post : [found, ...find_to_hide], { status: 201, statusText: 'success' });
};
