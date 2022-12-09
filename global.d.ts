declare global {
  namespace NodeJS {
    interface ProcessEnv {
      WP_URL: URL;
    }
  }
}
export {};