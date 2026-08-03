import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

import SignOut from "../../../src/features/auth/signOut/page";
import { renderPage } from "../pageTestUtils";

const authMocks = vi.hoisted(() => ({
  refreshAuthState: vi.fn(),
  signOut: vi.fn(),
}));

vi.mock("../../../src/utils/authHelper", () => ({
  signOutHelper: authMocks.signOut,
  useAuth: () => ({
    isSignedIn: false,
    refreshAuthState: authMocks.refreshAuthState,
  }),
}));

describe("SignOut page", () => {
  beforeEach(() => {
    authMocks.signOut.mockResolvedValue(undefined);
  });

  it("renders and refreshes authentication after signing out", async () => {
    const user = userEvent.setup();
    renderPage(<SignOut />);

    expect(screen.getByRole("heading", { name: "サインアウト" })).toBeVisible();
    await user.click(screen.getByRole("button", { name: "Sign Out" }));

    await waitFor(() => expect(authMocks.signOut).toHaveBeenCalledOnce());
    expect(authMocks.refreshAuthState).toHaveBeenCalledOnce();
  });
});
