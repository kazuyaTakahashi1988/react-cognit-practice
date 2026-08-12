import { describe, expect, it } from "vitest";

import { validateEnvironment } from "../../src/config/env";

const validEnvironment = {
  VITE_APP_AWS_COGNITO_CLIENT_ID: "client-id",
  VITE_APP_AWS_COGNITO_IDENTITY_POOL_ID: "identity-pool-id",
  VITE_APP_AWS_COGNITO_USER_POOL_ID: "user-pool-id",
  VITE_APP_BASE_URL: "https://example.com",
  VITE_APP_DEFAULT_DESCRIPTION: "description",
  VITE_APP_DEFAULT_OG_IMAGE: "/ogp.jpg",
  VITE_APP_DEFAULT_TITLE: "title",
  VITE_APP_PUBLIC_API_BASE_URL: "https://api.example.com",
  VITE_APP_SITE_NAME: "site",
};

describe("validateEnvironment", () => {
  it("必要な環境変数とURLが正しければ成功する", () => {
    expect(() => validateEnvironment(validEnvironment)).not.toThrow();
  });

  it("不足している環境変数名を含むエラーを送出する", () => {
    expect(() =>
      validateEnvironment({ ...validEnvironment, VITE_APP_SITE_NAME: "" }),
    ).toThrow("VITE_APP_SITE_NAME");
  });

  it("HTTP以外のURLを拒否する", () => {
    expect(() =>
      validateEnvironment({
        ...validEnvironment,
        VITE_APP_BASE_URL: "ftp://example.com",
      }),
    ).toThrow("URL形式が不正");
  });
});
