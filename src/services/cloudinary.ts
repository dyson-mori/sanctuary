import { v2 } from "cloudinary";

v2.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET,
});

export const cloudinary = {
  upload: async (fileUri: string, fileName: string, folder?: 'creator' | null) => {
    const { secure_url, width, height, public_id } = await v2.uploader
      .upload(
        fileUri, {
        invalidate: true,
        resource_type: "auto",
        filename_override: fileName,
        folder: `community${folder ? '/' + folder : ''}`,
        use_filename: true,
      });

    const url_pre_image =
      secure_url
        .replace('https://res.cloudinary.com/dyrtdrnky/video/upload/', '')
        .replace('mp4', 'webp');

    const url_pre_video =
      secure_url
        .replace('https://res.cloudinary.com/dyrtdrnky/video/upload/', 'du_2.0')
        .replace('mp4', 'webm');

    const url_video =
      secure_url
        .replace('https://res.cloudinary.com/dyrtdrnky/video/upload/', '')
        .replace('mp4', 'webm');

    return {
      secure_url,
      width,
      height,
      public_id,
      url_pre_image,
      url_pre_video,
      url_video
    }
  },
  uploadImage: async (fileUri: string, fileName: string, folder?: 'creator' | null) => {
    const { secure_url, width, height, public_id } = await v2.uploader
      .upload(
        fileUri, {
          invalidate: true,
          resource_type: "auto",
          filename_override: fileName,
          use_filename: true,
          folder: `community${folder ? '/' + folder : ''}`,
      }
      );

    const url_pre_image =
      secure_url
        .replace('https://res.cloudinary.com/dyrtdrnky/image/upload/', '')
        .replace('png', 'webp')
        .replace('jpg', 'webp')

    return {
      secure_url,
      width,
      height,
      public_id,
      url_pre_image,
    }
  }
}