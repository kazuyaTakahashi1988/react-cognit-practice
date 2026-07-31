import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { renderPage } from "./pageTestUtils";
import Error404 from "../src/features/error/404/page";
import Error500 from "../src/features/error/500/page";

describe("error pages", () => {
  it("explains that a missing page was not found", () => {
    renderPage(<Error404 />);
    expect(
      screen.getByRole("heading", { name: "404 Not Found" }),
    ).toBeVisible();
    expect(
      screen.getByText("お探しのページは見つかりませんでした。"),
    ).toBeVisible();
  });

  it("explains that an internal server error occurred", () => {
    renderPage(<Error500 />);
    expect(
      screen.getByRole("heading", { name: "500 Internal Server Error" }),
    ).toBeVisible();
    expect(
      screen.getByText("サーバー内部エラーが発生しました。"),
    ).toBeVisible();
  });
});
