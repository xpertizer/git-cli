export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      GITTOKEN: '';
      ENV: 'test' | 'dev' | 'prod';
    }
  }
}
