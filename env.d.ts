namespace NodeJS {
  interface ProcessEnv {
    [key: string]: string | undefined;
    NODE_ENV: 'development' | 'production';
    NEXT_PUBLIC_SUPABASE_ANON_KEY: string;
    NEXT_PUBLIC_SUPABASE_URL: string;
    NEXT_PUBLIC_CHROME_EXTENSION_ID: string;
    NEXT_PUBLIC_LEMON_SQUEEZY_CHECKOUT_ID_MONTHLY: string;
    NEXT_PUBLIC_LEMON_SQUEEZY_CHECKOUT_ID_YEARLY: string;
    SUPABASE_SERVICE_ROLE_KEY: string;
    GA4_ANALYTICS_ID: string;
    CRON_SECRET: string;
  }
}
