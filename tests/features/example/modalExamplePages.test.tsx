import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import ModalExample from "../../../src/features/example/modalExample/page";
import { renderPage } from "../pageTestUtils";

vi.mock("../../../src/utils/authHelper", () => ({
  useAuth: () => ({ isSignedIn: false, refreshAuthState: vi.fn() }),
}));

describe("ModalExample page", () => {
  it("renders and opens and closes a modal", async () => {
    const user = userEvent.setup();
    renderPage(<ModalExample />);

    expect(screen.getByRole("heading", { name: "ModalExample" })).toBeVisible();
    await user.click(screen.getByRole("button", { name: "モーダルを開く01" }));
    expect(screen.getByText("タイトル01")).toBeVisible();
    await user.click(screen.getByRole("button", { name: "閉じる" }));
    expect(screen.queryByText("タイトル01")).not.toBeInTheDocument();
  });
});
