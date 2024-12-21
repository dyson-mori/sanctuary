import { NextRequest, NextResponse } from "next/server";

import { Creator } from "@prisma/client";

import { cloudinary, prisma } from "@services";

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const creator = url.searchParams.get("name");

  if (!!creator) {
    const data = await prisma.creator.findFirst({
      where: {
        name: creator ?? undefined
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
  const { name, photo, description, social_media, width, height, url_pre_video, public_id } = await request.json() as Creator;

  const post = await prisma.creator.create({
    data: {
      name,
      photo,
      description,
      height,
      width,
      url_pre_video,
      social_media: social_media.toString(),
      public_id
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

  if (!remove!.id) {
    return NextResponse.json(false, { status: 401, statusText: 'failed when trying to delete' })
  };

  const publics_id = JSON.parse(remove!.public_id);

  const vid = await cloudinary.destroy(publics_id.public_video_id, "video");
  const img = await cloudinary.destroy(publics_id.public_image_id, 'image');

  return NextResponse.json({ img: img.result, vid: vid.result }, { status: 201, statusText: 'deleted' })
};