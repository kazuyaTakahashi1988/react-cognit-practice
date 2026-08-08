import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import StoreExample from "../../../src/features/example/storeExample/page";
import { store } from "../../../src/utils/storeHelper";
import { renderPage } from "../pageTestUtils";

vi.mock("../../../src/utils/authHelper", () => ({
  useAuth: () => ({ isSignedIn: false, refreshAuthState: vi.fn() }),
}));

describe("StoreExample page", () => {
  it("renders and reflects text and flag changes", async () => {
    const user = userEvent.setup();
    store.dispatch({ type: "example/exampleStringSet", payload: "" });
    store.dispatch({ type: "example/exampleFlagSet", payload: false });
    renderPage(<StoreExample />);

    expect(screen.getByRole("heading", { name: /StoreExample/ })).toBeVisible();
    await user.type(
      screen.getByPlaceholderText("入力をお願いします。"),
      "updated",
    );
    expect(screen.getByText(/\[updated\]/)).toBeVisible();
    await user.click(screen.getByText("noActive"));
    expect(screen.getByText(/\[true\]/)).toBeVisible();
  });
});
