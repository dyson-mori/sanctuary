import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

import { PostProps } from "@global/interface";

import { prisma } from "@services";

export async function POST(request: NextRequest) {
  const cookie = await cookies();
  const token = cookie.get('auth-token');

  const {
    title,
    description,
    categories,
    width,
    height,
    pre_image,
    pre_video,
    url_video,
    public_id,
    private: priv
  } = await request.json() as PostProps;

  if (!token) {
    return NextResponse.json(false, { status: 401, statusText: 'token' })
  };

  const verify = await prisma.user.findFirst({
    where: {
      id: token!.value
    }
  });

  if (!verify) {
    return NextResponse.json(false, { status: 401, statusText: 'user not found' })
  };

  const post = await prisma.post.create({
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
        connect: categories.map(({ id }) => ({ id }))
      },
      private: {
        createMany: {
          data: priv.map(({ user }) => ({
            user_id: user.id
          }))
        }
      }
    }
  });

  if (!post.id) {
    return NextResponse.json(false, { status: 401, statusText: 'this post cannot create' })
  };

  return NextResponse.json(true, { status: 201, statusText: 'created' })
};