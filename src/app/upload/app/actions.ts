"use server"

import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

import s3, { PutObjectCommand } from "@services/s3";

const acceptedTypes = ["videos/mp4", "videos/webm"];

const maxFileSize = 1024 * 1024 * 10;

const generateFileName = (bytes = 32) => {
  const array = new Uint8Array(bytes);
  crypto.getRandomValues(array);

  return [...array].map(b => b.toString(16).padStart(2, "0")).join("");
};

export async function getVideoDimensions(file: File): Promise<{ width: number; height: number }> {
  return new Promise((resolve, reject) => {
    const video = document.createElement("video");

    video.preload = "metadata";
    video.src = URL.createObjectURL(file);

    video.onloadedmetadata = () => {
      URL.revokeObjectURL(video.src);
      resolve({
        width: video.videoWidth,
        height: video.videoHeight,
      });
    };

    video.onerror = (e) => {
      reject(new Error("Failed to load video metadata"));
    };
  });
}


export async function getSignedURL(file: File, type: string, size: number, checksum: string) {
  const auth = true;

  if (!auth) {
    return { failure: "Not Authenticated" }
  };

  if (acceptedTypes.includes(type)) {
    return { failure: "Invalid file type!" }
  };

  if (size > maxFileSize) {
    return { failure: "Invalid file type!" }
  };

  const { width, height } = await getVideoDimensions(file);

  const putObjectCommand = new PutObjectCommand({
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: generateFileName(),
    ContentType: type,
    ContentLength: size,
    ChecksumSHA256: checksum,
    // Metadata: {
    //   userId: session.user.id
    // }
  });

  const signedUrl = await getSignedUrl(s3, putObjectCommand, {
    expiresIn: 60
  })

  return {
    success: {
      urlForUpload: signedUrl,
      url: signedUrl.split("?")[0],
      width,
      height
    }
  }
};
