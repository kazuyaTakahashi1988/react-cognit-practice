import { useEffect } from "react";

import type { TypePageMeta } from "../../lib/types";
import type React from "react";

const SITE_NAME = "React Cognito Practice";
const BASE_URL = "http://react-cognito.empty-service.com";
const DEFAULT_TITLE = "React Cognito Practice";
const DEFAULT_DESCRIPTION = "React と Cognito の検証用サンプルアプリです。";
const DEFAULT_OG_IMAGE = "/ogp.jpg";

const PageMeta: React.FC<TypePageMeta> = ({
  title,
  description,
  ogImage,
  ogType = "website",
}) => {
  useEffect(() => {
    const normalizedTitle = title?.trim() ? title.trim() : DEFAULT_TITLE;
    const normalizedDescription = description?.trim() ? description.trim() : DEFAULT_DESCRIPTION;
    const normalizedOgImage = ogImage?.trim() ? ogImage.trim() : DEFAULT_OG_IMAGE;
    const fullTitle =
      normalizedTitle === DEFAULT_TITLE ? DEFAULT_TITLE : `${normalizedTitle} | ${SITE_NAME}`;
    const url = globalThis.location.href;
    const ogImageUrl = normalizedOgImage.startsWith("http")
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
    upsertMeta("property", "og:url", url);
    upsertMeta("property", "og:site_name", SITE_NAME);
    upsertMeta("property", "og:image", ogImageUrl);
    upsertMeta("name", "twitter:card", "summary_large_image");
    upsertMeta("name", "twitter:title", fullTitle);
    upsertMeta("name", "twitter:description", normalizedDescription);
    upsertMeta("name", "twitter:image", ogImageUrl);
  }, [description, ogImage, ogType, title]);

  return null;
};

export default PageMeta;
