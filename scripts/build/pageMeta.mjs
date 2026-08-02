import { readFile } from "node:fs/promises";
import path from "node:path";

import * as ts from "typescript";

/* -----------------------------------------------
 * routeConfig.tsx 内の pageMeta 情報を抽出・一覧する処理
 * （ prerender.mjs や sitemap.mjs にて利用 ）
 * ----------------------------------------------- */

const ROUTE_CONFIG_PATH = "src/router/routeConfig.tsx";

const findRouteConfigNode = (sourceFile) => {
  for (const statement of sourceFile.statements) {
    if (!ts.isVariableStatement(statement)) continue;

    for (const declaration of statement.declarationList.declarations) {
      if (
        ts.isIdentifier(declaration.name) &&
        declaration.name.text === "routeConfig" &&
        declaration.initializer &&
        ts.isArrayLiteralExpression(declaration.initializer)
      ) {
        return declaration.initializer;
      }
    }
  }

  return null;
};

const findPropertyNode = (routeNode, propertyName) => {
  for (const property of routeNode.properties) {
    if (!ts.isPropertyAssignment(property)) continue;

    const name = property.name;
    if (
      (ts.isIdentifier(name) || ts.isStringLiteral(name)) &&
      name.text === propertyName
    ) {
      return property.initializer;
    }
  }

  return null;
};

const evaluateLiteral = (sourceFile, node) => {
  const source = sourceFile.text.slice(node.pos, node.end).trim();
  return new Function(`"use strict"; return (${source});`)();
};

const extractPageConfig = (sourceFile, routeNode, index) => {
  if (!ts.isObjectLiteralExpression(routeNode)) {
    throw new Error(`routeConfig[${index}] must be an object literal`);
  }

  const pathNode = findPropertyNode(routeNode, "path");
  const pageMetaNode = findPropertyNode(routeNode, "pageMeta");

  if (!pathNode) {
    throw new Error(`path missing in routeConfig[${index}]`);
  }
  if (!pageMetaNode) {
    throw new Error(`pageMeta missing in routeConfig[${index}]`);
  }

  const route = evaluateLiteral(sourceFile, pathNode);
  const pageMeta = evaluateLiteral(sourceFile, pageMetaNode);
  return { route, pageMeta };
};

export const collectPageConfigs = async () => {
  const configPath = path.resolve(process.cwd(), ROUTE_CONFIG_PATH);
  const source = await readFile(configPath, "utf8");
  const sourceFile = ts.createSourceFile(
    configPath,
    source,
    ts.ScriptTarget.Latest,
    true,
    ts.ScriptKind.TSX,
  );
  const routeConfigNode = findRouteConfigNode(sourceFile);

  if (!routeConfigNode) {
    throw new Error(`routeConfig export not found in ${ROUTE_CONFIG_PATH}`);
  }

  // 静的ページのルートとメタ情報を routeConfig から抽出・一覧化
  const staticPageConfigs = routeConfigNode.elements.map((routeNode, index) =>
    extractPageConfig(sourceFile, routeNode, index),
  );

  /*
   * 動的ページ（例：blog記事）がある場合、
   * APIを用意して pageMeta 情報を一覧取得・追加する
   * （以下例）
   *
   * pageMeta および blogPageConfigs 情報の型 = {
   *  route: string,
   *  pageMeta: {
   *     title: string,
   *     description: string,
   *     ogType?: "website" | "article",
   *     ogImage?: string,
   *     noindex?: boolean,
   *   },
   * }[];
   *
   * 動的ページの pageMeta 情報を一覧取得するAPI
   * const blogPageConfigs = await getBlogPageConfigs();
   */

  return [...staticPageConfigs /* , ...blogPageConfigs */];
};
