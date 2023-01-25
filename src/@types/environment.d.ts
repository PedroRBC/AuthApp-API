export { };

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            PORT: number;
            JWT_SECRET: string;
            DATABASE_URL: string;
            SHADOW_DATABASE_URL: string;
        }
    }
}
