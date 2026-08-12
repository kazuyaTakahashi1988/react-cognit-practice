import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import AppErrorBoundary from "../../../src/components/error/appErrorBoundary";

const BrokenComponent = () => {
  throw new Error("render failed");
};

describe("AppErrorBoundary", () => {
  it("子コンポーネントの描画エラー時に復旧画面を表示する", () => {
    vi.spyOn(console, "error").mockImplementation(() => undefined);

    render(
      <AppErrorBoundary>
        <BrokenComponent />
      </AppErrorBoundary>,
    );

    expect(
      screen.getByRole("heading", { name: "予期しないエラーが発生しました" }),
    ).toBeVisible();
    expect(screen.getByRole("button", { name: "もう一度試す" })).toBeVisible();
  });
});
