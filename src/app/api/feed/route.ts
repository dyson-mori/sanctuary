import { NextRequest, NextResponse } from "next/server";

import prisma from "@services/prisma";

export async function GET(request: NextRequest) {
  const header = await request.headers.get('authorization');

  const videos = await prisma.video.findMany({
    where: {
      isPrivate: header === "123-987-456-852" ? undefined : false
    }
  });

  return NextResponse.json(videos, { status: 200, statusText: "feed received succesfully" });
};
