import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

import SignUp from "../../../src/features/auth/signUp/page";
import { renderPage } from "../pageTestUtils";

const authMocks = vi.hoisted(() => ({ signUp: vi.fn() }));

vi.mock("../../../src/utils/authHelper", () => ({
  signUpHelper: authMocks.signUp,
  useAuth: () => ({ isSignedIn: false, refreshAuthState: vi.fn() }),
}));

describe("SignUp page", () => {
  beforeEach(() => {
    authMocks.signUp.mockResolvedValue({ isSignUpComplete: false });
  });

  it("renders and reports a successful submission", async () => {
    const user = userEvent.setup();
    renderPage(<SignUp />);

    expect(screen.getByRole("heading", { name: "SignUp" })).toBeVisible();
    await user.type(
      screen.getByPlaceholderText("○○○○＠○○○○.com"),
      "new@example.com",
    );
    await user.type(screen.getByPlaceholderText("○○○○○○○○"), "password");
    await user.click(screen.getByRole("button", { name: "送信する" }));

    expect(await screen.findByText(/Verify用のコード/)).toBeVisible();
    expect(authMocks.signUp).toHaveBeenCalledWith({
      email: "new@example.com",
      password: "password",
    });
  });
});
