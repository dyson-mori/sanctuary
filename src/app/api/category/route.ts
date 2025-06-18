import { NextResponse } from "next/server";

import data from '../mock.json';

export async function GET() {
  const category = data.category.map((row, index) => ({
    id: `category-${index}`,
    ...row
  }));

  return NextResponse.json(category)
}
