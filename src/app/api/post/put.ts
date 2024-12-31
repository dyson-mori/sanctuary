import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

import { PostProps } from "@global/interface";
import { prisma } from "@services";

export async function PUT(request: NextRequest) {
  const url = new URL(request.url);
  const post_id = url.searchParams.get("postId");

  const cookie = await cookies();
  const token = cookie.get('auth-token');

  const { title, description, categories, pre_image, pre_video, url_video, width, height, public_id, private: priv } = await request.json() as PostProps;

  const verify = await prisma.post.findFirst({
    where: {
      id: post_id!,
    },
    select: {
      categories: true,
      private: true
    }
  });

  const update = await prisma.post.update({
    where: {
      id: post_id!
    },
    include: {
      private: true,
      categories: true
    },
    data: {
      title,
      description,
      user_id: token!.value,
      pre_image,
      pre_video,
      url_video,
      width,
      height,
      public_id,

      categories: {
        // deleteMany: {
        //   OR: verify?.categories.map(({ id }) => ({ id }))
        // },
        set: categories.map(({ id }) => ({
          id
        }))
      },

      private: {
        deleteMany: {
          OR: verify?.private.map(({ id }) => ({ id }))
        },
        createMany: {
          data: priv.map(({ user }) => ({
            user_id: user.id
          }))
        }
      }
    }
  });

  // if (!update.id) {
  //   return NextResponse.json(false, { status: 401, statusText: 'this post cannot updated' })
  // };

  return NextResponse.json(update, { status: 201, statusText: 'updated' })
};