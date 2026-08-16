import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import AppErrorBoundary from "../../src/app/errorBoundary";

const BrokenPage = () => {
  throw new Error("render failed");
};

describe("AppErrorBoundary", () => {
  it("未処理の描画エラー時に復旧可能なフォールバックを表示する", () => {
    const consoleError = vi
      .spyOn(console, "error")
      .mockImplementation(() => {});

    render(
      <AppErrorBoundary>
        <BrokenPage />
      </AppErrorBoundary>,
    );

    expect(screen.getByRole("alert")).toBeVisible();
    expect(
      screen.getByRole("button", { name: "ページを再読み込み" }),
    ).toBeVisible();
    expect(consoleError).toHaveBeenCalled();
  });
});
