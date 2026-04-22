import { readdir, readFile } from "node:fs/promises";
import path from "node:path";

import * as ts from "typescript";

/* -----------------------------------------------
 * 各 page.tsx 内の pageMeta 情報を抽出・一覧する処理
 * （ prerender.mjs や sitemap.mjs にて利用 ）
 * ----------------------------------------------- */

const findPageMetaNode = (sourceFile) => {
  for (const statement of sourceFile.statements) {
    if (!ts.isVariableStatement(statement)) continue;

    const hasExport = statement.modifiers?.some(
      (modifier) => modifier.kind === ts.SyntaxKind.ExportKeyword,
    );
    if (!hasExport) continue;

    for (const declaration of statement.declarationList.declarations) {
      if (!ts.isIdentifier(declaration.name) || declaration.name.text !== "pageMeta") continue;
      if (!declaration.initializer) continue;
      return declaration.initializer;
    }
  }

  return null;
};

const findPageModules = async (dirPath) => {
  const entries = await readdir(dirPath, { withFileTypes: true });
  const pageModules = [];

  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry.name);

    if (entry.isDirectory()) {
      pageModules.push(...(await findPageModules(fullPath)));
      continue;
    }

    if (entry.isFile() && entry.name === "page.tsx") {
      pageModules.push(path.relative(process.cwd(), fullPath));
    }
  }

  return pageModules;
};

const extractPageConfig = async (pagePath) => {
  const source = await readFile(path.resolve(process.cwd(), pagePath), "utf8");
  const sourceFile = ts.createSourceFile(
    pagePath,
    source,
    ts.ScriptTarget.Latest,
    true,
    ts.ScriptKind.TSX,
  );
  const pageMetaNode = findPageMetaNode(sourceFile);

  if (!pageMetaNode) {
    throw new Error(`pageMeta export not found in ${pagePath}`);
  }

  const pageMetaSource = sourceFile.text.slice(pageMetaNode.pos, pageMetaNode.end).trim();
  const pageMeta = new Function(`"use strict"; return (${pageMetaSource});`)();

  if (!pageMeta) {
    throw new Error(`pageMeta export not found in ${pagePath}`);
  }

  if (!pageMeta.sharePath) {
    throw new Error(`sharePath missing in pageMeta of ${pagePath}`);
  }

  return { route: pageMeta.sharePath, pageMeta };
};

export const collectPageConfigs = async () => {
  const pageModules = await findPageModules(path.resolve(process.cwd(), "src/features"));

  // 静的ページの pageMeta 情報を抽出・一覧化
  const staticPageConfigs = await Promise.all(
    pageModules.map((pagePath) => extractPageConfig(pagePath)),
  );

  /*
   * 動的ページ（例：blog記事）がある場合、APIを用意し pageMeta 情報を一覧取得・追加する（以下例）
   *
   * // 動的ページの pageMeta 情報の型（例）
   * type TypeBlogPageConfigs = {
   *  route: string,
   *  pageMeta: {
   *     title: string,
   *     description: string,
   *     sharePath: string,
   *     ogType?: "website" | "article",
   *     ogImage?: string,
   *     noindex?: boolean,
   *   },
   * }[];
   *
   * // 動的ページの pageMeta 情報を一覧化するAPI（例）
   * const blogPageConfigs: TypeBlogPageConfigs = await getBlogPageConfigs();
   */

  return [...staticPageConfigs /* , ...blogPageConfigs */];
};
