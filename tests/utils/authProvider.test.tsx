import { render, screen, waitFor } from "@testing-library/react";
import { getCurrentUser } from "aws-amplify/auth";
import { useContext } from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import {
  AuthContext,
  AuthProvider,
} from "../../src/utils/authHelper/authProvider";

vi.mock("aws-amplify/auth", () => ({ getCurrentUser: vi.fn() }));

const mockedGetCurrentUser = vi.mocked(getCurrentUser);

const AuthState = () => {
  const auth = useContext(AuthContext);
  if (!auth) throw new Error("AuthContext is not available");

  return <p>{auth.authState.status}</p>;
};

describe("AuthProvider", () => {
  beforeEach(() => {
    mockedGetCurrentUser.mockResolvedValue({
      signInDetails: undefined,
      userId: "user-id",
      username: "test-user",
    });
  });

  it("認証状態の初期化中はcheckingを公開する", () => {
    mockedGetCurrentUser.mockReturnValue(new Promise(() => undefined));

    render(
      <AuthProvider>
        <AuthState />
      </AuthProvider>,
    );

    expect(screen.getByText("checking")).toBeVisible();
  });

  it("ユーザー取得成功後は認証済み状態を公開する", async () => {
    render(
      <AuthProvider>
        <AuthState />
      </AuthProvider>,
    );

    expect(await screen.findByText("authenticated")).toBeVisible();
    expect(mockedGetCurrentUser).toHaveBeenCalledOnce();
  });

  it("ユーザーが未認証の場合はguest状態を公開する", async () => {
    mockedGetCurrentUser.mockRejectedValue(
      new Error("UserUnAuthenticatedException"),
    );

    render(
      <AuthProvider>
        <AuthState />
      </AuthProvider>,
    );

    expect(await screen.findByText("anonymous")).toBeVisible();
  });

  it("認証状態の確認障害を未認証と区別して公開する", async () => {
    mockedGetCurrentUser.mockRejectedValue(new Error("network failure"));

    render(
      <AuthProvider>
        <AuthState />
      </AuthProvider>,
    );

    await waitFor(() => expect(screen.queryByText("checking")).toBeNull());
    expect(screen.getByText("error")).toBeVisible();
  });
});
