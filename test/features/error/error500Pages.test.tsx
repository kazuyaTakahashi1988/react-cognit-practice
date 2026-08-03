import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import Error500 from "../../../src/features/error/500/page";
import { renderPage } from "../pageTestUtils";

describe("500 error page", () => {
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
