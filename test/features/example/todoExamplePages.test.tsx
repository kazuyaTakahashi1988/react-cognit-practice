import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import TodoExample from "../../../src/features/example/todoExample/page";
import { renderPage } from "../pageTestUtils";

vi.mock("../../../src/utils/authHelper", () => ({
  useAuth: () => ({ isSignedIn: false, refreshAuthState: vi.fn() }),
}));

const TODO_PLACEHOLDER = "タスクを入力してください。";

describe("TodoExample page", () => {
  it("renders and adds and removes a task", async () => {
    const user = userEvent.setup();
    renderPage(<TodoExample />);

    expect(screen.getByRole("heading", { name: "TodoExample" })).toBeVisible();
    expect(screen.getAllByPlaceholderText(TODO_PLACEHOLDER)).toHaveLength(1);
    await user.click(screen.getByRole("button", { name: "追加" }));
    expect(screen.getAllByPlaceholderText(TODO_PLACEHOLDER)).toHaveLength(2);
    await user.click(screen.getAllByRole("button", { name: "削除" })[1]);
    expect(screen.getAllByPlaceholderText(TODO_PLACEHOLDER)).toHaveLength(1);
  });
});
