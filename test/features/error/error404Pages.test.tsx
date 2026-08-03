import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import Error404 from "../../../src/features/error/404/page";
import { renderPage } from "../pageTestUtils";

describe("404 error page", () => {
  it("explains that a missing page was not found", () => {
    renderPage(<Error404 />);
    expect(
      screen.getByRole("heading", { name: "404 Not Found" }),
    ).toBeVisible();
    expect(
      screen.getByText("お探しのページは見つかりませんでした。"),
    ).toBeVisible();
  });
});
