namespace NodeJS {
  interface ProcessEnv {
    DATABASE_URL: string;
    NEXTBASE_URL: string;

    NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME: string;
    NEXT_PUBLIC_CLOUDINARY_API_KEY: string;
    NEXT_PUBLIC_CLOUDINARY_API_SECRET: string;
  };
};