import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

import SignIn from "../../../src/features/auth/signIn/page";
import SignOut from "../../../src/features/auth/signOut/page";
import SignUp from "../../../src/features/auth/signUp/page";
import Verification from "../../../src/features/auth/verification/page";
import { renderPage } from "../pageTestUtils";

const authMocks = vi.hoisted(() => ({
  refreshAuthState: vi.fn(),
  signIn: vi.fn(),
  signOut: vi.fn(),
  signUp: vi.fn(),
  verify: vi.fn(),
}));
const EMAIL = "user@example.com";

vi.mock("../../../src/utils/authHelper", () => ({
  signInHelper: authMocks.signIn,
  signOutHelper: authMocks.signOut,
  signUpHelper: authMocks.signUp,
  verifyHelper: authMocks.verify,
  useAuth: () => ({
    isSignedIn: false,
    refreshAuthState: authMocks.refreshAuthState,
  }),
}));

describe("authentication pages", () => {
  beforeEach(() => {
    authMocks.signIn.mockResolvedValue({ isSignedIn: true });
    authMocks.signOut.mockResolvedValue(undefined);
    authMocks.signUp.mockResolvedValue({ isSignUpComplete: false });
    authMocks.verify.mockResolvedValue(undefined);
  });

  it("renders SignIn and submits the entered credentials", async () => {
    const user = userEvent.setup();
    renderPage(<SignIn />);

    expect(screen.getByRole("heading", { name: "SignIn" })).toBeVisible();
    await user.type(screen.getByLabelText(/emailを入力/), EMAIL);
    await user.type(screen.getByLabelText(/passwordを入力/), "password");
    await user.click(screen.getByRole("button", { name: "送信する" }));

    await waitFor(() =>
      expect(authMocks.signIn).toHaveBeenCalledWith({
        email: EMAIL,
        password: "password",
      }),
    );
    expect(authMocks.refreshAuthState).toHaveBeenCalledOnce();
  });

  it("renders SignUp and reports a successful submission", async () => {
    const user = userEvent.setup();
    renderPage(<SignUp />);

    expect(screen.getByRole("heading", { name: "SignUp" })).toBeVisible();
    await user.type(screen.getByLabelText(/emailを入力/), "new@example.com");
    await user.type(screen.getByLabelText(/passwordを入力/), "password");
    await user.click(screen.getByRole("button", { name: "送信する" }));

    expect(await screen.findByText(/Verify用のコード/)).toBeVisible();
    expect(authMocks.signUp).toHaveBeenCalledWith({
      email: "new@example.com",
      password: "password",
    });
  });

  it("renders Verification and confirms the entered code", async () => {
    const user = userEvent.setup();
    renderPage(<Verification />);

    expect(screen.getByRole("heading", { name: "Verification" })).toBeVisible();
    await user.type(screen.getByLabelText(/verificationCodeを入力/), "123456");
    await user.type(screen.getByLabelText(/emailを入力/), EMAIL);
    await user.click(screen.getByRole("button", { name: "送信する" }));

    expect(await screen.findByText(/Verify 完了/)).toBeVisible();
    expect(authMocks.verify).toHaveBeenCalledWith({
      email: EMAIL,
      verificationCode: "123456",
    });
  });

  it("renders SignOut and refreshes authentication after signing out", async () => {
    const user = userEvent.setup();
    renderPage(<SignOut />);

    expect(screen.getByRole("heading", { name: "サインアウト" })).toBeVisible();
    await user.click(screen.getByRole("button", { name: "Sign Out" }));

    await waitFor(() => expect(authMocks.signOut).toHaveBeenCalledOnce());
    expect(authMocks.refreshAuthState).toHaveBeenCalledOnce();
  });
});
