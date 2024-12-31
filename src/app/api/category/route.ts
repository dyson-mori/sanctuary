import { NextRequest, NextResponse } from "next/server";

import { Category } from "@prisma/client";

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
  const { name } = await request.json() as Category;

  try {
    await prisma.category.create({
      data: {
        name
      }
    });
    return NextResponse.json(true, { status: 201, statusText: 'created' });
  } catch (error) {
    console.log(error);
  }
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