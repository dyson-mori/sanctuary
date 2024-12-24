import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

import { Hide, Post } from "@prisma/client";

import { prisma } from "@services";

interface PostsProps extends Post {
  hide: Hide[];
  categories: {
    id: string;
  }[];
};

export async function GET() {
  const cookie = await cookies();
  const token = cookie.get('auth-token');

  // if (!session_id) {
  //   return NextResponse.json(false, { status: 404, statusText: 'session not found!' });
  // };

  // const verify_token = await prisma.user.findFirst({
  //   where: {
  //     id: token?.value ?? undefined
  //   }
  // });

  const post = await prisma.post.findMany({
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      hide: true,
      user: {
        select: {
          nickname: true,
        }
      },
      categories: {
        select: {
          name: true
        }
      },
    }
  });

  const find_to_hide = post.map((row) => {
    const block = token?.value === row.user_id ? false : !!row.hide.find(el => el.user_id !== token?.value);

    return {
      ...row,
      url_video: block ? 'e_blur:800/' + row.url_video : row.url_video,
      pre_video: block ? 'e_blur:800/' + row.pre_video : row.pre_video,
      hide: block
    }
  })

  return NextResponse.json(find_to_hide, { status: 201, statusText: 'done' });
};

export async function POST(request: NextRequest) {
  const cookie = await cookies();
  const token = cookie.get('auth-token');

  const { title, description, categories, pre_image, pre_video, url_video, width, height, public_id, hide } = await request.json() as PostsProps;

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
      hide: {
        createMany: {
          data: hide.map(({ id }) => ({
            user_id: id
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

export async function PUT(request: NextRequest) {
  const url = new URL(request.url);
  const post_id = url.searchParams.get("postId");

  const { categories } = await request.json() as PostsProps;

  const update = await prisma.post.update({
    where: {
      id: post_id!
    },
    data: {
      categories: {
        connect: categories.map(({ id }) => ({ id }))
      }
    }
  });

  if (!update.id) {
    return NextResponse.json(false, { status: 401, statusText: 'this post cannot updated' })
  }

  return NextResponse.json(true, { status: 201, statusText: 'updated' })
};

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
