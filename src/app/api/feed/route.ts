import { NextRequest, NextResponse } from "next/server";
import prisma from "@services/prisma";

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const id = url.searchParams.get("id");
  const rawTags = url.searchParams.get("tags");
  const tags = rawTags ? rawTags.split(",") : null;

  const findById = id
    ? await prisma.video.findFirst({
      where: {
        id,
        isPrivate: false
      },
      include: {
        categories: {
          orderBy: {
            video: { _count: "desc" },
          },
          select: { title: true },
        },
      },
    })
    : null;

  const filterTags = tags ?? findById?.categories.slice(0, 3).map(c => c.title);

  const relatedVideos = await prisma.video.findMany({
    where: {
      isPrivate: false,
      NOT: {
        id: findById?.id,
      },
      categories: {
        some: {
          title: { in: filterTags },
        },
      },
    },
    orderBy: { createdAt: "desc" },
    include: {
      categories: { select: { title: true } },
    },
  });

  const result = tags ? relatedVideos : [findById, ...relatedVideos].filter(Boolean);

  return NextResponse.json(result, {
    status: 200,
    statusText: "success",
  });
}
