import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import AccordionExample from "../../../src/features/example/accordionExample/page";
import { renderPage } from "../pageTestUtils";

vi.mock("../../../src/utils/authHelper", () => ({
  useAuth: () => ({ isSignedIn: false, refreshAuthState: vi.fn() }),
}));

describe("AccordionExample page", () => {
  it("renders and toggles an accordion", async () => {
    const user = userEvent.setup();
    renderPage(<AccordionExample />);
    const trigger = screen.getByRole("button", {
      name: "アコーディオンタイトル",
    });

    expect(
      screen.getByRole("heading", { name: "AccordionExample" }),
    ).toBeVisible();
    expect(trigger).toHaveAttribute("aria-expanded", "false");
    await user.click(trigger);
    expect(trigger).toHaveAttribute("aria-expanded", "true");
  });
});
