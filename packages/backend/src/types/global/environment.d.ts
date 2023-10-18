export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      MODE: "development" | "production";
      APPLICATION_PORT: string;
      SECRET_KEY: string;
    }
  }
}