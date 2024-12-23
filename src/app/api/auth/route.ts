import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { User } from "@prisma/client";

import { prisma } from "@services";

export async function GET() {
  const cookie = await cookies();
  const userToken = cookie.get('auth-token');

  const user = await prisma.user.findFirst({
    where: {
      id: userToken?.value ?? undefined
    },
    select: {
      post: true,
      photo: true,
      nickname: true
    }
  });

  if (!user || !userToken) {
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
