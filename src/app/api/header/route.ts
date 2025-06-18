import { NextResponse } from "next/server";

import data from '../mock.json';

export function GET() {
  const filter = data.header.filter(item => item.isPublic)
  return NextResponse.json(filter)
};
