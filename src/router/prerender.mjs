import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

import { loadEnv } from "vite";

/* -----------------------------------------------
 * ◻︎◻︎◻︎ SEO対応 ◻︎◻︎◻︎
 * yarn build:prerender コマンドで
 * 実行されるプリレンダリングスクリプト
 * ----------------------------------------------- */

const mode = process.env.VITE_ENV_MODE ?? process.env.NODE_ENV ?? "production";
const viteEnv = loadEnv(mode, process.cwd(), "VITE_APP_");

const SITE_NAME = viteEnv.VITE_APP_SITE_NAME ?? "";
const SITE_URL = viteEnv.VITE_APP_BASE_URL ?? "";
const DEFAULT_OG_IMAGE = `${SITE_URL}${viteEnv.VITE_APP_DEFAULT_OG_IMAGE ?? ""}`;

/*
 * プリレンダリング対象のページコンポーネントのパス
 */
const prerenderTargets = [
  /* example ページ */
  "src/features/example/formExample/page.tsx",
  "src/features/example/todoExample/page.tsx",
  "src/features/example/modalExample/page.tsx",
  "src/features/example/accordionExample/page.tsx",
  "src/features/example/dropdownMenuExample/page.tsx",
  /* auth ページ */
  "src/features/auth/signIn/page.tsx",
  "src/features/auth/signOut/page.tsx",
  "src/features/auth/signUp/page.tsx",
  "src/features/auth/verification/page.tsx",
];

const extractPageConfig = async (pagePath) => {
  const source = await readFile(path.resolve(process.cwd(), pagePath), "utf8");
  const pageMetaMatch = source.match(/export\s+const\s+pageMeta\s*=\s*(\{[\s\S]*?\});/);

  if (!pageMetaMatch?.[1]) {
    throw new Error(`pageMeta export not found in ${pagePath}`);
  }

  const pageMeta = Function(`"use strict"; return (${pageMetaMatch[1]});`)();

  if (!pageMeta.sharePath) {
    throw new Error(`sharePath missing in pageMeta of ${pagePath}`);
  }

  return { route: pageMeta.sharePath, pageMeta };
};

const upsertMeta = (html, key, value, content) => {
  const escapedContent = content.replaceAll('"', "&quot;");
  const tagPattern = new RegExp(
    `<meta\\s+${key}=["']${value}["']\\s+content=["'][^"']*["']\\s*/?>`,
    "i",
  );
  const newTag = `<meta ${key}="${value}" content="${escapedContent}" />`;

  if (tagPattern.test(html)) {
    return html.replace(tagPattern, newTag);
  }

  return html.replace("</head>", `  ${newTag}\n  </head>`);
};

const upsertCanonical = (html, href) => {
  const escapedHref = href.replaceAll('"', "&quot;");
  const linkPattern = /<link\s+rel=["']canonical["']\s+href=["'][^"']*["']\s*\/?>/i;
  const newLink = `<link rel="canonical" href="${escapedHref}" />`;

  if (linkPattern.test(html)) {
    return html.replace(linkPattern, newLink);
  }

  return html.replace("</head>", `  ${newLink}\n  </head>`);
};

const withMeta = (template, route, pageMeta) => {
  const canonicalUrl = `${SITE_URL}${route}`;
  const pageTitle = pageMeta.title.includes(SITE_NAME)
    ? pageMeta.title
    : `${pageMeta.title} | ${SITE_NAME}`;

  let nextHtml = template.replace(/<title>.*<\/title>/i, `<title>${pageTitle}</title>`);

  const ogImageUrl = pageMeta.ogImage
    ? pageMeta.ogImage.startsWith("http")
      ? pageMeta.ogImage
      : `${SITE_URL}${pageMeta.ogImage}`
    : DEFAULT_OG_IMAGE;

  nextHtml = upsertMeta(nextHtml, "name", "description", pageMeta.description);
  nextHtml = upsertMeta(nextHtml, "property", "og:title", pageTitle);
  nextHtml = upsertMeta(nextHtml, "property", "og:description", pageMeta.description);
  nextHtml = upsertMeta(nextHtml, "property", "og:type", pageMeta.ogType ?? "website");
  nextHtml = upsertMeta(nextHtml, "property", "og:url", canonicalUrl);
  nextHtml = upsertMeta(nextHtml, "property", "og:site_name", SITE_NAME);
  nextHtml = upsertMeta(nextHtml, "property", "og:image", ogImageUrl);
  nextHtml = upsertMeta(nextHtml, "name", "twitter:card", "summary_large_image");
  nextHtml = upsertMeta(nextHtml, "name", "twitter:title", pageTitle);
  nextHtml = upsertMeta(nextHtml, "name", "twitter:description", pageMeta.description);
  nextHtml = upsertMeta(nextHtml, "name", "twitter:image", ogImageUrl);
  nextHtml = upsertCanonical(nextHtml, canonicalUrl);

  return nextHtml;
};

const prerenderRootMarkup = (pageMeta) => {
  return `<div id="root"><main data-prerendered="true" style="max-width: 640px; margin: 40px auto; padding: 0 20px;"><h1>${pageMeta.title}</h1><p>${pageMeta.description}</p></main></div>`;
};

const run = async () => {
  const distDir = path.resolve(process.cwd(), "dist");
  const indexPath = path.join(distDir, "index.html");
  const template = await readFile(indexPath, "utf8");

  for (const pagePath of prerenderTargets) {
    const { route, pageMeta } = await extractPageConfig(pagePath);
    const routeTemplate = withMeta(template, route, pageMeta).replace(
      '<div id="root"></div>',
      prerenderRootMarkup(pageMeta),
    );

    const outputDir = path.join(distDir, route.replace(/^\//, ""));
    await mkdir(outputDir, { recursive: true });
    await writeFile(path.join(outputDir, "index.html"), routeTemplate, "utf8");
  }

  console.info(`Prerender completed for ${prerenderTargets.length} routes.`);
};

void run();
