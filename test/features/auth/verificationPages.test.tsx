import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

import Verification from "../../../src/features/auth/verification/page";
import { renderPage } from "../pageTestUtils";

const authMocks = vi.hoisted(() => ({ verify: vi.fn() }));

vi.mock("../../../src/utils/authHelper", () => ({
  verifyHelper: authMocks.verify,
  useAuth: () => ({ isSignedIn: false, refreshAuthState: vi.fn() }),
}));

describe("Verification page", () => {
  beforeEach(() => {
    authMocks.verify.mockResolvedValue(undefined);
  });

  it("renders and confirms the entered code", async () => {
    const user = userEvent.setup();
    renderPage(<Verification />);

    expect(screen.getByRole("heading", { name: "Verification" })).toBeVisible();
    await user.type(screen.getByPlaceholderText("○○○○○○○○"), "123456");
    await user.type(
      screen.getByPlaceholderText("○○○○＠○○○○.com"),
      "user@example.com",
    );
    await user.click(screen.getByRole("button", { name: "送信する" }));

    expect(await screen.findByText(/Verify 完了/)).toBeVisible();
    expect(authMocks.verify).toHaveBeenCalledWith({
      email: "user@example.com",
      verificationCode: "123456",
    });
  });
});
