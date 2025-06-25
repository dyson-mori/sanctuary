import { NextRequest, NextResponse } from "next/server";
import s3 from "@services/s3";
// import multer from "multer";

// Permitir apenas 1 arquivo por vez
// const storage = multer.memoryStorage();
// const upload = multer({ storage }).single("file");

// Função para usar o multer no Next
// function runMiddleware(req: any, fn: Function): Promise<void> {
//   return new Promise((resolve, reject) => {
//     fn(req, {} as any, (result: any) => {
//       if (result instanceof Error) return reject(result);
//       resolve(result);
//     });
//   });
// }

export const POST = async (req: NextRequest) => {
  const formData = await req.formData();
  const file = formData.get("file") as File;

  if (!file) {
    return NextResponse.json({ error: "No file found" }, { status: 400 });
  }

  const buffer = Buffer.from(await file.arrayBuffer());

  const filename = `${Date.now()}-${file.name}`;

  const uploadResult = await s3
    .upload({
      Bucket: process.env.AWS_BUCKET_NAME!,
      Key: filename,
      Body: buffer,
      ContentType: file.type,
    })
    .promise();

  return NextResponse.json({ url: uploadResult.Location });
};
