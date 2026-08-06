import { describe, expect, it } from "vitest";

import { parseEnvironment } from "../../src/config/environment";

const validEnvironment = {
  VITE_APP_AWS_COGNITO_CLIENT_ID: "client-id",
  VITE_APP_AWS_COGNITO_IDENTITY_POOL_ID: "identity-pool-id",
  VITE_APP_AWS_COGNITO_USER_POOL_ID: "user-pool-id",
  VITE_APP_PUBLIC_API_BASE_URL: "https://api.example.com",
};

describe("parseEnvironment", () => {
  it("returns validated application settings", () => {
    expect(parseEnvironment(validEnvironment)).toEqual({
      apiBaseUrl: "https://api.example.com",
      cognitoClientId: "client-id",
      cognitoIdentityPoolId: "identity-pool-id",
      cognitoUserPoolId: "user-pool-id",
    });
  });

  it("reports the name of a missing setting", () => {
    expect(() =>
      parseEnvironment({
        ...validEnvironment,
        VITE_APP_AWS_COGNITO_CLIENT_ID: " ",
      }),
    ).toThrowError(
      "Required environment variable is missing: VITE_APP_AWS_COGNITO_CLIENT_ID",
    );
  });
});
