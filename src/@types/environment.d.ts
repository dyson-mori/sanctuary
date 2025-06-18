declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_SANCTUARY_URL: string;
    }
  }
}

export { }