import { NextRequest, NextResponse } from "next/server";

import { Category, Video } from "@prisma/client";
// import { PostProps } from "@global/interface";

import prisma from "@services/prisma";

// function shuffleArray(array: []) {
//   const shuffled = [...array]; // cria uma cópia para não modificar o original

//   for (let i = shuffled.length - 1; i > 0; i--) {
//     const j = Math.floor(Math.random() * (i + 1));
//     [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]; // troca os elementos
//   };

//   return shuffled;
// }

// const ids = [
//   "123", "321", "456", "654", "789", "987", "147", "741",
//   "258", "852", "369", "963", "159", "951", "753", "357",
//   "132", "231", "465", "564", "798", "897", "174", "471",
//   "286", "682", "397", "793", "153", "351", "426", "624",
//   "819", "918", "273", "372", "384", "483", "695", "596",
// ];

export async function GET(request: NextRequest) {
  const header = await request.headers.get('authorization');

  const videos = await prisma.video.findMany({
    orderBy: {
      createdAt: 'desc'
    }
  });

  const data = videos.map(item => {
    const isPrivate = header === "123-987-456-852" ? false : item.isPrivate;

    return {
      ...item,
      preview: `http://localhost:3030/cdn/preview/${isPrivate}/${item.cdn_id}.mp4`,
      isPrivate,
    }
  });

  return NextResponse.json(data, { status: 200 });
};

export async function POST(request: NextResponse) {
  const { cdn_id, url, width, height, isPrivate, price, categories } = await request.json() as Video & { categories: Category[] };

  await prisma.video.create({
    data: {
      url,
      width,
      height,
      isPrivate,
      cdn_id,
      price,
      categories: {
        connect: categories.map(item => ({
          id: item.id
        }))
      }
    }
  });

  return NextResponse.json(true, { status: 201, statusText: 'video created!' });
};