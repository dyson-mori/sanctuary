import { NextRequest, NextResponse } from "next/server";

import prisma from "@services/prisma";

export async function GET() {
  const category = await prisma.category.findMany({
    orderBy: {
      title: 'asc'
    },
    include: {
      _count: {
        select: {
          video: true
        }
      }
    }
  });
  return NextResponse.json(category);
};

export async function POST(request: NextRequest) {
  const data = await request.json();

  await prisma.category.createMany({
    data
  });

  return NextResponse.json(true, { status: 201, statusText: 'categories created!' })
};