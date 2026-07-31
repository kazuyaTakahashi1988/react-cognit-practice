import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

import AccordionExample from "../../../src/features/example/accordionExample/page";
import DropdownMenuExample from "../../../src/features/example/dropdownMenuExample/page";
import FormExample from "../../../src/features/example/formExample/page";
import ModalExample from "../../../src/features/example/modalExample/page";
import StoreExample from "../../../src/features/example/storeExample/page";
import TodoExample from "../../../src/features/example/todoExample/page";
import { store } from "../../../src/utils/storeHelper";
import { renderPage } from "../pageTestUtils";

const apiMocks = vi.hoisted(() => ({ post: vi.fn() }));
const TODO_PLACEHOLDER = "タスクを入力してください。";

vi.mock("../../../src/utils/apiHelper", () => ({
  testPostApi: apiMocks.post,
}));
vi.mock("../../../src/utils/authHelper", () => ({
  useAuth: () => ({ isSignedIn: false, refreshAuthState: vi.fn() }),
}));

describe("example pages", () => {
  beforeEach(() => {
    apiMocks.post.mockResolvedValue({ ok: true, response: { status: 200 } });
  });

  it("renders AccordionExample and toggles an accordion", async () => {
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

  it("renders DropdownMenuExample and invokes a selected menu item", async () => {
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

  it("renders ModalExample and opens and closes a modal", async () => {
    const user = userEvent.setup();
    renderPage(<ModalExample />);

    expect(screen.getByRole("heading", { name: "ModalExample" })).toBeVisible();
    await user.click(screen.getByRole("button", { name: "モーダルを開く01" }));
    expect(screen.getByText("タイトル01")).toBeVisible();
    await user.click(screen.getByRole("button", { name: "閉じる" }));
    expect(screen.queryByText("タイトル01")).not.toBeInTheDocument();
  });

  it("renders StoreExample and reflects text and flag changes", async () => {
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

  it("renders TodoExample and adds and removes a task", async () => {
    const user = userEvent.setup();
    renderPage(<TodoExample />);

    expect(screen.getByRole("heading", { name: "TodoExample" })).toBeVisible();
    expect(screen.getAllByPlaceholderText(TODO_PLACEHOLDER)).toHaveLength(1);
    await user.click(screen.getByRole("button", { name: "追加" }));
    expect(screen.getAllByPlaceholderText(TODO_PLACEHOLDER)).toHaveLength(2);
    await user.click(screen.getAllByRole("button", { name: "削除" })[1]);
    expect(screen.getAllByPlaceholderText(TODO_PLACEHOLDER)).toHaveLength(1);
  });

  it("renders FormExample and validates required fields", async () => {
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
