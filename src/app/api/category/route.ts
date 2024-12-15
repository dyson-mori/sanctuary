import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@services";
import { CategoryProps } from "@global/interface";

export async function GET() {
  const categories = await prisma.category.findMany({
    orderBy: {
      post: {
        _count: 'desc'
      }
    },
    include: {
      _count: {
        select: {
          post: true
        }
      }
    }
  });

  return NextResponse.json(categories, { status: 201, statusText: 'created' })
};

export async function POST(request: NextRequest) {
  const array = await request.json() as string[];

  const admin = await prisma.category.createMany({
    data: array.map(name => ({ name }))
  });

  return NextResponse.json(admin, { status: 201, statusText: 'created' });
};

export async function PUT(request: NextRequest) {
  const url = new URL(request.url);
  const id = url.searchParams.get("category_id") as string;

  const { name } = await request.json() as CategoryProps;

  const update = await prisma.category.update({
    where: {
      id
    },
    data: {
      name
    }
  });

  return NextResponse.json(update, { status: 201, statusText: 'created' });
};

export async function DELETE(request: NextRequest) {
  const url = new URL(request.url);
  const id = url.searchParams.get("category_id") as string;

  const deleted = await prisma.category.delete({
    where: {
      id
    }
  });

  return NextResponse.json(deleted, { status: 201, statusText: 'created' });
};