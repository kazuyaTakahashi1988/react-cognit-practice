type Environment = {
  apiBaseUrl: string;
  cognitoClientId: string;
  cognitoIdentityPoolId: string;
  cognitoUserPoolId: string;
};

type EnvironmentSource = Record<string, string | undefined>;

const readRequired = (name: string, value: string | undefined) => {
  if (value?.trim()) return value;
  throw new Error(`Required environment variable is missing: ${name}`);
};

/**
 * 起動に必要な設定を一か所で検証する。
 * 設定不足を認証や API 操作時まで遅延させず、起動時に発見できるようにする。
 */
export const parseEnvironment = (source: EnvironmentSource): Environment => ({
  apiBaseUrl: readRequired(
    "VITE_APP_PUBLIC_API_BASE_URL",
    source.VITE_APP_PUBLIC_API_BASE_URL,
  ),
  cognitoClientId: readRequired(
    "VITE_APP_AWS_COGNITO_CLIENT_ID",
    source.VITE_APP_AWS_COGNITO_CLIENT_ID,
  ),
  cognitoIdentityPoolId: readRequired(
    "VITE_APP_AWS_COGNITO_IDENTITY_POOL_ID",
    source.VITE_APP_AWS_COGNITO_IDENTITY_POOL_ID,
  ),
  cognitoUserPoolId: readRequired(
    "VITE_APP_AWS_COGNITO_USER_POOL_ID",
    source.VITE_APP_AWS_COGNITO_USER_POOL_ID,
  ),
});

export const getEnvironment = () => parseEnvironment(import.meta.env);
