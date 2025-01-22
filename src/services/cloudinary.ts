import { v2 } from "cloudinary";

v2.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET,
});

const prefix = 'https://res.cloudinary.com/dyrtdrnky/video/upload/';

export const cloudinary = {
  upload: async (fileUri: string, fileName: string) => {
    return await v2.uploader
      .upload(
        fileUri, {
          invalidate: true,
          resource_type: "auto",
          filename_override: fileName,
          use_filename: true,
          upload_preset: 'sanctuary',
      })
      .then(({ width, height, public_id, secure_url }) => ({
        width,
        height,
        public_id,
        pre_image: secure_url.replaceAll(prefix, '').replaceAll('mp4', 'webp').replaceAll('mov', 'webp'),
        pre_video: secure_url.replaceAll(prefix, 'du_2.0/').replaceAll('mp4', 'webm').replaceAll('mov', 'webm'),
        url_video: secure_url.replaceAll(prefix, '').replaceAll('mp4', 'webm').replaceAll('mov', 'webm')
      }))
      .catch(err => err)
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
        .replaceAll('https://res.cloudinary.com/dyrtdrnky/image/upload/', '')
        .replaceAll('png', 'webp')
        .replaceAll('jpg', 'webp')

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