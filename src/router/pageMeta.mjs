import { readdir, readFile } from "node:fs/promises";
import path from "node:path";

import * as ts from "typescript";

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

  return Promise.all(pageModules.map((pagePath) => extractPageConfig(pagePath)));
};
