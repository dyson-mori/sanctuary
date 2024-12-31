import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

import { User } from "@prisma/client";

import bcrypt from 'bcrypt';

import { prisma } from "@services";

export async function GET() {
  const cookie = await cookies();
  const token = cookie.get('auth-token');

  const user = await prisma.user.findMany({
    where: {
      NOT: {
        id: token?.value ?? undefined
      }
    },
    select: {
      id: true,
      password: false,
      nickname: true,
      photo: true,
      banner: true,
      post: true,
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
      _count: {
        select: {
          post: true
        }
      }
    }
  });

  return NextResponse.json(user, { status: 201, statusText: 'found' });
};

export async function POST(request: NextRequest) {
  const { firstname, lastname, nickname, password, banner, photo } = await request.json() as User;

  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  const data = await prisma.user.create({
    data: {
      firstname,
      lastname,
      nickname,
      password: hashedPassword,
      banner,
      photo,
    }
  });

  if (!data?.id) {
    return NextResponse.json(false, { status: 401, statusText: 'failed when trying to find' });
  };

  return NextResponse.json(data, { status: 201, statusText: 'done' });
};
