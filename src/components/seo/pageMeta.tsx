import { useEffect } from "react";

import type React from "react";

type TypePageMetaProps = {
  title: string;
  description: string;
  ogImage: string;
  ogType?: "website" | "article";
  shareText?: string;
};

const SITE_NAME = "React Cognito Practice";
const BASE_URL = "https://example.com";

const PageMeta: React.FC<TypePageMetaProps> = ({
  title,
  description,
  ogImage,
  ogType = "website",
  shareText,
}) => {
  useEffect(() => {
    const fullTitle = `${title} | ${SITE_NAME}`;
    const url = window.location.href;
    const ogImageUrl = ogImage.startsWith("http") ? ogImage : `${BASE_URL}${ogImage}`;
    const socialDescription = shareText ?? description;

    document.title = fullTitle;

    const upsertMeta = (
      key: "name" | "property",
      value: string,
      content: string,
    ) => {
      let tag = document.head.querySelector(`meta[${key}="${value}"]`);

      if (!tag) {
        tag = document.createElement("meta");
        tag.setAttribute(key, value);
        document.head.appendChild(tag);
      }

      tag.setAttribute("content", content);
    };

    upsertMeta("name", "description", description);
    upsertMeta("property", "og:title", fullTitle);
    upsertMeta("property", "og:description", socialDescription);
    upsertMeta("property", "og:type", ogType);
    upsertMeta("property", "og:url", url);
    upsertMeta("property", "og:site_name", SITE_NAME);
    upsertMeta("property", "og:image", ogImageUrl);
    upsertMeta("name", "twitter:card", "summary_large_image");
    upsertMeta("name", "twitter:title", fullTitle);
    upsertMeta("name", "twitter:description", socialDescription);
    upsertMeta("name", "twitter:image", ogImageUrl);
  }, [description, ogImage, ogType, shareText, title]);

  return null;
};

export default PageMeta;
