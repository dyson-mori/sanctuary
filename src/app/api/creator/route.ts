import { NextRequest, NextResponse } from "next/server";

import { Creator } from "@prisma/client";

import { cloudinary, prisma } from "@services";
import { cookies } from "next/headers";

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const creator = url.searchParams.get("name");

  if (!!creator) {
    const data = await prisma.creator.findFirst({
      where: {
        nickname: creator ?? undefined
      },
      include: {
        post: {
          include: {
            categories: true,
            creator: true
          }
        }
      }
    });

    const row = {
      ...data,
      // post: undefined,
      tags: [...new Set(data?.post.map(row => row.categories.map(item => item.name)).flat())]
    };

    return NextResponse.json(row, { status: 201, statusText: 'done' })
  };

  const data = await prisma.creator.findMany({
    where: {
      public: true
    },
    orderBy: {
      createdAt: 'desc'
    },
    include: {
      // _count: {
      //   select: {
      //     post: true
      //   }
      // },
      _count: {
        select: {
          post: true
        }
      },
      post: {
        select: {
          categories: true
        }
      }
    }
  });

  return NextResponse.json(data, { status: 201, statusText: 'done' })
};

export async function POST(request: NextRequest) {
  const { nickname, description, social_media, cloudinary_photo, cloudinary_video } = await request.json() as Creator;

  const cookie = await cookies();

  const post = await prisma.creator.create({
    data: {
      user_id: cookie.get('auth-token')!.value,
      nickname,
      description,
      social_media: social_media.toString(),
      cloudinary_photo,
      cloudinary_video,
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

  const { nickname, cloudinary_photo, cloudinary_video, description, social_media } = await request.json() as Creator;

  const update = await prisma.creator.update({
    where: {
      id: creator_id!
    },
    data: {
      nickname,
      cloudinary_photo,
      cloudinary_video,
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

  if (!remove!.id) {
    return NextResponse.json(false, { status: 401, statusText: 'failed when trying to delete' })
  };

  const cloudinary_photo = JSON.parse(remove.cloudinary_photo);
  const cloudinary_video = JSON.parse(remove.cloudinary_video);

  const vid = await cloudinary.destroy(cloudinary_photo.public_id, "video");
  const img = await cloudinary.destroy(cloudinary_video.public_id, 'image');

  return NextResponse.json({ img: img.result, vid: vid.result }, { status: 201, statusText: 'deleted' })
};