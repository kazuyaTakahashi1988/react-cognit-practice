import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

import SignIn from "../../../src/features/auth/signIn/page";
import { renderPage } from "../pageTestUtils";

const authMocks = vi.hoisted(() => ({
  refreshAuthState: vi.fn(),
  signIn: vi.fn(),
}));

vi.mock("../../../src/utils/authHelper", () => ({
  signInHelper: authMocks.signIn,
  useAuth: () => ({
    isSignedIn: false,
    refreshAuthState: authMocks.refreshAuthState,
  }),
}));

describe("SignIn page", () => {
  beforeEach(() => {
    authMocks.signIn.mockResolvedValue({ isSignedIn: true });
  });

  it("renders and submits the entered credentials", async () => {
    const user = userEvent.setup();
    renderPage(<SignIn />);

    expect(screen.getByRole("heading", { name: "SignIn" })).toBeVisible();
    await user.type(
      screen.getByPlaceholderText("○○○○＠○○○○.com"),
      "user@example.com",
    );
    await user.type(screen.getByPlaceholderText("○○○○○○○○"), "password");
    await user.click(screen.getByRole("button", { name: "送信する" }));

    await waitFor(() =>
      expect(authMocks.signIn).toHaveBeenCalledWith({
        email: "user@example.com",
        password: "password",
      }),
    );
    expect(authMocks.refreshAuthState).toHaveBeenCalledOnce();
  });
});
