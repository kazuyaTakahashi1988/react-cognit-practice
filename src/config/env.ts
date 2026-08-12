const REQUIRED_VARIABLES = [
  "VITE_APP_SITE_NAME",
  "VITE_APP_BASE_URL",
  "VITE_APP_DEFAULT_TITLE",
  "VITE_APP_DEFAULT_DESCRIPTION",
  "VITE_APP_DEFAULT_OG_IMAGE",
  "VITE_APP_PUBLIC_API_BASE_URL",
  "VITE_APP_AWS_COGNITO_IDENTITY_POOL_ID",
  "VITE_APP_AWS_COGNITO_USER_POOL_ID",
  "VITE_APP_AWS_COGNITO_CLIENT_ID",
] as const;

const URL_VARIABLES = [
  "VITE_APP_BASE_URL",
  "VITE_APP_PUBLIC_API_BASE_URL",
] as const;

type Environment = Record<string, string | boolean | undefined>;

const isValidHttpUrl = (value: string) => {
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
};

export const validateEnvironment = (environment: Environment) => {
  const missing = REQUIRED_VARIABLES.filter(
    (name) => !environment[name]?.toString().trim(),
  );
  const invalidUrls = URL_VARIABLES.filter((name) => {
    const value = environment[name];
    return typeof value === "string" && value !== "" && !isValidHttpUrl(value);
  });
  const problems = [
    missing.length > 0 ? `未設定: ${missing.join(", ")}` : "",
    invalidUrls.length > 0 ? `URL形式が不正: ${invalidUrls.join(", ")}` : "",
  ].filter(Boolean);

  if (problems.length > 0) {
    throw new Error(`環境変数の検証に失敗しました（${problems.join(" / ")}）`);
  }
};
