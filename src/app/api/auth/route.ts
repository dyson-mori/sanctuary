import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json(true, { status: 201, statusText: 'created' })
};
