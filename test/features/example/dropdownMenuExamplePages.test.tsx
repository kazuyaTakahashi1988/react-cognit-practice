import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import DropdownMenuExample from "../../../src/features/example/dropdownMenuExample/page";
import { renderPage } from "../pageTestUtils";

vi.mock("../../../src/utils/authHelper", () => ({
  useAuth: () => ({ isSignedIn: false, refreshAuthState: vi.fn() }),
}));

describe("DropdownMenuExample page", () => {
  it("renders and invokes a selected menu item", async () => {
    const user = userEvent.setup();
    renderPage(<DropdownMenuExample />);

    expect(
      screen.getByRole("heading", { name: "DropdownMenuExample" }),
    ).toBeVisible();
    await user.click(
      screen.getByRole("button", { name: "ドロップダウンメニュー_A" }),
    );
    await user.click(screen.getByRole("button", { name: "Menu_A_01" }));
    expect(window.alert).toHaveBeenCalledWith("Menu_A：01 onClicked !!");
  });
});
