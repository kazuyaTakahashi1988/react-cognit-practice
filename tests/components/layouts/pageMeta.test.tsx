import { render, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import PageMeta from "../../../src/components/layouts/pageMeta";

const CANONICAL_SELECTOR = 'link[rel="canonical"]';

describe("PageMeta", () => {
  beforeEach(() => {
    document.querySelector(CANONICAL_SELECTOR)?.remove();
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it.each(["https:", "http:"])("accepts %s canonical URLs", (protocol) => {
    vi.stubGlobal("location", {
      href: `${protocol}//example.com/page/?q=test#top`,
    });

    render(<PageMeta description="Description" title="Title" />);

    expect(document.querySelector(CANONICAL_SELECTOR)).toHaveAttribute(
      "href",
      `${protocol}//example.com/page`,
    );
  });

  it.each([
    "ftp://example.com/page",
    "javascript:alert(1)",
    "data:text/html,test",
  ])("rejects a canonical URL derived from %s", (href) => {
    vi.stubGlobal("location", { href });

    render(<PageMeta description="Description" title="Title" />);

    expect(document.querySelector(CANONICAL_SELECTOR)).toBeNull();
  });

  it("removes trailing slashes from the canonical URL", async () => {
    window.history.pushState({}, "", "/example/form_example///");

    render(<PageMeta description="Description" title="Title" />);

    await waitFor(() => {
      expect(document.querySelector(CANONICAL_SELECTOR)).toHaveAttribute(
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
