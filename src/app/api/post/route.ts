import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

import { prisma } from "@services";

export async function GET() {
  const cookie = await cookies();
  const token = cookie.get('auth-token');

  const post = await prisma.post.findMany({
    orderBy: {
      createdAt: 'desc',
    },
    select: {
      id: true,
      title: true,
      width: true,
      height: true,
      pre_video: true,
      user: {
        select: {
          id: true,
          nickname: true
        }
      },
      private: true
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
      pre_video: priv ? `${'e_blur:800/' + row.pre_video}` : row.pre_video,
    }
  })

  return NextResponse.json(find_to_hide, { status: 201, statusText: 'done' });
};

export * from './post';
export * from './put';

export async function DELETE(request: NextRequest) {
  const url = new URL(request.url);
  const post_id = url.searchParams.get("post_id");

  const admin = await prisma.post.delete({
    where: {
      id: post_id!
    }
  });

  // delete file here

  if (!admin.id) {
    return NextResponse.json(false, { status: 401, statusText: 'this post cannot deleted' })
  }

  return NextResponse.json(true, { status: 201, statusText: 'deleted' })
};
