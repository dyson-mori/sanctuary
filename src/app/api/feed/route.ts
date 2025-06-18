import { NextResponse } from "next/server";

// import data from '../mock.json';

export async function GET() {
  return NextResponse.json([], { status: 200 })
}
