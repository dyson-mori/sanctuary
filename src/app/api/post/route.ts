import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { CreatorProps } from "@global/interface";


import prisma from "@services/prisma";
import { Post } from "@prisma/client";

interface PostsProps extends Post {
  categories: string[];
  creator: CreatorProps
};

export async function GET() {
  const cookie = await cookies();
  const session_id = cookie.get('session_id');

  // if (!session_id) {
  //   return NextResponse.json(false, { status: 404, statusText: 'session not found!' });
  // };

  const post = await prisma.post.findMany({
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      participant: {
        select: {
          name: true,
        }
      },
      categories: {
        select: {
          name: true
        }
      },
    }
  });

  return NextResponse.json(post, { status: 201, statusText: 'done' });
};

export async function POST(request: NextRequest) {
  const { width, height, url_pre_image, url_pre_video, url_video, creator_id, categories } = await request.json() as PostsProps;

  const post = await prisma.post.create({
    data: {
      width,
      height,
      url_pre_image,
      url_pre_video,
      url_video,
      creator_id,
      categories: {
        connect: categories.map(id => ({ id }))
      }
    }
  });

  if (!post.id) {
    return NextResponse.json(false, { status: 401, statusText: 'this post cannot create' })
  }

  return NextResponse.json(true, { status: 201, statusText: 'created' })
};

export async function PUT(request: NextRequest) {
  const url = new URL(request.url);
  const post_id = url.searchParams.get("postId");

  const { width, height, url_pre_image, url_pre_video, url_video, creator_id, categories } = await request.json() as PostsProps;

  const update = await prisma.post.update({
    where: {
      id: post_id!
    },
    data: {
      width,
      height,
      url_pre_image,
      url_pre_video,
      url_video,
      creator_id,
      categories: {
        connect: categories.map(id => ({ id }))
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

  if (!admin.id) {
    return NextResponse.json(false, { status: 401, statusText: 'this post cannot deleted' })
  }

  return NextResponse.json(true, { status: 201, statusText: 'deleted' })
};
