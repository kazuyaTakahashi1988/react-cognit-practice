import { writeFile } from "node:fs/promises";
import path from "node:path";

import { loadEnv } from "vite";

import { collectPageConfigs } from "./pageMeta.mjs";

/* -----------------------------------------------
 * yarn build:prerender コマンドで実行されるスクリプト
 * （ビルド成果物に sitemap.xml を自動生成）
 * ----------------------------------------------- */

const mode = process.env.VITE_ENV_MODE ?? process.env.NODE_ENV ?? "production";
const viteEnv = loadEnv(mode, process.cwd(), "VITE_APP_");

const siteUrlRaw = viteEnv.VITE_APP_BASE_URL ?? "";
const siteUrl = siteUrlRaw.endsWith("/") ? siteUrlRaw.slice(0, -1) : siteUrlRaw;

if (!siteUrl) {
  throw new Error("VITE_APP_BASE_URL is required to generate sitemap.xml");
}

const buildSitemapXml = (routes) => {
  const today = new Date().toISOString().slice(0, 10);
  const urlRows = routes
    .map((route) => {
      return [
        "  <url>",
        `    <loc>${siteUrl}${route}</loc>`,
        `    <lastmod>${today}</lastmod>`,
        "  </url>",
      ].join("\n");
    })
    .join("\n");

  return [
    `<?xml version="1.0" encoding="UTF-8"?>`,
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
    urlRows,
    `</urlset>`,
  ].join("\n");
};

const run = async () => {
  const pageConfigs = await collectPageConfigs();
  const routes = [...new Set(pageConfigs.map(({ route }) => route))].sort();
  const sitemapXml = buildSitemapXml(routes);
  const outputPath = path.resolve(process.cwd(), "dist", "sitemap.xml");

  await writeFile(outputPath, sitemapXml, "utf8");
  console.info(`sitemap.xml generated with ${routes.length} urls.`);
};

void run();
