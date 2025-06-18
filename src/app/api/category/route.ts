import { NextRequest, NextResponse } from "next/server";

import prisma from "@services/prisma";

import data from '../mock.json';

export async function GET() {
  const category = data.category.map((row, index) => ({
    id: `category-${index}`,
    ...row
  }));

  return NextResponse.json(category)
}

export async function POST(request: NextRequest) {
  const data = await request.json();

  await prisma.category.createMany({
    data
  });

  return NextResponse.json(true, { status: 201, statusText: 'categories created!' })
};