import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const SITE_NAME = "React Cognito Practice";
const SITE_URL = process.env.VITE_SITE_URL ?? "http://react-cognito.empty-service.com";
const DEFAULT_OG_IMAGE = `${SITE_URL}/ogp.jpg`;

const prerenderTargets = [
  "src/features/example/formExample/page.tsx",
  "src/features/example/todoExample/page.tsx",
  "src/features/example/modalExample/page.tsx",
  "src/features/example/accordionExample/page.tsx",
  "src/features/example/dropdownMenuExample/page.tsx",
  "src/features/auth/signIn/page.tsx",
  "src/features/auth/signUp/page.tsx",
  "src/features/auth/verification/page.tsx",
];

const extractPageConfig = async (pagePath) => {
  const source = await readFile(path.resolve(process.cwd(), pagePath), "utf8");
  const sharePathMatch = source.match(/export\s+const\s+sharePath\s*=\s*"([^"]+)";/);
  const pageMetaMatch = source.match(/export\s+const\s+pageMeta\s*=\s*(\{[\s\S]*?\});/);

  if (!sharePathMatch?.[1]) {
    throw new Error(`sharePath export not found in ${pagePath}`);
  }

  if (!pageMetaMatch?.[1]) {
    throw new Error(`pageMeta export not found in ${pagePath}`);
  }

  return {
    route: sharePathMatch[1],
    pageMeta: Function(`"use strict"; return (${pageMetaMatch[1]});`)(),
  };
};

const upsertMeta = (html, key, value, content) => {
  const escapedContent = content.replaceAll('"', "&quot;");
  const tagPattern = new RegExp(`<meta\\s+${key}=["']${value}["']\\s+content=["'][^"']*["']\\s*/?>`, "i");
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
  const socialDescription = pageMeta.shareText ?? pageMeta.description;
  const pageTitle = pageMeta.title.includes("React Cognito Practice")
    ? pageMeta.title
    : `${pageMeta.title} | React Cognito Practice`;

  let nextHtml = template.replace(/<title>.*<\/title>/i, `<title>${pageTitle}</title>`);

  nextHtml = upsertMeta(nextHtml, "name", "description", pageMeta.description);
  nextHtml = upsertMeta(nextHtml, "property", "og:title", pageTitle);
  nextHtml = upsertMeta(nextHtml, "property", "og:description", socialDescription);
  nextHtml = upsertMeta(nextHtml, "property", "og:type", pageMeta.ogType ?? "website");
  nextHtml = upsertMeta(nextHtml, "property", "og:url", canonicalUrl);
  nextHtml = upsertMeta(nextHtml, "property", "og:site_name", SITE_NAME);
  nextHtml = upsertMeta(nextHtml, "property", "og:image", DEFAULT_OG_IMAGE);
  nextHtml = upsertMeta(nextHtml, "name", "twitter:card", "summary_large_image");
  nextHtml = upsertMeta(nextHtml, "name", "twitter:title", pageTitle);
  nextHtml = upsertMeta(nextHtml, "name", "twitter:description", socialDescription);
  nextHtml = upsertMeta(nextHtml, "name", "twitter:image", DEFAULT_OG_IMAGE);
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
