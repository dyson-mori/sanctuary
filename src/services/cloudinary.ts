import { v2 } from "cloudinary";

v2.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET,
});

export const cloudinary = {
  upload: async (fileUri: string, fileName: string, folder?: 'creator' | null) => {
    const upload = await v2.uploader
      .upload(
        fileUri, {
        invalidate: true,
        resource_type: "auto",
        filename_override: fileName,
          folder: `${process.env.NEXT_PUBLIC_CLOUDINARY_FOLDER}${folder ? '/' + folder : ''}`,
        use_filename: true,
      });

    // const url_pre_image =
    //   secure_url
    //     .replace('https://res.cloudinary.com/dyrtdrnky/video/upload/', '')
    //     .replace('mp4', 'webp');

    // const url_pre_video =
    //   secure_url
    //     .replace('https://res.cloudinary.com/dyrtdrnky/video/upload/', 'du_2.0/')
    //     .replace('mp4', 'webm');

    // const url_video =
    //   secure_url
    //     .replace('https://res.cloudinary.com/dyrtdrnky/video/upload/', '')
    //     .replace('mp4', 'webm');

    return upload;
  },

  uploadImage: async (fileUri: string, fileName: string, folder?: 'creator' | null) => {
    const data = await v2.uploader
    // const { secure_url, width, height, public_id } = await v2.uploader
      .upload(
        fileUri, {
          invalidate: true,
          resource_type: "auto",
          filename_override: fileName,
          use_filename: true,
          folder: `${process.env.NEXT_PUBLIC_CLOUDINARY_FOLDER}${folder ? '/' + folder : ''}`,
      }
      );

    const url_pre_image =
      data.secure_url
        .replace('https://res.cloudinary.com/dyrtdrnky/image/upload/', '')
        .replace('png', 'webp')
        .replace('jpg', 'webp')

    return {
      secure_url: data.secure_url,
      width: data.width,
      height: data.height,
      public_id: data.public_id,
      url_pre_image,
    }
  },

  destroy: async (fileUri: string, type: 'image' | 'video') => {
    const data = await v2.uploader.destroy(fileUri, { resource_type: type });
    return data;
  }
};