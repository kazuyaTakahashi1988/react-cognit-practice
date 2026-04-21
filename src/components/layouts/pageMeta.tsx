import { useEffect } from "react";

import type { TypePageMeta } from "../../lib/types";
import type React from "react";

/* -----------------------------------------------
 * 共通ページメタ
 * ----------------------------------------------- */

const SITE_NAME = import.meta.env.VITE_APP_SITE_NAME ?? "";
const BASE_URL = import.meta.env.VITE_APP_BASE_URL ?? "";
const DEFAULT_TITLE = import.meta.env.VITE_APP_DEFAULT_TITLE ?? "";
const DEFAULT_DESCRIPTION = import.meta.env.VITE_APP_DEFAULT_DESCRIPTION ?? "";
const DEFAULT_OG_IMAGE = import.meta.env.VITE_APP_DEFAULT_OG_IMAGE ?? "";

const PageMeta: React.FC<TypePageMeta> = ({
  title,
  description,
  noindex = false,
  ogImage,
  ogType = "website",
}) => {
  useEffect(() => {
    const normalizedTitle = title?.trim() ? title.trim() : DEFAULT_TITLE;
    const normalizedDescription = description?.trim() ? description.trim() : DEFAULT_DESCRIPTION;
    const normalizedOgImage = ogImage?.trim() ? ogImage.trim() : DEFAULT_OG_IMAGE;
    const fullTitle =
      normalizedTitle === DEFAULT_TITLE ? DEFAULT_TITLE : `${normalizedTitle} | ${SITE_NAME}`;
    const currentUrl = new URL(globalThis.location.href);
    const canonicalUrl = `${currentUrl.origin}${currentUrl.pathname}`;
    const ogImageUrl = String(normalizedOgImage).startsWith("http")
      ? normalizedOgImage
      : `${BASE_URL}${normalizedOgImage}`;
    document.title = fullTitle;

    const upsertMeta = (key: "name" | "property", value: string, content: string) => {
      let tag = document.head.querySelector(`meta[${key}="${value}"]`);

      if (!tag) {
        tag = document.createElement("meta");
        tag.setAttribute(key, value);
        document.head.appendChild(tag);
      }

      tag.setAttribute("content", content);
    };

    upsertMeta("name", "description", normalizedDescription);
    upsertMeta("property", "og:title", fullTitle);
    upsertMeta("property", "og:description", normalizedDescription);
    upsertMeta("property", "og:type", ogType);
    upsertMeta("property", "og:url", canonicalUrl);
    upsertMeta("property", "og:site_name", SITE_NAME);
    upsertMeta("property", "og:image", ogImageUrl);
    upsertMeta("name", "twitter:card", "summary_large_image");
    upsertMeta("name", "twitter:title", fullTitle);
    upsertMeta("name", "twitter:description", normalizedDescription);
    upsertMeta("name", "twitter:image", ogImageUrl);
    upsertMeta("name", "robots", noindex ? "noindex, nofollow" : "index, follow");

    let canonicalTag = document.head.querySelector('link[rel="canonical"]');

    if (!canonicalTag) {
      canonicalTag = document.createElement("link");
      canonicalTag.setAttribute("rel", "canonical");
      document.head.appendChild(canonicalTag);
    }

    canonicalTag.setAttribute("href", canonicalUrl);
  }, [description, noindex, ogImage, ogType, title]);

  return null;
};

export default PageMeta;
