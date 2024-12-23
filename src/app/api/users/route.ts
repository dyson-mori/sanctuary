import { NextRequest, NextResponse } from "next/server";
import { User } from "@prisma/client";

import { prisma } from "@services";

export async function GET() {
  const user = await prisma.user.findMany({
    include: {
      _count: {
        select: {
          post: true
        }
      }
    }
  });

  if (!user) {
    return NextResponse.json(false, { status: 401, statusText: 'failed when trying to find' })
  };

  return NextResponse.json(user, { status: 201, statusText: 'created' })
};

export async function POST(request: NextRequest) {
  const body = await request.json() as User;

  const data = await prisma.user.findFirst({
    where: {
      nickname: body.nickname,
      password: body.password
    }
  });

  if (!data?.id) {
    return NextResponse.json(false, { status: 401, statusText: 'failed when trying to find' })
  };

  return NextResponse.json(data.id, { status: 201, statusText: 'done' })
};
