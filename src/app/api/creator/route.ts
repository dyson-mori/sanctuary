import { NextRequest, NextResponse } from "next/server";

import { Creator } from "@prisma/client";

import { prisma } from "@services";

export async function GET() {
  const data = await prisma.creator.findMany({
  // where: {
  //   name: creator ?? undefined
  // },
    include: {
      // _count: {
      //   select: {
      //     post: true
      //   }
      // },
      post: {
        select: {
          categories: true
        }
      }
    }
  });

  // const row = {
  //   ...data,
  //   post: undefined,
  //   tags: [...new Set(data?.post.map(row => row.categories.map(item => item.name)).flat())]
  // };

  return NextResponse.json(data, { status: 201, statusText: 'done' })
};

export async function POST(request: NextRequest) {
  const { name, photo, description, social_media, width, height, url_pre_video } = await request.json() as Creator;

  const post = await prisma.creator.create({
    data: {
      name,
      photo,
      description,
      height,
      width,
      url_pre_video,
      social_media: social_media.toString(),
    }
  });

  if (!post) {
    return NextResponse.json(false, { status: 401, statusText: 'this post cannot create' })
  };

  return NextResponse.json(true, { status: 201, statusText: 'created' })
};

export async function PUT(request: NextRequest) {
  const url = new URL(request.url);
  const creator_id = url.searchParams.get("creator_id");

  const { name, photo, description, social_media } = await request.json() as Creator;

  const update = await prisma.creator.update({
    where: {
      id: creator_id!
    },
    data: {
      name,
      photo,
      description,
      social_media: social_media.toString(),
    }
  });

  if (!update.id) {
    return NextResponse.json(false, { status: 401, statusText: 'failed when trying to update' })
  };

  return NextResponse.json(true, { status: 201, statusText: 'updated' })
};

export async function DELETE(request: NextRequest) {
  const url = new URL(request.url);
  const id = url.searchParams.get("creator_id") as string;

  const remove = await prisma.creator.delete({
    where: {
      id
    }
  });

  return NextResponse.json(remove, { status: 201, statusText: 'deleted' })
};