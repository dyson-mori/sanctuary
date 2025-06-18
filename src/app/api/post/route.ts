import { NextResponse } from "next/server";

// import { PostProps } from "@global/interface";

import data from '../mock.json';

function shuffleArray(array: []) {
  const shuffled = [...array]; // cria uma cópia para não modificar o original

  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]; // troca os elementos
  };

  return shuffled;
}

// const ids = [
//   "123", "321", "456", "654", "789", "987", "147", "741",
//   "258", "852", "369", "963", "159", "951", "753", "357",
//   "132", "231", "465", "564", "798", "897", "174", "471",
//   "286", "682", "397", "793", "153", "351", "426", "624",
//   "819", "918", "273", "372", "384", "483", "695", "596",
// ];

export function GET() {
  // const filter = data.products.filter(e => e.width !== 0);

  // const response = shuffleArray(filter);

  const addingIds = data.products.map(item => ({
    preview: `http://localhost:3030/cdn/preview/${item.isPrivate}/${item.id}.mp4`,
    ...item,
  }));

  return NextResponse.json(shuffleArray(addingIds as []));
};

export async function POST() { };