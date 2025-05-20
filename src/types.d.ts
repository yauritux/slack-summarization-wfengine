declare global {
    namespace NodeJS {
        interface ProcessEnv {
            slackSigningSecret: string;
        }
    }
}