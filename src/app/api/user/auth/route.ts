import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

import bcrypt from 'bcrypt';

import { User } from "@prisma/client";

import { prisma } from "@services";

export async function GET() {
  const cookie = await cookies();
  const userToken = cookie.get('auth-token');

  if (!userToken) {
    return NextResponse.json(false, { status: 401, statusText: 'no tokens found, you need to be logged in to access.' })
  };

  const user = await prisma.user.findFirst({
    where: {
      id: userToken?.value ?? undefined
    },
    select: {
      // id: true,
      nickname: true,
      firstname: true,
      lastname: true,
      photo: true,
      banner: true,
      post: {
        orderBy: {
          createdAt: 'desc'
        },
        select: {
          id: true,
          title: true,
          width: true,
          description: true,
          height: true,
          pre_video: true,
          pre_image: true,
          categories: true,
          private: {
            select: {
              user: {
                select: {
                  id: true,
                  nickname: true
                }
              }
            }
          },
          user: {
            select: {
              id: true,
              nickname: true
            }
          },
        }
      }
    },
  });

  if (!user) {
    return NextResponse.json(false, { status: 401, statusText: 'failed when trying to find' })
  };

  return NextResponse.json(user, { status: 201, statusText: 'done' })
};

export async function POST(request: NextRequest) {
  const cookie = await cookies();

  const body = await request.json() as User;

  const user = await prisma.user.findFirst({
    where: {
      nickname: body.nickname,
    }
  });

  const isPasswordValid = await bcrypt.compare(body.password, user?.password);

  if (!isPasswordValid) {
    return NextResponse.json(false, { status: 401, statusText: 'invalid email or password' })
  };

  cookie.set('auth-token', user!.id);

  return NextResponse.json(user!.id, { status: 201, statusText: 'done' })
};
