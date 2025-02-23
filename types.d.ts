declare namespace NodeJS {
  interface ProcessEnv {
    AWS_PROFILE: string;
    AWS_REGION: string;
    AWS_QUEUE_URL: string;
    AWS_QUEUE_NAME: string;
    AWS_QUEUE_REGION: string;
    AWS_QUEUE_ACCESS_KEY_ID: string;
    AWS_QUEUE_SECRET_ACCESS_KEY: string;
    AWS_QUEUE_SESSION_TOKEN: string;
    AWS_QUEUE_ENDPOINT: string;
    AWS_QUEUE_FORCE_PATH_STYLE: string;
    AWS_QUEUE_MAX_MESSAGES: string;
    AWS_QUEUE_MESSAGE_VISIBILITY_TIMEOUT: string;
    AWS_QUEUE_WAIT_TIME_SECONDS: string;
    AWS_QUEUE_MAX_CONCURRENCY: string;
    AWS_QUEUE_MAX_CONCURRENCY_TIMEOUT: string;
    AWS_QUEUE_MAX_CONCURRENCY_RETRY_COUNT: string;
    AWS_QUEUE_MAX_CONCURRENCY_RETRY_DELAY: string;
    AWS_QUEUE_MAX_CONCURRENCY_RETRY_BACKOFF: string;
    AWS_QUEUE_MAX_CONCURRENCY_RETRY_BACKOFF_MULTIPLIER: string;
    AWS_QUEUE_MAX_CONCURRENCY_RETRY_BACKOFF_MAX: string;
    AUTH0_MANAGEMENT_CLIENT_ID: string;
    AUTH0_MANAGEMENT_CLIENT_SECRET: string;
    AUTH0_MANAGEMENT_DOMAIN: string;
  }
}
