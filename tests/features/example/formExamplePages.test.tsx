import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

import FormExample from "../../../src/features/example/formExample/page";
import { renderPage } from "../pageTestUtils";

const apiMocks = vi.hoisted(() => ({ post: vi.fn() }));

vi.mock("../../../src/utils/apiHelper", () => ({
  testPostApi: apiMocks.post,
}));
vi.mock("../../../src/utils/authHelper", () => ({
  useAuth: () => ({ isSignedIn: false, refreshAuthState: vi.fn() }),
}));

describe("FormExample page", () => {
  beforeEach(() => {
    apiMocks.post.mockResolvedValue({
      success: true,
      response: { status: 200 },
    });
  });

  it("renders and validates required fields", async () => {
    const user = userEvent.setup();
    renderPage(<FormExample />);

    expect(screen.getByRole("heading", { name: /FormExample/ })).toBeVisible();
    await user.click(screen.getByRole("button", { name: "送信する" }));
    await waitFor(() =>
      expect(screen.getAllByText("必須項目だよ。").length).toBeGreaterThan(0),
    );
    expect(apiMocks.post).not.toHaveBeenCalled();
  });
});
