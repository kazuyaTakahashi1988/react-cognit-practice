import { render, waitFor } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import PageMeta from "../../../src/components/layouts/pageMeta";

describe("PageMeta", () => {
  it("removes trailing slashes from the canonical URL", async () => {
    window.history.pushState({}, "", "/example/form_example///");

    render(<PageMeta description="Description" title="Title" />);

    await waitFor(() => {
      expect(document.querySelector('link[rel="canonical"]')).toHaveAttribute(
        "href",
        `${window.location.origin}/example/form_example`,
      );
      expect(document.querySelector('meta[property="og:url"]')).toHaveAttribute(
        "content",
        `${window.location.origin}/example/form_example`,
      );
    });
  });
});
