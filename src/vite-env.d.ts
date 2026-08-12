/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_AWS_COGNITO_CLIENT_ID: string;
  readonly VITE_APP_AWS_COGNITO_IDENTITY_POOL_ID: string;
  readonly VITE_APP_AWS_COGNITO_USER_POOL_ID: string;
  readonly VITE_APP_BASE_URL: string;
  readonly VITE_APP_DEFAULT_DESCRIPTION: string;
  readonly VITE_APP_DEFAULT_OG_IMAGE: string;
  readonly VITE_APP_DEFAULT_TITLE: string;
  readonly VITE_APP_GA_MEASUREMENT_ID?: string;
  readonly VITE_APP_PUBLIC_API_BASE_URL: string;
  readonly VITE_APP_SITE_NAME: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
